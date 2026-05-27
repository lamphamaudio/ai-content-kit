from app.providers.openai_provider import OpenAIProvider


def test_normalize_content_kit_adds_missing_ids():
    provider = OpenAIProvider.__new__(OpenAIProvider)
    data = {
        "angles": [{"title": "Angle", "description": "Desc", "target_pain_point": "Pain"}],
        "hooks": [{"content": "Hook", "style": "curiosity"}],
        "scripts": [{"duration_seconds": 15, "title": "Script", "hook": "Hook", "voiceover": "VO", "shot_list": [], "text_overlays": [], "cta": "CTA"}],
        "captions": [{"content": "Caption", "tone": "friendly"}],
        "calendar": [{"day": 1, "content_type": "demo", "idea": "Idea", "hook": "Hook", "cta": "CTA"}],
    }

    normalized = provider._normalize_content_kit(data)

    assert normalized["angles"][0]["id"] == "angle-1"
    assert normalized["hooks"][0]["id"] == "hook-1"
    assert normalized["scripts"][0]["id"] == "script-1"
    assert normalized["captions"][0]["id"] == "caption-1"
    assert normalized["calendar"][0]["id"] == "day-1"


def test_normalize_product_analysis_converts_string_fields_to_lists():
    provider = OpenAIProvider.__new__(OpenAIProvider)
    data = {
        "product_type": "Serum",
        "target_customer_insight": "Needs lightweight skincare",
        "main_pain_points": "Dull skin",
        "buying_triggers": ["Fast absorption"],
        "content_angles": None,
        "risk_claims": "Avoid guaranteed whitening claims",
        "recommended_video_styles": "Routine demo",
    }

    normalized = provider._normalize_product_analysis(data)

    assert normalized["main_pain_points"] == ["Dull skin"]
    assert normalized["content_angles"] == []
    assert normalized["risk_claims"] == ["Avoid guaranteed whitening claims"]
    assert normalized["recommended_video_styles"] == ["Routine demo"]
    assert normalized["compliance_notes"] == []
