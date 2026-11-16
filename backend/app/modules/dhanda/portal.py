from fastapi import APIRouter, HTTPException, Request

from app.core.security import session_from_request
from app.modules.dhanda import repository
from app.modules.dhanda.dependencies import database

router = APIRouter(prefix="/dhanda/portal", tags=["dhanda businesses"])


@router.get("")
def get_portal(request: Request) -> dict:
    user = session_from_request(request)
    if not user or user.get("role") != "dhanda_vendor" or not user.get("businessId") or not user.get("id"):
        raise HTTPException(status_code=401, detail="Business sign-in required.")
    db = database("Business database is not configured.")
    try:
        result = repository.business_portal(db, user["businessId"], user["id"])
        if not result or not result.get("business"):
            raise HTTPException(status_code=500, detail="Could not load your business portal.")
        return {"success": True, **result}
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=502, detail="Could not load your business portal.") from exc
