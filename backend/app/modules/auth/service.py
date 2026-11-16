from app.core.config import get_settings
from app.core.security import sign_session

DEMO_ACCOUNTS = {
    "club_turing": {
        "password": "password123", "role": "club_lead", "name": "Turing Club Lead",
        "clubId": "turing-club", "clubName": "Amity Turing Club", "email": "lead.turing@amity.edu",
    },
    "club_cadence": {
        "password": "password123", "role": "club_lead", "name": "Cadence Music Lead",
        "clubId": "cadence", "clubName": "Cadence — The Music Society", "email": "lead.cadence@amity.edu",
    },
    "vendor_ananya": {
        "password": "password123", "role": "dhanda_vendor", "name": "Ananya S. (Crumb Theory)",
        "businessName": "The Crumb Theory Bakery", "email": "ananya.crumb@amity.edu",
    },
    "superadmin": {
        "password": "wyrcan_superadmin_2026", "role": "superadmin",
        "name": "Wyrcan Platform Engineer", "email": "dev@wyrcan.io",
    },
}


def authenticate(username: str, password: str) -> tuple[dict, str] | None:
    settings = get_settings()
    if settings.app_env.lower() == "production" and not settings.afterclass_enable_demo_accounts:
        return None
    account = DEMO_ACCOUNTS.get(username.strip().lower())
    if not account or account["password"] != password:
        return None
    user = {key: value for key, value in account.items() if key != "password"}
    user.setdefault("clubId", None)
    user.setdefault("clubName", None)
    user.setdefault("businessName", None)
    user["username"] = username.strip().lower()
    user["exp"] = int(__import__("time").time() * 1000) + 24 * 60 * 60 * 1000
    token = sign_session(user)
    return (user, token) if token else None
