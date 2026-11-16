from pydantic import BaseModel, Field


class ClubCreate(BaseModel):
    campus_id: str = Field(default="auk", min_length=1, max_length=20)
    name: str = Field(min_length=2, max_length=150)
    category: str = Field(min_length=2, max_length=80)
    tagline: str | None = Field(default=None, max_length=300)
    description: str | None = Field(default=None, max_length=4000)


class ClubResponse(BaseModel):
    id: str
    campus_id: str
    name: str
    category: str
    tagline: str | None = None
    description: str | None = None


class ClubUpdate(BaseModel):
    clubId: str = Field(min_length=1, max_length=50)
    openRoles: str | None = Field(default=None, max_length=240)
    recruitmentStatus: str | None = Field(default=None, max_length=80)
    description: str | None = Field(default=None, max_length=2000)
    tagline: str | None = Field(default=None, max_length=200)
    image: str | None = Field(default=None, max_length=2000)
