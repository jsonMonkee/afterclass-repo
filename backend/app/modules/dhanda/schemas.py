from pydantic import BaseModel, Field


class ListingCreate(BaseModel):
    title: str = Field(min_length=2, max_length=140)
    seller: str | None = Field(default=None, max_length=100)
    semester: str | None = Field(default=None, max_length=80)
    category: str = Field(min_length=2, max_length=80)
    price: float = Field(ge=0, le=1_000_000)
    priceUnit: str | None = Field(default=None, max_length=80)
    turnaround: str | None = Field(default=None, max_length=80)
    description: str | None = Field(default=None, max_length=1500)
    contactNumber: str | None = Field(default=None, max_length=30)
    tags: list[str] | str | None = None
    imageUrl: str | None = Field(default=None, max_length=2000)
    escrowShield: bool = True
    instantDigitalDownload: bool = False


class BusinessUpdate(BaseModel):
    tagline: str | None = Field(default=None, max_length=240)
    imageUrl: str | None = Field(default=None, max_length=2000)


class BusinessRegistration(BaseModel):
    businessName: str = Field(min_length=2, max_length=120)
    ownerName: str = Field(min_length=2, max_length=100)
    ownerEmail: str = Field(min_length=5, max_length=254)
    whatsapp: str = Field(min_length=10, max_length=30)
    tagline: str | None = Field(default=None, max_length=240)
    tier: str = "Homepage Main Banner"
    category: str | None = Field(default=None, max_length=80)


class VerifyRegistration(BaseModel):
    email: str = Field(min_length=5, max_length=254)
    token: str = Field(min_length=6, max_length=10)


class PromotionCreate(BaseModel):
    tier: str
    category: str | None = Field(default=None, max_length=80)
    tagline: str | None = Field(default=None, max_length=240)
    imageUrl: str | None = Field(default=None, max_length=2000)


class PromotionVerify(BaseModel):
    razorpay_order_id: str = Field(min_length=1, max_length=100)
    razorpay_payment_id: str = Field(min_length=1, max_length=100)
    razorpay_signature: str = Field(min_length=1, max_length=200)
