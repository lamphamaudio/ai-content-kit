# Phase 5 - Video Prompt Kit

## Mục Tiêu

Sinh prompt copy-ready cho Kling, Pika, Runway và brief dựng CapCut/TikTok mà không gọi video provider thật.

## Scope Đã Làm

- Backend có `POST /api/generate/video-prompts`.
- Endpoint chạy product analysis trước rồi sinh video prompt kit.
- Response có `capcut_brief` cùng Kling/Pika/Runway prompts.
- Frontend có button tạo Video Prompt riêng và tab hiển thị/copy prompts.

## Files/API/Schema Đã Thay Đổi

- `VideoPromptRequest`
- `VideoPromptResponse`
- `POST /api/generate/video-prompts`
- Frontend type `VideoPromptResponse`

## Payload Và Response Mẫu

```json
{
  "product_name": "Serum vitamin C",
  "category": "beauty",
  "language": "vi",
  "video_style": "UGC review",
  "aspect_ratio": "9:16",
  "provider_focus": "capcut"
}
```

Response có:

```json
{
  "type": "video-prompts",
  "prompt_version": "v2",
  "analysis": {},
  "video_brief": {},
  "shot_list": [],
  "voiceover": "string",
  "text_overlays": [],
  "kling_prompt": "string",
  "pika_prompt": "string",
  "runway_prompt": "string",
  "capcut_brief": "string",
  "negative_prompt": "string",
  "caption": "string",
  "hashtags": [],
  "compliance_warnings": []
}
```

## Cách Test Thủ Công

1. Tạo Video Prompt từ form frontend.
2. Kiểm tra tab Video Prompt xuất hiện.
3. Copy Kling/Pika/Runway/CapCut/Negative/Voiceover.
4. Kiểm tra compliance warning cho skincare/beauty.

## Test Tự Động Đã Chạy

- `pytest apps/api/tests`
- Contract test `/api/generate/video-prompts`
- OpenAI normalize test cho `capcut_brief`

## Quyết Định Kỹ Thuật

- Phase này không gọi video API thật.
- `capcut_brief` là edit plan cho người dùng dựng thủ công.

## Rủi Ro Và Việc Còn Lại

- Cần asset context sau Phase 4 để prompt video chính xác hơn.
- Cần thêm Playwright/browser QA cho UI.
