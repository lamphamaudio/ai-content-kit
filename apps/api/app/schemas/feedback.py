from pydantic import BaseModel


class FeedbackRequest(BaseModel):
    generated_item_id: str | None = None
    rating: int
    comment: str | None = None


class FeedbackResponse(BaseModel):
    ok: bool

