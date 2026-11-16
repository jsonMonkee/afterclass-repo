from uuid import uuid4

from supabase import Client


def list_clubs(client: Client, campus_id: str) -> list[dict]:
    result = (
        client.table("clubs")
        .select("*")
        .eq("campus_id", campus_id)
        .order("name")
        .execute()
    )
    return result.data or []


def create_club(client: Client, values: dict) -> dict:
    row = {"id": f"club-{uuid4().hex}", **values}
    result = (
        client.table("clubs")
        .insert(row)
        .select("*")
        .single()
        .execute()
    )
    return result.data


def update_club(client: Client, campus_id: str, club_id: str, changes: dict) -> dict | None:
    result = (
        client.table("clubs")
        .update(changes)
        .eq("id", club_id)
        .eq("campus_id", campus_id)
        .select("*")
        .maybe_single()
        .execute()
    )
    return result.data


def delete_club(client: Client, campus_id: str, club_id: str) -> bool:
    result = (
        client.table("clubs")
        .delete()
        .eq("id", club_id)
        .eq("campus_id", campus_id)
        .select("id")
        .execute()
    )
    return bool(result.data)
