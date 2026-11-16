import json
from pathlib import Path

DATA_DIR = Path(__file__).parent / "data"
HACKATHONS = json.loads((DATA_DIR / "hackathons.json").read_text(encoding="utf-8"))
STUDENT_PERKS = json.loads((DATA_DIR / "student_perks.json").read_text(encoding="utf-8"))


def hackathons(*, tag=None, mode=None, platform=None, search=None) -> list[dict]:
    rows = list(HACKATHONS["items"])
    if tag and tag != "All":
        rows = [row for row in rows if any(item.lower() == tag.lower() for item in row.get("tags", []))]
    if mode:
        rows = [row for row in rows if mode.lower() in row.get("mode", "").lower()]
    if platform:
        rows = [row for row in rows if row.get("platform", "").lower() == platform.lower()]
    if search:
        q = search.lower()
        rows = [row for row in rows if any(q in str(row.get(key, "")).lower() for key in ("title", "organizer", "description")) or any(q in tag.lower() for tag in row.get("tags", []))]
    return rows


def student_perks(*, category=None, search=None, verification_type=None, featured=False) -> list[dict]:
    rows = list(STUDENT_PERKS["items"])
    if category and category != "All":
        rows = [row for row in rows if row.get("category", "").lower() == category.lower()]
    if verification_type:
        rows = [row for row in rows if verification_type.lower() in row.get("verificationType", "").lower()]
    if featured:
        rows = [row for row in rows if row.get("featured")]
    if search:
        q = search.lower()
        rows = [row for row in rows if any(q in str(row.get(key, "")).lower() for key in ("title", "provider", "description")) or any(q in highlight.lower() for highlight in row.get("highlights", []))]
    return rows
