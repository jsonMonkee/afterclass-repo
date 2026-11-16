import json
from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, HTTPException, Request

from app.core.supabase import SupabaseNotConfigured, get_supabase_client
from app.integrations.razorpay import verify_webhook_signature

router = APIRouter(prefix="/payments", tags=["payments"])


@router.post("/webhook")
async def razorpay_webhook(request: Request) -> dict:
    raw_body = await request.body()
    signature = request.headers.get("x-razorpay-signature")
    event_id = request.headers.get("x-razorpay-event-id")
    if not verify_webhook_signature(raw_body, signature):
        raise HTTPException(status_code=400, detail="Invalid webhook signature.")
    try:
        db = get_supabase_client()
    except SupabaseNotConfigured as exc:
        raise HTTPException(status_code=503, detail="Payment database is not configured.") from exc
    if not event_id:
        raise HTTPException(status_code=400, detail="Missing Razorpay event id.")
    try:
        event = json.loads(raw_body)
        event_type = str(event.get("event") or "")
        payment = event.get("payload", {}).get("payment", {}).get("entity") or {}
        order = event.get("payload", {}).get("order", {}).get("entity") or {}
        order_id = payment.get("order_id") or order.get("id")
        payment_id = payment.get("id")
        if event_type in {"order.paid", "payment.captured"} and order_id and payment.get("status") == "captured":
            now = datetime.now(timezone.utc)
            result = db.table("dhanda_promotions").update({
                "status": "active", "razorpay_payment_id": payment_id,
                "starts_at": now.isoformat(), "ends_at": (now + timedelta(days=7)).isoformat(),
                "updated_at": now.isoformat(),
            }).eq("razorpay_order_id", order_id).eq("amount_paise", payment.get("amount")).eq("status", "pending_payment").execute()
            if getattr(result, "error", None):
                raise HTTPException(status_code=500, detail="Could not process payment event.")
        db.table("dhanda_payment_events").upsert({
            "event_id": event_id, "event_type": event_type or "unknown",
            "razorpay_order_id": order_id, "razorpay_payment_id": payment_id,
            "payload": event,
        }, on_conflict="event_id", ignore_duplicates=True).execute()
        return {"success": True, "received": True}
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=400, detail="Invalid payment webhook payload.") from exc
