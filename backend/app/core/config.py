from functools import lru_cache
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Afterclass API"
    app_env: str = "production"
    api_prefix: str = "/api/v1"
    frontend_origin: str = "http://localhost:3000"
    supabase_url: str | None = None
    supabase_secret_key: str | None = None
    supabase_service_role_key: str | None = None
    supabase_publishable_key: str | None = None
    supabase_anon_key: str | None = None
    auth_session_secret: str | None = None
    admin_api_token: str | None = None
    enable_db_diagnostics: bool = False
    diagnostics_api_token: str | None = None
    afterclass_enable_demo_accounts: bool = False
    razorpay_key_id: str | None = None
    razorpay_key_secret: str | None = None
    razorpay_webhook_secret: str | None = None
    razorpay_public_key_id: str | None = None
    supabase_storage_bucket: str = "afterclass-images"

    model_config = SettingsConfigDict(
        env_file=Path(__file__).resolve().parents[2] / ".env",
        env_file_encoding="utf-8",
        env_prefix="",
        extra="ignore",
    )


@lru_cache
def get_settings() -> Settings:
    return Settings()
