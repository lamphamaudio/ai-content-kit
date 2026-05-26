import type { GeneratedItem } from "@/types/generation";
import { CopyButton } from "./copy-button";
import { FeedbackButton } from "./feedback-button";

export function OutputCard({
  item,
  labels
}: {
  item: GeneratedItem;
  labels: {
    copy: string;
    copied: string;
    save: string;
    feedback: string;
  };
}) {
  return (
    <article className="rounded-xl border border-outline-variant bg-surface-container-lowest p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="rounded-full border border-outline-variant/60 bg-surface-container-high px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-on-surface-variant">{item.kind}</span>
      </div>
      <p className="custom-scrollbar max-h-44 overflow-y-auto whitespace-pre-wrap pr-2 text-sm leading-6 text-on-surface">{item.content}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <CopyButton itemId={item.id} content={item.content} contentType={item.kind} label={labels.copy} copiedLabel={labels.copied} />
        <button className="rounded-lg border border-outline-variant bg-white px-3 py-2 text-sm font-medium text-on-surface transition hover:bg-surface-container-low">{labels.save}</button>
        <FeedbackButton generatedItemId={item.id} label={labels.feedback} />
      </div>
    </article>
  );
}

