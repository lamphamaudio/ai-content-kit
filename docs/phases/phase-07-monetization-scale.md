# Phase 7 - Monetization + Scale

## Mục Tiêu

Biến tool thành SaaS có plans, quota, analytics, batch generation và prompt memory.

## Scope Đã Làm

- Roadmap đã xác định plan Free/Starter/Pro.
- Migration `usage_quotas` chuẩn bị quota theo generation type.
- Chưa có billing/payment runtime.

## Files/API/Schema Đã Thay Đổi

- `usage_quotas`

## Payload Và Response Mẫu

Chưa có billing API.

## Cách Test Thủ Công

Chưa áp dụng.

## Test Tự Động Đã Chạy

- Chưa có test monetization runtime.

## Quyết Định Kỹ Thuật

- Supabase Postgres giữ usage/quota.
- Vector memory mặc định sẽ ưu tiên pgvector/Supabase Vector trước Chroma.

## Rủi Ro Và Việc Còn Lại

- Cần chọn payment/manual payment workflow.
- Cần analytics dashboard sau khi usage events thật ổn định.
