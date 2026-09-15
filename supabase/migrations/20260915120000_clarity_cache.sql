-- Cache für die Microsoft-Clarity-Kennzahlen im Backend. Die Clarity Data
-- Export API erlaubt nur 10 Requests pro Projekt und Tag, deshalb wird das
-- Ergebnis hier zwischengespeichert statt bei jedem Backend-Aufruf neu
-- abgefragt zu werden (siehe lib/clarity.ts).
create table if not exists clarity_cache (
  id int primary key default 1,
  fetched_at timestamptz not null default now(),
  payload jsonb not null,
  error text
);
alter table clarity_cache add column if not exists error text;
alter table clarity_cache enable row level security;

drop policy if exists "clarity_cache_admin_all" on clarity_cache;
create policy "clarity_cache_admin_all" on clarity_cache for all
  using (is_admin()) with check (is_admin());
