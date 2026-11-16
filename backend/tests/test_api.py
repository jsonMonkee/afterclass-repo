import asyncio
import base64
import hashlib
import hmac
import json
import os
import time
from datetime import datetime, timezone
from types import SimpleNamespace
from uuid import uuid4

from httpx import ASGITransport, AsyncClient

os.environ["APP_ENV"] = "development"

from app.core.config import get_settings
from app.main import app


async def request(method: str, path: str, **kwargs):
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        cookies = kwargs.pop("cookies", None)
        if cookies:
            client.cookies.update(cookies)
        return await client.request(method, path, **kwargs)


def test_health_endpoint() -> None:
    response = asyncio.run(request("GET", "/health"))
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_auth_login_session_and_logout() -> None:
    login_response = asyncio.run(request(
        "POST", "/api/v1/auth/login",
        json={"username": "club_turing", "password": "password123"},
    ))
    assert login_response.status_code == 200
    assert login_response.json()["user"]["role"] == "club_lead"
    token = login_response.cookies.get("afterclass_session")
    assert token

    session_response = asyncio.run(request(
        "GET", "/api/v1/auth/session", cookies={"afterclass_session": token},
    ))
    assert session_response.status_code == 200
    assert session_response.json()["authenticated"] is True

    logout_response = asyncio.run(request("POST", "/api/v1/auth/logout"))
    assert logout_response.status_code == 200
    assert "afterclass_session" in logout_response.headers.get("set-cookie", "")


def test_auth_login_rejects_bad_credentials() -> None:
    response = asyncio.run(request(
        "POST", "/api/v1/auth/login",
        json={"username": "club_turing", "password": "bad"},
    ))
    assert response.status_code == 401


def test_hackathon_and_perk_feed_filters() -> None:
    hacks = asyncio.run(request("GET", "/api/v1/opportunities/hackathons?tag=Robotics&search=Flipkart"))
    assert hacks.status_code == 200
    assert hacks.json()["count"] == 1
    assert "Flipkart" in hacks.json()["data"][0]["title"]

    perks = asyncio.run(request("GET", "/api/v1/opportunities/student-perks?category=Developer%20Tools&search=JetBrains"))
    assert perks.status_code == 200
    assert perks.json()["data"][0]["provider"] == "JetBrains"


def test_dhanda_public_reads_and_vendor_write_guard() -> None:
    listings = asyncio.run(request("GET", "/api/v1/dhanda/listings?category=Tech%20%26%20Code"))
    assert listings.status_code == 200
    assert listings.json()["count"] > 0

    promotions = asyncio.run(request("GET", "/api/v1/dhanda/promotions"))
    assert promotions.status_code == 200
    assert "banners" in promotions.json()

    created = asyncio.run(request(
        "POST", "/api/v1/dhanda/listings",
        json={"title": "Test service", "seller": "Test", "category": "Tech & Code", "price": 200},
    ))
    assert created.status_code == 401


def test_business_and_payment_routes_fail_closed_without_credentials() -> None:
    registration = asyncio.run(request(
        "POST", "/api/v1/dhanda/register",
        json={"businessName": "Test Store", "ownerName": "Test Owner", "ownerEmail": "test@example.com", "whatsapp": "919830000000"},
    ))
    assert registration.status_code == 503

    promo = asyncio.run(request(
        "POST", "/api/v1/dhanda/promotions",
        json={"tier": "Homepage Main Banner"},
    ))
    assert promo.status_code == 401

    webhook = asyncio.run(request(
        "POST", "/api/v1/payments/webhook",
        headers={"x-razorpay-signature": "invalid", "x-razorpay-event-id": "test-event"},
        content=b"{}",
    ))
    assert webhook.status_code == 400


def test_club_create_requires_admin_token() -> None:
    response = asyncio.run(request(
        "POST",
        "/api/v1/clubs",
        json={"name": "Test Club", "category": "Technology"},
    ))
    assert response.status_code == 401


