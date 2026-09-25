-- Bug: die Ratgeber-Seiten (Liste + Artikel) zeigten bisher created_at als
-- "Veröffentlicht am"-Datum. Das ist falsch für Artikel, die als Entwurf
-- angelegt (z.B. vom Content-Growth-Engine, siehe scripts/growth-loop.mjs)
-- und erst später über den Publish-Toggle freigeschaltet werden -- deren
-- created_at liegt dann vor dem tatsächlichen Veröffentlichungsdatum.
--
-- published_at wird beim Wechsel Entwurf -> veröffentlicht gesetzt (siehe
-- app/backend/ratgeber-actions.ts) und danach nicht mehr verändert, auch
-- wenn der Artikel später bearbeitet oder kurz depubliziert/wieder
-- veröffentlicht wird -- das Erstveröffentlichungsdatum bleibt stabil,
-- genau wie updated_at schon die Bearbeitungen abdeckt.
alter table articles add column if not exists published_at timestamptz;

-- Backfill für bereits veröffentlichte Bestandsartikel: die wurden direkt
-- mit published=true angelegt (die Migration, die sie einfügt, setzt kein
-- published_at, weil die Spalte vorher nicht existierte), ihr created_at
-- war für sie tatsächlich der reale Veröffentlichungszeitpunkt.
update articles set published_at = created_at where published = true and published_at is null;
