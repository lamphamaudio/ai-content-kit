from fastapi.testclient import TestClient

from app.api.deps import get_ai_service
from app.main import app
from app.schemas.analysis import ProductAnalysisRequest, ProductAnalysisResponse


class FakeAIService:
    async def analyze_product(self, prompt, payload):
        assert isinstance(payload, ProductAnalysisRequest)
        return ProductAnalysisResponse(
            product_type="Beauty serum",
            target_customer_insight="Office women want fresh-looking skin without a sticky morning routine.",
            main_pain_points=["Dull-looking skin", "Sticky skincare"],
            buying_triggers=["Fast absorption", "Morning-friendly texture"],
            content_angles=["Office morning routine", "Non-sticky texture test"],
            risk_claims=["Avoid trị nám dứt điểm", "Avoid trắng sau 3 ngày", "Avoid hiệu quả 100%"],
            recommended_video_styles=["Routine demo", "Texture close-up"],
            compliance_notes=["Use giúp da trông tươi hơn instead of guaranteed whitening claims"],
        )


def test_analyze_product_returns_structured_response():
    app.dependency_overrides[get_ai_service] = lambda: FakeAIService()
    client = TestClient(app)
    response = client.post(
        "/api/analyze/product",
        json={
            "product_name": "Serum vitamin C sáng da",
            "category": "Làm đẹp",
            "pain_points": "Da xỉn màu",
            "language": "vi",
        },
    )
    app.dependency_overrides.clear()

    assert response.status_code == 200
    data = response.json()
    assert set(data) == {
        "product_type",
        "target_customer_insight",
        "main_pain_points",
        "buying_triggers",
        "content_angles",
        "risk_claims",
        "recommended_video_styles",
        "compliance_notes",
    }
    assert data["product_type"] == "Beauty serum"
    assert "Avoid trắng sau 3 ngày" in data["risk_claims"]
