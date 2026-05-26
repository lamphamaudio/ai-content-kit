export function QuotaBadge({ used = 0, limit = 30 }: { used?: number; limit?: number }) {
  return <span className="rounded-full bg-mint/10 px-3 py-1 text-sm font-medium text-mint">{used}/{limit} quota</span>;
}

