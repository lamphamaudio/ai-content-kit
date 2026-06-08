# AI Content Kit Roadmap

Roadmap này định hướng `ai-content-kit` thành một tool AI cho TikTok Shop seller và affiliate creator: nhập thông tin sản phẩm, nhận phân tích bán hàng, bộ nội dung, prompt video, rồi sau đó mới tiến tới tạo video thật.

Mục tiêu sản phẩm cuối cùng:

```text
Nhập thông tin sản phẩm + ảnh
→ AI phân tích sản phẩm, khách hàng, pain point, buying trigger, rủi ro claim
→ Sinh content kit: angle, hook, script, caption, hashtag, CTA, lịch đăng
→ Sinh video prompt cho Kling / Pika / Runway / CapCut workflow
→ Gọi một AI video provider thử nghiệm
→ Lưu video draft + nội dung đăng TikTok Shop
→ Theo dõi usage, lịch sử project, copy events, feedback và hiệu quả nội dung
```

## Vì sao thứ tự này hợp lý

Roadmap được chỉnh theo 4 thực tế thị trường và kỹ thuật:

1. TikTok Shop và TikTok Ads kiểm soát mạnh misleading claims, prohibited products, AI-generated content disclosure và các ngành rủi ro như beauty, health, weight management, finance, mom/baby.
2. AI video API là workflow bất đồng bộ, tốn tiền, có trạng thái job, retry, polling/callback và output URL có thể hết hạn. Vì vậy không nên gọi video provider thật trước khi có user, quota, storage và lịch sử job.
3. Video prompt thủ công là bước MVP tốt: user có thể copy prompt sang Kling/Pika/Runway/CapCut ngay, trong khi sản phẩm vẫn tránh chi phí API video.
4. Lợi thế cạnh tranh không nằm ở "generate text" đơn giản, mà ở product analysis, compliance, workflow cho TikTok Shop, reusable prompt memory và project history.

Nguồn kiểm tra:

```text
- TikTok Shop Prohibited Products Policy: https://seller-us.tiktok.com/university/essay?from=policy&identity=1&is_new_connect=0&is_new_user=0&knowledge_id=1399532709988097&role=1
- TikTok AI-generated content disclosure: https://support.tiktok.com/en/using-tiktok/creating-videos/ai-generated-content
- TikTok Shop developer ecosystem: https://developers.tiktok.com/blog/tiktok-shop-developer-updates
- OpenAI Structured Outputs: https://developers.openai.com/api/docs/guides/structured-outputs
- Runway API and output lifecycle: https://docs.dev.runwayml.com/api and https://docs.dev.runwayml.com/assets/outputs
- Kling API: https://kling.ai/document-api/apiReference/model/imageToVideo
- Pika API: https://dev.pika.art/docs/api-reference/generate-turbo-i2v
- Supabase platform docs: https://supabase.com/docs
- Supabase Storage: https://supabase.com/docs/guides/storage
```

## Nguyên tắc sản phẩm

```text
- Compliance là core feature, không phải ghi chú phụ.
- Luôn có prompt_version và response schema rõ ràng.
- Tạo nội dung có thể copy dùng ngay, nhưng tránh claim quá đà.
- Video generation thật chỉ chạy sau khi có quota, storage và trạng thái job.
- Ưu tiên một provider video pilot trước, không tích hợp 3 provider cùng lúc.
- Hỗ trợ workflow thủ công với CapCut/TikTok/Symphony, không chỉ Kling/Pika/Runway.
- Mỗi khi hoàn thành một phase hoặc một phần đáng kể, phải tạo file Markdown riêng trong docs để ghi lại scope, thay đổi, API/schema, test, quyết định kỹ thuật và việc còn lại.
```

## Kiến trúc mặc định

Quay lại dùng Supabase làm backend platform chính:

