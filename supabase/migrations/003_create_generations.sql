create table if not exists public.generations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  type text not null,
  prompt_version text not null,
  input jsonb not null default '{}'::jsonb,
  output jsonb not null default '{}'::jsonb,
  model text,
  token_input integer not null default 0,
  token_output integer not null default 0,
  cost_usd numeric(12, 6) not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists generations_user_id_idx on public.generations(user_id);
create index if not exists generations_product_id_idx on public.generations(product_id);
create index if not exists generations_created_at_idx on public.generations(created_at);
grant select, insert, update, delete on public.generations to authenticated;

