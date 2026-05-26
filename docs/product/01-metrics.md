# AI Content Kit - Metrics Plan

## 1. North Star Metric

North Star Metric của app:

> Weekly Copied Content Items

Không nên lấy “số lần generate” làm North Star Metric, vì user generate nhiều chưa chắc đã thấy giá trị. Với app này, hành động **copy/export** mới thể hiện rằng output có khả năng dùng được.

Công thức:

```text
Weekly Copied Content Items =
số hook copy + số script copy + số caption copy + số calendar item copy/export
```

## 2. Target theo giai đoạn

| Giai đoạn | Target |
|---|---:|
| MVP private beta | 300 copied items/tuần |
| Public beta | 1.000 copied items/tuần |
| Có paid user | 5.000 copied items/tuần |
| Scale nhỏ | 20.000 copied items/tuần |

## 3. Acquisition Metrics

Đo user đến từ đâu và kênh nào hiệu quả nhất.

| Metric | Ý nghĩa | Mục tiêu 30 ngày đầu |
|---|---|---:|
| Landing page visitors | Lượng traffic | 1.000–3.000 |
| Visitor → trial conversion | Tỷ lệ dùng thử | 10–20% |
| Trial → signup conversion | Dùng thử rồi đăng ký | 20–40% |
| CAC | Chi phí có 1 user | Càng thấp càng tốt |
| Top acquisition channel | Kênh hiệu quả nhất | TikTok/SEO/Facebook group |

### Event cần tracking

```text
landing_viewed
demo_started
demo_generated
signup_clicked
signup_completed
```

## 4. Activation Metrics

Đo user có nhận được giá trị đầu tiên hay không.

| Metric | Ý nghĩa | Mục tiêu MVP |
|---|---|---:|
| Time to first output | Thời gian có content đầu tiên | < 60 giây |
| First output copy rate | Tỷ lệ copy sau lần generate đầu | >= 35% |
| First project save rate | Tỷ lệ lưu project đầu tiên | >= 25% |
| First session depth | Số lần generate trong session đầu | >= 2 |
| Onboarding completion | Hoàn tất flow nhập sản phẩm | >= 60% |

Metric quan trọng nhất ở MVP:

> First output copy rate

Công thức:

```text
First output copy rate =
số user copy ít nhất 1 output trong session đầu / số user generate lần đầu
```

### Event cần tracking

```text
product_input_started
product_created
generation_started
generation_completed
content_copied
project_saved
onboarding_completed
```

## 5. Engagement Metrics

Đo user có dùng tiếp và dùng sâu hay không.

| Metric | Ý nghĩa | Mục tiêu MVP |
|---|---|---:|
| DAU | User hoạt động mỗi ngày | Theo traffic |
| WAU | User hoạt động mỗi tuần | Theo traffic |
| DAU/WAU | Độ thường xuyên | >= 25% |
| Projects/user | Số sản phẩm/user | >= 2 |
| Generations/user/week | Số lần generate mỗi tuần | >= 5 |
| Copy actions/user/week | Số lần copy mỗi tuần | >= 3 |

### Event cần tracking

```text
dashboard_viewed
product_created
generation_completed
content_copied
content_saved
calendar_generated
regenerate_clicked
```

## 6. Retention Metrics

Đo app có giữ được user không.

| Metric | Mục tiêu MVP |
|---|---:|
| D1 retention | >= 25% |
| D7 retention | >= 12–15% |
| D30 retention | >= 5–8% |
| Returning user generate rate | >= 30% |
| Weekly repeat product creation | >= 15% |

### Cách hiểu

- Nếu D1 thấp: onboarding hoặc output đầu tiên chưa đủ tốt.
- Nếu D7 thấp: app chưa tạo thói quen dùng lại.
- Nếu D30 thấp: app chưa đủ giá trị để thành tool làm việc thường xuyên.

## 7. Revenue Metrics

Đo khả năng kiếm tiền.

| Metric | Mục tiêu 60–90 ngày |
|---|---:|
| Free → paid conversion | 2–5% |
| Starter conversion | 2–4% |
| Pro conversion | 1–2% |
| ARPU | 30k–80k/user/tháng |
| Paid ARPU | 99k–299k/user/tháng |
| MRR tháng 1 | 1–5 triệu |
| MRR tháng 3 | 10–30 triệu nếu traction tốt |
| Churn monthly | < 15% với paid user |
| Gross margin | > 70%, sau AI API cost |

### Event cần tracking

```text
pricing_viewed
quota_reached
upgrade_clicked
payment_submitted
payment_success
subscription_started
subscription_cancelled
```

## 8. Dashboard metric tối thiểu cho MVP

Trong admin/dashboard nội bộ, cần xem được:

| Metric | Filter |
|---|---|
| Tổng users | Ngày/tuần/tháng |
| Tổng products created | Ngày/tuần/tháng |
| Tổng generations | Theo type |
| Tổng copied items | Theo type |
| First output copy rate | Theo cohort |
| D1/D7 retention | Theo cohort |
| Free → paid conversion | Theo tháng |
| Cost AI API | Theo provider/model |
| Gross margin | Theo tháng |

## 9. Decision rule

### Nếu First Output Copy Rate < 20%

Ưu tiên sửa:

1. Prompt hook/script
2. Output format
3. Input form
4. Tone tiếng Việt
5. Template theo ngành

### Nếu Copy Rate tốt nhưng D7 thấp

Ưu tiên thêm:

1. Calendar 7 ngày
2. Save project
3. Reminder quay lại
4. Content library
5. Batch generate

### Nếu D7 tốt nhưng Free → Paid thấp

Ưu tiên sửa:

1. Pricing
2. Quota
3. Paywall
4. Gói Starter
5. Case study/ROI
