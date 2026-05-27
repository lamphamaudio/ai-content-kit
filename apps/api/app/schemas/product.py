from pydantic import BaseModel


class ProductCreate(BaseModel):
    product_name: str
    category: str
    price: str | None = None
    target_audience: str | None = None
    key_benefits: str | None = None
    pain_points: str | None = None
    usp: str | None = None
    competitor_or_alternative: str | None = None
    selling_intensity: str = "balanced"
    platform: str = "tiktok"
    duration_seconds: int | None = None
    cta: str | None = None
    compliance_notes: str | None = None
    language: str = "vi"
    tone: str = "friendly"


class ProductResponse(ProductCreate):
    id: str
