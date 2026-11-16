import logging
from uuid import uuid4

from fastapi import APIRouter, HTTPException, Request

from app.core.config import get_settings
from app.core.security import session_from_request
from app.core.supabase import SupabaseNotConfigured, get_supabase_client
from app.modules.uploads.schemas import UploadSignRequest

logger = logging.getLogger("afterclass.uploads")
router = APIRouter(prefix="/uploads", tags=["uploads"])
MIME_EXTENSIONS = {"image/jpeg": "jpg", "image/png": "png", "image/webp": "webp"}


@router.post("/sign")
def sign_upload(payload: UploadSignRequest, request: Request) -> dict:
    settings = get_settings()
    is_dev = settings.app_env.lower() != "production" or settings.afterclass_enable_demo_accounts

    user = session_from_request(request)
    if not user:
        raise HTTPException(status_code=401, detail="Sign in before uploading an image.")

    extension = MIME_EXTENSIONS.get(payload.fileType)
    if not extension:
        raise HTTPException(status_code=400, detail="Choose a JPG, PNG, or WebP image no larger than 10 MB.")

    folder = "uploads"
    try:
        db = get_supabase_client()
        if payload.scope == "dhanda" and user.get("role") == "dhanda_vendor" and user.get("businessId") and user.get("id"):
            business = db.table("dhanda_businesses").select("id").eq("id", user["businessId"]).eq("auth_user_id", user["id"]).not_.is_("email_verified_at", "null").maybe_single().execute().data
            if not business:
                raise HTTPException(status_code=403, detail="Verified Dhanda business account required.")
            folder = f"dhanda/{business['id']}"
        elif payload.scope == "club" and user.get("role") in {"club_lead", "superadmin"}:
            club_id = str(request.headers.get("x-club-id") or "") if user["role"] == "superadmin" else str(user.get("clubId") or "")
            if not club_id:
                raise HTTPException(status_code=400, detail="Club profile is missing from this session.")
            club = db.table("clubs").select("id").eq("id", club_id).eq("campus_id", "auk").maybe_single().execute().data
            if not club:
                raise HTTPException(status_code=404, detail="Club profile not found.")
            folder = f"clubs/{club['id']}"
        else:
            raise HTTPException(status_code=403, detail="You do not have permission to upload for this section.")
    except SupabaseNotConfigured as exc:
        if not is_dev and not settings.cloudinary_cloud_name:
            raise HTTPException(status_code=503, detail="Image storage is not configured.") from exc
        db = None
    except HTTPException:
        raise
    except Exception as exc:
        if not is_dev:
            raise HTTPException(status_code=502, detail="Database permission check failed.") from exc
        db = None

    # 1. Cloudinary Direct CDN Upload (Zero server load, generous 25 GB free storage)
    if settings.cloudinary_cloud_name:
        return {
            "success": True,
            "provider": "cloudinary",
            "cloudName": settings.cloudinary_cloud_name,
            "uploadPreset": settings.cloudinary_upload_preset,
            "folder": folder,
        }

    # 2. Supabase Storage Signed Upload
    bucket = settings.supabase_storage_bucket
    path = f"{folder}/{uuid4()}.{extension}"
    if db is not None:
        try:
            storage = db.storage.from_(bucket)
            signed = storage.create_signed_upload_url(path)
            token = signed.get("token")
            if not token:
                raise RuntimeError("Signed upload response did not contain a token.")
            public_url = storage.get_public_url(path)
            return {
                "success": True,
                "provider": "supabase",
                "bucket": bucket,
                "path": path,
                "token": token,
                "publicUrl": public_url,
            }
        except Exception as exc:
            if not is_dev:
                raise HTTPException(status_code=502, detail="Could not prepare a secure upload. Check that the image bucket exists.") from exc
            logger.warning("Supabase storage signing failed in dev; falling back to mock upload: %s", exc)

    # 3. Development / Demo Fallback Mock URL
    if is_dev:
        return {
            "success": True,
            "provider": "mock",
            "publicUrl": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop",
        }

    raise HTTPException(status_code=503, detail="Image storage is not configured.")
