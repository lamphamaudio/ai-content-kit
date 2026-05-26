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
    cors_origins: list[str] = ["http://localhost:3000"]


settings = Settings()
