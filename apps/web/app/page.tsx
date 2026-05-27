"use client";

import { useMemo, useState } from "react";
import { ProductForm } from "@/components/product-form";
import { useGeneration } from "@/hooks/use-generation";
import type { ContentKitResponse } from "@/types/generation";

type Language = "vi" | "en";
type TabKey = "analysis" | "angles" | "hooks" | "scripts" | "captions" | "hashtags" | "ctas" | "calendar";

const tabs: Array<{ key: TabKey; vi: string; en: string }> = [
  { key: "analysis", vi: "AI phân tích", en: "AI Analysis" },
  { key: "angles", vi: "Góc bán", en: "Angles" },
  { key: "hooks", vi: "Hook", en: "Hooks" },
  { key: "scripts", vi: "Kịch bản", en: "Scripts" },
  { key: "captions", vi: "Caption", en: "Captions" },
  { key: "hashtags", vi: "Hashtag", en: "Hashtags" },
  { key: "ctas", vi: "CTA", en: "CTAs" },
  { key: "calendar", vi: "Lịch 7 ngày", en: "Calendar" }
];

const copy = {
  vi: {
    brand: "TrendGenius AI",
    nav: { dashboard: "Dashboard", pricing: "Bảng giá", settings: "Cài đặt", create: "Tạo mới" },
    badge: "TikTok Shop Việt Nam",
    titleA: "Biến một sản phẩm thành bộ nội dung bán hàng",
    titleB: "trong vài giây",
    subtitle: "Nhập thông tin sản phẩm một lần để tạo góc bán, hook, script, caption, hashtag, CTA và lịch đăng 7 ngày.",
    language: "Ngôn ngữ",
    resultTitle: "Full content kit",
    resultCount: (count: number) => count ? `${count} nhóm nội dung đã tạo` : "Chưa có nội dung",
    loading: "Đang tạo bộ nội dung, vui lòng chờ...",
    emptyTitle: "Content kit sẽ xuất hiện tại đây",
    emptyText: "Điền thông tin sản phẩm ở bên trái, sau đó bấm tạo để xem kết quả theo từng tab.",
    errorTitle: "Không tạo được nội dung",
    provider: "OpenAI",
    copyButton: "Copy",
    copiedButton: "Đã copy",
    productSummary: "Tóm tắt sản phẩm",
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
      submit: "Tạo full content kit",
      loading: "Đang tạo nội dung..."
    }
  },
  en: {
    brand: "TrendGenius AI",
    nav: { dashboard: "Dashboard", pricing: "Pricing", settings: "Settings", create: "Create New" },
    badge: "TikTok Shop Vietnam",
    titleA: "Turn one product into a complete selling kit",
    titleB: "in seconds",
    subtitle: "Enter product details once to generate angles, hooks, scripts, captions, hashtags, CTAs, and a 7-day calendar.",
    language: "Language",
    resultTitle: "Full content kit",
    resultCount: (count: number) => count ? `${count} content groups generated` : "No content yet",
    loading: "Generating your content kit, please wait...",
    emptyTitle: "Your content kit will appear here",
    emptyText: "Fill in the product form on the left, then generate results organized by tabs.",
    errorTitle: "Could not generate content",
    provider: "OpenAI",
    copyButton: "Copy",
    copiedButton: "Copied",
    productSummary: "Product summary",
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
        benefitsPlaceholder: "Example: Brightening, fast absorbing, non-sticky, suitable for oily skin",
        painPoints: "Customer pain points",
        painPointsPlaceholder: "Example: Dull skin, tired-looking skin after office work and sun exposure",
        usp: "USP / differentiation",
        uspPlaceholder: "Example: Lightweight texture, easy morning routine, good for busy users",
        competitor: "Alternative / competitor",
        competitorPlaceholder: "Example: Higher-priced vitamin C serums or sticky formulas",
        sellingIntensity: "Selling style",
        platform: "Platform",
        duration: "Video length",
        cta: "Desired CTA",
        ctaPlaceholder: "Example: View the product in the cart",
        complianceNotes: "Things to avoid / compliance notes",
        complianceNotesPlaceholder: "Example: Do not claim melasma treatment or fast whitening",
        outputLanguage: "Output language",
        tone: "Tone"
      },
      tones: {
        friendly: "Friendly",
        expert: "Professional",
        urgent: "Urgent, conversion-focused",
        playful: "Playful, trend-aware"
      },
      submit: "Generate full content kit",
      loading: "Generating content..."
    }
  }
};

