# AI Content Kit Roadmap

Roadmap này mô tả các phase phát triển cho `ai-content-kit`, bắt đầu từ trạng thái hiện tại của repo: Next.js frontend, FastAPI backend, OpenAI provider, form nhập sản phẩm cơ bản và các endpoint generate ban đầu.

Mục tiêu sản phẩm cuối cùng:

```text
Nhập thông tin sản phẩm + ảnh
→ AI phân tích sản phẩm và khách hàng
→ Sinh angle, hook, script, caption, hashtag, CTA
→ Sinh prompt video cho Kling / Pika / Runway
→ Gọi AI video provider
→ Trả về video draft + nội dung đăng TikTok Shop
```

> Ghi chú: Phase 0 đã được bỏ qua vì dự án sẽ dùng OpenAI thật ngay, không ưu tiên mock provider.

---

## Phase 1 — Text Content Kit MVP

### Mục tiêu

Từ một form nhập sản phẩm, tạo ra một bộ content affiliate hoàn chỉnh bằng OpenAI thật.

Flow mong muốn:

```text
Product form
→ POST /api/generate/content-kit
→ OpenAI generate JSON có cấu trúc
→ Frontend hiển thị theo section/tab
→ User copy từng nội dung
```

### Input hiện tại

Repo đang có các field cơ bản:

```text
product_name
category
price
target_audience
key_benefits
tone
```

### Backend tasks

#### 1. Thêm endpoint all-in-one

Thêm endpoint:

```http
POST /api/generate/content-kit
```

Endpoint này không thay thế các endpoint cũ. Các endpoint sau vẫn giữ lại:

```http
POST /api/generate/hooks
POST /api/generate/scripts
POST /api/generate/captions
POST /api/generate/calendar
```

#### 2. Thêm schema response rõ ràng

Tạo các model Pydantic:

```text
ContentKitRequest
AngleItem
HookItem
ScriptItem
CaptionItem
CalendarItem
ContentKitResponse
```

Response shape mong muốn:

```json
{
  "type": "content-kit",
  "prompt_version": "v1",
  "product_summary": "...",
  "angles": [],
  "hooks": [],
  "scripts": [],
  "captions": [],
  "hashtags": [],
  "ctas": [],
  "calendar": []
}
```

#### 3. Nâng `PromptService`

Thêm method:

```python
def build_content_kit_prompt(self, payload: GenerateRequest) -> str:
    ...
```

Prompt cần yêu cầu OpenAI trả về JSON hợp lệ, không markdown fence, không text ngoài JSON.

Output cần có:

```text
5 selling angles
10 hooks
3 scripts: 15s, 30s, 60s
3 captions
15-25 hashtags
5 CTAs
7 calendar items
```

#### 4. Thêm method trong `OpenAIProvider`

Thêm:

```python
async def generate_content_kit(self, prompt: str, payload: GenerateRequest) -> dict:
    ...
```

Yêu cầu:

```text
- Dùng OpenAI Responses API
- Dùng settings.openai_model
- Parse response.output_text bằng json.loads
- Nếu JSON lỗi, raise lỗi rõ ràng
- Không phá method generate() hiện tại
```

#### 5. Thêm method trong `AIService`

Thêm:

```python
async def generate_content_kit(self, prompt: str, payload: GenerateRequest) -> dict:
    return await self.provider.generate_content_kit(prompt, payload)
```

#### 6. Mapping dữ liệu trả về

Trong route `/content-kit`:

```text
usage.check_quota(user_id=payload.user_id)
prompt = prompts.build_content_kit_prompt(payload)
data = await ai.generate_content_kit(prompt, payload)
map data thành ContentKitResponse
```

Nếu OpenAI không trả `id`, backend tự sinh id cho từng item.

### Frontend tasks

#### 1. Thêm type TypeScript

Trong `apps/web/types/generation.ts`, thêm:

```text
ContentKitResponse
AngleItem
HookItem
ScriptItem
CaptionItem
CalendarItem
```

#### 2. Thêm API client

Trong `apps/web/lib/api-client.ts`, thêm:

```ts
export function generateContentKit(payload: ProductInput) {
  return request<ContentKitResponse>("/api/generate/content-kit", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}
```

Giữ `generateHooks()` để không phá code cũ.

#### 3. Cập nhật hook frontend

Trong `apps/web/hooks/use-generation.ts`, đổi từ `generateHooks()` sang `generateContentKit()`.

State nên đổi thành:

```ts
const [contentKit, setContentKit] = useState<ContentKitResponse | null>(null);
const [error, setError] = useState<string | null>(null);
```

#### 4. Cập nhật UI kết quả

Thêm component mới:

```text
apps/web/components/content-kit-results.tsx
```

Hiển thị theo section:

