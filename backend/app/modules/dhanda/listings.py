from uuid import uuid4

from fastapi import APIRouter, HTTPException, Query, Request, status

from app.core.config import get_settings
from app.core.security import require_session, session_from_request
from app.modules.dhanda import repository, service
from app.modules.dhanda.dependencies import database
from app.modules.dhanda.schemas import ListingCreate

router = APIRouter(prefix="/dhanda/listings", tags=["dhanda"])


@router.get("")
def get_listings(
    category: str | None = None,
    search: str | None = None,
    escrowOnly: bool = False,
) -> dict:
    try:
        try:
            rows = [service.from_database_listing(row) for row in repository.active_listings(database("Dhanda database is not configured."))]
        except HTTPException:
            if not service.configured_or_development_fixture():
                raise
            rows = service.FIXTURES["listings"]
        results = service.filter_listings(rows, category, search, escrowOnly)
        return {"success": True, "count": len(results), "categories": service.FIXTURES["categories"], "data": results}
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=502, detail="Failed to fetch Dhanda listings.") from exc


@router.post("", status_code=status.HTTP_201_CREATED)
def post_listing(payload: ListingCreate, request: Request) -> dict:
    user = session_from_request(request)
    if not user or user.get("role") != "dhanda_vendor" or not user.get("id") or not user.get("businessId"):
        raise HTTPException(status_code=401, detail="Register and verify your business before publishing a listing.")
    if payload.category not in service.VALID_CATEGORIES:
        raise HTTPException(status_code=400, detail="Choose a valid Dhanda category.")
    db = database("Dhanda database is not configured.")
    business = repository.get_business(db, user["businessId"], user["id"])
    if not business:
        raise HTTPException(status_code=403, detail="Your verified business account could not be found.")
    image_url = payload.imageUrl.strip() if payload.imageUrl else None
    if image_url:
        settings = get_settings()
        bucket = settings.supabase_storage_bucket
        prefix = f"{settings.supabase_url}/storage/v1/object/public/{bucket}/dhanda/{business['id']}/"
        if not settings.supabase_url or not image_url.startswith(prefix):
            raise HTTPException(status_code=400, detail="Listing image must come from your Dhanda upload folder.")
    tags = payload.tags
    if isinstance(tags, str):
        tags = [part.strip() for part in tags.split(",") if part.strip()]
    row = {
        "id": str(uuid4()), "campus_id": business["campus_id"], "business_id": business["id"],
        "title": payload.title.strip(), "seller_name": business["owner_name"], "seller_email": business["owner_email"],
        "semester": (payload.semester or "Amity Student")[:80], "category": payload.category,
        "price": payload.price, "price_unit": (payload.priceUnit or "per assignment/service")[:80],
        "turnaround": (payload.turnaround or "24-48 Hours")[:80], "badge": "NEW LISTING",
        "description": (payload.description or "")[:1500],
        "tags": [str(tag)[:40] for tag in (tags or [payload.category])[:12]],
        "image_url": image_url, "verified_student": True, "escrow_shield": payload.escrowShield,
        "instant_digital_download": payload.instantDigitalDownload,
        "contact_number": "".join(char for char in (payload.contactNumber or business["whatsapp"]) if char.isdigit())[:15],
        "status": "active",
    }
    try:
        created = repository.create_listing(db, row)
        return {"success": True, "message": "Dhanda listing published successfully.", "data": service.from_database_listing(created)}
    except Exception as exc:
        raise HTTPException(status_code=502, detail="Failed to create Dhanda listing.") from exc


@router.delete("/{listing_id}")
def delete_listing(listing_id: str, request: Request) -> dict:
    user = require_session(request)
    db = database("Dhanda database is not configured.")
    listing = repository.get_listing(db, listing_id)
    if not listing:
        raise HTTPException(status_code=404, detail=f"Listing {listing_id} not found.")
    is_superadmin = user.get("role") == "superadmin"
    is_owner = user.get("role") == "dhanda_vendor" and user.get("businessId") == listing.get("business_id")
    if not is_superadmin and not is_owner:
        raise HTTPException(status_code=403, detail="You do not have permission to delete this listing.")
    try:
        repository.delete_listing(db, listing_id)
        return {"success": True, "message": f"Listing {listing_id} deleted successfully."}
    except Exception as exc:
        raise HTTPException(status_code=502, detail="Failed to delete Dhanda listing.") from exc
