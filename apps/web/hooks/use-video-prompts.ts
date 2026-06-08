"use client";

import { useState } from "react";
import { generateVideoPrompts } from "@/lib/api-client";
import type { VideoPromptResponse } from "@/types/generation";
import type { ProductInput } from "@/types/product";

export function useVideoPrompts() {
  const [videoPrompts, setVideoPrompts] = useState<VideoPromptResponse | null>(null);
  const [isVideoLoading, setVideoLoading] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);

  async function generateVideoPromptKit(payload: ProductInput) {
    setVideoLoading(true);
    setVideoError(null);
    try {
      const response = await generateVideoPrompts(payload);
      setVideoPrompts(response);
    } catch (err) {
      setVideoError(err instanceof Error ? err.message : "Video prompt generation failed");
    } finally {
      setVideoLoading(false);
    }
  }

  return { videoPrompts, isVideoLoading, videoError, generateVideoPromptKit };
}
