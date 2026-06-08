from typing import Literal

from pydantic import BaseModel

from app.schemas.analysis import ProductAnalysisResponse
from app.schemas.generation import GenerateRequest


class VideoBrief(BaseModel):
    goal: str
    platform: str
    duration_seconds: int
    style: str
    aspect_ratio: str = "9:16"


class ShotItem(BaseModel):
    time: str
    scene: str
    camera: str | None = None
    motion: str | None = None
    text_overlay: str | None = None
    visual_notes: str | None = None


class VideoPromptRequest(GenerateRequest):
    video_style: str | None = None
    aspect_ratio: str = "9:16"
    provider_focus: Literal["all", "kling", "pika", "runway", "capcut"] = "all"


class VideoPromptResponse(BaseModel):
    type: str = "video-prompts"
    prompt_version: str
    analysis: ProductAnalysisResponse | None = None
    video_brief: VideoBrief
    shot_list: list[ShotItem]
    voiceover: str
    text_overlays: list[str]
    kling_prompt: str
    pika_prompt: str
    runway_prompt: str
    capcut_brief: str
    negative_prompt: str
    caption: str
    hashtags: list[str]
    compliance_warnings: list[str]