```text
- Supabase Auth: đăng nhập, user identity, session.
- Supabase Postgres: database chính cho users, projects, generations, usage, events, assets metadata, video jobs.
- Supabase Storage: lưu ảnh sản phẩm, video output, export files.
- Supabase RLS: bảo vệ mọi bảng user-owned trong public schema.
- Supabase migrations: quản lý schema thay vì sửa database thủ công.
```

Chroma không thay thế database chính. Nếu sau này cần AI memory/vector search, ưu tiên một trong hai hướng:

```text
- Dùng pgvector/Supabase Vector trong Postgres để giảm số hệ thống phải vận hành.
- Hoặc dùng Chroma như lớp vector memory riêng, nhưng chỉ sau khi Postgres schema ổn định.
```

## Luật ghi tài liệu sau khi hoàn thành

Sau mỗi phase hoặc mỗi phần đáng kể, bắt buộc tách tài liệu thành file `.md` riêng trong `docs/`. Không dồn toàn bộ chi tiết vào roadmap.

Quy ước file:

```text
docs/phases/phase-01-content-kit.md
docs/phases/phase-02-product-analysis-compliance.md
docs/phases/phase-03-supabase-foundation.md
docs/phases/phase-04-asset-upload.md
docs/phases/phase-05-video-prompt-kit.md
docs/phases/phase-06-video-generation-pilot.md
docs/phases/phase-07-monetization-scale.md
```

Với các phần nhỏ nằm trong một phase, dùng file riêng theo feature:

```text
docs/features/supabase-auth.md
docs/features/usage-quota.md
docs/features/openai-structured-outputs.md
docs/features/video-prompt-schema.md
docs/features/compliance-agent.md
```

Mỗi file hoàn thành phải có tối thiểu:

```text
- Mục tiêu
- Scope đã làm
- Files/API/schema đã thay đổi
- Payload/response mẫu nếu có API
- Cách test thủ công
- Test tự động đã chạy
- Quyết định kỹ thuật quan trọng
- Rủi ro hoặc việc còn lại
```

Rule này áp dụng cho cả code backend, frontend, database migration, prompt/schema AI, Supabase setup, storage, compliance, và video workflow.

---

## Phase 1 — Text Content Kit MVP

### Mục tiêu

Từ một form nhập sản phẩm, tạo ra một bộ content affiliate hoàn chỉnh bằng OpenAI thật.

Flow:

```text
Product form
→ POST /api/generate/content-kit
→ OpenAI generate structured JSON
→ Frontend hiển thị theo section/tab
→ User copy từng nội dung
```

### Input cơ bản

```text
product_name
category
price
target_audience
key_benefits
tone
language
```

### Backend tasks

```text
- Giữ các endpoint cũ: /hooks, /scripts, /captions, /calendar.
- Thêm POST /api/generate/content-kit.
- Tạo ContentKitRequest và ContentKitResponse.
- Output gồm product_summary, angles, hooks, scripts, captions, hashtags, ctas, calendar.
- Dùng OpenAI Responses API.
- Ưu tiên Structured Outputs / JSON schema thay vì chỉ prompt "return valid JSON".
- Nếu provider thiếu id cho item, backend tự sinh id.
```

### Frontend tasks

```text
- ProductForm gửi payload sang /api/generate/content-kit.
- UI có tab/section cho summary, angles, hooks, scripts, captions, hashtags, CTAs, calendar.
- Mỗi item có nút copy.
- Có loading, error state và copy feedback.
```

### Definition of Done

```text
- Backend có POST /api/generate/content-kit.
- Response đúng schema.
- Frontend hiển thị đủ content kit.
- User copy được từng phần.
- Endpoint cũ không bị hỏng.
- Tests không gọi OpenAI thật.
```

---

## Phase 2 — Product Analysis + Compliance Agent

### Mục tiêu

Tool không chỉ viết content mà còn phân tích sản phẩm, khách hàng, buying trigger và rủi ro claim trước khi tạo content.

