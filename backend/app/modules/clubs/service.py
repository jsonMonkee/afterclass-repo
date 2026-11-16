from datetime import datetime, timezone

from supabase import Client

from app.modules.clubs import repository


def to_api_club(row: dict) -> dict:
    return {
        **row,
        "openRoles": row.get("open_roles"),
        "membersCount": row.get("members_count", 0),
        "activeEvents": row.get("active_events", 0),
        "recruitmentStatus": row.get("recruitment_status"),
        "lastUpdated": row.get("last_updated"),
    }


def list_clubs(client: Client, campus_id: str) -> list[dict]:
    return [to_api_club(row) for row in repository.list_clubs(client, campus_id)]


def create_club(client: Client, values: dict) -> dict:
    normalized = {**values, "name": values["name"].strip(), "category": values["category"].strip()}
    return to_api_club(repository.create_club(client, normalized))


def update_club(client: Client, campus_id: str, club_id: str, changes: dict) -> dict | None:
    fields = {
        "openRoles": "open_roles",
        "recruitmentStatus": "recruitment_status",
        "description": "description",
        "tagline": "tagline",
        "image": "image",
    }
    normalized = {fields[key]: value for key, value in changes.items() if key in fields}
    normalized["last_updated"] = datetime.now(timezone.utc).isoformat()
    return (
        to_api_club(row)
        if (row := repository.update_club(client, campus_id, club_id, normalized))
        else None
    )


def delete_club(client: Client, campus_id: str, club_id: str) -> bool:
    return repository.delete_club(client, campus_id, club_id)
