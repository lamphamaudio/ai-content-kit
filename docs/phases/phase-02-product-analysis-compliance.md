# Phase 2 - Product Analysis + Compliance

## Mục Tiêu

Phân tích sản phẩm trước khi tạo content để output bớt chung chung và giảm rủi ro claim sai.

## Scope Đã Làm

- Backend có `POST /api/analyze/product`.
- Route dùng `ProductAnalysisRequest` riêng.
- Content Kit chạy product analysis trước rồi truyền analysis vào content prompt.
- Response có `risk_claims`, `recommended_video_styles` và `compliance_notes`.
- Frontend có tab AI Analysis và warning block.

## Files/API/Schema Đã Thay Đổi

- `POST /api/analyze/product`
- `ProductAnalysisRequest`
- `ProductAnalysisResponse`
- `ContentKitResponse.analysis`

## Payload Và Response Mẫu

```json
{
  "product_name": "Serum vitamin C sáng da",
  "category": "Làm đẹp",
  "pain_points": "Da xỉn màu",
  "language": "vi"
}
```

Response shape:

```json
{
  "product_type": "string",
  "target_customer_insight": "string",
  "main_pain_points": ["string"],
  "buying_triggers": ["string"],
  "content_angles": ["string"],
  "risk_claims": ["string"],
  "recommended_video_styles": ["string"],
  "compliance_notes": ["string"]
}
```

## Cách Test Thủ Công

1. POST payload mẫu vào `/api/analyze/product`.
2. Kiểm tra risk claims cho beauty/skincare không dùng claim quá đà.
3. Tạo Content Kit và kiểm tra tab AI Analysis xuất hiện.

## Test Tự Động Đã Chạy

- `pytest apps/api/tests`
- Contract test `/api/analyze/product`
- Contract test `/api/generate/content-kit` có `analysis`

## Quyết Định Kỹ Thuật

- `ProductAnalysisRequest` tách khỏi `GenerateRequest` để endpoint phân tích có contract riêng.
- Compliance là core output, không chỉ ghi chú prompt.

## Rủi Ro Và Việc Còn Lại

- Compliance hiện dựa trên prompt/model, chưa có rule engine deterministic.
- Nên thêm category risk taxonomy trong DB hoặc config khi Phase 3 ổn định.
