# Runway Video Provider

## Mục Tiêu

Dùng Runway làm provider pilot cho video generation thật ở Phase 6.

## Scope Đã Làm

- Chỉ chuẩn bị schema `video_generations`.
- Chưa implement provider runtime.

## Files/API/Schema Đã Thay Đổi

- `video_generations`

## Payload Và Response Mẫu

Chưa có API runtime.

## Cách Test Thủ Công

Chưa áp dụng.

## Test Tự Động Đã Chạy

- Chưa có.

## Quyết Định Kỹ Thuật

- Provider pilot chỉ chọn một provider để kiểm soát chi phí và complexity.
- Output phải lưu lại Supabase Storage.

## Rủi Ro Và Việc Còn Lại

- Cần mock provider trong tests.
- Cần timeout/retry/polling strategy.
