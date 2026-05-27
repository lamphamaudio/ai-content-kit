"use client";

import { useState } from "react";
import type { ProductInput } from "@/types/product";

type ProductFormCopy = {
  fields: {
    productName: string;
    productNamePlaceholder: string;
    category: string;
    categoryPlaceholder: string;
    price: string;
    pricePlaceholder: string;
    audience: string;
    audiencePlaceholder: string;
    benefits: string;
    benefitsPlaceholder: string;
    painPoints: string;
    painPointsPlaceholder: string;
    usp: string;
    uspPlaceholder: string;
    competitor: string;
    competitorPlaceholder: string;
    sellingIntensity: string;
    platform: string;
    duration: string;
    cta: string;
    ctaPlaceholder: string;
    complianceNotes: string;
    complianceNotesPlaceholder: string;
    outputLanguage: string;
    tone: string;
  };
  tones: {
    friendly: string;
    expert: string;
    urgent: string;
    playful: string;
  };
  submit: string;
  loading: string;
};

const initialState: ProductInput = {
  product_name: "",
  category: "",
  price: "",
  target_audience: "",
  key_benefits: "",
  pain_points: "",
  usp: "",
  competitor_or_alternative: "",
  selling_intensity: "balanced",
  platform: "tiktok",
  duration_seconds: 30,
  cta: "",
  compliance_notes: "",
  language: "vi",
  tone: "friendly"
};

const defaultCopy: ProductFormCopy = {
  fields: {
    productName: "Tên sản phẩm",
    productNamePlaceholder: "Ví dụ: Serum vitamin C sáng da",
    category: "Danh mục",
    categoryPlaceholder: "Ví dụ: Làm đẹp",
    price: "Giá bán",
    pricePlaceholder: "Ví dụ: 199.000đ",
    audience: "Khách hàng mục tiêu",
    audiencePlaceholder: "Ví dụ: Nữ văn phòng 25-35 tuổi",
    benefits: "Lợi ích chính",
    benefitsPlaceholder: "Ví dụ: Dưỡng sáng, thấm nhanh, không bết dính, hợp da dầu",
    painPoints: "Pain point khách hàng",
    painPointsPlaceholder: "Ví dụ: Da xỉn màu, da nhìn mệt khi ngồi văn phòng và đi nắng",
    usp: "USP / điểm khác biệt",
    uspPlaceholder: "Ví dụ: Texture nhẹ, dễ dùng buổi sáng, hợp người bận rộn",
    competitor: "Sản phẩm thay thế / đối thủ",
    competitorPlaceholder: "Ví dụ: Serum vitamin C giá cao hơn hoặc dễ gây bết dính",
    sellingIntensity: "Phong cách bán hàng",
    platform: "Nền tảng",
    duration: "Độ dài video",
    cta: "CTA mong muốn",
    ctaPlaceholder: "Ví dụ: Xem sản phẩm ở giỏ hàng",
    complianceNotes: "Điều cần tránh / compliance notes",
    complianceNotesPlaceholder: "Ví dụ: Không claim trị nám, không cam kết trắng da nhanh",
    outputLanguage: "Ngôn ngữ đầu ra",
    tone: "Giọng văn"
  },
  tones: {
    friendly: "Thân thiện",
    expert: "Chuyên nghiệp",
    urgent: "Khan hiếm, thúc đẩy hành động",
    playful: "Hài hước, bắt trend"
  },
  submit: "Tạo hook bán hàng",
  loading: "Đang tạo nội dung..."
};

