from pydantic import BaseModel


class ProductCreate(BaseModel):
    product_name: str
    category: str
    price: str | None = None
    target_audience: str | None = None
    key_benefits: str | None = None
    tone: str = "friendly"


class ProductResponse(ProductCreate):
    id: str

