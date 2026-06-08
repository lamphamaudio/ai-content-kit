# Prompt Memory

## Mục Tiêu

Lưu và tái sử dụng patterns hiệu quả như hooks/scripts/captions được user đánh dấu tốt.

## Scope Đã Làm

- Chưa triển khai runtime.
- Roadmap chọn pgvector/Supabase Vector là default trước Chroma.

## Files/API/Schema Đã Thay Đổi

Chưa có.

## Payload Và Response Mẫu

Chưa có.

## Cách Test Thủ Công

Chưa áp dụng.

## Test Tự Động Đã Chạy

- Chưa có.

## Quyết Định Kỹ Thuật

- Không dùng Chroma làm DB chính.
- Ưu tiên Supabase/Postgres để giảm số hệ thống vận hành.

## Rủi Ro Và Việc Còn Lại

- Cần thiết kế embedding pipeline và data retention policy.
