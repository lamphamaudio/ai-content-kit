from fastapi.testclient import TestClient

from app.api.deps import get_ai_service
from app.main import app
from app.schemas.analysis import ProductAnalysisResponse


class FakeAIService:
    async def analyze_product(self, prompt, payload):
        return ProductAnalysisResponse(
            product_type="Beauty serum",
            target_customer_insight="Office women want fresh-looking skin without a sticky morning routine.",
            main_pain_points=["Dull-looking skin", "Sticky skincare"],
            buying_triggers=["Fast absorption", "Morning-friendly texture"],
            content_angles=["Office morning routine", "Non-sticky texture test"],
            risk_claims=["Avoid tri nam dut diem", "Avoid trang sau 3 ngay", "Avoid hieu qua 100%"],
            recommended_video_styles=["Routine demo", "Texture close-up"],
            compliance_notes=["Use cautious skincare phrasing instead of guaranteed whitening claims"],
        )


def test_analyze_product_response_shape():
    app.dependency_overrides[get_ai_service] = lambda: FakeAIService()
    client = TestClient(app)
    response = client.post(
        "/api/analyze/product",
        json={
            "product_name": "Serum vitamin C sang da",
            "category": "Lam dep",
            "pain_points": "Da xin mau",
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
    assert isinstance(data["main_pain_points"], list)
    assert isinstance(data["buying_triggers"], list)
    assert isinstance(data["content_angles"], list)
    assert isinstance(data["risk_claims"], list)
    assert isinstance(data["recommended_video_styles"], list)
    assert isinstance(data["compliance_notes"], list)
    assert "Avoid trang sau 3 ngay" in data["risk_claims"]
