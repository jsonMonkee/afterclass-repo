from functools import lru_cache

from supabase import Client, create_client

from app.core.config import get_settings


class SupabaseNotConfigured(RuntimeError):
    """Raised when a database-backed endpoint is used before configuration."""


@lru_cache
def get_supabase_client() -> Client:
    settings = get_settings()
    secret_key = settings.supabase_secret_key or settings.supabase_service_role_key
    if not settings.supabase_url or not secret_key:
        raise SupabaseNotConfigured(
            "Set SUPABASE_URL and SUPABASE_SECRET_KEY in backend/.env."
        )
    return create_client(settings.supabase_url, secret_key)


@lru_cache
def get_supabase_auth_client() -> Client:
    settings = get_settings()
    key = settings.supabase_publishable_key or settings.supabase_anon_key
    if not settings.supabase_url or not key:
        raise SupabaseNotConfigured(
            "Set SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY in backend/.env."
        )
    return create_client(settings.supabase_url, key)
