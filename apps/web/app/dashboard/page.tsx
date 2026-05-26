import { QuotaBadge } from "@/components/quota-badge";

export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <QuotaBadge />
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <section className="rounded-lg border bg-white p-5"><h2 className="font-medium">Projects</h2><p className="mt-2 text-sm text-stone-600">No saved projects yet.</p></section>
        <section className="rounded-lg border bg-white p-5"><h2 className="font-medium">Quota</h2><p className="mt-2 text-sm text-stone-600">0 of 30 items used.</p></section>
        <section className="rounded-lg border bg-white p-5"><h2 className="font-medium">Recent generations</h2><p className="mt-2 text-sm text-stone-600">Generate content to see activity.</p></section>
      </div>
    </main>
  );
}

