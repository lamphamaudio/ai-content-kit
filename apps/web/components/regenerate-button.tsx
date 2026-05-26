"use client";

export function RegenerateButton({ onClick }: { onClick: () => void }) {
  return <button className="rounded-md border border-stone-300 px-3 py-2 text-sm" onClick={onClick}>Regenerate</button>;
}

