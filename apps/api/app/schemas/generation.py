from pydantic import BaseModel

from app.schemas.analysis import ProductAnalysisResponse
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


class ContentKitRequest(GenerateRequest):
    pass


class AngleItem(BaseModel):
    id: str
    title: str
    description: str
    target_pain_point: str | None = None


class HookItem(BaseModel):
    id: str
    content: str
    style: str | None = None


class ScriptItem(BaseModel):
    id: str
    duration_seconds: int
    title: str
    hook: str
    voiceover: str
    shot_list: list[str]
    text_overlays: list[str]
    cta: str


class CaptionItem(BaseModel):
    id: str
    content: str
    tone: str | None = None


class CalendarItem(BaseModel):
    id: str
    day: int
    content_type: str
    idea: str
    hook: str
    cta: str


class ContentKitResponse(BaseModel):
    type: str = "content-kit"
    prompt_version: str
    analysis: ProductAnalysisResponse | None = None
    product_summary: str
    angles: list[AngleItem]
    hooks: list[HookItem]
    scripts: list[ScriptItem]
    captions: list[CaptionItem]
    hashtags: list[str]
    ctas: list[str]
    calendar: list[CalendarItem]
    raw_items: list[GeneratedItem] | None = None
