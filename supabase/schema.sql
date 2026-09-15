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

-- Bevorzugte Kontaktzeit (Tage inkl. Sonntag + Tageszeit) und ein Notizfeld,
-- damit der Rückruf nicht ins Blaue geht. Außerdem: source unterscheidet den
-- schnellen Online-Rechner von vollständig eingereichten Unterlagen (eigene
-- Seite mit Datei-Upload), beides landet in derselben Anfragen-Tabelle,
-- aber optisch unterschieden.
alter table leads add column if not exists contact_days text[] not null default '{}';
alter table leads add column if not exists contact_time text;
alter table leads add column if not exists contact_notes text;
alter table leads add column if not exists source text not null default 'rechner';
alter table leads add column if not exists message text;
alter table leads add column if not exists files text[] not null default '{}';

-- Sehr einfache, cookie-freie Seitenaufruf-Zählung (nur Datum + Pfad + Zähler,
-- keine IP, keine Kennung pro Besucher) — braucht deshalb kein Cookie-Banner,
-- anders als ein Tool wie Microsoft Clarity. Reicht für "wie viele Aufrufe".
create table if not exists page_views (
  day date not null,
  path text not null,
  views int not null default 0,
  primary key (day, path)
);
alter table page_views enable row level security;

-- No direct public insert/update policy: writes only go through this
-- function (security definer, bumps exactly one counter atomically), so a
-- visitor can't read or tamper with the table directly, only increment
-- today's count for the page they're actually on.
create or replace function record_page_view(p_path text) returns void as $$
  insert into page_views (day, path, views)
  values (current_date, p_path, 1)
  on conflict (day, path) do update set views = page_views.views + 1;
$$ language sql security definer set search_path = public;

grant execute on function record_page_view(text) to anon, authenticated;

drop policy if exists "page_views_admin_read" on page_views;
create policy "page_views_admin_read" on page_views for select using (is_admin());

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

drop policy if exists "leads_admin_delete" on leads;
create policy "leads_admin_delete" on leads for delete using (is_admin());

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

-- Storage-Bucket für hochgeladene Objektunterlagen (Bilder/PDFs): privat,
-- jeder darf hochladen (das Formular auf der Website), aber niemand außer
-- dem Admin darf die Dateien auflisten oder herunterladen.
insert into storage.buckets (id, name, public)
values ('lead-documents', 'lead-documents', false)
on conflict (id) do nothing;

drop policy if exists "lead_documents_public_upload" on storage.objects;
create policy "lead_documents_public_upload" on storage.objects for insert
  with check (bucket_id = 'lead-documents');

drop policy if exists "lead_documents_admin_read" on storage.objects;
create policy "lead_documents_admin_read" on storage.objects for select
  using (bucket_id = 'lead-documents' and is_admin());

drop policy if exists "lead_documents_admin_delete" on storage.objects;
create policy "lead_documents_admin_delete" on storage.objects for delete
  using (bucket_id = 'lead-documents' and is_admin());

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
alter table clarity_cache enable row level security;

drop policy if exists "clarity_cache_admin_all" on clarity_cache;
create policy "clarity_cache_admin_all" on clarity_cache for all
  using (is_admin()) with check (is_admin());

-- Exposé-Generator: kategorisierte Objektfotos + sonstige Dokumente pro
-- Projekt, plus das Ergebnis (fertige .docx-Datei) direkt am Projekt.
create table if not exists project_images (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  category text not null,
  storage_path text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists project_documents (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  filename text not null,
  storage_path text not null,
  created_at timestamptz not null default now()
);

alter table projects add column if not exists expose_docx_path text;
alter table projects add column if not exists expose_generated_at timestamptz;
alter table projects add column if not exists expose_error text;

alter table project_images enable row level security;
alter table project_documents enable row level security;

drop policy if exists "project_images_admin_all" on project_images;
create policy "project_images_admin_all" on project_images for all
  using (is_admin()) with check (is_admin());

drop policy if exists "project_documents_admin_all" on project_documents;
create policy "project_documents_admin_all" on project_documents for all
  using (is_admin()) with check (is_admin());

insert into storage.buckets (id, name, public)
values ('project-media', 'project-media', false)
on conflict (id) do nothing;

drop policy if exists "project_media_admin_all" on storage.objects;
create policy "project_media_admin_all" on storage.objects for all
  using (bucket_id = 'project-media' and is_admin())
  with check (bucket_id = 'project-media' and is_admin());

-- Ratgeber-Artikel: vom Admin im Backend geschriebene, öffentlich lesbare
-- Beiträge. Gleiches Muster wie site_content/faq_items.
create table if not exists articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text not null,
  meta_description text not null,
  content_html text not null,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table articles enable row level security;

drop policy if exists "articles_public_read" on articles;
create policy "articles_public_read" on articles for select using (published = true);

drop policy if exists "articles_admin_all" on articles;
create policy "articles_admin_all" on articles for all
  using (is_admin()) with check (is_admin());
