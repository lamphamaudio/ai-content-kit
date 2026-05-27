export type ProductInput = {
  product_name: string;
  category: string;
  price?: string;
  target_audience?: string;
  key_benefits?: string;
  pain_points?: string;
  usp?: string;
  competitor_or_alternative?: string;
  selling_intensity?: string;
  platform?: string;
  duration_seconds?: number | null;
  cta?: string;
  compliance_notes?: string;
  language?: string;
  tone: string;
};
