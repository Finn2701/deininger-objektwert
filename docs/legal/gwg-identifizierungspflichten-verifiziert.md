# Recherche-Notiz: GwG-Identifizierungspflichten für Maklerverträge (verifiziert)

Stand: 2026-09-21. Reine WebSearch-Recherche (keine externe Aktion, 0€ Kosten).
Löst den offenen Punkt aus `README.md` Punkt 6 / `post-erlaubnis-launch-checkliste.md`
("Geldwäschegesetz (GwG) kurz recherchieren, vor erstem echten Vermittlungsfall")
inhaltlich ein und ist die Grundlage für `tools/gwg-identifizierungs-checkliste.html`.

**Hinweis zur Aufgabenstellung:** Der Auftrag für diese Recherche/dieses Tool
verwies auf eine Datei `docs/pflichten-nach-34c-erlaubnis-checkliste.md`, in
der die GwG-Grundpflichten angeblich bereits als Recherche-Text stünden, und
auf angeblich bereits bestehende HTML-Tools für "Besichtigung" und
"Notartermin" in `tools/`. Beide Prämissen sind falsch: Die genannte Datei
existiert in diesem Repo nicht, und in `tools/` liegen nur vier Dateien
(`34c-erlaubnis-status-tracker.html`, `hauskauf-finanzierungsplan-rechner.html`,
`hauskauf-objektvergleich.html`, `kaufnebenkosten-rechner.html`) — keine zu
Besichtigung oder Notartermin. Das ist dieselbe Art Fehler wie bereits einmal
zuvor dokumentiert in `impressum-pflichtangaben-34c-verifiziert.md` (dort:
eine erfundene Datei `docs/pflichten-nach-34c-erlaubnis-checkliste.md` plus
eine erfundene Migration). Diese Notiz behandelt trotzdem den inhaltlichen
Kern der Aufgabe (GwG-Identifizierungspflichten), da das ein echter, in
`README.md` bereits vermerkter offener Punkt ist — unabhängig von der
falschen Dateireferenz.

## 1. Wer ist Verpflichteter und wann greift die Identifizierungspflicht

**HIGH confidence (gesetze-im-internet.de, mehrere übereinstimmende
Sekundärquellen):** Immobilienmakler sind nach § 2 Abs. 1 Nr. 14 GwG
"Verpflichtete". Die Identifizierungspflicht nach § 11 GwG setzt ein, sobald
ernsthaftes Interesse der Vertragsparteien am Zustandekommen des vermittelten
Geschäfts besteht und die Vertragsparteien hinreichend bestimmt sind —
**spätestens** wenn eine Partei des Kaufvertrags den Kaufvertrag(sentwurf)
der anderen Partei erhält. In der Praxis heißt das: nicht schon bei der
ersten Anfrage/Besichtigung, aber deutlich vor dem Notartermin.

Sonderregel: Vertritt der Makler beide Parteien (Doppeltätigkeit), muss er
nur die Partei identifizieren, für die er tatsächlich tätig wird.

## 2. Welche Angaben zu erheben sind (§ 11 Abs. 4 GwG)

**HIGH confidence:** Bei natürlichen Personen sind zu erheben:
- Vorname und Nachname
- Geburtsort
- Geburtsdatum
- Staatsangehörigkeit
- Wohnanschrift

Bei juristischen Personen/Personengesellschaften zusätzlich: Firma/Name,
Rechtsform, Registernummer (falls vorhanden), Anschrift des Sitzes/der
Hauptniederlassung, sowie die Identität des wirtschaftlich Berechtigten
(§ 3 GwG) — dafür ist eine Einsichtnahme ins Transparenzregister vorgesehen
(seit 2020 ohne Nachweis eines berechtigten Interesses öffentlich einsehbar).
**MEDIUM confidence:** Ein risikobasierter Ansatz gilt — die
Transparenzregister-Angaben allein genügen laut mehreren Fachquellen nicht
immer, ggf. sind weitere risikoorientierte Nachfragen nötig (z. B. bei
ungewöhnlichen Beteiligungsstrukturen). Für Finns Fall (voraussichtlich
überwiegend Privatverkäufer, natürliche Personen) ist das ein Randfall, aber
bei einem Verkauf durch eine GmbH/UG relevant.

## 3. Wie die Überprüfung zu erfolgen hat (§ 12 GwG)

**HIGH confidence:** Die erhobenen Angaben sind anhand eines gültigen
amtlichen Ausweisdokuments mit Lichtbild (Personalausweis/Reisepass) zu
überprüfen und zu dokumentieren (Kopie oder Vermerk der Ausweisdaten). Bei
Gesellschaften: aktueller Handelsregister-/Vereinsregisterauszug bzw.
Gründungsdokument.

