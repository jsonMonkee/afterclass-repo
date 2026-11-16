import json
from pathlib import Path

from app.core.config import get_settings

FIXTURES = json.loads((Path(__file__).parent / "data" / "fixtures.json").read_text(encoding="utf-8"))
VALID_CATEGORIES = set(FIXTURES["categories"][1:])
PRICES = {
    "Homepage Main Banner": {"amount": 29900, "label": "₹299/week"},
    "Category Spotlight": {"amount": 14900, "label": "₹149/week"},
}


def from_database_listing(row: dict) -> dict:
    return {
        "id": row["id"], "title": row["title"], "seller": row["seller_name"],
        "semester": row.get("semester") or "Amity Student", "category": row["category"],
        "price": float(row["price"]), "priceUnit": row.get("price_unit") or "per service",
        "turnaround": row.get("turnaround") or "24-48 Hours", "rating": float(row.get("rating") or 5),
        "reviewsCount": row.get("reviews_count") or 0, "badge": row.get("badge") or "CAMPUS LISTING",
        "description": row.get("description") or "", "tags": row.get("tags") or [],
        "imageUrl": row.get("image_url"), "verifiedAmityEmail": row.get("verified_student", False),
        "escrowShield": row.get("escrow_shield", True),
        "instantDigitalDownload": row.get("instant_digital_download", False),
        "contactNumber": row.get("contact_number"), "completedOrders": row.get("completed_orders", 0),
    }


def filter_listings(rows: list[dict], category: str | None, search: str | None, escrow_only: bool) -> list[dict]:
    result = list(rows)
    if category and category != "All":
        result = [item for item in result if item.get("category", "").lower() == category.lower()]
    if escrow_only:
        result = [item for item in result if item.get("escrowShield")]
    if search:
        q = search.lower()
        result = [item for item in result if q in item.get("title", "").lower() or q in item.get("seller", "").lower() or q in item.get("description", "").lower() or any(q in tag.lower() for tag in item.get("tags", []))]
    return result


def configured_or_development_fixture() -> bool:
    return get_settings().app_env.lower() != "production"


def to_banner(row: dict) -> dict:
    return {
        "id": row["id"], "businessName": row["business_name"], "owner": row["owner_name"],
        "tagline": row.get("tagline") or "Student-run campus business on Afterclass.",
        "badge": "LAUNCH OFFER" if row.get("is_launch_bonus") else "SPONSORED SPOTLIGHT",
        "ctaText": "Order on WhatsApp", "whatsapp": row["whatsapp"],
        "discountCode": row.get("discount_code") or "AFTERCLASS",
        "image": row.get("image_url") or "https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1200&q=80",
        "verifiedStudent": True,
        "weeklySlot": "Category Pinned" if row["tier"] == "Category Spotlight" else "Main Homepage & Dhanda Header",
        "pricePaid": "Launch offer" if row.get("amount_paise") == 0 else ("₹149/week" if row["tier"] == "Category Spotlight" else "₹299/week"),
    }
