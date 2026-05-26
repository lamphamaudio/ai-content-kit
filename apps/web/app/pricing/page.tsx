import { PricingCard } from "@/components/pricing-card";
import type { PricingPlan } from "@/types/pricing";

const plans: PricingPlan[] = [
  { name: "Free", price: "0 VND", quota: "30 copies/month", features: ["Mock generation", "Basic tracking"] },
  { name: "Starter", price: "99k VND", quota: "300 copies/month", features: ["More projects", "Manual payment placeholder"] },
  { name: "Pro", price: "299k VND", quota: "1500 copies/month", features: ["Advanced prompts", "Priority quota"] },
  { name: "Team", price: "Contact", quota: "Custom", features: ["Team workspace", "Shared analytics"] }
];

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Pricing</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-4">
        {plans.map((plan) => <PricingCard key={plan.name} plan={plan} />)}
      </div>
    </main>
  );
}

