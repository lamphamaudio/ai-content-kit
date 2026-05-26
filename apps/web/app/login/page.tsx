export default function LoginPage() {
  return (
    <main className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-2xl font-semibold">Login</h1>
      <div className="mt-6 grid gap-3 rounded-lg border bg-white p-5">
        <input className="rounded-md border p-3" placeholder="Email" />
        <button className="rounded-md bg-ink px-4 py-3 text-white">Continue with email</button>
      </div>
    </main>
  );
}

