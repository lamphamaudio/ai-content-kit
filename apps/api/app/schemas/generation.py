from pydantic import BaseModel

from app.schemas.product import ProductCreate


class GenerateRequest(ProductCreate):
    user_id: str = "local-demo-user"
    product_id: str | None = None
    prompt_version: str = "v1"


class GeneratedItem(BaseModel):
    id: str
    content: str
    kind: str


class GenerateResponse(BaseModel):
    type: str
    prompt_version: str
    items: list[GeneratedItem]