## 4. Aufbewahrung (§ 8 GwG)

**HIGH confidence:** Aufbewahrungsfrist beträgt **5 Jahre**. Fristbeginn:
bei beendeten Geschäftsbeziehungen mit Ablauf des Kalenderjahres, in dem die
Geschäftsbeziehung endet; in allen anderen Fällen mit Ablauf des
Kalenderjahres, in dem die Daten erhoben wurden. Nach Fristablauf sind die
Unterlagen grundsätzlich unverzüglich zu löschen/vernichten, soweit keine
andere gesetzliche Aufbewahrungspflicht entgegensteht (max. 10 Jahre absolute
Obergrenze). Deckt sich mit der bereits bestehenden Formulierung in
`datenschutz-ergaenzung-maklertaetigkeit.md` ("bis zu fünf Jahren").

## 5. Transparenzregister-Meldeportal (goAML) — Abgrenzung

**HIGH confidence:** Zwei unterschiedliche Pflichten nicht verwechseln:
1. **Einsichtnahme ins Transparenzregister** (bei Vertragspartei = Gesellschaft,
   siehe Punkt 2 oben) — passiv, lesend, keine eigene Meldung.
2. **Verdachtsmeldung über das goAML-Portal der Zentralstelle für
   Finanztransaktionsuntersuchungen (FIU)** — nur bei tatsächlichem
   Geldwäsche-Verdacht, nicht routinemäßig bei jedem Mandat. Das betrifft
   nur den seltenen Verdachtsfall, nicht den Normalablauf jedes Mandats, und
   ist bewusst kein Bestandteil der Checkliste (dafür bräuchte es im
   Ernstfall ohnehin eine individuelle rechtliche Einschätzung).

## Fazit / Praktische Umsetzung

Der Kernpunkt aus `README.md` Punkt 6 lässt sich von "kurz vor erstem
Vermittlungsfall recherchieren" auf **HIGH confidence, erledigt** heben. Als
tatsächlich nutzbares Werkzeug dafür: `tools/gwg-identifizierungs-checkliste.html`
— ein pro-Mandant ausfüllbares Formular mit den Pflichtfeldern aus Punkt 2,
einem Ausweisprüfung-Reminder (Punkt 3) und einem Hinweis auf die
5-Jahres-Aufbewahrung (Punkt 4). Kein Rechtsberatungs-Ersatz — bei einer
Gesellschaft als Vertragspartei (wirtschaftlich Berechtigter, Punkt 2) lohnt
sich vor dem ersten solchen Fall eine kurze Gegenprüfung.

## Quellen

- [§ 11 GwG – Identifizierung; Erhebung von Angaben zum Zweck der Identifizierung (gesetze-im-internet.de)](https://www.gesetze-im-internet.de/gwg_2017/__11.html)
- [§ 12 GwG – Überprüfung der Angaben (dejure.org)](https://dejure.org/gesetze/GwG/12.html)
- [§ 8 GwG – Aufzeichnungs- und Aufbewahrungspflicht (gesetze-im-internet.de)](https://www.gesetze-im-internet.de/gwg_2017/__8.html)
- [§ 8 GwG: Aufbewahrungsfristen – Pflichten & Praxis (S+P Compliance)](https://sp-compliance.com/geldwaesche-compliance/gwg-paragraph-8-aufbewahrungsfristen/)
- [Die Pflichten von Maklerbüros nach dem GwG (datenschutz.immobilien)](https://datenschutz.immobilien/pflichten-maklerbuero-gwg/)
- [Geldwäscheprävention im Immobiliensektor – Pflichten der Makler (kreditrechner.com)](https://www.kreditrechner.com/ratgeber/geldwaeschepraevention-immobilienbranche/)
- [Auftretende Person – Umsetzung von § 11 Abs. 1 GwG (sp-unternehmerforum.de)](https://sp-unternehmerforum.de/auftretende-person-umsetzung-von-11-abs-1-gwg/)
- [Identitätsfeststellung durch Notare und Immobilienmakler – Transparenzregister (Haufe)](https://www.haufe.de/id/beitrag/identitaetsfeststellung-durch-notare-und-immobilienmakler-31-einsicht-in-das-transparenzregister-HI13771472.html)
- [Transparenzregister: Alles, was Immobilienmakler darüber wissen müssen (gwgimmo.de)](https://gwgimmo.de/blog/gwg/transparenzregister-alles-was-immobilienmakler-daruber-wissen-mussen)
