# Compliance Agent

## Mục Tiêu

Giảm rủi ro nội dung affiliate bằng cách cảnh báo claim quá đà và đề xuất wording an toàn hơn.

## Scope Đã Làm

- Product analysis trả `risk_claims` và `compliance_notes`.
- Content Kit và Video Prompt dùng analysis context.
- UI hiển thị warning cho risk claims/compliance notes.

## Files/API/Schema Đã Thay Đổi

- `ProductAnalysisResponse`
- `ContentKitResponse.analysis`
- `VideoPromptResponse.analysis`

## Payload Và Response Mẫu

Risk response mẫu:

```json
{
  "risk_claims": ["Avoid trắng sau 3 ngày"],
  "compliance_notes": ["Use giúp da trông tươi hơn instead of guaranteed whitening claims"]
}
```

## Cách Test Thủ Công

Test với sản phẩm beauty/skincare, health, weight loss, finance, mom/baby hoặc supplements.

## Test Tự Động Đã Chạy

- Contract tests cho analysis/content kit/video prompt.

## Quyết Định Kỹ Thuật

- Compliance hiện là model-guided output, chưa phải deterministic rules engine.

## Rủi Ro Và Việc Còn Lại

- Cần thêm rule taxonomy cố định cho các category rủi ro cao.
