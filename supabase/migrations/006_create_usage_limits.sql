create table if not exists public.usage_limits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  plan text not null default 'free',
  period_start date not null,
  period_end date not null,
  copied_items_limit integer not null default 30,
  copied_items_used integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists usage_limits_user_id_idx on public.usage_limits(user_id);
create index if not exists usage_limits_created_at_idx on public.usage_limits(created_at);
grant select, insert, update on public.usage_limits to authenticated;