Flow:

```text
Product input
→ Product Analysis Agent
→ Customer Insight
→ Buying Triggers
→ Content Angles
→ Compliance Warnings
→ Content Kit tốt hơn và an toàn hơn
```

### Input mở rộng

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

### Backend tasks

```text
- Thêm POST /api/analyze/product.
- Tạo ProductAnalysisRequest riêng, không dùng nhầm GenerateRequest.
- Response gồm product_type, target_customer_insight, main_pain_points, buying_triggers, content_angles, risk_claims, recommended_video_styles, compliance_notes.
- /api/generate/content-kit chạy product analysis trước rồi mới build content prompt.
- Compliance Agent cảnh báo claim rủi ro theo category.
```

### Compliance scope

Nhóm cần kiểm soát kỹ:

```text
mỹ phẩm / skincare
sức khỏe
giảm cân / body shape
supplements
tài chính
mẹ và bé
sản phẩm có testimonial hoặc review cá nhân
```

Ví dụ wording an toàn hơn:

```text
- Dùng "hỗ trợ", "giúp da trông", "có thể phù hợp", "tham khảo".
- Tránh "trị dứt điểm", "trắng sau 3 ngày", "hiệu quả 100%", "cam kết khỏi", "chắc chắn kiếm tiền".
- Nếu nội dung có video/ảnh AI realistic, nhắc user bật AI-generated label khi đăng.
- Nếu nội dung là review/testimonial, không tạo trải nghiệm giả như "tôi đã dùng và khỏi" khi user không cung cấp trải nghiệm thật.
```

### Frontend tasks

```text
- Thêm field nâng cao vào ProductForm.
- Hiển thị tab "AI phân tích".
- Hiển thị risk_claims và compliance_notes nổi bật.
- Cho phép copy analysis để dùng cho video prompt hoặc brief cho creator.
```

### Definition of Done

```text
- User nhập thông tin sản phẩm nâng cao.
- Backend phân tích được pain point, buying trigger, content angle, risk claim.
- Content Kit dùng analysis làm ngữ cảnh.
- UI hiển thị cảnh báo claim rủi ro.
- Test contract cover response shape.
```

---

## Phase 3 — Supabase Foundation: Auth, Postgres, Project History, Usage

### Mục tiêu

Trước khi gọi video API tốn tiền, app cần có nền tảng SaaS tối thiểu bằng Supabase: Auth, Postgres, project history, usage và quota.

Flow:

```text
User đăng nhập
→ Tạo project sản phẩm
→ Generate content / analysis / video prompt
→ Lưu input + output + prompt_version
→ Track copy events và usage
→ Áp quota trước khi gọi AI provider
```

### Backend tasks

```text
- Kết nối Supabase Auth.
- Dùng Supabase Postgres làm database chính.
- Tạo migration SQL trong supabase/migrations cho schema mới.
- Thêm bảng projects.
- Thêm bảng generations.
- Thêm bảng generated_items nếu cần query item-level.
- Thêm bảng copy_events / feedback_events.
- UsageService đọc usage thật từ database thay vì hardcode/mock.
- Mỗi generation lưu type, prompt_version, input, output, provider, model, token/cost estimate.
- Enable RLS cho mọi bảng user-owned.
- Policy phải dựa trên auth.uid(), không dựa vào user_metadata.
```

### Database đề xuất

```sql
create table projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  product_name text not null,
  category text,
  input jsonb not null default '{}',
  status text not null default 'active',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table generations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  project_id uuid references projects(id),
  type text not null,
  provider text,
  model text,
  prompt_version text,
  input jsonb not null default '{}',
  output jsonb not null default '{}',
  cost_estimate numeric,
  created_at timestamptz default now()
);

create table copy_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  generation_id uuid references generations(id),
  item_type text not null,
  item_id text,
  created_at timestamptz default now()
);
```

### Frontend tasks

