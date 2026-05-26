"use client";

import { useState } from "react";
import { OutputCard } from "@/components/output-card";
import { ProductForm } from "@/components/product-form";
import { useGeneration } from "@/hooks/use-generation";

type Language = "vi" | "en";

const copy = {
  vi: {
    brand: "TrendGenius AI",
    nav: {
      dashboard: "Dashboard",
      pricing: "Bảng giá",
      settings: "Cài đặt",
      create: "Tạo mới"
    },
    badge: "TikTok Shop Việt Nam",
    titleA: "Biến một sản phẩm thành nội dung bán hàng",
    titleB: "trong vài giây",
    subtitle: "Nhập thông tin sản phẩm để tạo hook, script, caption và ý tưởng đăng bài cho seller hoặc affiliate.",
    language: "Ngôn ngữ",
    resultTitle: "Kết quả tạo nội dung",
    resultCount: (count: number) => count ? `${count} nội dung đã tạo` : "Chưa có nội dung",
    loading: "Đang tạo nội dung, vui lòng chờ...",
    emptyTitle: "Nội dung sẽ xuất hiện tại đây",
    emptyText: "Điền thông tin sản phẩm ở bên trái, sau đó bấm tạo để xem kết quả mà không làm kéo dài toàn bộ trang.",
    provider: "OpenAI",
    output: {
      copy: "Copy",
      copied: "Đã copy",
      save: "Lưu",
      feedback: "Góp ý"
    },
    form: {
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
        benefitsPlaceholder: "Ví dụ: Dưỡng da trước ánh sáng mặt trời mùa hè",
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
    }
  },
  en: {
    brand: "TrendGenius AI",
    nav: {
      dashboard: "Dashboard",
      pricing: "Pricing",
      settings: "Settings",
      create: "Create New"
    },
    badge: "TikTok Shop Vietnam",
    titleA: "Turn one product into selling content",
    titleB: "in seconds",
    subtitle: "Enter product details to generate hooks, scripts, captions, and posting ideas for sellers or affiliates.",
    language: "Language",
    resultTitle: "Generated content",
    resultCount: (count: number) => count ? `${count} items generated` : "No content yet",
    loading: "Generating content, please wait...",
    emptyTitle: "Your content will appear here",
    emptyText: "Fill in the product form on the left, then generate results without stretching the entire page.",
    provider: "OpenAI",
    output: {
      copy: "Copy",
      copied: "Copied",
      save: "Save",
      feedback: "Feedback"
    },
    form: {
      fields: {
        productName: "Product name",
        productNamePlaceholder: "Example: Brightening vitamin C serum",
        category: "Category",
        categoryPlaceholder: "Example: Beauty",
        price: "Price",
        pricePlaceholder: "Example: 199,000 VND",
        audience: "Target audience",
        audiencePlaceholder: "Example: Office women aged 25-35",
        benefits: "Main benefits",
        benefitsPlaceholder: "Example: Summer sun protection and hydration",
        tone: "Tone"
      },
      tones: {
        friendly: "Friendly",
        expert: "Professional",
        urgent: "Urgent, conversion-focused",
        playful: "Playful, trend-aware"
      },
      submit: "Generate selling hooks",
      loading: "Generating content..."
    }
  }
};

