-- Deininger Objektwert — Backend-Schema
-- In Supabase: SQL Editor -> New query -> einfügen -> Run.

create table if not exists site_content (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);

create table if not exists faq_items (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  property_type text,
  location text,
  living_area text,
  plot_area text,
  year_built text,
  condition text,
  bathrooms text,
  has_separate_unit boolean,
  wants_contact boolean not null default false,
  name text,
  email text,
  phone text,
  estimate_low numeric,
  estimate_high numeric,
  estimate_headline numeric,
  status text not null default 'neu'
);

alter table leads drop column if exists rooms;
alter table leads add column if not exists bathrooms text;
alter table leads add column if not exists has_separate_unit boolean;
alter table leads add column if not exists wants_contact boolean not null default false;

alter table site_content enable row level security;
alter table faq_items enable row level security;
alter table leads enable row level security;

-- Admin-Zugriff ist auf genau einen Account beschränkt (nicht "irgendein
-- eingeloggter Nutzer"), da Supabase-Auth-Signup direkt über die API
-- erreichbar ist und der Anon-Key ohnehin öffentlich im Client-Bundle liegt.
-- Passe die E-Mail hier an, falls sich der Admin-Login ändert.
create or replace function is_admin() returns boolean as $$
  select (auth.jwt() ->> 'email') = 'info@deininger-objektwert.de';
$$ language sql stable security definer set search_path = public;

-- Inhalte & FAQ: für alle lesbar (die Website selbst zeigt sie an),
-- nur für den Admin-Account (im /backend) änderbar.
drop policy if exists "site_content_public_read" on site_content;
create policy "site_content_public_read" on site_content for select using (true);

drop policy if exists "site_content_admin_write" on site_content;
create policy "site_content_admin_write" on site_content for all
  using (is_admin()) with check (is_admin());

drop policy if exists "faq_items_public_read" on faq_items;
create policy "faq_items_public_read" on faq_items for select using (true);

drop policy if exists "faq_items_admin_write" on faq_items;
create policy "faq_items_admin_write" on faq_items for all
  using (is_admin()) with check (is_admin());

-- Leads: jeder darf einen Lead anlegen (Formular auf der Website),
-- aber nur der Admin-Account kann sie einsehen/ändern.
drop policy if exists "leads_public_insert" on leads;
create policy "leads_public_insert" on leads for insert with check (true);

drop policy if exists "leads_admin_read" on leads;
create policy "leads_admin_read" on leads for select using (is_admin());

drop policy if exists "leads_admin_update" on leads;
create policy "leads_admin_update" on leads for update
  using (is_admin()) with check (is_admin());
