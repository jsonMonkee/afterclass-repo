import re
from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import JSONResponse

from app.core.config import get_settings
from app.core.security import sign_session
from app.core.supabase import SupabaseNotConfigured, get_supabase_auth_client, get_supabase_client
from app.modules.dhanda.schemas import BusinessRegistration, VerifyRegistration

router = APIRouter(prefix="/dhanda/register", tags=["dhanda registrations"])
EMAIL_PATTERN = re.compile(
    r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,63}$"
)
PHONE_PATTERN = re.compile(r"^91[6-9]\d{9}$")


def _clients():
    try:
        return get_supabase_client(), get_supabase_auth_client()
    except SupabaseNotConfigured as exc:
        raise HTTPException(status_code=503, detail="Business registration is not configured yet. Add the Supabase server and publishable keys.") from exc


@router.post("")
def register(payload: BusinessRegistration) -> JSONResponse:
    db, auth = _clients()
    email = payload.ownerEmail.strip().lower()
    whatsapp = "".join(char for char in payload.whatsapp if char.isdigit())
    tier = payload.tier
    category = (payload.category or "").strip()

    if (
        not EMAIL_PATTERN.match(email)
        or ".." in email
        or email.startswith(".")
        or email.split("@")[0].endswith(".")
    ):
        raise HTTPException(
            status_code=400,
            detail="Invalid email address format. Please enter a valid email (e.g., owner@example.com).",
        )

    if not PHONE_PATTERN.match(whatsapp):
        raise HTTPException(
            status_code=400,
            detail="Invalid WhatsApp number. It must be exactly 12 digits including country code 91 (e.g., 919830012345).",
        )

    if tier not in {"Homepage Main Banner", "Category Spotlight"}:
        raise HTTPException(
            status_code=400,
            detail="Choose a valid promotion tier ('Homepage Main Banner' or 'Category Spotlight').",
        )

    if tier == "Category Spotlight" and category not in {"Assignments & Notes", "Tech & Code", "Design & Creative", "Bakes & Treats", "Photography & Media", "Campus Services"}:
        raise HTTPException(
            status_code=400,
            detail="Category Spotlight requires a valid category (e.g., Tech & Code, Assignments & Notes).",
        )
    now = datetime.now(timezone.utc)
    try:
        # Clean up expired unauthenticated registrations
        try:
            db.table("dhanda_business_registrations").delete().eq("is_authenticated", False).lt("expires_at", now.isoformat()).execute()
        except Exception:
            db.table("dhanda_business_registrations").delete().lt("expires_at", now.isoformat()).execute()

        registration_data = {
            "campus_id": "auk", "business_name": payload.businessName.strip(),
            "owner_name": payload.ownerName.strip(), "owner_email": email, "whatsapp": whatsapp,
            "tagline": (payload.tagline or "").strip()[:240] or None, "promotion_tier": tier,
            "promotion_category": category if tier == "Category Spotlight" else None,
            "requested_at": now.isoformat(), "expires_at": (now + timedelta(minutes=30)).isoformat(),
            "is_authenticated": False,
        }
        try:
            db.table("dhanda_business_registrations").upsert(registration_data, on_conflict="owner_email").execute()
        except Exception:
            # Fallback if SQL migration hasn't been executed yet in Supabase
            registration_data.pop("is_authenticated", None)
            db.table("dhanda_business_registrations").upsert(registration_data, on_conflict="owner_email").execute()

        auth.auth.sign_in_with_otp({
            "email": email,
            "options": {"should_create_user": True, "data": {"name": payload.ownerName.strip(), "role": "dhanda_vendor"}},
        })
        return JSONResponse({"success": True, "message": "We sent a verification code to your email. Verify it within 30 minutes to finish registering your business."}, status_code=202)
    except HTTPException:
        raise
    except Exception as exc:
        detail_msg = getattr(exc, "message", str(exc))
        raise HTTPException(
            status_code=502,
            detail=f"Supabase Auth error: {detail_msg}. (Check Supabase Auth email rate limits or SMTP setup)."
        ) from exc


@router.post("/verify")
def verify_registration(payload: VerifyRegistration) -> JSONResponse:
    db, auth = _clients()
    email = payload.email.strip().lower()
    token = re.sub(r"\s", "", payload.token)
    try:
        response = auth.auth.verify_otp({"email": email, "token": token, "type": "email"})
        auth_user = response.user
        user_id = getattr(auth_user, "id", None)
        confirmed = getattr(auth_user, "email_confirmed_at", None)
        confirmed_email = (getattr(auth_user, "email", None) or "").lower()
        if not user_id or confirmed_email != email or not confirmed:
            raise HTTPException(status_code=401, detail="That code is invalid or expired. Request a new code and try again.")
        result = db.rpc("complete_dhanda_business_registration", {"p_owner_email": email, "p_auth_user_id": user_id}).execute().data
        row = result[0] if isinstance(result, list) and result else result
        if not isinstance(row, dict) or not row.get("business_id"):
            raise HTTPException(status_code=409, detail="Registration expired or could not be completed. Please register again.")
        business = db.table("dhanda_businesses").select("id,business_name,owner_name,owner_email,whatsapp,tagline,registered_at,launch_campaign_id").eq("id", row["business_id"]).single().execute().data
        bonus_tier = None
        if row.get("launch_bonus_id"):
            bonus = db.table("dhanda_promotions").select("tier").eq("id", row["launch_bonus_id"]).maybe_single().execute().data
            bonus_tier = bonus.get("tier") if bonus else None
        user = {
            "id": user_id, "businessId": business["id"], "role": "dhanda_vendor",
            "name": business["owner_name"], "email": business["owner_email"],
            "businessName": business["business_name"],
            "exp": int(datetime.now(timezone.utc).timestamp() * 1000) + 24 * 60 * 60 * 1000,
        }
        session_token = sign_session(user)
        if not session_token:
            raise HTTPException(status_code=503, detail="Session signing is not configured.")
        response = JSONResponse({
            "success": True, "user": user, "business": business,
            "launchBonus": ({"status": "scheduled", "tier": bonus_tier, "startsAt": row.get("reward_starts_at"), "endsAt": row.get("reward_ends_at")} if row.get("launch_bonus_id") else None),
        })
        response.set_cookie("afterclass_session", session_token, httponly=True, secure=get_settings().app_env.lower() == "production", path="/", max_age=24 * 60 * 60, samesite="lax")
        return response
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=502, detail="Email verification failed.") from exc
