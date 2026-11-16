from fastapi import APIRouter, Depends, Header, HTTPException, Query, Request, status
from supabase import Client

from app.core.security import require_admin_token, require_session, session_from_request
from app.core.supabase import SupabaseNotConfigured, get_supabase_client
from app.modules.clubs import service
from app.modules.clubs.schemas import ClubCreate, ClubUpdate

router = APIRouter(prefix="/clubs", tags=["clubs"])


def database() -> Client:
    try:
        return get_supabase_client()
    except SupabaseNotConfigured as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc


@router.get("")
def get_clubs(campus_id: str = Query(default="auk", max_length=20)) -> dict:
    try:
        rows = service.list_clubs(database(), campus_id)
        return {"success": True, "count": len(rows), "data": rows}
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=502, detail="Could not read clubs from Supabase.") from exc


@router.post("", status_code=status.HTTP_201_CREATED, dependencies=[Depends(require_admin_token)])
def post_club(payload: ClubCreate) -> dict:
    try:
        row = service.create_club(database(), payload.model_dump())
        return {"success": True, "data": row}
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=502, detail="Could not write club to Supabase.") from exc


@router.patch("")
def patch_club(payload: ClubUpdate, request: Request) -> dict:
    user = require_session(request)
    club_id = payload.clubId
    if user.get("role") not in {"club_lead", "superadmin"}:
        raise HTTPException(status_code=403, detail="Only club leads and superadmins can edit clubs.")
    if user.get("role") != "superadmin" and user.get("clubId") != club_id:
        raise HTTPException(status_code=403, detail="You do not have permission to manage this club.")
    changes = payload.model_dump(exclude_unset=True, exclude={"clubId"})
    changes = {key: value.strip() if isinstance(value, str) else value for key, value in changes.items()}
    try:
        club = service.update_club(database(), "auk", club_id, changes)
        if not club:
            raise HTTPException(status_code=404, detail=f"Club {club_id} not found.")
        return {"success": True, "message": f"{club['name']} updated successfully.", "data": club}
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=502, detail="Club update failed.") from exc


@router.delete("/{club_id}")
def delete_club(
    club_id: str,
    request: Request,
    campus_id: str = Query(default="auk", max_length=20),
    x_admin_token: str | None = Header(default=None),
) -> dict:
    user = session_from_request(request)
    is_superadmin = user and user.get("role") == "superadmin"
    if not is_superadmin:
        require_admin_token(x_admin_token)
    try:
        deleted = service.delete_club(database(), campus_id, club_id)
        if not deleted:
            raise HTTPException(status_code=404, detail=f"Club {club_id} not found.")
        return {"success": True, "message": f"Club {club_id} deleted successfully."}
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=502, detail="Club deletion failed.") from exc
