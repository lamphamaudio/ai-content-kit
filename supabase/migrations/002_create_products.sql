create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_name text not null,
  category text not null,
  price text,
  target_audience text,
  key_benefits text,
  tone text not null default 'friendly',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_user_id_idx on public.products(user_id);
create index if not exists products_created_at_idx on public.products(created_at);
grant select, insert, update, delete on public.products to authenticated;

