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

export type ProductAnalysisResponse = {
  product_type: string;
  target_customer_insight: string;
  main_pain_points: string[];
  buying_triggers: string[];
  content_angles: string[];
  risk_claims: string[];
  recommended_video_styles: string[];
  compliance_notes?: string[] | null;
};

export type ContentKitResponse = {
  type: "content-kit";
  prompt_version: string;
  analysis?: ProductAnalysisResponse | null;
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

export type VideoBrief = {
  goal: string;
  platform: string;
  duration_seconds: number;
  style: string;
  aspect_ratio: string;
};

export type ShotItem = {
  time: string;
  scene: string;
  camera?: string | null;
  motion?: string | null;
  text_overlay?: string | null;
  visual_notes?: string | null;
};

export type VideoPromptResponse = {
  type: "video-prompts";
  prompt_version: string;
  analysis?: ProductAnalysisResponse | null;
  video_brief: VideoBrief;
  shot_list: ShotItem[];
  voiceover: string;
  text_overlays: string[];
  kling_prompt: string;
  pika_prompt: string;
  runway_prompt: string;
  capcut_brief: string;
  negative_prompt: string;
  caption: string;
  hashtags: string[];
  compliance_warnings: string[];
};