def signed_session(payload: dict) -> str:
    settings = get_settings()
    secret = settings.auth_session_secret or "afterclass-local-development-secret-change-before-deploy"
    encoded = base64.urlsafe_b64encode(json.dumps(payload).encode()).decode().rstrip("=")
    signature = hmac.new(secret.encode(), encoded.encode(), hashlib.sha256).digest()
    return f"{encoded}.{base64.urlsafe_b64encode(signature).decode().rstrip('=')}"


def test_club_update_rejects_unsigned_role_payload() -> None:
    response = asyncio.run(request(
        "PATCH",
        "/api/v1/clubs",
        cookies={"afterclass_session": "eyJyb2xlIjoic3VwZXJhZG1pbiJ9"},
        json={"clubId": "turing-club", "openRoles": "Hackers"},
    ))
    assert response.status_code == 401


def test_club_lead_cannot_update_another_club() -> None:
    token = signed_session({
        "role": "club_lead",
        "clubId": "turing-club",
        "exp": int(time.time() * 1000) + 60_000,
    })
    response = asyncio.run(request(
        "PATCH",
        "/api/v1/clubs",
        cookies={"afterclass_session": token},
        json={"clubId": "cadence", "openRoles": "Unauthorized edit"},
    ))
    assert response.status_code == 403


def test_authorized_club_edit_reaches_database_configuration() -> None:
    token = signed_session({
        "role": "club_lead",
        "clubId": "turing-club",
        "exp": int(time.time() * 1000) + 60_000,
    })
    response = asyncio.run(request(
        "PATCH",
        "/api/v1/clubs",
        cookies={"afterclass_session": token},
        json={"clubId": "turing-club", "openRoles": "New roles"},
    ))
    assert response.status_code == 503
    assert "SUPABASE_URL" in response.json()["detail"]


def test_database_diagnostic_is_disabled_by_default() -> None:
    response = asyncio.run(request(
        "POST",
        "/api/v1/diagnostics/db-records",
        headers={"X-Diagnostics-Token": "not-configured"},
        json={"message": "test"},
    ))
    assert response.status_code == 404


class FakeResult:
    def __init__(self, data):
        self.data = data


class FakeQuery:
    def __init__(self, rows: dict):
        self.rows = rows
        self.record = None
        self.record_id = None

    def insert(self, record: dict):
        self.record = {"id": str(uuid4()), "created_at": datetime.now(timezone.utc).isoformat(), **record}
        return self

    def delete(self):
        self.is_delete = True
        return self

    def select(self, _columns: str):
        return self

    def single(self):
        return self

    def maybe_single(self):
        return self

    def eq(self, field: str, value: str):
        if field == "id":
            self.record_id = value
        elif self.record_id is None:
            self.record_id = value
        return self

    def execute(self):
        if getattr(self, "is_delete", False):
            deleted = self.rows.pop(self.record_id, None)
            return FakeResult([deleted] if deleted else [])
        if self.record is not None:
            self.rows[self.record["id"]] = self.record
            return FakeResult(self.record)
        return FakeResult(self.rows.get(self.record_id))


class FakeSupabase:
    def __init__(self):
        self.rows = {}

    def table(self, _name: str):
        return FakeQuery(self.rows)


def test_db_diagnostic_writes_then_reads_back(monkeypatch) -> None:
    import app.core.security as security
    import app.modules.diagnostics.router as diagnostics

    token = "local-diagnostics-token-that-is-at-least-32-characters"
    fake_db = FakeSupabase()
    monkeypatch.setattr(
        security,
        "get_settings",
        lambda: SimpleNamespace(
            app_env="development",
            enable_db_diagnostics=True,
            diagnostics_api_token=token,
        ),
    )
    monkeypatch.setattr(diagnostics, "database", lambda: fake_db)

    created = asyncio.run(request(
        "POST",
        "/api/v1/diagnostics/db-records",
        headers={"X-Diagnostics-Token": token},
        json={"message": "persist me"},
    ))
    assert created.status_code == 201
    record_id = created.json()["data"]["id"]

    read_back = asyncio.run(request(
        "GET",
        f"/api/v1/diagnostics/db-records/{record_id}",
        headers={"X-Diagnostics-Token": token},
    ))
    assert read_back.status_code == 200
    assert read_back.json()["data"]["message"] == "persist me"


