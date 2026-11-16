from fastapi import APIRouter, Depends, HTTPException
from supabase import Client
from uuid import UUID

from app.core.security import require_diagnostics_token
from app.core.supabase import SupabaseNotConfigured, get_supabase_client
from app.modules.diagnostics.schemas import DbCheckCreate

router = APIRouter(
    prefix="/diagnostics/db-records",
    tags=["development diagnostics"],
    dependencies=[Depends(require_diagnostics_token)],
)


def database() -> Client:
    try:
        return get_supabase_client()
    except SupabaseNotConfigured as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc


@router.post("", status_code=201)
def create_db_record(payload: DbCheckCreate) -> dict:
    """Write a small marker row to verify the configured DB connection."""
    try:
        result = (
            database()
            .table("api_smoke_test_records")
            .insert({"message": payload.message})
            .select("id,message,created_at")
            .single()
            .execute()
        )
        return {"success": True, "data": result.data}
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=502, detail="Supabase write failed.") from exc


@router.get("/{record_id}")
def read_db_record(record_id: UUID) -> dict:
    """Read the same marker row back to prove it persisted."""
    try:
        result = (
            database()
            .table("api_smoke_test_records")
            .select("id,message,created_at")
            .eq("id", str(record_id))
            .maybe_single()
            .execute()
        )
        if not result.data:
            raise HTTPException(status_code=404, detail="Record not found.")
        return {"success": True, "data": result.data}
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=502, detail="Supabase read failed.") from exc
