from app.schemas.generation import GenerateRequest


class PromptService:
    version = "v1"

    def build_prompt(self, generation_type: str, payload: GenerateRequest) -> str:
        return (
            f"Create {generation_type} for TikTok Shop Vietnam. "
            f"Product: {payload.product_name}. Category: {payload.category}. "
            f"Price: {payload.price or 'unknown'}. Audience: {payload.target_audience or 'general'}. "
            f"Benefits: {payload.key_benefits or 'not provided'}. Tone: {payload.tone}."
        )

    def build_content_kit_prompt(self, payload: GenerateRequest) -> str:
        return f"""
Create a complete TikTok Shop content kit for Vietnam.

Product input:
- Product name: {payload.product_name}
- Category: {payload.category}
- Price: {payload.price or "Not provided"}
- Target audience: {payload.target_audience or "General TikTok Shop buyers"}
- Key benefits: {payload.key_benefits or "Not provided"}
- Tone: {payload.tone}

Rules:
- Write primarily in Vietnamese unless the product input clearly uses English.
- Be specific to the product, audience, and benefits.
- Avoid unsupported medical, financial, legal, or guaranteed-result claims.
- Keep hooks short, punchy, and suitable for TikTok.
- Make scripts practical for a seller or affiliate to film.
- Return only valid JSON. Do not wrap JSON in markdown.

Required JSON shape:
{{
  "product_summary": "1-2 sentence product summary",
  "angles": [
    {{
      "id": "angle-1",
      "title": "Angle title",
      "description": "Why this angle works",
      "target_pain_point": "Pain point or null"
    }}
  ],
  "hooks": [
    {{
      "id": "hook-1",
      "content": "Hook text",
      "style": "curiosity/problem/benefit/proof"
    }}
  ],
  "scripts": [
    {{
      "id": "script-1",
      "duration_seconds": 30,
      "title": "Script title",
      "hook": "Opening hook",
      "voiceover": "Full voiceover script",
      "shot_list": ["Shot 1", "Shot 2"],
      "text_overlays": ["Overlay 1", "Overlay 2"],
      "cta": "Call to action"
    }}
  ],
  "captions": [
    {{
      "id": "caption-1",
      "content": "Caption text",
      "tone": "friendly"
    }}
  ],
  "hashtags": ["#tiktokshop", "#affiliate"],
  "ctas": ["CTA text"],
  "calendar": [
    {{
      "id": "day-1",
      "day": 1,
      "content_type": "hook/script/demo/review",
      "idea": "Content idea",
      "hook": "Daily hook",
      "cta": "Daily CTA"
    }}
  ]
}}

Quantity:
- angles: 5
- hooks: 10
- scripts: 3
- captions: 5
- hashtags: 15
- ctas: 8
- calendar: 7 days
""".strip()
