# Supabase Storage Assets

## Mục Tiêu

Lưu ảnh sản phẩm và video output bằng Supabase Storage, metadata nằm trong Postgres.

## Scope Đã Làm

- Migration tạo bucket `product-assets`.
- Migration tạo policies cho object path theo `users/{user_id}/...`.
- Migration tạo bảng `assets`.

## Files/API/Schema Đã Thay Đổi

- `assets`
- `storage.buckets`
- `storage.objects` policies

## Payload Và Response Mẫu

API upload chưa triển khai.

## Cách Test Thủ Công

Apply migration rồi test upload/select/delete bằng hai user khác nhau.

## Test Tự Động Đã Chạy

- Chưa có.

## Quyết Định Kỹ Thuật

- Bucket private.
- Owner check dựa trên folder thứ hai trong path: `users/{user_id}`.

## Rủi Ro Và Việc Còn Lại

- Cần backend upload validation.
