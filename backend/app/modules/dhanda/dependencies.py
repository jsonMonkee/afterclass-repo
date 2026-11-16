from fastapi import HTTPException
from supabase import Client

from app.core.supabase import SupabaseNotConfigured, get_supabase_client


def database(error_message: str = "Database is not configured.") -> Client:
    try:
        return get_supabase_client()
    except SupabaseNotConfigured as exc:
        raise HTTPException(status_code=503, detail=error_message) from exc
