from datetime import datetime, timedelta, timezone
from uuid import uuid4

from fastapi import APIRouter, HTTPException, Request, status
from fastapi.responses import JSONResponse

from app.core.config import get_settings
from app.core.security import session_from_request
from app.core.supabase import SupabaseNotConfigured, get_supabase_client
from app.integrations import razorpay
from app.modules.dhanda import repository, service
from app.modules.dhanda.schemas import PromotionCreate, PromotionVerify

router = APIRouter(prefix="/dhanda/promotions", tags=["dhanda promotions"])


def _db():
    try:
        return get_supabase_client()
    except SupabaseNotConfigured as exc:
        raise HTTPException(status_code=503, detail="Promotion database is not configured.") from exc


@router.get("")
def get_promotions() -> dict:
    try:
        try:
            rows = repository.current_promotions(_db())
            return {"success": True, "banners": [service.to_banner(row) for row in rows], "pricingTiers": service.FIXTURES["pricing"]}
        except HTTPException:
            if not service.configured_or_development_fixture():
                raise
            return {"success": True, "banners": service.FIXTURES["banners"], "pricingTiers": service.FIXTURES["pricing"]}
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=502, detail="Could not load sponsored promotions.") from exc


@router.post("", status_code=status.HTTP_201_CREATED)
def create_promotion(payload: PromotionCreate, request: Request) -> JSONResponse:
    user = session_from_request(request)
    if not user or user.get("role") != "dhanda_vendor" or not user.get("businessId") or not user.get("id"):
        raise HTTPException(status_code=401, detail="Verify your business email before booking a promotion.")
    db = _db()
    if not razorpay.is_configured():
        raise HTTPException(status_code=503, detail="Razorpay checkout is not configured yet. Your verified business account is ready; please try again after payment setup.")
    tier = payload.tier
    pricing = service.PRICES.get(tier)
    category = (payload.category or "").strip()
    if not pricing:
        raise HTTPException(status_code=400, detail="Choose a valid promotion tier.")
    if tier == "Category Spotlight" and category not in service.VALID_CATEGORIES:
        raise HTTPException(status_code=400, detail="Choose a valid category for a Category Spotlight promotion.")
    business = repository.get_business(db, user["businessId"], user["id"])
    if not business:
        raise HTTPException(status_code=403, detail="Verified business account not found.")
    image_url = payload.imageUrl.strip() if payload.imageUrl else business.get("image_url")
    settings = get_settings()
    if image_url:
        prefix = f"{settings.supabase_url}/storage/v1/object/public/{settings.supabase_storage_bucket}/dhanda/{business['id']}/"
        if not settings.supabase_url or not image_url.startswith(prefix):
            raise HTTPException(status_code=400, detail="Promotion image must come from your Dhanda upload folder.")
    promo_id = str(uuid4())
    now = datetime.now(timezone.utc)
    try:
        db.table("dhanda_promotions").insert({
            "id": promo_id, "campus_id": business["campus_id"], "business_id": business["id"],
            "tier": tier, "category": category or None, "status": "pending_payment",
            "amount_paise": pricing["amount"], "business_name": business["business_name"],
            "owner_name": business["owner_name"], "whatsapp": business["whatsapp"],
            "tagline": (payload.tagline or business.get("tagline") or "")[:240] or None,
            "image_url": image_url, "starts_at": now.isoformat(),
            "ends_at": (now + timedelta(days=7)).isoformat(),
        }).execute()
    except Exception as exc:
        raise HTTPException(status_code=500, detail="Could not prepare the promotion booking.") from exc
    try:
        order = razorpay.create_order(amount=pricing["amount"], receipt=promo_id, notes={"promotion_id": promo_id, "business_id": business["id"], "campus_id": "auk"})
    except Exception as exc:
        db.table("dhanda_promotions").update({"status": "failed"}).eq("id", promo_id).execute()
        raise HTTPException(status_code=502, detail="Razorpay could not create your checkout. No payment was taken.") from exc
    try:
        db.table("dhanda_promotions").update({"razorpay_order_id": order["id"]}).eq("id", promo_id).execute()
    except Exception as exc:
        db.table("dhanda_promotions").update({"status": "failed"}).eq("id", promo_id).execute()
        raise HTTPException(status_code=500, detail="Could not save the payment order. Please retry.") from exc
    return JSONResponse({
        "success": True,
        "checkout": {
            "keyId": settings.razorpay_public_key_id or settings.razorpay_key_id,
            "orderId": order["id"], "amount": order["amount"], "currency": order["currency"],
            "businessName": business["business_name"], "ownerName": business["owner_name"],
            "ownerEmail": business["owner_email"], "whatsapp": business["whatsapp"],
        },
        "message": "Secure checkout is ready. Your promotion activates after payment is verified.",
    }, status_code=201)


