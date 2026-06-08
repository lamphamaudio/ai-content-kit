# Phase 4 - Supabase Storage + Asset Upload

## Mục Tiêu

Cho user upload ảnh sản phẩm vào Supabase Storage và dùng ảnh làm product/video context.

## Scope Đã Làm

- Migration đã chuẩn bị bảng `assets`.
- Migration đã chuẩn bị private bucket `product-assets`.
- Storage policies đã giới hạn path theo owner user id.
- Chưa thêm API upload/read/delete ở backend.

## Files/API/Schema Đã Thay Đổi

- `assets`
- `storage.buckets`
- `storage.objects` policies cho bucket `product-assets`

## Payload Và Response Mẫu

API sẽ được thêm sau:

```http
POST /api/assets/upload
GET /api/assets/{asset_id}
DELETE /api/assets/{asset_id}
```

## Cách Test Thủ Công

1. Apply migration trong Supabase.
2. Login bằng user test.
3. Upload object vào `product-assets/users/{user_id}/projects/{project_id}/...`.
4. Verify user khác không đọc/xóa được object.

## Test Tự Động Đã Chạy

- Chưa có test upload vì API chưa triển khai.

## Quyết Định Kỹ Thuật

- Bucket private mặc định.
- Metadata asset lưu trong Postgres, file binary lưu trong Storage.

## Rủi Ro Và Việc Còn Lại

- Cần backend storage client và upload validation.
- Cần giới hạn file type/size trước khi public dùng.
