# Phase 6 - One-Provider Video Generation Pilot

## Mục Tiêu

Gọi một provider video thật, mặc định Runway, sau khi Supabase quota/storage đã sẵn sàng.

## Scope Đã Làm

- Migration đã chuẩn bị bảng `video_generations`.
- Chưa thêm Runway provider hoặc API video generation thật.
- Chưa gọi provider thật.

## Files/API/Schema Đã Thay Đổi

- `video_generations`

## Payload Và Response Mẫu

API dự kiến:

```http
POST /api/video-generations
GET /api/video-generations/{id}
GET /api/video-generations
POST /api/video-generations/{id}/retry
```

## Cách Test Thủ Công

Chưa áp dụng cho production vì provider chưa triển khai.

## Test Tự Động Đã Chạy

- Chưa có test provider vì Phase 6 chưa triển khai runtime.

## Quyết Định Kỹ Thuật

- Runway là provider pilot mặc định.
- Output provider phải được download về Supabase Storage để tránh URL hết hạn.

## Rủi Ro Và Việc Còn Lại

- Cần quota hard stop trước khi tạo job tốn tiền.
- Cần mock provider cho automated tests.
