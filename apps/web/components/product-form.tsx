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

  function update(field: keyof ProductInput, value: string) {
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
        <label className={labelClass}>{copy.fields.tone}</label>
        <select className={`${inputClass} cursor-pointer`} value={form.tone} onChange={(event) => update("tone", event.target.value)}>
          <option value="friendly">{copy.tones.friendly}</option>
          <option value="expert">{copy.tones.expert}</option>
          <option value="urgent">{copy.tones.urgent}</option>
          <option value="playful">{copy.tones.playful}</option>
        </select>
      </div>

      <button className="ai-magic-btn mt-auto flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-sm font-semibold text-white shadow-sm disabled:cursor-not-allowed disabled:opacity-60" disabled={isLoading}>
        <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
        {isLoading ? copy.loading : copy.submit}
      </button>
    </form>
  );
}
