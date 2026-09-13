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
  features text[] not null default '{}',
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
alter table leads drop column if exists bathrooms;
alter table leads drop column if exists has_separate_unit;
alter table leads add column if not exists features text[] not null default '{}';
alter table leads add column if not exists wants_contact boolean not null default false;

-- Internes CRM: Kunden, Projekte (mit detaillierter Profi-Bewertung) und
-- Notizen. Rein intern — anders als leads gibt es hier keinen öffentlichen
-- Insert, nur der Admin-Account kommt überhaupt an diese Tabellen heran.
create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text,
  phone text,
  address text,
  notes text,
  lead_id uuid references leads(id) on delete set null
);

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  customer_id uuid references customers(id) on delete set null,
  title text not null,
  address text,
  property_type text,
  status text not null default 'in bearbeitung',
  assessment jsonb not null default '{}',
  estimate_low numeric,
  estimate_high numeric,
  estimate_headline numeric,
  confidence text
);

create table if not exists project_notes (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  project_id uuid not null references projects(id) on delete cascade,
  content text not null
);

alter table site_content enable row level security;
alter table faq_items enable row level security;
alter table leads enable row level security;
alter table customers enable row level security;
alter table projects enable row level security;
alter table project_notes enable row level security;

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

-- Internes CRM: komplett admin-only, kein öffentlicher Zugriff in irgendeine Richtung.
drop policy if exists "customers_admin_all" on customers;
create policy "customers_admin_all" on customers for all
  using (is_admin()) with check (is_admin());

drop policy if exists "projects_admin_all" on projects;
create policy "projects_admin_all" on projects for all
  using (is_admin()) with check (is_admin());

drop policy if exists "project_notes_admin_all" on project_notes;
create policy "project_notes_admin_all" on project_notes for all
  using (is_admin()) with check (is_admin());
