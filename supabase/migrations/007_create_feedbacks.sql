create table if not exists public.feedbacks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  generated_item_id uuid references public.generated_items(id) on delete set null,
  rating integer not null check (rating between 1 and 5),
  comment text,
  created_at timestamptz not null default now()
);

create index if not exists feedbacks_user_id_idx on public.feedbacks(user_id);
create index if not exists feedbacks_created_at_idx on public.feedbacks(created_at);
grant select, insert, update, delete on public.feedbacks to authenticated;

