from datetime import datetime, timezone

from fastapi import APIRouter, Query

from app.modules.opportunities import service

router = APIRouter(prefix="/opportunities", tags=["opportunities"])


@router.get("/hackathons")
def get_hackathons(
    tag: str | None = None,
    mode: str | None = None,
    platform: str | None = None,
    search: str | None = None,
) -> dict:
    rows = service.hackathons(tag=tag, mode=mode, platform=platform, search=search)
    return {
        "success": True,
        "count": len(rows),
        "tags": service.HACKATHONS["tags"],
        "data": rows,
        "meta": {
            "sources": ["Unstop API Feed", "Devfolio Collegiate", "MLH Eastern Circuit"],
            "lastScraped": datetime.now(timezone.utc).isoformat(),
        },
    }


@router.get("/student-perks")
def get_student_perks(
    category: str | None = None,
    search: str | None = None,
    verificationType: str | None = Query(default=None),
    featured: bool = False,
) -> dict:
    rows = service.student_perks(category=category, search=search, verification_type=verificationType, featured=featured)
    return {
        "success": True,
        "count": len(rows),
        "categories": service.STUDENT_PERKS["categories"],
        "data": rows,
        "meta": {
            "engine": "Resourceify Scraper v2.1",
            "lastScraped": datetime.now(timezone.utc).isoformat(),
            "verifiedInstitution": "Amity University Kolkata (.edu / student card)",
        },
    }
