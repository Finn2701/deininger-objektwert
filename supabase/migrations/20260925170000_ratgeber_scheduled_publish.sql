-- Automatisches Veröffentlichen von Ratgeber-Entwürfen nach Zeitplan (Finns
-- Wunsch 2026-09-25: alle 3 Tage soll automatisch der nächste Entwurf online
-- gehen, ohne dass er selbst auf "Veröffentlichen" klicken muss -- bewusst
-- ohne manuelle Prüfung vor dem Live-Schalten, siehe Chat-Freigabe). Ein
-- täglicher Vercel-Cron-Job (app/api/cron/publish-scheduled/route.ts)
-- veröffentlicht jeden Entwurf, dessen scheduled_publish_at erreicht ist.
alter table articles add column if not exists scheduled_publish_at timestamptz;

-- Die 15 aktuell wartenden Entwürfe bekommen von hier aus einen Slot im
-- 3-Tage-Rhythmus, beginnend 2026-09-28 (heute, 25.9., wurde bereits ein
-- Artikel manuell veröffentlicht) -- Reihenfolge nach Anlagedatum (FIFO),
-- damit die zusammengehörigen "Internationale Klientel"-Artikel (zuletzt
-- angelegt) automatisch als zusammenhängende Gruppe ans Ende rutschen.
with drafts as (
  select id, row_number() over (order by created_at asc) as rn
  from articles
  where published = false and scheduled_publish_at is null
)
update articles
set scheduled_publish_at = timestamptz '2026-09-28 09:00:00+00' + ((drafts.rn - 1) * interval '3 days')
from drafts
where articles.id = drafts.id;