```text
Tổng quan sản phẩm
Góc bán hàng
Hook
Script
Caption
Hashtag
CTA
Lịch đăng 7 ngày
```

Mỗi item nên có nút copy.

#### 5. Cập nhật button và loading text

Đổi button:

```text
Tạo hook bán hàng
```

thành:

```text
Tạo Content Kit
```

Loading text:

```text
Đang tạo bộ nội dung...
```

### Không làm trong Phase 1

```text
Không upload ảnh
Không tích hợp Kling / Pika / Runway
Không tạo video
Không làm auth thật
Không làm payment
Không bắt buộc lưu database
Không thêm shadcn/ui nếu repo chưa dùng
```

### Definition of Done

Phase 1 hoàn thành khi:

```text
- Backend có POST /api/generate/content-kit
- Endpoint gọi OpenAI thật thành công
- Response đúng schema
- Frontend gọi endpoint mới
- UI hiển thị đủ angle, hook, script, caption, hashtag, CTA, calendar
- User copy được từng nội dung
- Endpoint cũ không bị hỏng
```

### Payload test

```json
{
  "product_name": "Serum vitamin C sáng da",
  "category": "Làm đẹp",
  "price": "199.000đ",
  "target_audience": "Nữ văn phòng 25-35 tuổi",
  "key_benefits": "Dưỡng da trước ánh sáng mặt trời mùa hè, giúp da trông tươi hơn, thấm nhanh, không bết dính",
  "tone": "friendly"
}
```

Kỳ vọng:

```text
- Có product summary tiếng Việt tự nhiên
- Có 5 angle
- Có 10 hook
- Có 3 script: 15s, 30s, 60s
- Có 3 caption
- Có 15-25 hashtag
- Có 5 CTA
- Có lịch đăng 7 ngày
- Không có markdown fence
- Không claim quá đà như "trị nám dứt điểm", "trắng sau 3 ngày", "hiệu quả 100%"
```

---

## Phase 2 — Affiliate Intelligence / Product Analysis Agent

### Mục tiêu

Tool không chỉ viết content, mà còn phân tích sản phẩm, insight khách hàng, buying trigger và rủi ro claim.

Flow mong muốn:

```text
Product input
→ Product Analysis Agent
→ Customer Insight
→ Buying Triggers
→ Content Angles
→ Compliance Warnings
→ Content Kit tốt hơn
```

### Thêm input field

Mở rộng form và schema product:

```text
pain_points
usp
competitor_or_alternative
selling_intensity
platform
duration_seconds
cta
compliance_notes
language
```

Bản field thực dụng:

```text
Tên sản phẩm
Danh mục
Giá bán
Khách hàng mục tiêu
Pain point
Lợi ích chính
USP / điểm khác biệt
Giọng văn
Phong cách bán hàng
Nền tảng
Độ dài video
CTA
Điều cần tránh
```

### Backend tasks

#### 1. Thêm endpoint phân tích sản phẩm

```http
POST /api/analyze/product
```

Response:

```json
{
  "product_type": "serum skincare",
  "target_customer_insight": "...",
  "main_pain_points": [],
  "buying_triggers": [],
  "content_angles": [],
  "risk_claims": [],
  "recommended_video_styles": []
}
```

#### 2. Thêm Compliance Agent đơn giản

Agent cần cảnh báo rủi ro cho các ngành:

```text
mỹ phẩm
sức khỏe
giảm cân
tài chính
mẹ và bé
```

Ví dụ với mỹ phẩm:

```text
Không nói trị nám dứt điểm
Không nói trắng bật tone sau 3 ngày
Không cam kết hiệu quả tuyệt đối
Ưu tiên từ: hỗ trợ, giúp da trông, có thể phù hợp, tham khảo
```

#### 3. Tích hợp analysis vào content generation

`/api/generate/content-kit` nên dùng product analysis để sinh nội dung chính xác hơn.

### Frontend tasks

```text
- Thêm field mới vào ProductForm
- Hiển thị phần "AI phân tích sản phẩm"
- Hiển thị compliance warning nếu có
- Cho phép user copy hoặc dùng analysis làm input cho bước sau
```

### Definition of Done

```text
- User nhập thông tin sản phẩm nâng cao
- Backend phân tích được pain point, buying trigger, risk claim
- Content Kit bớt chung chung hơn
- UI hiển thị cảnh báo claim rủi ro
```

---

## Phase 3 — Video Prompt Kit cho Kling / Pika / Runway

### Mục tiêu

Sinh prompt video tốt cho các AI video generator, nhưng chưa cần gọi API tạo video thật.

Flow mong muốn:

