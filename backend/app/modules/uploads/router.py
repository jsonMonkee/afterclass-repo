from uuid import uuid4

from fastapi import APIRouter, HTTPException, Request

from app.core.config import get_settings
from app.core.security import session_from_request
from app.core.supabase import SupabaseNotConfigured, get_supabase_client
from app.modules.uploads.schemas import UploadSignRequest

router = APIRouter(prefix="/uploads", tags=["uploads"])
MIME_EXTENSIONS = {"image/jpeg": "jpg", "image/png": "png", "image/webp": "webp"}


@router.post("/sign")
def sign_upload(payload: UploadSignRequest, request: Request) -> dict:
    try:
        db = get_supabase_client()
    except SupabaseNotConfigured as exc:
        raise HTTPException(status_code=503, detail="Image storage is not configured.") from exc
    user = session_from_request(request)
    if not user:
        raise HTTPException(status_code=401, detail="Sign in before uploading an image.")
    extension = MIME_EXTENSIONS.get(payload.fileType)
    if not extension:
        raise HTTPException(status_code=400, detail="Choose a JPG, PNG, or WebP image no larger than 10 MB.")
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
    bucket = get_settings().supabase_storage_bucket
    path = f"{folder}/{uuid4()}.{extension}"
    try:
        storage = db.storage.from_(bucket)
        signed = storage.create_signed_upload_url(path)
        token = signed.get("token")
        if not token:
            raise RuntimeError("Signed upload response did not contain a token.")
        public_url = storage.get_public_url(path)
        return {"success": True, "bucket": bucket, "path": path, "token": token, "publicUrl": public_url}
    except Exception as exc:
        raise HTTPException(status_code=502, detail="Could not prepare a secure upload. Check that the image bucket exists.") from exc
