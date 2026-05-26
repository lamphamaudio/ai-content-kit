export type GeneratedItem = {
  id: string;
  kind: string;
  content: string;
};

export type GenerateResponse = {
  type: string;
  prompt_version: string;
  items: GeneratedItem[];
};

export type AngleItem = {
  id: string;
  title: string;
  description: string;
  target_pain_point?: string | null;
};

export type HookItem = {
  id: string;
  content: string;
  style?: string | null;
};

export type ScriptItem = {
  id: string;
  duration_seconds: number;
  title: string;
  hook: string;
  voiceover: string;
  shot_list: string[];
  text_overlays: string[];
  cta: string;
};

export type CaptionItem = {
  id: string;
  content: string;
  tone?: string | null;
};

export type CalendarItem = {
  id: string;
  day: number;
  content_type: string;
  idea: string;
  hook: string;
  cta: string;
};

export type ContentKitResponse = {
  type: "content-kit";
  prompt_version: string;
  product_summary: string;
  angles: AngleItem[];
  hooks: HookItem[];
  scripts: ScriptItem[];
  captions: CaptionItem[];
  hashtags: string[];
  ctas: string[];
  calendar: CalendarItem[];
  raw_items?: GeneratedItem[] | null;
};
