# Video Prompt Schema

## Mục Tiêu

Chuẩn hóa output video prompt để frontend copy được từng phần và Phase 6 có thể dùng lại.

## Scope Đã Làm

- `VideoPromptResponse` có Kling/Pika/Runway/CapCut prompts.
- `provider_focus` hỗ trợ `all`, `kling`, `pika`, `runway`, `capcut`.
- OpenAI normalizer bảo đảm thiếu `capcut_brief` không làm vỡ response.

## Files/API/Schema Đã Thay Đổi

- `VideoPromptRequest`
- `VideoPromptResponse`
- Frontend `VideoPromptResponse`

## Payload Và Response Mẫu

```json
{
  "provider_focus": "capcut",
  "video_style": "UGC review",
  "aspect_ratio": "9:16"
}
```

Response field bắt buộc:

```text
video_brief
shot_list
voiceover
text_overlays
kling_prompt
pika_prompt
runway_prompt
capcut_brief
negative_prompt
caption
hashtags
compliance_warnings
```

## Cách Test Thủ Công

Tạo Video Prompt ở frontend và copy từng prompt provider.

## Test Tự Động Đã Chạy

- `test_generate_video_prompts_returns_capcut_brief_and_analysis`
- `test_normalize_video_prompts_adds_capcut_brief`

## Quyết Định Kỹ Thuật

- Phase 5 không gọi provider thật.
- CapCut là human editing brief, không phải API prompt.

## Rủi Ro Và Việc Còn Lại

- Cần asset context sau Phase 4.
