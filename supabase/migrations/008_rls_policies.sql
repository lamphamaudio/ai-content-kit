alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.generations enable row level security;
alter table public.generated_items enable row level security;
alter table public.copy_events enable row level security;
alter table public.usage_limits enable row level security;
alter table public.feedbacks enable row level security;

create policy "profiles_select_own" on public.profiles for select to authenticated using (id = auth.uid());
create policy "profiles_insert_own" on public.profiles for insert to authenticated with check (id = auth.uid());
create policy "profiles_update_own" on public.profiles for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

create policy "products_select_own" on public.products for select to authenticated using (user_id = auth.uid());
create policy "products_insert_own" on public.products for insert to authenticated with check (user_id = auth.uid());
create policy "products_update_own" on public.products for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "products_delete_own" on public.products for delete to authenticated using (user_id = auth.uid());

create policy "generations_select_own" on public.generations for select to authenticated using (user_id = auth.uid());
create policy "generations_insert_own" on public.generations for insert to authenticated with check (user_id = auth.uid());
create policy "generations_update_own" on public.generations for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "generations_delete_own" on public.generations for delete to authenticated using (user_id = auth.uid());

create policy "generated_items_select_own" on public.generated_items for select to authenticated using (user_id = auth.uid());
create policy "generated_items_insert_own" on public.generated_items for insert to authenticated with check (user_id = auth.uid());
create policy "generated_items_update_own" on public.generated_items for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "generated_items_delete_own" on public.generated_items for delete to authenticated using (user_id = auth.uid());

create policy "copy_events_select_own" on public.copy_events for select to authenticated using (user_id = auth.uid());
create policy "copy_events_insert_own" on public.copy_events for insert to authenticated with check (user_id = auth.uid());

create policy "usage_limits_select_own" on public.usage_limits for select to authenticated using (user_id = auth.uid());
create policy "usage_limits_insert_own" on public.usage_limits for insert to authenticated with check (user_id = auth.uid());
create policy "usage_limits_update_own" on public.usage_limits for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "feedbacks_select_own" on public.feedbacks for select to authenticated using (user_id = auth.uid());
create policy "feedbacks_insert_own" on public.feedbacks for insert to authenticated with check (user_id = auth.uid());
create policy "feedbacks_update_own" on public.feedbacks for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "feedbacks_delete_own" on public.feedbacks for delete to authenticated using (user_id = auth.uid());

