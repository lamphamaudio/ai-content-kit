# Phase 1 - Text Content Kit MVP

## Mục Tiêu

Tạo bộ nội dung affiliate TikTok Shop từ một form sản phẩm: summary, angles, hooks, scripts, captions, hashtags, CTAs và lịch đăng.

## Scope Đã Làm

- Backend có `POST /api/generate/content-kit`.
- Endpoint cũ `/hooks`, `/scripts`, `/captions`, `/calendar` vẫn được giữ.
- Response `ContentKitResponse` có schema rõ và hỗ trợ optional `analysis`.
- Frontend có tab/section cho Content Kit và nút copy từng item.

## Files/API/Schema Đã Thay Đổi

- `POST /api/generate/content-kit`
- `ContentKitRequest`
- `ContentKitResponse`
- Frontend type `ContentKitResponse`

## Payload Và Response Mẫu

```json
{
  "product_name": "Serum vitamin C",
  "category": "beauty",
  "language": "vi"
}
```

Response tối thiểu:

```json
{
  "type": "content-kit",
  "prompt_version": "v2",
  "product_summary": "string",
  "angles": [],
  "hooks": [],
  "scripts": [],
  "captions": [],
  "hashtags": [],
  "ctas": [],
  "calendar": [],
  "analysis": null
}
```

## Cách Test Thủ Công

1. Start backend.
2. POST payload mẫu vào `/api/generate/content-kit`.
3. Kiểm tra response có đủ section và không có markdown fences.
4. Mở frontend, tạo Content Kit và copy từng item.

## Test Tự Động Đã Chạy

- `pytest apps/api/tests`
- `npm --workspace apps/web run build`

## Quyết Định Kỹ Thuật

- Giữ endpoint cũ để không phá Phase 1 regression.
- Content Kit dùng OpenAI JSON output và normalize thiếu `id`.

## Rủi Ro Và Việc Còn Lại

- Nên nâng tiếp lên OpenAI Structured Outputs/JSON schema chặt hơn.
- Usage hiện chưa enforce bằng database thật cho mọi flow.
