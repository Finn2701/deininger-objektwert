-- Ratgeber-Artikel: vom Admin im Backend geschriebene, öffentlich lesbare
-- Beiträge. Gleiches Muster wie site_content/faq_items (öffentlich lesbar,
-- nur Admin darf schreiben), nur mit einem zusätzlichen "published"-Flag,
-- damit Entwürfe nicht sofort live gehen.
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
