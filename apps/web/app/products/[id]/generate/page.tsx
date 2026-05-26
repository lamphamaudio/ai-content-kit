export default async function GeneratePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Generate for {id}</h1>
      <p className="mt-3 text-stone-600">Generation workspace placeholder.</p>
    </main>
  );
}
