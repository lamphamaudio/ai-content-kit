"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { supabase } from "@/lib/supabase-client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    setError(null);

    if (!supabase) {
      setError("Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
      return;
    }

    setLoading(true);
    const { error: signInError } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin }
    });
    setLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }
    setMessage("Check your email for the login link.");
  }

  return (
    <main className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-2xl font-semibold">Login</h1>
      <form className="mt-6 grid gap-3 rounded-lg border bg-white p-5" onSubmit={submit}>
        <input
          className="rounded-md border p-3"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <button className="rounded-md bg-ink px-4 py-3 text-white disabled:opacity-60" disabled={isLoading}>
          {isLoading ? "Sending..." : "Continue with email"}
        </button>
        {message ? <p className="text-sm text-mint">{message}</p> : null}
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
      </form>
    </main>
  );
}
