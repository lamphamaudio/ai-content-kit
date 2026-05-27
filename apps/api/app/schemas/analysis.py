from pydantic import BaseModel

from app.schemas.product import ProductCreate


class ProductAnalysisRequest(ProductCreate):
    user_id: str = "local-demo-user"
    product_id: str | None = None
    prompt_version: str = "v1"


class ProductAnalysisResponse(BaseModel):
    product_type: str
    target_customer_insight: str
    main_pain_points: list[str]
    buying_triggers: list[str]
    content_angles: list[str]
    risk_claims: list[str]
    recommended_video_styles: list[str]
    compliance_notes: list[str] | None = None
