# Phase 2 Test Notes

Phase 2 adds an Affiliate Intelligence / Product Analysis Agent before content-kit generation.

## What Changed

- `ProductCreate` accepts extended product context: pain points, USP, competitor/alternative, selling intensity, platform, duration, CTA, compliance notes, and output language.
- `POST /api/analyze/product` returns structured product analysis.
- `POST /api/generate/content-kit` now runs product analysis first and includes `analysis` in the content-kit response.
- The frontend product form includes Phase 2 fields.
- The frontend result area includes an `AI phan tich` / `AI Analysis` tab with compliance warnings.

## Run Tests

```bash
cd apps/api
.\.venv\Scripts\python.exe -m pytest
```

Contract tests use a fake AI service and do not call OpenAI.

Important backend tests:

- `test_analyze_product_response_shape`
- `test_generate_content_kit_includes_analysis`
- `test_existing_generate_hooks_endpoint_still_works`

## Start Backend

From repo root:

```bash
.\apps\api\.venv\Scripts\python.exe -m uvicorn app.main:app --app-dir apps/api --reload --port 8000
```

Requires a valid `.env` with:

```env
AI_PROVIDER=openai
OPENAI_API_KEY=...
OPENAI_MODEL=gpt-4.1-mini
```

## Sample Payload

```json
{
  "product_name": "Serum vitamin C sang da",
  "category": "Lam dep",
  "price": "199.000d",
  "target_audience": "Nu van phong 25-35 tuoi",
  "pain_points": "Da xin mau, da nhin met khi ngoi van phong va di nang",
  "key_benefits": "Duong da truoc anh sang mat troi mua he, giup da trong tuoi hon, tham nhanh, khong bet dinh",
  "usp": "Texture nhe, de dung buoi sang, hop nguoi ban ron",
  "competitor_or_alternative": "Cac serum vitamin C gia cao hon hoac de gay bet dinh",
  "selling_intensity": "balanced",
  "platform": "tiktok",
  "duration_seconds": 30,
  "cta": "Xem san pham o gio hang",
  "compliance_notes": "Khong claim tri nam, khong cam ket trang da nhanh",
  "language": "vi",
  "tone": "friendly"
}
```

## Test Product Analysis

```bash
curl -X POST http://127.0.0.1:8000/api/analyze/product ^
  -H "Content-Type: application/json" ^
  -d "{\"product_name\":\"Serum vitamin C sang da\",\"category\":\"Lam dep\",\"price\":\"199.000d\",\"target_audience\":\"Nu van phong 25-35 tuoi\",\"pain_points\":\"Da xin mau, da nhin met khi ngoi van phong va di nang\",\"key_benefits\":\"Duong da truoc anh sang mat troi mua he, giup da trong tuoi hon, tham nhanh, khong bet dinh\",\"usp\":\"Texture nhe, de dung buoi sang, hop nguoi ban ron\",\"competitor_or_alternative\":\"Cac serum vitamin C gia cao hon hoac de gay bet dinh\",\"selling_intensity\":\"balanced\",\"platform\":\"tiktok\",\"duration_seconds\":30,\"cta\":\"Xem san pham o gio hang\",\"compliance_notes\":\"Khong claim tri nam, khong cam ket trang da nhanh\",\"language\":\"vi\",\"tone\":\"friendly\"}"
```

Expected response shape:

```json
{
  "product_type": "string",
  "target_customer_insight": "string",
  "main_pain_points": ["string"],
  "buying_triggers": ["string"],
  "content_angles": ["string"],
  "risk_claims": ["string"],
  "recommended_video_styles": ["string"],
  "compliance_notes": ["string"]
}
```

## Test Content Kit

```bash
curl -X POST http://127.0.0.1:8000/api/generate/content-kit ^
  -H "Content-Type: application/json" ^
  -d "{\"product_name\":\"Serum vitamin C sang da\",\"category\":\"Lam dep\",\"price\":\"199.000d\",\"target_audience\":\"Nu van phong 25-35 tuoi\",\"pain_points\":\"Da xin mau, da nhin met khi ngoi van phong va di nang\",\"key_benefits\":\"Duong da truoc anh sang mat troi mua he, giup da trong tuoi hon, tham nhanh, khong bet dinh\",\"usp\":\"Texture nhe, de dung buoi sang, hop nguoi ban ron\",\"competitor_or_alternative\":\"Cac serum vitamin C gia cao hon hoac de gay bet dinh\",\"selling_intensity\":\"balanced\",\"platform\":\"tiktok\",\"duration_seconds\":30,\"cta\":\"Xem san pham o gio hang\",\"compliance_notes\":\"Khong claim tri nam, khong cam ket trang da nhanh\",\"language\":\"vi\",\"tone\":\"friendly\"}"
```

Expected: the content-kit response includes the normal Phase 1 fields plus:

```json
{
  "analysis": {
    "product_type": "string",
    "target_customer_insight": "string",
    "main_pain_points": ["string"],
    "buying_triggers": ["string"],
    "content_angles": ["string"],
    "risk_claims": ["string"],
    "recommended_video_styles": ["string"],
    "compliance_notes": ["string"]
  }
}
```

## Risk Claims To Avoid

For beauty, health, weight loss, finance, baby/mom, supplements, and skincare content, avoid claims like:

- `tri nam dut diem`
- `trang sau 3 ngay`
- `hieu qua 100%`
- `cam ket khoi`
- `chac chan kiem tien`
- guaranteed or medical-style results without proof

Prefer cautious wording such as:

- `ho tro`
- `giup da trong`
- `co the phu hop`
- `tham khao`
- `ket qua tuy co dia va cach su dung`
