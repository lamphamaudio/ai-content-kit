from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

ROOT_DIR = Path(__file__).resolve().parents[4]


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=ROOT_DIR / ".env", extra="ignore")

    ai_provider: str = "openai"
    openai_model: str = "gpt-4.1-mini"
    openai_api_key: str | None = None
    gemini_api_key: str | None = None
    claude_api_key: str | None = None
    database_url: str | None = None
    supabase_url: str | None = None
    supabase_anon_key: str | None = None
    next_public_supabase_url: str | None = None
    next_public_supabase_anon_key: str | None = None
    cors_origins: list[str] = ["http://localhost:3000"]

    @property
    def resolved_supabase_url(self) -> str | None:
        return self.supabase_url or self.next_public_supabase_url

    @property
    def resolved_supabase_anon_key(self) -> str | None:
        return self.supabase_anon_key or self.next_public_supabase_anon_key


settings = Settings()