function CopyableCard({ title, body, meta, copyLabel, copiedLabel }: { title?: string; body: string; meta?: string; copyLabel: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false);

  async function copyText() {
    await navigator.clipboard.writeText([title, meta, body].filter(Boolean).join("\n\n"));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <article className="rounded-xl border border-outline-variant bg-surface-container-lowest p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          {title ? <h3 className="font-semibold text-on-surface">{title}</h3> : null}
          {meta ? <p className="mt-1 text-xs font-medium uppercase tracking-wide text-on-surface-variant">{meta}</p> : null}
        </div>
        <button className="rounded-lg border border-outline-variant bg-white px-3 py-2 text-sm font-medium text-on-surface transition hover:bg-surface-container-low" onClick={copyText}>
          {copied ? copiedLabel : copyLabel}
        </button>
      </div>
      <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-on-surface">{body}</p>
    </article>
  );
}

export default function HomePage() {
  const [language, setLanguage] = useState<Language>("vi");
  const [activeTab, setActiveTab] = useState<TabKey>("angles");
  const { contentKit, error, isLoading, generate } = useGeneration();
  const t = copy[language];

  const generatedGroupCount = useMemo(() => {
    if (!contentKit) return 0;
    return tabs.filter((tab) => {
      const value = contentKit[tab.key];
      return Array.isArray(value) && value.length > 0;
    }).length;
  }, [contentKit]);

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
            <button className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-surface-tint">{t.nav.create}</button>
          </div>
        </div>
      </nav>

      <section className="mx-auto w-full max-w-container-max px-4 pb-10 pt-20 md:px-10">
        <div className="mb-8">
          <p className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-tertiary-container">
            <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
            {t.badge}
          </p>
          <h1 className="max-w-4xl text-4xl font-bold leading-tight text-on-surface md:text-5xl">
            {t.titleA} <span className="ai-gradient-text">{t.titleB}</span>
          </h1>
          <p className="mt-3 max-w-2xl text-lg leading-7 text-on-surface-variant">{t.subtitle}</p>
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
                  <p className="mt-1 text-sm text-on-surface-variant">{t.resultCount(generatedGroupCount)}</p>
                </div>
                <div className="flex items-center gap-1.5 rounded-full border border-outline-variant/50 bg-surface-container-high px-3 py-1 text-xs font-semibold text-on-surface-variant">
                  <span className="material-symbols-outlined text-[14px]">psychology</span>
                  {t.provider}
                </div>
              </div>

              {contentKit ? (
                <div className="border-b border-outline-variant px-6 py-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-on-surface-variant">{t.productSummary}</p>
                  <p className="mt-2 text-sm leading-6 text-on-surface">{contentKit.product_summary}</p>
                </div>
              ) : null}

              {contentKit ? (
                <div className="custom-scrollbar flex gap-2 overflow-x-auto border-b border-outline-variant px-6 py-3">
                  {tabs.filter((tab) => tab.key !== "analysis" || contentKit.analysis).map((tab) => (
                    <button key={tab.key} className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold transition ${activeTab === tab.key ? "bg-primary text-white" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high"}`} onClick={() => setActiveTab(tab.key)}>
                      {language === "vi" ? tab.vi : tab.en}
                    </button>
                  ))}
                </div>
              ) : null}

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
                ) : error ? (
                  <div className="rounded-xl border border-error/30 bg-error-container p-5 text-on-error-container">
                    <h3 className="font-semibold">{t.errorTitle}</h3>
                    <p className="mt-2 text-sm">{error}</p>
                  </div>
                ) : contentKit ? (
                  <ContentKitTab tab={activeTab} kit={contentKit} language={language} copyLabel={t.copyButton} copiedLabel={t.copiedButton} />
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

function listBody(items: string[]) {
  return items.map((item) => `- ${item}`).join("\n");
}

function ContentKitTab({ tab, kit, language, copyLabel, copiedLabel }: { tab: TabKey; kit: ContentKitResponse; language: Language; copyLabel: string; copiedLabel: string }) {
  if (tab === "analysis") {
    if (!kit.analysis) return null;
    const labels = language === "vi" ? {
      productType: "Loại sản phẩm",
      insight: "Insight khách hàng",
      painPoints: "Pain points",
      triggers: "Buying triggers",
      angles: "Content angles",
      risks: "Risk claims",
      styles: "Recommended video styles",
      compliance: "Compliance notes",
      warning: "Lưu ý compliance"
    } : {
      productType: "Product type",
      insight: "Customer insight",
      painPoints: "Pain points",
      triggers: "Buying triggers",
      angles: "Content angles",
      risks: "Risk claims",
      styles: "Recommended video styles",
      compliance: "Compliance notes",
      warning: "Compliance warning"
    };
    const complianceNotes = kit.analysis.compliance_notes ?? [];
    const warnings = [...kit.analysis.risk_claims, ...complianceNotes];
    return (
      <div className="grid gap-3">
        {warnings.length > 0 ? (
          <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-amber-950">
            <div className="flex items-center gap-2 font-semibold">
              <span className="material-symbols-outlined text-[20px]">warning</span>
              {labels.warning}
            </div>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6">
              {warnings.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}
            </ul>
          </div>
        ) : null}
        <CopyableCard title={labels.productType} body={kit.analysis.product_type} copyLabel={copyLabel} copiedLabel={copiedLabel} />
        <CopyableCard title={labels.insight} body={kit.analysis.target_customer_insight} copyLabel={copyLabel} copiedLabel={copiedLabel} />
        <CopyableCard title={labels.painPoints} body={listBody(kit.analysis.main_pain_points)} copyLabel={copyLabel} copiedLabel={copiedLabel} />
        <CopyableCard title={labels.triggers} body={listBody(kit.analysis.buying_triggers)} copyLabel={copyLabel} copiedLabel={copiedLabel} />
        <CopyableCard title={labels.angles} body={listBody(kit.analysis.content_angles)} copyLabel={copyLabel} copiedLabel={copiedLabel} />
        <CopyableCard title={labels.risks} body={listBody(kit.analysis.risk_claims)} copyLabel={copyLabel} copiedLabel={copiedLabel} />
        <CopyableCard title={labels.styles} body={listBody(kit.analysis.recommended_video_styles)} copyLabel={copyLabel} copiedLabel={copiedLabel} />
        {complianceNotes.length > 0 ? <CopyableCard title={labels.compliance} body={listBody(complianceNotes)} copyLabel={copyLabel} copiedLabel={copiedLabel} /> : null}
      </div>
    );
  }
  if (tab === "angles") {
    return <div className="grid gap-3">{kit.angles.map((item) => <CopyableCard key={item.id} title={item.title} meta={item.target_pain_point ?? undefined} body={item.description} copyLabel={copyLabel} copiedLabel={copiedLabel} />)}</div>;
  }
  if (tab === "hooks") {
    return <div className="grid gap-3">{kit.hooks.map((item) => <CopyableCard key={item.id} meta={item.style ?? undefined} body={item.content} copyLabel={copyLabel} copiedLabel={copiedLabel} />)}</div>;
  }
  if (tab === "scripts") {
    return <div className="grid gap-3">{kit.scripts.map((item) => <CopyableCard key={item.id} title={`${item.title} (${item.duration_seconds}s)`} body={`Hook: ${item.hook}\n\nVoiceover:\n${item.voiceover}\n\nShot list:\n- ${item.shot_list.join("\n- ")}\n\nText overlays:\n- ${item.text_overlays.join("\n- ")}\n\nCTA: ${item.cta}`} copyLabel={copyLabel} copiedLabel={copiedLabel} />)}</div>;
  }
  if (tab === "captions") {
    return <div className="grid gap-3">{kit.captions.map((item) => <CopyableCard key={item.id} meta={item.tone ?? undefined} body={item.content} copyLabel={copyLabel} copiedLabel={copiedLabel} />)}</div>;
  }
  if (tab === "hashtags") {
    return <CopyableCard body={kit.hashtags.join(" ")} copyLabel={copyLabel} copiedLabel={copiedLabel} />;
  }
  if (tab === "ctas") {
    return <div className="grid gap-3">{kit.ctas.map((item, index) => <CopyableCard key={`${item}-${index}`} body={item} copyLabel={copyLabel} copiedLabel={copiedLabel} />)}</div>;
  }
  return <div className="grid gap-3">{kit.calendar.map((item) => <CopyableCard key={item.id} title={`Day ${item.day}: ${item.content_type}`} body={`${item.idea}\n\nHook: ${item.hook}\nCTA: ${item.cta}`} copyLabel={copyLabel} copiedLabel={copiedLabel} />)}</div>;
}