def test_admin_can_create_club_record(monkeypatch) -> None:
    import app.core.security as security
    import app.modules.clubs.router as clubs

    token = "local-admin-token-that-is-at-least-32-characters-long"
    fake_db = FakeSupabase()
    monkeypatch.setattr(security, "get_settings", lambda: SimpleNamespace(admin_api_token=token))
    monkeypatch.setattr(clubs, "database", lambda: fake_db)

    response = asyncio.run(request(
        "POST",
        "/api/v1/clubs",
        headers={"X-Admin-Token": token},
        json={
            "campus_id": "auk",
            "name": "API Created Club",
            "category": "Technology",
            "tagline": "Written via FastAPI",
        },
    ))
    assert response.status_code == 201
    assert response.json()["data"]["name"] == "API Created Club"
    assert len(fake_db.rows) == 1


def test_auth_delete_session() -> None:
    response = asyncio.run(request("DELETE", "/api/v1/auth/session"))
    assert response.status_code == 200
    assert "afterclass_session" in response.headers.get("set-cookie", "")


def test_delete_club_requires_admin_or_superadmin(monkeypatch) -> None:
    import app.core.security as security
    import app.modules.clubs.router as clubs

    token = "local-admin-token-that-is-at-least-32-characters-long"
    fake_db = FakeSupabase()
    fake_db.rows["turing-club"] = {"id": "turing-club", "name": "Turing Club"}
    monkeypatch.setattr(security, "get_settings", lambda: SimpleNamespace(admin_api_token=token, auth_session_secret=None, app_env="development"))
    monkeypatch.setattr(clubs, "database", lambda: fake_db)

    # Missing token / session fails with 401
    unauth = asyncio.run(request("DELETE", "/api/v1/clubs/turing-club"))
    assert unauth.status_code == 401

    # With X-Admin-Token succeeds
    auth_resp = asyncio.run(request(
        "DELETE",
        "/api/v1/clubs/turing-club",
        headers={"X-Admin-Token": token},
    ))
    assert auth_resp.status_code == 200
    assert auth_resp.json()["success"] is True
    assert "turing-club" not in fake_db.rows


def test_delete_listing_requires_authentication() -> None:
    unauth = asyncio.run(request("DELETE", "/api/v1/dhanda/listings/some-id"))
    assert unauth.status_code == 401


def test_register_validates_email_and_phone(monkeypatch) -> None:
    import app.modules.dhanda.registrations as reg

    # Mock clients so it doesn't fail on SupabaseNotConfigured
    monkeypatch.setattr(reg, "_clients", lambda: (FakeSupabase(), FakeSupabase()))

    # 1. Invalid phone: 15 digits (the bug reported)
    bad_phone = asyncio.run(request(
        "POST", "/api/v1/dhanda/register",
        json={
            "businessName": "B.Tech CSE Tutoring",
            "ownerName": "Aarav",
            "ownerEmail": "aarav@gmail.com",
            "whatsapp": "919376667890123",
            "tagline": "Full tutoring and notes support",
            "tier": "Homepage Main Banner",
        },
    ))
    assert bad_phone.status_code == 400
    assert "Invalid WhatsApp number" in bad_phone.json()["error"]

    # 2. Invalid phone: 10 digits without 91 country code
    missing_cc = asyncio.run(request(
        "POST", "/api/v1/dhanda/register",
        json={
            "businessName": "B.Tech CSE Tutoring",
            "ownerName": "Aarav",
            "ownerEmail": "aarav@gmail.com",
            "whatsapp": "9376667890",
            "tagline": "Full tutoring and notes support",
            "tier": "Homepage Main Banner",
        },
    ))
    assert missing_cc.status_code == 400
    assert "Invalid WhatsApp number" in missing_cc.json()["error"]

    # 3. Invalid email format
    bad_email = asyncio.run(request(
        "POST", "/api/v1/dhanda/register",
        json={
            "businessName": "B.Tech CSE Tutoring",
            "ownerName": "Aarav",
            "ownerEmail": "not-an-email",
            "whatsapp": "919376667890",
            "tier": "Homepage Main Banner",
        },
    ))
    assert bad_email.status_code == 400
    assert "Invalid email address" in bad_email.json()["error"]