```text
Product input + analysis
→ Shot list
→ Voiceover
→ Text overlay
→ Kling Prompt
→ Pika Prompt
→ Runway Prompt
→ User copy prompt sang tool ngoài
```

### Backend tasks

#### 1. Thêm endpoint video prompt

```http
POST /api/generate/video-prompts
```

Response:

```json
{
  "video_brief": {
    "goal": "affiliate conversion",
    "platform": "TikTok",
    "duration": 15,
    "style": "UGC review"
  },
  "shot_list": [
    {
      "time": "0-3s",
      "scene": "...",
      "text_overlay": "..."
    }
  ],
  "voiceover": "...",
  "text_overlays": [],
  "kling_prompt": "...",
  "pika_prompt": "...",
  "runway_prompt": "...",
  "negative_prompt": "...",
  "caption": "...",
  "hashtags": [],
  "compliance_warnings": []
}
```

#### 2. Prompt riêng cho từng provider

Kling prompt tập trung vào:

```text
realistic UGC
human hand
product demo
natural motion
Vietnamese creator style
9:16
```

Pika prompt tập trung vào:

```text
short viral motion
satisfying effect
fast hook
simple scene
```

Runway prompt tập trung vào:

```text
cinematic product ad
camera direction
lighting
composition
hero shot
```

### Frontend tasks

Thêm tab hoặc section:

```text
Video Prompt
```

Trong section này có:

```text
Kling Prompt    [Copy]
Pika Prompt     [Copy]
Runway Prompt   [Copy]
Negative Prompt [Copy]
Shot List
Voiceover
Text Overlay
```

### Không làm trong Phase 3

```text
Không upload ảnh
Không gọi Kling/Pika/Runway API
Không lưu video
Không polling trạng thái video
```

### Definition of Done

```text
- User nhập sản phẩm
- Tool sinh video prompt cho Kling/Pika/Runway
- Prompt có shot list, voiceover, overlay, negative prompt
- User copy prompt để dùng thủ công ở tool ngoài
```

---

## Phase 4 — Upload ảnh + Asset Management

### Mục tiêu

Cho phép user upload ảnh sản phẩm để chuẩn bị cho image-to-video workflow.

Flow mong muốn:

```text
Upload ảnh sản phẩm
→ Lưu Supabase Storage
→ Gắn asset vào project
→ Prompt video tham chiếu ảnh sản phẩm
```

### Frontend tasks

Thêm upload input:

```text
Ảnh sản phẩm
Ảnh lifestyle tham khảo
Ảnh before/after nếu có
```

Giới hạn MVP:

```text
1-5 ảnh
jpg/png/webp
max 5MB mỗi ảnh
```

### Backend tasks

Thêm route:

```http
POST /api/assets/upload
GET /api/assets/{asset_id}
DELETE /api/assets/{asset_id}
```

### Storage

Dùng Supabase Storage:

```text
bucket: product-assets
path: users/{user_id}/projects/{project_id}/{file_name}
```

### Database đề xuất

```sql
create table assets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  project_id uuid,
  type text not null,
  url text not null,
  mime_type text,
  file_size int,
  width int,
  height int,
  created_at timestamptz default now()
);
```

### Image analysis agent

Sau khi upload, có thể phân tích:

```text
Ảnh sản phẩm có nền gì?
Màu sắc sản phẩm?
Có chữ/logo không?
Sản phẩm phù hợp bối cảnh nào?
Ảnh có đủ chất lượng để gen video không?
```

### Definition of Done

```text
- User upload được ảnh sản phẩm
- Ảnh được lưu storage
- Asset gắn được vào project/input
- Video prompt có câu tham chiếu ảnh đã upload
```

---

## Phase 5 — Video Generation Workflow

### Mục tiêu

Gọi Kling/Pika/Runway hoặc provider trung gian để tạo video thật.

Không nên làm phase này trước Phase 3 và Phase 4 vì video API tốn tiền, mất thời gian, cần polling, retry và storage.

### Backend tasks

#### 1. Thêm video provider abstraction

```text
apps/api/app/providers/video/base.py
apps/api/app/providers/video/kling.py
apps/api/app/providers/video/pika.py
apps/api/app/providers/video/runway.py
```

Interface đề xuất:

```python
class VideoProvider:
    async def create_generation(...):
        ...

    async def get_status(...):
        ...

    async def download_result(...):
        ...
```

#### 2. Thêm route video generation

```http
POST /api/video-generations
GET /api/video-generations/{id}
GET /api/video-generations
POST /api/video-generations/{id}/retry
```

#### 3. Thêm trạng thái generation

```text
draft
queued
generating
completed
failed
cancelled
```

### Database đề xuất

