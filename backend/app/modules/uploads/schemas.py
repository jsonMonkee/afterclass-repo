from pydantic import BaseModel, Field


class UploadSignRequest(BaseModel):
    scope: str = Field(min_length=1, max_length=20)
    fileType: str = Field(min_length=1, max_length=100)
    fileSize: int = Field(gt=0, le=10 * 1024 * 1024)