export default function HomePage() {
  const [language, setLanguage] = useState<Language>("vi");
  const { items, isLoading, generate } = useGeneration();
  const t = copy[language];

  return (
    <main className="min-h-screen bg-background text-on-background">
      <nav className="fixed top-0 z-50 w-full border-b border-outline-variant bg-surface/90 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-container-max items-center justify-between px-4 md:px-10">
          <div className="flex items-center gap-8">
            <div className="whitespace-nowrap text-xl font-bold text-primary">{t.brand}</div>
            <div className="hidden items-center gap-6 md:flex">
              <a className="border-b-2 border-primary pb-1 text-sm font-semibold text-primary" href="#">{t.nav.dashboard}</a>
              <a className="text-sm font-semibold text-on-surface-variant transition hover:text-primary" href="/pricing">{t.nav.pricing}</a>
              <a className="text-sm font-semibold text-on-surface-variant transition hover:text-primary" href="/settings">{t.nav.settings}</a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center rounded-lg border border-outline-variant bg-surface-container-lowest p-1 sm:flex">
              <button className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${language === "vi" ? "bg-primary text-white" : "text-on-surface-variant hover:bg-surface-container-low"}`} onClick={() => setLanguage("vi")}>VI</button>
              <button className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${language === "en" ? "bg-primary text-white" : "text-on-surface-variant hover:bg-surface-container-low"}`} onClick={() => setLanguage("en")}>EN</button>
            </div>
            <button className="hidden h-9 w-9 items-center justify-center rounded-lg text-on-surface-variant transition hover:bg-surface-container-low md:flex">
              <span className="material-symbols-outlined text-[22px]">notifications</span>
            </button>
            <button className="hidden h-9 w-9 items-center justify-center rounded-lg text-on-surface-variant transition hover:bg-surface-container-low md:flex">
              <span className="material-symbols-outlined text-[22px]">account_circle</span>
            </button>
            <button className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-surface-tint">{t.nav.create}</button>
          </div>
        </div>
      </nav>

      <section className="mx-auto w-full max-w-container-max px-4 pb-10 pt-20 md:px-10">
        <div className="mb-8 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-tertiary-container">
              <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
              {t.badge}
            </p>
            <h1 className="max-w-4xl text-4xl font-bold leading-tight text-on-surface md:text-5xl">
              {t.titleA} <span className="ai-gradient-text">{t.titleB}</span>
            </h1>
            <p className="mt-3 max-w-2xl text-lg leading-7 text-on-surface-variant">{t.subtitle}</p>
          </div>
          <div className="flex items-center gap-2 sm:hidden">
            <span className="text-sm font-semibold text-on-surface-variant">{t.language}</span>
            <button className={`rounded-md px-3 py-1.5 text-xs font-semibold ${language === "vi" ? "bg-primary text-white" : "border border-outline-variant bg-white text-on-surface"}`} onClick={() => setLanguage("vi")}>VI</button>
            <button className={`rounded-md px-3 py-1.5 text-xs font-semibold ${language === "en" ? "bg-primary text-white" : "border border-outline-variant bg-white text-on-surface"}`} onClick={() => setLanguage("en")}>EN</button>
          </div>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <ProductForm copy={t.form} onSubmit={generate} isLoading={isLoading} />
          </div>

          <div className="lg:col-span-7">
            <div className="flex min-h-[668px] flex-col rounded-xl border border-outline-variant bg-surface-container-lowest shadow-sm lg:sticky lg:top-20">
              <div className="flex min-h-[85px] items-center justify-between rounded-t-xl border-b border-outline-variant bg-surface-container/30 px-6 py-4">
                <div>
                  <h2 className="text-2xl font-semibold text-on-surface">{t.resultTitle}</h2>
                  <p className="mt-1 text-sm text-on-surface-variant">{t.resultCount(items.length)}</p>
                </div>
                <div className="flex items-center gap-1.5 rounded-full border border-outline-variant/50 bg-surface-container-high px-3 py-1 text-xs font-semibold text-on-surface-variant">
                  <span className="material-symbols-outlined text-[14px]">psychology</span>
                  {t.provider}
                </div>
              </div>

              <div className="custom-scrollbar relative h-[582px] flex-grow overflow-y-auto p-6">
                {isLoading ? (
                  <div className="grid h-full place-items-center rounded-xl border-2 border-dashed border-outline-variant/60 bg-surface/60 text-center text-sm text-on-surface-variant">
                    <div className="glass-panel rounded-2xl p-8">
                      <div className="mx-auto mb-6 flex h-16 w-16 animate-pulse items-center justify-center rounded-full bg-surface-container-high text-primary">
                        <span className="material-symbols-outlined text-[32px]">auto_awesome</span>
                      </div>
                      {t.loading}
                    </div>
                  </div>
                ) : items.length ? (
                  <div className="grid gap-3">
                    {items.map((item) => <OutputCard key={item.id} item={item} labels={t.output} />)}
                  </div>
                ) : (
                  <div className="relative grid h-full place-items-center overflow-hidden rounded-xl border-2 border-dashed border-outline-variant/60 bg-surface/40 p-6 text-center">
                    <div className="glass-panel relative z-10 max-w-md rounded-2xl p-8">
                      <div className="mx-auto mb-6 flex h-16 w-16 animate-pulse items-center justify-center rounded-full bg-surface-container-high text-primary">
                        <span className="material-symbols-outlined text-[32px]">edit_document</span>
                      </div>
                      <h3 className="mb-3 text-2xl font-semibold text-on-surface">{t.emptyTitle}</h3>
                      <p className="leading-7 text-on-surface-variant">{t.emptyText}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

