from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, Field


class DbCheckCreate(BaseModel):
    message: str = Field(min_length=1, max_length=500)


class DbCheckResponse(BaseModel):
    id: UUID
    message: str
    created_at: datetime
