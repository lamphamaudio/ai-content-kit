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

