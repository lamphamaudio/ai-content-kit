from app.schemas.generation import GenerateRequest


class PromptService:
    version = "v2"

    def build_prompt(self, generation_type: str, payload: GenerateRequest) -> str:
        return (
            f"Create {generation_type} for TikTok Shop Vietnam. "
            f"Product: {payload.product_name}. Category: {payload.category}. "
            f"Price: {payload.price or 'unknown'}. Audience: {payload.target_audience or 'general'}. "
            f"Benefits: {payload.key_benefits or 'not provided'}. Tone: {payload.tone}."
        )

    def build_content_kit_prompt(self, payload: GenerateRequest) -> str:
        return f"""
You are a senior Vietnamese TikTok Shop affiliate strategist.

Create a complete TikTok Shop affiliate content kit for the following product.

Product information:
- Product name: {payload.product_name}
- Category: {payload.category}
- Price: {payload.price or "Not provided"}
- Target audience: {payload.target_audience or "Not provided"}
- Key benefits: {payload.key_benefits or "Not provided"}
- Tone: {payload.tone}

Business goal:
Help a TikTok Shop seller or affiliate creator quickly create short-form selling content that feels natural, practical, and conversion-focused.

Content requirements:
1. Product summary:
   - 2-3 sentences in Vietnamese.
   - Explain what the product is, who it is for, and the main buying reason.

2. Angles:
   - Generate exactly 5 selling angles.
   - Each angle must have title, description, and target_pain_point.
   - Avoid generic angles.

3. Hooks:
   - Generate exactly 10 short Vietnamese hooks.
   - Each hook should be suitable for the first 3 seconds of a TikTok video.
   - Mix styles: problem_solution, curiosity, review, benefit, urgency.
   - Keep each hook under 18 words.

4. Scripts:
   - Generate exactly 3 scripts:
     - one 15-second script
     - one 30-second script
     - one 60-second script
   - Each script must include:
     - duration_seconds
     - title
     - hook
     - voiceover
     - shot_list
     - text_overlays
     - cta
   - Voiceover must sound like a natural Vietnamese affiliate creator.
   - Shot list must be practical and easy to produce with CapCut or AI video tools.

5. Captions:
   - Generate exactly 3 TikTok captions.
   - Captions should be natural, not spammy.

6. Hashtags:
   - Generate 15-25 hashtags.
   - Include a mix of product, category, TikTok Shop, and affiliate hashtags.

7. CTAs:
   - Generate exactly 5 CTAs.
   - CTAs must fit TikTok Shop, for example: "Xem sản phẩm ở giỏ hàng".

8. Calendar:
   - Generate exactly 7 calendar items.
   - Each item represents one posting idea for one day.
   - Each item must include day, content_type, idea, hook, cta.

Safety and compliance:
- Do not make exaggerated claims.
- Do not promise guaranteed results.
- For beauty, health, weight loss, finance, or baby products, use cautious wording.
- Avoid phrases like "trị dứt điểm", "hiệu quả 100%", "trắng bật tone sau 3 ngày", "cam kết khỏi", "chắc chắn kiếm tiền".
- Prefer safer phrasing like "hỗ trợ", "giúp da trông", "có thể phù hợp", "tham khảo".

Return only valid JSON.
Do not include markdown fences.
Do not include explanations outside JSON.

Return exactly this JSON shape:
{{
  "product_summary": "string",
  "angles": [
    {{
      "title": "string",
      "description": "string",
      "target_pain_point": "string"
    }}
  ],
  "hooks": [
    {{
      "content": "string",
      "style": "problem_solution | curiosity | review | benefit | urgency"
    }}
  ],
  "scripts": [
    {{
      "duration_seconds": 15,
      "title": "string",
      "hook": "string",
      "voiceover": "string",
      "shot_list": ["string"],
      "text_overlays": ["string"],
      "cta": "string"
    }}
  ],
  "captions": [
    {{
      "content": "string",
      "tone": "string"
    }}
  ],
  "hashtags": ["string"],
  "ctas": ["string"],
  "calendar": [
    {{
      "day": 1,
      "content_type": "string",
      "idea": "string",
      "hook": "string",
      "cta": "string"
    }}
  ]
}}
""".strip()
