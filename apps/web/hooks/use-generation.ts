"use client";

import { useState } from "react";
import { generateContentKit } from "@/lib/api-client";
import type { ContentKitResponse } from "@/types/generation";
import type { ProductInput } from "@/types/product";

export function useGeneration() {
  const [contentKit, setContentKit] = useState<ContentKitResponse | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generate(payload: ProductInput) {
    setLoading(true);
    setError(null);
    try {
      const response = await generateContentKit(payload);
      setContentKit(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed");
    } finally {
      setLoading(false);
    }
  }

  return { contentKit, error, isLoading, generate };
}
