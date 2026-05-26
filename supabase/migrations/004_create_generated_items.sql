create table if not exists public.generated_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  generation_id uuid references public.generations(id) on delete cascade,
  type text not null,
  content text not null,
  is_saved boolean not null default false,
  position integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists generated_items_user_id_idx on public.generated_items(user_id);
create index if not exists generated_items_product_id_idx on public.generated_items(product_id);
create index if not exists generated_items_created_at_idx on public.generated_items(created_at);
grant select, insert, update, delete on public.generated_items to authenticated;

