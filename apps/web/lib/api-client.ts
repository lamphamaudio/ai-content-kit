import type { ContentKitResponse, GenerateResponse } from "@/types/generation";
import type { ProductInput } from "@/types/product";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers
    }
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

export function trackCopyEvent(payload: { generated_item_id: string; product_id?: string; generation_id?: string; content_type: string }) {
  return request<{ ok: boolean }>("/api/events/copy", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}