export function ProductForm({
  copy = defaultCopy,
  onSubmit,
  isLoading = false
}: {
  copy?: ProductFormCopy;
  onSubmit: (payload: ProductInput) => void;
  isLoading?: boolean;
}) {
  const [form, setForm] = useState<ProductInput>(initialState);

  function update(field: keyof ProductInput, value: string | number | null) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  const inputClass = "w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-4 py-3 text-body-md text-on-surface outline-none transition placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/20";
  const labelClass = "mb-2 block text-sm font-semibold text-on-surface";

  return (
    <form
      className="flex min-h-[668px] flex-col gap-5 rounded-xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(form);
      }}
    >
      <div>
        <label className={labelClass}>{copy.fields.productName}</label>
        <input className={inputClass} placeholder={copy.fields.productNamePlaceholder} value={form.product_name} onChange={(event) => update("product_name", event.target.value)} required />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>{copy.fields.category}</label>
          <input className={inputClass} placeholder={copy.fields.categoryPlaceholder} value={form.category} onChange={(event) => update("category", event.target.value)} required />
        </div>
        <div>
          <label className={labelClass}>{copy.fields.price}</label>
          <input className={inputClass} placeholder={copy.fields.pricePlaceholder} value={form.price} onChange={(event) => update("price", event.target.value)} />
        </div>
      </div>

      <div>
        <label className={labelClass}>{copy.fields.audience}</label>
        <input className={inputClass} placeholder={copy.fields.audiencePlaceholder} value={form.target_audience} onChange={(event) => update("target_audience", event.target.value)} />
      </div>

      <div>
        <label className={labelClass}>{copy.fields.benefits}</label>
        <textarea className={`${inputClass} min-h-28 resize-none`} placeholder={copy.fields.benefitsPlaceholder} value={form.key_benefits} onChange={(event) => update("key_benefits", event.target.value)} />
      </div>

      <div>
        <label className={labelClass}>{copy.fields.painPoints}</label>
        <textarea className={`${inputClass} min-h-24 resize-none`} placeholder={copy.fields.painPointsPlaceholder} value={form.pain_points} onChange={(event) => update("pain_points", event.target.value)} />
      </div>

      <div>
        <label className={labelClass}>{copy.fields.usp}</label>
        <textarea className={`${inputClass} min-h-24 resize-none`} placeholder={copy.fields.uspPlaceholder} value={form.usp} onChange={(event) => update("usp", event.target.value)} />
      </div>

      <div>
        <label className={labelClass}>{copy.fields.competitor}</label>
        <input className={inputClass} placeholder={copy.fields.competitorPlaceholder} value={form.competitor_or_alternative} onChange={(event) => update("competitor_or_alternative", event.target.value)} />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className={labelClass}>{copy.fields.sellingIntensity}</label>
          <select className={`${inputClass} cursor-pointer`} value={form.selling_intensity} onChange={(event) => update("selling_intensity", event.target.value)}>
            <option value="balanced">Balanced</option>
            <option value="soft">Soft</option>
            <option value="aggressive">Aggressive</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>{copy.fields.platform}</label>
          <select className={`${inputClass} cursor-pointer`} value={form.platform} onChange={(event) => update("platform", event.target.value)}>
            <option value="tiktok">TikTok</option>
            <option value="facebook_reels">Facebook Reels</option>
            <option value="youtube_shorts">YouTube Shorts</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>{copy.fields.duration}</label>
          <select className={`${inputClass} cursor-pointer`} value={form.duration_seconds ?? ""} onChange={(event) => update("duration_seconds", event.target.value ? Number(event.target.value) : null)}>
            <option value="">Auto</option>
            <option value="15">15s</option>
            <option value="30">30s</option>
            <option value="60">60s</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>{copy.fields.cta}</label>
        <input className={inputClass} placeholder={copy.fields.ctaPlaceholder} value={form.cta} onChange={(event) => update("cta", event.target.value)} />
      </div>

      <div>
        <label className={labelClass}>{copy.fields.complianceNotes}</label>
        <textarea className={`${inputClass} min-h-24 resize-none`} placeholder={copy.fields.complianceNotesPlaceholder} value={form.compliance_notes} onChange={(event) => update("compliance_notes", event.target.value)} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>{copy.fields.outputLanguage}</label>
          <select className={`${inputClass} cursor-pointer`} value={form.language} onChange={(event) => update("language", event.target.value)}>
            <option value="vi">VI</option>
            <option value="en">EN</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>{copy.fields.tone}</label>
          <select className={`${inputClass} cursor-pointer`} value={form.tone} onChange={(event) => update("tone", event.target.value)}>
            <option value="friendly">{copy.tones.friendly}</option>
            <option value="expert">{copy.tones.expert}</option>
            <option value="urgent">{copy.tones.urgent}</option>
            <option value="playful">{copy.tones.playful}</option>
          </select>
        </div>
      </div>

      <button className="ai-magic-btn mt-auto flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-sm font-semibold text-white shadow-sm disabled:cursor-not-allowed disabled:opacity-60" disabled={isLoading}>
        <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
        {isLoading ? copy.loading : copy.submit}
      </button>
    </form>
  );
}
