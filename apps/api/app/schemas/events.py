from pydantic import BaseModel


class CopyEventRequest(BaseModel):
    generated_item_id: str
    product_id: str | None = None
    generation_id: str | None = None
    content_type: str


class EventResponse(BaseModel):
    ok: bool

