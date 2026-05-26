"use client";

import { useState } from "react";
import { trackCopyEvent } from "@/lib/api-client";

export function CopyButton({
  itemId,
  content,
  contentType,
  label,
  copiedLabel
}: {
  itemId: string;
  content: string;
  contentType: string;
  label: string;
  copiedLabel: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(content);
    await trackCopyEvent({ generated_item_id: itemId, content_type: contentType });
    setCopied(true);
  }

  return (
    <button className="rounded-lg border border-outline-variant bg-white px-3 py-2 text-sm font-medium text-on-surface transition hover:bg-surface-container-low" onClick={copy}>
      {copied ? copiedLabel : label}
    </button>
  );
}

