-- Korrigiert einen Artikel, der zwischen der Freigabe des published_at-Features
-- (siehe 20260925150000_ratgeber_published_at.sql) und dessen tatsächlicher
-- Bereitstellung auf der Live-Seite (Deploy fehlte noch) über den alten
-- Publish-Toggle veröffentlicht wurde: published wurde true, published_at
-- aber nie gesetzt (der alte Code kannte die Spalte noch nicht). Live wurde
-- dadurch fälschlich das Erstellungsdatum (21.9.) statt des echten
-- Veröffentlichungsdatums (25.9., siehe updated_at) angezeigt.
update articles
set published_at = updated_at
where slug = 'energieausweis-beim-hausverkauf-pflicht-fristen-und-was-sich'
  and published = true
  and published_at is null;
