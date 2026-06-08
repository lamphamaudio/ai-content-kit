# Supabase Auth

## Mục Tiêu

Dùng Supabase Auth làm nguồn user identity cho app.

## Scope Đã Làm

- Frontend đã có Supabase client placeholder.
- Migrations hiện dùng `auth.users(id)` cho user-owned tables.
- Chưa có backend JWT auth dependency hoàn chỉnh.

## Files/API/Schema Đã Thay Đổi

- `profiles`
- `projects`
- `assets`
- `video_generations`

## Payload Và Response Mẫu

Không có API auth custom.

## Cách Test Thủ Công

Đăng nhập bằng Supabase Auth rồi verify user chỉ xem dữ liệu của mình.

## Test Tự Động Đã Chạy

- Chưa có auth integration test.

## Quyết Định Kỹ Thuật

- Không dùng `user_metadata` cho authorization.
- RLS dùng `auth.uid()`.

## Rủi Ro Và Việc Còn Lại

- Cần backend auth dependency validate JWT.