```text
- Login/logout bằng Supabase Auth.
- Project list.
- Project detail với generation history.
- Usage counter.
- Copy event tracking.
```

### Definition of Done

```text
- User đăng nhập được.
- Mỗi lần generate được lưu vào history.
- Usage quota hoạt động theo user.
- User xem lại project và output cũ.
- Copy events được ghi lại.
- RLS chặn user đọc/sửa dữ liệu của user khác.
```

---

## Phase 4 — Asset Upload + Product Context

### Mục tiêu

Cho phép user upload ảnh sản phẩm vào Supabase Storage để chuẩn bị cho image-to-video workflow và giúp prompt/video brief cụ thể hơn.

Flow:

```text
Upload ảnh sản phẩm
→ Lưu Supabase Storage
→ Gắn asset vào project
→ AI phân tích ảnh
→ Video prompt tham chiếu ảnh thật
```

### Frontend tasks

```text
- Upload 1-5 ảnh sản phẩm.
- Preview ảnh.
- Chọn ảnh chính.
- Gắn ảnh vào project hiện tại.
- Hiển thị warning nếu ảnh có text/logo khó đọc hoặc chất lượng thấp.
```

### Backend tasks

```text
- POST /api/assets/upload.
- GET /api/assets/{asset_id}.
- DELETE /api/assets/{asset_id}.
- Lưu file vào Supabase Storage.
- Lưu metadata vào bảng assets trong Supabase Postgres.
- Dùng Supabase Storage policies/RLS để chỉ owner truy cập asset riêng.
- Optional: image analysis prompt để mô tả sản phẩm, màu sắc, nền, logo, text, bối cảnh phù hợp.
```

### Storage

```text
bucket: product-assets
path: users/{user_id}/projects/{project_id}/{asset_id}-{file_name}
```

### Database đề xuất

```sql
create table assets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  project_id uuid references projects(id),
  type text not null,
  storage_path text not null,
  public_url text,
  mime_type text,
  file_size int,
  width int,
  height int,
  analysis jsonb,
  created_at timestamptz default now()
);
```

### Definition of Done

```text
- User upload được ảnh.
- Ảnh được lưu vào storage.
- Asset metadata được lưu trong Supabase Postgres.
- Asset gắn với project.
- Prompt/video brief dùng được asset context.
- Không dùng before/after hoặc hình ảnh nhạy cảm để tạo claim rủi ro.
```

---

## Phase 5 — Video Prompt Kit cho Kling / Pika / Runway / CapCut

### Mục tiêu

Sinh prompt video tốt cho AI video generator, nhưng chưa gọi API tạo video thật. Đây là phase có giá trị ngay vì user có thể copy prompt sang tool ngoài.

Flow:

```text
Product input + analysis + assets
→ Shot list
→ Voiceover
→ Text overlays
→ Kling Prompt
→ Pika Prompt
→ Runway Prompt
→ CapCut/TikTok editing brief
→ User copy prompt sang tool ngoài
```

### Backend tasks

```text
- POST /api/generate/video-prompts.
- VideoPromptRequest mở rộng từ product input, có video_style, aspect_ratio, provider_focus.
- Endpoint chạy Product Analysis trước khi sinh prompt.
- Nếu có assets, đưa asset context vào prompt.
- Response có prompt_version và schema rõ ràng.
```

### Response shape

```json
{
  "type": "video-prompts",
  "prompt_version": "v2",
  "analysis": {
    "product_type": "...",
    "target_customer_insight": "...",
    "main_pain_points": [],
    "buying_triggers": [],
    "content_angles": [],
    "risk_claims": [],
    "recommended_video_styles": [],
    "compliance_notes": []
  },
  "video_brief": {
    "goal": "affiliate conversion",
    "platform": "TikTok",
    "duration_seconds": 30,
    "style": "UGC review",
    "aspect_ratio": "9:16"
  },
  "shot_list": [
    {
      "time": "0-3s",
      "scene": "...",
      "camera": "...",
      "motion": "...",
      "text_overlay": "...",
      "visual_notes": "..."
    }
  ],
  "voiceover": "...",
  "text_overlays": [],
  "kling_prompt": "...",
  "pika_prompt": "...",
  "runway_prompt": "...",
  "capcut_brief": "...",
  "negative_prompt": "...",
  "caption": "...",
  "hashtags": [],
  "compliance_warnings": []
}
```