@router.post("/verify")
def verify_promotion_payment(payload: PromotionVerify, request: Request) -> dict:
    user = session_from_request(request)
    if not user or user.get("role") != "dhanda_vendor" or not user.get("businessId"):
        raise HTTPException(status_code=401, detail="Business sign-in required.")
    db = _db()
    if not razorpay.verify_checkout_signature(payload.razorpay_order_id, payload.razorpay_payment_id, payload.razorpay_signature):
        raise HTTPException(status_code=400, detail="Payment signature could not be verified.")
    try:
        promotion = db.table("dhanda_promotions").select("id,amount_paise,status,razorpay_payment_id").eq("razorpay_order_id", payload.razorpay_order_id).eq("business_id", user["businessId"]).maybe_single().execute().data
        if not promotion:
            raise HTTPException(status_code=404, detail="Promotion order not found.")
        if promotion["status"] == "active" and promotion.get("razorpay_payment_id") == payload.razorpay_payment_id:
            return {"success": True, "message": "Your promotion is active."}
        if promotion["status"] != "pending_payment":
            raise HTTPException(status_code=409, detail="This promotion order is no longer payable.")
        payment = razorpay.fetch_payment(payload.razorpay_payment_id)
        if payment.get("order_id") != payload.razorpay_order_id or payment.get("status") != "captured" or payment.get("amount") != promotion["amount_paise"] or payment.get("currency") != "INR":
            raise HTTPException(status_code=409, detail="Payment is not captured for this promotion order.")
        now = datetime.now(timezone.utc)
        result = db.table("dhanda_promotions").update({
            "status": "active", "razorpay_payment_id": payload.razorpay_payment_id,
            "starts_at": now.isoformat(), "ends_at": (now + timedelta(days=7)).isoformat(),
            "updated_at": now.isoformat(),
        }).eq("id", promotion["id"]).eq("status", "pending_payment").select("id").maybe_single().execute().data
        if not result:
            raise HTTPException(status_code=409, detail="Promotion status changed during payment verification.")
        return {"success": True, "message": "Payment verified. Your promotion is live for seven days."}
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=502, detail="Payment verification failed.") from exc


@router.delete("/{promotion_id}")
def delete_promotion(promotion_id: str, request: Request) -> dict:
    user = session_from_request(request)
    if not user:
        raise HTTPException(status_code=401, detail="Please sign in.")
    db = _db()
    promo = db.table("dhanda_promotions").select("*").eq("id", promotion_id).maybe_single().execute().data
    if not promo:
        raise HTTPException(status_code=404, detail="Promotion not found.")
    is_superadmin = user.get("role") == "superadmin"
    is_owner = user.get("role") == "dhanda_vendor" and user.get("businessId") == promo.get("business_id")
    if not is_superadmin and not is_owner:
        raise HTTPException(status_code=403, detail="You do not have permission to delete this promotion.")
    try:
        db.table("dhanda_promotions").delete().eq("id", promotion_id).execute()
        return {"success": True, "message": f"Promotion {promotion_id} deleted successfully."}
    except Exception as exc:
        raise HTTPException(status_code=502, detail="Failed to delete promotion.") from exc
