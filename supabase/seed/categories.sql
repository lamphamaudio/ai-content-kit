create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  created_at timestamptz not null default now()
);

insert into public.categories (name) values
  ('beauty'),
  ('fashion'),
  ('home'),
  ('mom-and-baby')
on conflict do nothing;