### Provider prompt focus

```text
Kling:
- realistic UGC
- human hand / product demo
- natural motion
- Vietnamese creator style
- 9:16

Pika:
- short viral movement
- satisfying motion
- simple scene
- fast hook

Runway:
- cinematic product ad
- camera direction
- lighting
- composition
- hero shot

CapCut/TikTok:
- scene order
- captions/overlay
- voiceover
- product shot placement
- AI-generated label reminder when needed
```

### Non-goals

```text
- Không gọi Kling/Pika/Runway API.
- Không tạo video thật.
- Không polling.
- Không lưu video output.
```

### Definition of Done

```text
- Backend có schema VideoPromptRequest/VideoPromptResponse.
- UI có field video_style, aspect_ratio, provider_focus.
- User tạo Video Prompt riêng, không tự động gọi khi tạo Content Kit.
- UI hiển thị tab Video Prompt.
- Kling/Pika/Runway/CapCut prompts copy được.
- Shot list, voiceover, overlays, caption, hashtags hiển thị rõ.
- Compliance warning đi kèm output.
```

---

## Phase 6 — One-Provider Video Generation Pilot

### Mục tiêu

Gọi video API thật với một provider trước để kiểm chứng workflow, chi phí, lỗi, moderation và chất lượng output. Không tích hợp cả Kling/Pika/Runway cùng lúc.

Khuyến nghị chọn một:

```text
Runway nếu muốn SDK/API lifecycle rõ, task polling và output format ổn.
Kling nếu muốn tập trung image-to-video/product demo style.
Pika nếu product cần đúng hệ sinh thái Pika và đã có API access ổn định.
```

### Flow

```text
User chọn prompt + asset
→ Backend tạo video generation job
→ Provider trả task_id
→ Backend lưu task_id và status vào Supabase Postgres
→ Poll/callback cập nhật status
→ Khi xong, backend download output
→ Lưu vào Supabase Storage
→ User preview/download video
```

### Backend tasks

```text
- Tạo provider abstraction nhưng implement một provider đầu tiên.
- POST /api/video-generations.
- GET /api/video-generations/{id}.
- GET /api/video-generations.
- POST /api/video-generations/{id}/retry.
- Worker/polling job hoặc callback endpoint.
- Download output URL về Supabase Storage vì URL provider có thể hết hạn.
- Ghi cost_estimate, provider_job_id, status, failure_reason.
```

### Status model

```text
draft
queued
generating
completed
failed
cancelled
expired
```

### Database đề xuất

```sql
create table video_generations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  project_id uuid references projects(id),
  generation_id uuid references generations(id),
  provider text not null,
  provider_job_id text,
  prompt text not null,
  negative_prompt text,
  input_asset_ids uuid[],
  status text not null default 'queued',
  output_asset_id uuid references assets(id),
  output_url text,
  error_message text,
  cost_estimate numeric,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

### Frontend tasks

```text
- Chọn provider pilot.
- Chọn prompt và asset.
- Hiển thị cost/credit estimate trước khi generate.
- Xem trạng thái job.
- Preview video khi hoàn tất.
- Download video.
- Retry nếu failed.
```

### Definition of Done

```text
- Một provider video chạy được end-to-end.
- Có quota trước khi tạo job.
- Output video được lưu trong Supabase Storage.
- Có status/retry/error handling.
- Không mất output khi provider URL hết hạn.
```

---

## Phase 7 — Monetization + Scale

### Mục tiêu

Biến tool từ demo thành SaaS nhỏ có gói trả phí, batch workflow, analytics và lợi thế riêng cho TikTok Shop.

### Usage / quota đề xuất

```text
Free:
- 20 content kits/tháng
- 20 product analyses/tháng
- 10 video prompts/tháng
- Không có video generation thật

