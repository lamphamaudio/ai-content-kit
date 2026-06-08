import type { ContentKitResponse, GenerateResponse, ProductAnalysisResponse, VideoPromptResponse } from "@/types/generation";
import type { ProductInput } from "@/types/product";
import { getSession } from "./auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const session = await getSession();
  const headers = new Headers(init?.headers);
  headers.set("Content-Type", "application/json");
  if (session?.access_token) {
    headers.set("Authorization", `Bearer ${session.access_token}`);
  }
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers
  });
  if (!response.ok) {
    throw new Error(`API error ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export function generateHooks(payload: ProductInput) {
  return request<GenerateResponse>("/api/generate/hooks", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export function generateContentKit(payload: ProductInput) {
  return request<ContentKitResponse>("/api/generate/content-kit", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export function generateVideoPrompts(payload: ProductInput) {
  return request<VideoPromptResponse>("/api/generate/video-prompts", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export function analyzeProduct(payload: ProductInput) {
  return request<ProductAnalysisResponse>("/api/analyze/product", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export function trackCopyEvent(payload: { generated_item_id: string; product_id?: string; generation_id?: string; content_type: string }) {
  return request<{ ok: boolean }>("/api/events/copy", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}
