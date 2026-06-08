from fastapi.testclient import TestClient

from app.api.deps import get_ai_service
from app.main import app
from app.schemas.analysis import ProductAnalysisResponse
from app.schemas.generation import ContentKitResponse


class FakeAIService:
    async def analyze_product(self, prompt, payload):
        return ProductAnalysisResponse(
            product_type="Beauty serum",
            target_customer_insight="Office workers want brighter-looking skin without a sticky morning routine.",
            main_pain_points=["Dull-looking skin"],
            buying_triggers=["Light texture", "Easy morning use"],
            content_angles=["Morning office routine"],
            risk_claims=["Avoid guaranteed whitening claims"],
            recommended_video_styles=["Routine demo"],
            compliance_notes=["Use cautious skincare phrasing"],
        )

    async def generate_content_kit(self, prompt, payload, prompt_version):
        return ContentKitResponse(
            prompt_version=prompt_version,
            product_summary="Demo product summary",
            angles=[{"id": "angle-1", "title": "Problem angle", "description": "Show the buyer pain point", "target_pain_point": "Low trust"}],
            hooks=[{"id": "hook-1", "content": "Stop scrolling if you sell this product.", "style": "curiosity"}],
            scripts=[{
                "id": "script-1",
                "duration_seconds": 30,
                "title": "Quick demo",
                "hook": "Need this solved fast?",
                "voiceover": "Show the product, benefit, proof, and CTA.",
                "shot_list": ["Show product", "Show result"],
                "text_overlays": ["Fast demo", "Order today"],
                "cta": "Tap to buy"
            }],
            captions=[{"id": "caption-1", "content": "Save this before you shop.", "tone": "friendly"}],
            hashtags=["#tiktokshop", "#affiliate"],
            ctas=["Tap to buy"],
            calendar=[{"id": "day-1", "day": 1, "content_type": "demo", "idea": "Show product use", "hook": "Try this", "cta": "Buy now"}],
        )


def test_generate_content_kit_returns_structured_response():
    app.dependency_overrides[get_ai_service] = lambda: FakeAIService()
    client = TestClient(app)
    response = client.post(
        "/api/generate/content-kit",
        json={"product_name": "Serum vitamin C", "category": "beauty"},
    )
    app.dependency_overrides.clear()

    assert response.status_code == 200
    data = response.json()
    assert data["type"] == "content-kit"
    assert data["analysis"]["product_type"] == "Beauty serum"
    assert data["analysis"]["risk_claims"] == ["Avoid guaranteed whitening claims"]
    assert data["analysis"]["recommended_video_styles"] == ["Routine demo"]
    assert data["hooks"][0]["id"] == "hook-1"
    assert data["calendar"][0]["day"] == 1
