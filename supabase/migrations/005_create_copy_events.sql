create table if not exists public.copy_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  generation_id uuid references public.generations(id) on delete set null,
  generated_item_id uuid references public.generated_items(id) on delete set null,
  content_type text not null,
  copied_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists copy_events_user_id_idx on public.copy_events(user_id);
create index if not exists copy_events_product_id_idx on public.copy_events(product_id);
create index if not exists copy_events_created_at_idx on public.copy_events(created_at);
create index if not exists copy_events_weekly_metric_idx on public.copy_events(user_id, copied_at);
grant select, insert on public.copy_events to authenticated;

