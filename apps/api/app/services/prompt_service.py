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

