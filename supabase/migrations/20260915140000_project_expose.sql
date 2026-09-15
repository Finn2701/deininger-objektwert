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

-- Komplett privater Bucket: anders als bei den öffentlich eingereichten
-- Lead-Unterlagen läuft hier alles über den eingeloggten Admin-Account,
-- deshalb reicht eine einzige admin-only Policy für alle Operationen.
insert into storage.buckets (id, name, public)
values ('project-media', 'project-media', false)
on conflict (id) do nothing;

drop policy if exists "project_media_admin_all" on storage.objects;
create policy "project_media_admin_all" on storage.objects for all
  using (bucket_id = 'project-media' and is_admin())
  with check (bucket_id = 'project-media' and is_admin());