Starter:
- 300 content kits/tháng
- 300 product analyses/tháng
- 100 video prompts/tháng
- Lưu project
- Export CapCut/TikTok brief

Pro:
- 2,000 content kits/tháng
- 500 video prompts/tháng
- Video generation pilot credits
- Batch generate
- Analytics
- Winning prompt memory
```

### Scale features

```text
- Batch generate: 1 sản phẩm → 30 video ideas.
- Prompt variants: soft sell, hard sell, UGC review, problem-solution, unboxing, comparison, lifestyle, viral hook.
- Winning prompt memory: user đánh dấu output tốt để ưu tiên pattern đã thắng.
- Compliance mode theo ngành.
- TikTok Shop / CapCut export pack.
- Multi-provider video routing sau khi provider pilot ổn định.
```

### Analytics events

```text
generate_product_analysis
generate_content_kit
generate_video_prompt
generate_video
copy_hook
copy_script
copy_caption
copy_video_prompt
download_video
feedback_good
feedback_bad
```

### Definition of Done

```text
- Có plan/quota rõ.
- Có billing hoặc manual payment workflow.
- Có analytics dashboard cơ bản.
- Có batch generation.
- Có prompt memory.
- Có export pack hỗ trợ TikTok/CapCut workflow.
```

---

## Thứ tự ưu tiên khuyến nghị

```text
1. Phase 1: Text Content Kit MVP
2. Phase 2: Product Analysis + Compliance Agent
3. Phase 3: Supabase Auth + Postgres + Project History + Usage
4. Phase 4: Supabase Storage + Asset Upload + Product Context
5. Phase 5: Video Prompt Kit
6. Phase 6: One-Provider Video Generation Pilot
7. Phase 7: Monetization + Scale
```

## Việc nên làm ngay trong repo

```text
1. Chuẩn hóa chỉ còn một roadmap file: docs/ROADMAP.md.
2. Xóa hoặc rename docs/roadmap.md vì Windows đang bị conflict tên file chỉ khác hoa/thường.
3. Merge/hoàn thiện Phase 2 contract tests.
4. Hoàn thiện Phase 5 video prompt tests.
5. Đổi README/.env.example cho khớp với provider thật hoặc khôi phục mock provider.
6. Thêm Structured Outputs cho OpenAI response schema.
7. Chuẩn bị Supabase migrations cho projects, generations, assets, copy_events, video_generations trước khi làm video API thật.
8. Enable RLS và viết policies cho mọi bảng user-owned.
9. Tạo `docs/phases/` và `docs/features/`, rồi chuyển tài liệu phase/feature đã hoàn thành sang các file `.md` riêng.
```

## MVP tiếp theo

Trong 7-10 ngày tiếp theo, mục tiêu thực dụng là:

```text
- Phase 2 ổn định: ProductAnalysisRequest, tests, docs.
- Phase 5 video prompt thủ công chạy end-to-end.
- Có UI copy prompt cho Kling/Pika/Runway/CapCut.
- Có compliance warnings rõ trong Content Kit và Video Prompt.
- Có project/generation history tối thiểu hoặc ít nhất schema migration sẵn sàng.
```

Sau mốc này, app phải demo được:

```text
Nhập sản phẩm
→ AI phân tích sản phẩm và rủi ro claim
→ Tạo Content Kit đầy đủ
→ Tạo Video Prompt Kit
→ Copy prompt/content để dùng với TikTok Shop, CapCut, Kling, Pika hoặc Runway
```
