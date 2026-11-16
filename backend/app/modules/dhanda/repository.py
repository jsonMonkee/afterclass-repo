from datetime import datetime, timezone

from supabase import Client


def active_listings(client: Client, campus_id: str = "auk") -> list[dict]:
    return client.table("dhanda_listings").select("*").eq("campus_id", campus_id).eq("status", "active").order("created_at", desc=True).execute().data or []


def get_listing(client: Client, listing_id: str) -> dict | None:
    return client.table("dhanda_listings").select("*").eq("id", listing_id).maybe_single().execute().data


def delete_listing(client: Client, listing_id: str) -> bool:
    result = client.table("dhanda_listings").delete().eq("id", listing_id).select("id").execute()
    return bool(result.data)


def get_business(client: Client, business_id: str, auth_user_id: str, verified: bool = True) -> dict | None:
    query = client.table("dhanda_businesses").select("*").eq("id", business_id).eq("auth_user_id", auth_user_id)
    if verified:
        query = query.not_.is_("email_verified_at", "null")
    return query.maybe_single().execute().data


def create_listing(client: Client, values: dict) -> dict:
    return client.table("dhanda_listings").insert(values).select("*").single().execute().data


def update_business(client: Client, business_id: str, auth_user_id: str, updates: dict) -> dict | None:
    return client.table("dhanda_businesses").update(updates).eq("id", business_id).eq("auth_user_id", auth_user_id).select("id,business_name,owner_name,owner_email,whatsapp,tagline,image_url").maybe_single().execute().data


def business_portal(client: Client, business_id: str, auth_user_id: str) -> dict | None:
    business = client.table("dhanda_businesses").select("id,business_name,owner_name,owner_email,whatsapp,tagline,image_url,registered_at").eq("id", business_id).eq("auth_user_id", auth_user_id).single().execute().data
    listings = client.table("dhanda_listings").select("*").eq("business_id", business_id).order("created_at", desc=True).execute().data or []
    promotions = client.table("dhanda_promotions").select("*").eq("business_id", business_id).order("created_at", desc=True).execute().data or []
    return {"business": business, "listings": listings, "promotions": promotions}


def current_promotions(client: Client, campus_id: str = "auk") -> list[dict]:
    now = datetime.now(timezone.utc).isoformat()
    client.table("dhanda_promotions").update({"status": "active", "updated_at": now}).eq("status", "scheduled").lte("starts_at", now).gt("ends_at", now).execute()
    client.table("dhanda_promotions").update({"status": "expired", "updated_at": now}).in_("status", ["active", "scheduled"]).lte("ends_at", now).execute()
    return client.table("dhanda_promotions").select("*").eq("campus_id", campus_id).eq("status", "active").lte("starts_at", now).gt("ends_at", now).order("created_at", desc=True).execute().data or []
