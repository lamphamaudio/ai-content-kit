create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  product_name text not null,
  category text,
  input jsonb not null default '{}'::jsonb,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.products add column if not exists project_id uuid references public.projects(id) on delete set null;
alter table public.generations add column if not exists project_id uuid references public.projects(id) on delete set null;

create table if not exists public.usage_quotas (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  plan text not null default 'free',
  generation_type text not null,
  period_start date not null,
  period_end date not null,
  limit_count integer not null default 0,
  used_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, generation_type, period_start, period_end)
);

create table if not exists public.assets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  type text not null,
  storage_path text not null unique,
  public_url text,
  mime_type text,
  file_size integer,
  width integer,
  height integer,
  analysis jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.video_generations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  generation_id uuid references public.generations(id) on delete set null,
  provider text not null,
  provider_job_id text,
  prompt text not null,
  negative_prompt text,
  input_asset_ids uuid[] not null default '{}',
  status text not null default 'queued' check (status in ('draft', 'queued', 'generating', 'completed', 'failed', 'cancelled', 'expired')),
  output_asset_id uuid references public.assets(id) on delete set null,
  output_url text,
  error_message text,
  cost_estimate numeric(12, 6) not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists projects_user_id_idx on public.projects(user_id);
create index if not exists projects_created_at_idx on public.projects(created_at);
create index if not exists products_project_id_idx on public.products(project_id);
create index if not exists generations_project_id_idx on public.generations(project_id);
create index if not exists usage_quotas_user_period_idx on public.usage_quotas(user_id, period_start, period_end);
create index if not exists usage_quotas_generation_type_idx on public.usage_quotas(generation_type);
create index if not exists assets_user_id_idx on public.assets(user_id);
create index if not exists assets_project_id_idx on public.assets(project_id);
create index if not exists assets_created_at_idx on public.assets(created_at);
create index if not exists video_generations_user_id_idx on public.video_generations(user_id);
create index if not exists video_generations_project_id_idx on public.video_generations(project_id);
create index if not exists video_generations_status_idx on public.video_generations(status);
create index if not exists video_generations_created_at_idx on public.video_generations(created_at);

grant select, insert, update, delete on public.projects to authenticated;
grant select, insert, update, delete on public.usage_quotas to authenticated;
grant select, insert, update, delete on public.assets to authenticated;
grant select, insert, update, delete on public.video_generations to authenticated;

alter table public.projects enable row level security;
alter table public.usage_quotas enable row level security;
alter table public.assets enable row level security;
alter table public.video_generations enable row level security;

create policy "projects_select_own" on public.projects for select to authenticated using (user_id = auth.uid());
create policy "projects_insert_own" on public.projects for insert to authenticated with check (user_id = auth.uid());
create policy "projects_update_own" on public.projects for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "projects_delete_own" on public.projects for delete to authenticated using (user_id = auth.uid());

create policy "usage_quotas_select_own" on public.usage_quotas for select to authenticated using (user_id = auth.uid());
create policy "usage_quotas_insert_own" on public.usage_quotas for insert to authenticated with check (user_id = auth.uid());
create policy "usage_quotas_update_own" on public.usage_quotas for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "usage_quotas_delete_own" on public.usage_quotas for delete to authenticated using (user_id = auth.uid());

create policy "assets_select_own" on public.assets for select to authenticated using (user_id = auth.uid());
create policy "assets_insert_own" on public.assets for insert to authenticated with check (user_id = auth.uid());
create policy "assets_update_own" on public.assets for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "assets_delete_own" on public.assets for delete to authenticated using (user_id = auth.uid());

create policy "video_generations_select_own" on public.video_generations for select to authenticated using (user_id = auth.uid());
create policy "video_generations_insert_own" on public.video_generations for insert to authenticated with check (user_id = auth.uid());
create policy "video_generations_update_own" on public.video_generations for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "video_generations_delete_own" on public.video_generations for delete to authenticated using (user_id = auth.uid());

insert into storage.buckets (id, name, public)
values ('product-assets', 'product-assets', false)
on conflict (id) do nothing;

create policy "product_assets_select_own"
on storage.objects for select to authenticated
using (
  bucket_id = 'product-assets'
  and (storage.foldername(name))[1] = 'users'
  and (storage.foldername(name))[2] = auth.uid()::text
);

create policy "product_assets_insert_own"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'product-assets'
  and (storage.foldername(name))[1] = 'users'
  and (storage.foldername(name))[2] = auth.uid()::text
);

create policy "product_assets_update_own"
on storage.objects for update to authenticated
using (
  bucket_id = 'product-assets'
  and (storage.foldername(name))[1] = 'users'
  and (storage.foldername(name))[2] = auth.uid()::text
)
with check (
  bucket_id = 'product-assets'
  and (storage.foldername(name))[1] = 'users'
  and (storage.foldername(name))[2] = auth.uid()::text
);

create policy "product_assets_delete_own"
on storage.objects for delete to authenticated
using (
  bucket_id = 'product-assets'
  and (storage.foldername(name))[1] = 'users'
  and (storage.foldername(name))[2] = auth.uid()::text
);
