from datetime import datetime, timezone

from fastapi import APIRouter, HTTPException, Request

from app.core.config import get_settings
from app.core.security import session_from_request
from app.modules.dhanda import repository
from app.modules.dhanda.dependencies import database
from app.modules.dhanda.schemas import BusinessUpdate

router = APIRouter(prefix="/dhanda/businesses", tags=["dhanda businesses"])


@router.patch("")
def update_business(payload: BusinessUpdate, request: Request) -> dict:
    user = session_from_request(request)
    if not user or user.get("role") != "dhanda_vendor" or not user.get("businessId") or not user.get("id"):
        raise HTTPException(status_code=401, detail="Verified business sign-in required.")
    db = database("Business database is not configured.")
    updates = {}
    if payload.imageUrl is not None:
        image_url = payload.imageUrl.strip()
        settings = get_settings()
        valid_prefixes = [
            "https://res.cloudinary.com/",
            "https://images.unsplash.com/",
        ]
        if settings.supabase_url:
            valid_prefixes.append(f"{settings.supabase_url}/storage/v1/object/public/")
        is_valid = any(image_url.startswith(p) for p in valid_prefixes) or (
            image_url.startswith("https://") and any(ext in image_url.lower() for ext in [".jpg", ".jpeg", ".png", ".webp", "/image/upload/"])
        )
        if not is_valid:
            raise HTTPException(status_code=400, detail="Image must be a valid uploaded image URL.")
        updates["image_url"] = image_url
    if payload.tagline is not None:
        updates["tagline"] = payload.tagline.strip()[:240]
    if not updates:
        raise HTTPException(status_code=400, detail="No valid profile changes provided.")
    updates["updated_at"] = datetime.now(timezone.utc).isoformat()
    try:
        business = repository.update_business(db, user["businessId"], user["id"], updates)
        if not business:
            raise HTTPException(status_code=500, detail="Business profile could not be updated.")
        if "image_url" in updates:
            db.table("dhanda_promotions").update({"image_url": updates["image_url"], "updated_at": updates["updated_at"]}).eq("business_id", business["id"]).in_("status", ["scheduled", "active"]).execute()
        return {"success": True, "business": business}
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=502, detail="Business profile update failed.") from exc