```sql
create table video_generations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  project_id uuid,
  provider text not null,
  prompt text not null,
  negative_prompt text,
  input_asset_ids uuid[],
  provider_job_id text,
  status text not null default 'queued',
  output_url text,
  error_message text,
  cost_estimate numeric,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

### Frontend tasks

Thêm UI:

```text
Chọn prompt
Chọn provider: Kling / Pika / Runway
Bấm Generate Video
Xem trạng thái
Preview video
Download
Copy caption
```

### Definition of Done

```text
- User chọn provider và prompt
- Backend tạo video generation job
- UI xem được trạng thái
- Khi xong, user preview/download video
```

---

## Phase 6 — Project History + Analytics + Monetization

### Mục tiêu

Biến tool từ demo thành SaaS nhỏ có lưu lịch sử, đo usage và có gói trả phí.

### Project entity

```sql
create table projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  name text not null,
  product_name text not null,
  category text,
  price text,
  target_audience text,
  input jsonb,
  status text default 'active',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

### Generation entity

```sql
create table generations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  project_id uuid,
  type text not null,
  prompt_version text,
  input jsonb,
  output jsonb,
  created_at timestamptz default now()
);
```

### Analytics events

Mở rộng tracking:

```text
copy_hook
copy_script
copy_caption
copy_video_prompt
generate_content_kit
generate_video_prompt
generate_video
download_video
feedback_good
feedback_bad
```

### Usage / quota

Gợi ý quota:

```text
Free:
- 20 content kits/tháng
- Không có video generation

Starter:
- 300 content kits/tháng
- 50 video prompts/tháng
- Lưu project

Pro:
- 2,000 content kits/tháng
- Video provider integration
- Batch generate
- Analytics
```

### Definition of Done

```text
- User lưu được project
- Xem lại lịch sử generation
- Có usage counter
- Có giới hạn quota theo plan
- Có analytics event cơ bản
```

---

## Phase 7 — Scale thành tool mạnh hơn

### Mục tiêu

Tạo lợi thế cạnh tranh so với tool viết content chung chung.

### Tính năng nâng cấp

#### 1. Batch generate

```text
1 sản phẩm → 30 video ideas
```

#### 2. Prompt variants

```text
Soft sell
Hard sell
UGC review
Problem-solution
Before-after safe
Unboxing
Comparison
Lifestyle
Viral hook
```

#### 3. Winning prompt memory

Cho user đánh dấu output hiệu quả:

```text
High CTR
High copy rate
High conversion
Good retention
```

Sau đó agent ưu tiên pattern đã thắng.

#### 4. TikTok Shop compliance mode

Tối ưu riêng cho các nhóm rủi ro:

```text
mỹ phẩm
sức khỏe
giảm cân
tài chính
mẹ và bé
```

#### 5. CapCut export pack

MVP chưa cần tích hợp CapCut API. Chỉ cần export package:

```text
video clips
voiceover text
overlay text
caption
hashtag
shot list
```

### Definition of Done

```text
- Tool tạo được nhiều biến thể nội dung
- Có memory cho output hiệu quả
- Có compliance mode theo ngành
- Có export pack hỗ trợ dựng trên CapCut
```

---

## Thứ tự ưu tiên khuyến nghị

```text
1. Phase 1: Content Kit all-in-one
2. Phase 2: Product Analysis + Compliance
3. Phase 3: Video Prompt Kit
4. Phase 4: Upload ảnh
5. Phase 5: Video Generation
6. Phase 6: Project history + usage
7. Phase 7: Scale features
```

---

## MVP 7 ngày đầu

### Ngày 1

```text
Thêm /api/generate/content-kit
Thêm ContentKitResponse schema
Thêm build_content_kit_prompt
```

### Ngày 2

```text
Thêm generate_content_kit trong OpenAIProvider và AIService
Parse JSON output ổn định
Test API bằng payload serum vitamin C
```

### Ngày 3

```text
Thêm generateContentKit trong frontend api-client
Cập nhật use-generation
Đổi button thành Tạo Content Kit
```

### Ngày 4

```text
Tạo ContentKitResults component
Hiển thị section: summary, angles, hooks, scripts, captions, hashtags, CTAs, calendar
```

### Ngày 5

```text
Thêm copy button cho từng item
Track copy event theo content type
Thêm error state frontend
```

### Ngày 6

```text
Tinh chỉnh prompt để output bớt chung chung
Thêm safety wording cho mỹ phẩm/sức khỏe/tài chính
Test 5 sản phẩm mẫu
```

### Ngày 7

```text
Dọn code
Update README demo flow
Chuẩn bị demo MVP
```

Sau 7 ngày, app cần đạt:

```text
Nhập sản phẩm
→ Gọi OpenAI thật
→ Tạo Content Kit đầy đủ
→ Copy được nội dung
→ Demo được cho affiliate/TikTok Shop seller
```
