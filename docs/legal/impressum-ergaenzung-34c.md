# Impressum-Ergänzung nach § 5 DDG (ehem. § 5 TMG) — für erlaubnispflichtige Gewerbe

> **WebSearch-verifiziert am 2026-09-20, siehe `impressum-pflichtangaben-34c-verifiziert.md`
> für Quellen/Confidence.** Eine Korrektur aus dieser Verifizierung: die Zeile
> „Berufsbezeichnung ... verliehen in: Deutschland" unten ist **keine
> zwingende Pflichtangabe** (Immobilienmakler ist kein Kammerberuf im Sinne
> von § 5 Abs. 1 Nr. 4/5 DDG) — kann bei Aktivierung weggelassen werden.
> Zwingend ist nur Name + volle Anschrift + Website der Aufsichtsbehörde
> (IHK Ostwürttemberg).

> **Aktiviert am 10.10.2026.** Der §34c-Erlaubnisbescheid der IHK Ostwürttemberg
> liegt vor (erteilt 18.09.2026, kein separates Erlaubnisnummer-Feld). Der
> Abschnitt unten ist seitdem live in `app/(site)/impressum/page.tsx` (ohne die
> Berufsbezeichnungs-Zeile, siehe Korrektur unten); der alte Satz „...nicht um
> eine gewerbliche Immobilienmaklertätigkeit..." wurde entfernt.

## Warum diese Ergänzung nötig wird

Für erlaubnispflichtige Gewerbe (§ 34c GewO ist ein solches) verlangt § 5
Abs. 1 Nr. 3 DDG (Digitale-Dienste-Gesetz, Nachfolgeregelung des § 5 TMG), im
Impressum zusätzlich anzugeben:

- die zuständige Aufsichtsbehörde,
- ggf. die gesetzliche Berufsbezeichnung und den Staat, in dem sie verliehen
  wurde (hier: Immobilienmakler, Deutschland).

## Einzufügender Abschnitt (Platzhalter vor Aktivierung befüllen)

Als neue `<Section>` bzw. neuer `<div>`-Block in `app/(site)/impressum/page.tsx`
einfügen, direkt nach dem Abschnitt „Hinweis zum Angebot" (der dann entfällt
oder umformuliert wird):

```
Angaben zur Erlaubnis nach § 34c GewO

Finn Deininger (Deininger Objektwert) ist als Immobilienmakler nach § 34c
Abs. 1 Satz 1 Nr. 1 GewO erlaubnispflichtig tätig.

Erlaubnisnummer: [aus dem Bescheid]
Erteilt am: [Datum aus dem Bescheid]
Zuständige Aufsichtsbehörde: [exakte Bezeichnung + Anschrift laut Bescheid —
  vermutlich Gewerbeamt/Ordnungsamt der Stadt Heidenheim an der Brenz oder die
  IHK Ostwürttemberg selbst, je nachdem wer laut Bescheid tatsächlich die
  Erlaubnis erteilt hat; nicht raten, sondern vom Bescheid übernehmen]

Berufsbezeichnung „Immobilienmakler" verliehen in: Deutschland.
```

## Zusätzlich prüfen bei Aktivierung

- Den bestehenden Satz im Abschnitt „Hinweis zum Angebot" anpassen: Aktuell
  steht dort, es handle sich „nicht um eine gewerbliche
  Immobilienmaklertätigkeit". Das muss beim Start der echten Tätigkeit
  entfallen bzw. umgekehrt werden.
- Den Hinweis-Kasten oben in `app/(site)/agb/page.tsx` („...befindet sich
  derzeit in Vorbereitung...") ebenfalls aktualisieren — hängt an derselben
  Voraussetzung.
