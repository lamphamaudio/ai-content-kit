"use client";

import { useState } from "react";
import { generateHooks } from "@/lib/api-client";
import type { GeneratedItem } from "@/types/generation";
import type { ProductInput } from "@/types/product";

export function useGeneration() {
  const [items, setItems] = useState<GeneratedItem[]>([]);
  const [isLoading, setLoading] = useState(false);

  async function generate(payload: ProductInput) {
    setLoading(true);
    try {
      const response = await generateHooks(payload);
      setItems(response.items);
    } finally {
      setLoading(false);
    }
  }

  return { items, isLoading, generate };
}

