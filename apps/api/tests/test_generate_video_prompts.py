from fastapi.testclient import TestClient

from app.api.deps import get_ai_service
from app.main import app
from app.schemas.analysis import ProductAnalysisResponse
from app.schemas.video_prompt import VideoBrief, VideoPromptResponse


class FakeAIService:
    async def analyze_product(self, prompt, payload):
        return ProductAnalysisResponse(
            product_type="Beauty serum",
            target_customer_insight="Office workers want fresh-looking skin without sticky skincare.",
            main_pain_points=["Dull-looking skin"],
            buying_triggers=["Fast absorption"],
            content_angles=["Morning routine demo"],
            risk_claims=["Avoid guaranteed whitening claims"],
            recommended_video_styles=["UGC review"],
            compliance_notes=["Use cautious skincare phrasing"],
        )

    async def generate_video_prompts(self, prompt, payload, prompt_version):
        return VideoPromptResponse(
            prompt_version=prompt_version,
            video_brief=VideoBrief(
                goal="affiliate conversion",
                platform="tiktok",
                duration_seconds=30,
                style="UGC review",
                aspect_ratio="9:16",
            ),
            shot_list=[
                {
                    "time": "0-3s",
                    "scene": "Show the serum bottle on a desk",
                    "camera": "Close-up",
                    "motion": "Slow push-in",
                    "text_overlay": "Da xỉn màu?",
                    "visual_notes": "Product label visible",
                }
            ],
            voiceover="Nếu da bạn nhìn mệt vào buổi sáng, thử routine nhẹ này.",
            text_overlays=["Da xỉn màu?", "Texture thấm nhanh"],
            kling_prompt="Realistic Vietnamese UGC product demo, vertical 9:16.",
            pika_prompt="Short viral product motion with clear serum bottle.",
            runway_prompt="Cinematic skincare product ad with soft morning light.",
            capcut_brief="Cut 3 scenes, add Vietnamese overlays, keep product visible, label AI-generated visuals if used.",
            negative_prompt="No distorted hands, no unreadable text, no exaggerated whitening claims.",
            caption="Routine nhẹ cho buổi sáng.",
            hashtags=["#tiktokshop", "#skincare"],
            compliance_warnings=["Avoid guaranteed whitening claims"],
        )


def test_generate_video_prompts_returns_capcut_brief_and_analysis():
    app.dependency_overrides[get_ai_service] = lambda: FakeAIService()
    client = TestClient(app)
    response = client.post(
        "/api/generate/video-prompts",
        json={
            "product_name": "Serum vitamin C",
            "category": "beauty",
            "pain_points": "Dull skin",
            "language": "vi",
            "provider_focus": "capcut",
        },
    )
    app.dependency_overrides.clear()

    assert response.status_code == 200
    data = response.json()
    assert data["type"] == "video-prompts"
    assert data["analysis"]["product_type"] == "Beauty serum"
    assert data["capcut_brief"]
    assert data["compliance_warnings"] == ["Avoid guaranteed whitening claims"]
