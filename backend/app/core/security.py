import base64
import hashlib
import hmac
import json
import secrets
import time
from typing import Any

from fastapi import Header, HTTPException, Request, status

from app.core.config import get_settings


def sign_session(payload: dict[str, Any]) -> str | None:
    settings = get_settings()
    secret = settings.auth_session_secret
    if not secret and settings.app_env.lower() != "production":
        secret = "afterclass-local-development-secret-change-before-deploy"
    if not secret or len(secret) < 32:
        return None
    encoded = base64.urlsafe_b64encode(
        json.dumps(payload, separators=(",", ":")).encode()
    ).decode().rstrip("=")
    signature = hmac.new(secret.encode(), encoded.encode(), hashlib.sha256).digest()
    return f"{encoded}.{base64.urlsafe_b64encode(signature).decode().rstrip('=')}"


def session_from_request(request: Request) -> dict | None:
    token = request.cookies.get("afterclass_session")
    authorization = request.headers.get("authorization", "")
    if not token and authorization.startswith("Bearer "):
        token = authorization[7:]
    settings = get_settings()
    secret = settings.auth_session_secret
    if not secret and settings.app_env.lower() != "production":
        secret = "afterclass-local-development-secret-change-before-deploy"
    if (
        not secret
        or len(secret) < 32
        or secret == "replace_with_a_long_random_secret"
        or not token
        or token.count(".") != 1
    ):
        return None
    encoded, signature = token.split(".", 1)
    expected = hmac.new(secret.encode(), encoded.encode(), hashlib.sha256).digest()
    try:
        actual = base64.urlsafe_b64decode(signature + "=" * (-len(signature) % 4))
        if not hmac.compare_digest(expected, actual):
            return None
        payload = json.loads(base64.urlsafe_b64decode(encoded + "=" * (-len(encoded) % 4)))
    except (ValueError, TypeError, json.JSONDecodeError):
        return None
    if (
        not isinstance(payload, dict)
        or not isinstance(payload.get("role"), str)
        or not isinstance(payload.get("exp"), (int, float))
        or payload["exp"] <= time.time() * 1000
    ):
        return None
    return payload


def require_admin_token(x_admin_token: str | None = Header(default=None)) -> None:
    expected = get_settings().admin_api_token
    if (
        not expected
        or len(expected) < 32
        or expected == "replace_with_a_long_random_token"
        or not x_admin_token
        or not secrets.compare_digest(x_admin_token, expected)
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="A valid X-Admin-Token is required.",
        )


def require_session(request: Request) -> dict:
    user = session_from_request(request)
    if not user:
        raise HTTPException(status_code=401, detail="Please sign in.")
    return user


def require_diagnostics_token(x_diagnostics_token: str | None = Header(default=None)) -> None:
    settings = get_settings()
    if settings.app_env.lower() == "production" or not settings.enable_db_diagnostics:
        raise HTTPException(status_code=404, detail="Not found.")
    expected = settings.diagnostics_api_token
    if (
        not expected
        or len(expected) < 32
        or expected == "replace_with_a_different_long_random_token"
        or not x_diagnostics_token
        or not secrets.compare_digest(x_diagnostics_token, expected)
    ):
        raise HTTPException(status_code=401, detail="A valid X-Diagnostics-Token is required.")
