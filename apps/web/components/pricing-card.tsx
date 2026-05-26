import type { PricingPlan } from "@/types/pricing";

export function PricingCard({ plan }: { plan: PricingPlan }) {
  return (
    <article className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-semibold">{plan.name}</h2>
      <p className="mt-2 text-2xl font-bold">{plan.price}</p>
      <p className="mt-1 text-sm text-stone-600">{plan.quota}</p>
      <ul className="mt-4 space-y-2 text-sm">
        {plan.features.map((feature) => <li key={feature}>{feature}</li>)}
      </ul>
    </article>
  );
}

