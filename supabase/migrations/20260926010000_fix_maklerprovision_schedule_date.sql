-- Der erste Slot des 3-Tage-Veröffentlichungsplans stand unerwartet auf
-- 2026-09-26 statt der von der Planungs-Migration
-- (20260925170000_ratgeber_scheduled_publish.sql) vergebenen 2026-09-28 --
-- Ursache nicht eindeutig rekonstruierbar (keine passende Code-Stelle
-- gefunden, die diesen Wert auf dieses Datum gesetzt hätte). Setzt den
-- ursprünglich vorgesehenen Slot zurück, damit der 3-Tage-Rhythmus wieder
-- exakt ab dem 28.9. beginnt.
update articles
set scheduled_publish_at = '2026-09-28T09:00:00+00:00'
where slug = 'maklerprovision-beim-hausverkauf-wer-zahlt-was-und-wie-hoch'
  and published = false;
