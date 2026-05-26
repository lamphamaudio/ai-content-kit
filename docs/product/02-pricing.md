# AI Content Kit - Pricing Plan

## 1. Pricing Strategy

App nên dùng mô hình freemium:

```text
Free dùng thử giá trị thật
Starter cho affiliate mới
Pro cho seller/shop nhỏ
Team cho agency/KOC team
```

Mục tiêu không phải khóa quá sớm, mà là cho user thấy app giúp họ tạo content nhanh hơn, sau đó upsell bằng quota, batch, export, template và lịch đăng nâng cao.

---

## 2. Free Plan

Giá:

```text
0đ
```

Giới hạn:

- 5 lần generate/ngày
- Không batch generate
- Lưu tối đa 3 project
- Không export full calendar
- Không dùng brand voice nâng cao
- Không có template premium

Mục tiêu:

> Cho user thấy value trước.

Đối tượng:

- Người mới test tool
- Affiliate mới chưa sẵn sàng trả tiền
- User đến từ SEO/TikTok demo

Feature nên cho free:

| Feature | Free |
|---|---:|
| Generate hook | Có |
| Generate script ngắn | Có giới hạn |
| Generate caption | Có |
| Calendar 7 ngày | Xem preview |
| Save project | Tối đa 3 |
| Export | Không |
| Batch generate | Không |

---

## 3. Starter Plan

Giá đề xuất:

```text
79k–99k/tháng
```

Bao gồm:

- 100–150 generations/tháng
- Lưu 20 project
- Full hook/script/caption
- Calendar 7 ngày
- Copy không giới hạn trong quota
- Template cơ bản theo ngành
- Feedback/improve output

Đối tượng:

> Affiliate mới.

Value proposition:

> Mỗi ngày có đủ ý tưởng để làm content TikTok Shop mà không bị bí.

Feature:

| Feature | Starter |
|---|---:|
| Generate hook | Có |
| Generate script 15s/30s | Có |
| Generate caption/hashtag | Có |
| Calendar 7 ngày | Có |
| Save project | 20 project |
| Export text/markdown | Có |
| Batch generate | Không hoặc rất giới hạn |
| Brand voice | Không |

---

## 4. Pro Plan

Giá đề xuất:

```text
199k–299k/tháng
```

Bao gồm:

- 500–1.000 generations/tháng
- Batch content
- Template theo ngành
- Export
- Brand voice
- Lịch đăng 30 ngày
- Policy check cơ bản
- Content library
- Regenerate/improve nâng cao

Đối tượng:

> Seller/shop nhỏ.

Value proposition:

> Tạo content bán hàng đều đặn cho nhiều sản phẩm mà không cần thuê content writer full-time.

Feature:

| Feature | Pro |
|---|---:|
| Generate hook/script/caption | Có |
| Calendar 7 ngày | Có |
| Calendar 30 ngày | Có |
| Save project | Nhiều hơn Starter |
| Export | Có |
| Batch generate | Có |
| Brand voice | Có |
| Template premium | Có |
| Policy check | Có |
| Priority generation | Có thể thêm sau |

---

## 5. Team Plan

Giá đề xuất:

```text
499k–999k/tháng
```

Bao gồm:

- Nhiều thành viên
- Nhiều workspace
- Quản lý sản phẩm
- Brief creator
- Batch generate
- Shared library
- Role cơ bản
- Template/team brand voice
- Export brief

Đối tượng:

> Team content/KOC agency.

Value proposition:

> Chuẩn hóa quy trình lên ý tưởng, viết script và brief creator cho nhiều sản phẩm.

Feature:

| Feature | Team |
|---|---:|
| Multi-member | Có |
| Workspace | Có |
| Shared library | Có |
| Creator brief | Có |
| Batch generate | Có |
| Role permission | Cơ bản |
| Team brand voice | Có |
| Export brief | Có |

---

## 6. Paywall Strategy

Không nên khóa toàn bộ app ngay từ đầu. Nên khóa các feature thể hiện giá trị cao.

Nên khóa sau paywall:

- Batch generate
- Calendar 30 ngày
- Export full content
- Brand voice
- Template premium
- Save nhiều project
- Regenerate nhiều lần
- Policy check nâng cao

Không nên khóa quá sớm:

- Generate hook đầu tiên
- Generate caption cơ bản
- Demo output
- Copy một số output đầu tiên

---

## 7. Manual Payment giai đoạn đầu

Giai đoạn MVP chưa cần tích hợp payment phức tạp.

Flow:

```text
User chọn gói
  -> Hiện thông tin chuyển khoản
  -> User gửi nội dung chuyển khoản
  -> Admin kiểm tra
  -> Admin update plan trong dashboard/database
```

Cần có:

- Pricing page
- Payment instruction page
- Form báo đã chuyển khoản
- Admin field để update `profiles.plan`
- Log `payment_submitted`

Sau này tích hợp:

- PayOS
- MoMo
- VNPay

---

## 8. Revenue Target

| Giai đoạn | Target |
|---|---:|
| 30 ngày đầu | 5–10 paid users |
| MRR tháng 1 | 500k–2 triệu |
| MRR tháng 3 | 10–30 triệu nếu traction tốt |
| Free → paid | 2–5% |
| Monthly churn paid | < 15% |

## 9. Pricing Experiment

Có thể test 3 mức giá:

| Experiment | Starter | Pro |
|---|---:|---:|
| Low price | 79k | 199k |
| Standard | 99k | 249k |
| High | 129k | 299k |

Quy tắc:

- Nếu conversion cao nhưng churn cao: user trả thử nhưng chưa thấy value lâu dài.
- Nếu nhiều người dùng free nhưng ít upgrade: quota/paywall chưa đúng hoặc output chưa đủ tốt.
- Nếu ít người dùng thử: landing/acquisition chưa ổn.
