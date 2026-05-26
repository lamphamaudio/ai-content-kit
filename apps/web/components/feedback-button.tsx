"use client";

export function FeedbackButton({ generatedItemId, label }: { generatedItemId: string; label: string }) {
  return <button className="rounded-lg border border-outline-variant bg-white px-3 py-2 text-sm font-medium text-on-surface transition hover:bg-surface-container-low" data-item-id={generatedItemId}>{label}</button>;
}

