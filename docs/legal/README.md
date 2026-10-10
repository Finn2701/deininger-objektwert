# Rechtliche Pflichtdokumente für den Maklerbetrieb (Vorbereitung)

> **Update 2026-09-26 — Website-Pflichtangaben Impressum/Datenschutz: bereits
> abgeschlossen, HIGH confidence.** Ein wiederholt eingehender Task-Auftrag
> verweist auf eine Datei `docs/pflichten-nach-34c-erlaubnis-checkliste.md` und
> eine Migration mit vermeintlich noch offenem Punkt "Website-Pflichtangaben
> prüfen" (MEDIUM confidence). Beides existiert in diesem Repo nicht — dieselbe
> Fehlreferenz wurde bereits zweimal zuvor dokumentiert (siehe
> `impressum-pflichtangaben-34c-verifiziert.md` und
> `gwg-identifizierungspflichten-verifiziert.md`). Der inhaltliche Kern ist
> aber tatsächlich bereits vollständig recherchiert:
> - **Impressum** (§ 5 Abs. 1 Nr. 3 DDG, IHK Ostwürttemberg als zu nennende
>   Aufsichtsbehörde): HIGH confidence, siehe
>   `impressum-pflichtangaben-34c-verifiziert.md` (Stand 2026-09-20).
> - **Datenschutzerklärung** (neue GwG-Datenkategorien bei Vertragsabschluss):
>   Textbaustein liegt fertig in `datenschutz-ergaenzung-maklertaetigkeit.md`
>   vor (Zweck, Datenkategorien, Rechtsgrundlage Art. 6 Abs. 1 lit. b/c DSGVO,
>   Löschfristen, Weitergabe) — das entspricht inhaltlich genau der von Art. 13
>   DSGVO verlangten Struktur (Identität/Zweck/Rechtsgrundlage/Empfänger/
>   Speicherdauer bei Datenerhebung; per WebSearch am 2026-09-26 gegen
>   IVD-/Fachverband-Mustervorlagen abgeglichen, keine fehlende Angabe
>   gefunden). Der Generator-Abgleich in
>   `datenschutz-generator-empfehlung-maklertaetigkeit.md` (ebenfalls
>   2026-09-26) bestätigt zusätzlich: kein bezahlter Generator nötig.
>
> Es gibt hier nichts mehr offen zu recherchieren — beide Punkte sind reine
> "Werte aus dem Bescheid einsetzen und aktivieren"-Aufgaben (siehe
> Aktivierungs-Checkliste unten, Punkte 2–3). Für künftige Ideen-/Task-
> Generierung: **"Website-Pflichtangaben Impressum/Datenschutz recherchieren"
> nicht erneut vorschlagen.**

Status: **Aktiv seit 10.10.2026.** Die §34c-Erlaubnis wurde am 18.09.2026 durch
die IHK Ostwürttemberg erteilt (kein separates Erlaubnisnummer-Feld auf dem
Bescheid, nur der Verweis auf § 34c Abs. 1 Satz 1 GewO), die Gewerbeanmeldung
bei der Stadt Heidenheim erfolgte am 10.10.2026. Impressum (`/impressum`), AGB
(`/agb`), Über-uns (`/ueber-uns`) und Datenschutzerklärung (`/datenschutz`,
Abschnitt 8) sind entsprechend aktiviert; die Schema.org-Auszeichnung in
`lib/structured-data.ts` wurde von `ProfessionalService` auf `RealEstateAgent`
umgestellt. Offen bleiben die unten als externe/finanzielle Aktionen markierten
Schritte (Vermögensschadenhaftpflicht, goAML-Registrierung, Provisionssatz-
Entscheidung) — die liegen bei Finn, nicht beim Zwilling.

Kein Rechtsberatungs-Ersatz: Diese Texte sind DIY-Vorlagen nach Muster üblicher
Maklerverträge/Musterbelehrungen und den unten genannten Vorschriften. Vor dem
ersten produktiven Einsatz (erster echter Alleinauftrag/Verkaufsfall) lohnt sich
ein kurzer Abgleich mit einer kostenlosen/günstigen Quelle (z. B. IHK-Musterverträge,
Verbraucherzentrale-Infoseite zu Maklerverträgen, oder ein Generator-Tool wie
bei der Datenschutzerklärung) — passend zum bisherigen Vorgehen: erst selbst
umsetzen, bei Bedarf günstig gegenprüfen statt vorab Anwalt/Notar zu bezahlen.

## Enthaltene Dokumente

| Datei | Zweck | Aktivierung |
|---|---|---|
| `maklervertrag-alleinauftrag.md` | Vertragsvorlage für den (einfachen) Alleinauftrag beim Verkauf einer Immobilie | Pro Objekt ausfüllen, Textform (E-Mail/PDF) an Auftraggeber |
| `maklervertrag-einfacher-auftrag.md` | Vertragsvorlage für den nicht-exklusiven Maklerauftrag | Pro Objekt ausfüllen, Textform (E-Mail/PDF) an Auftraggeber |
| `impressum-ergaenzung-34c.md` | Ergänzungstext für `app/(site)/impressum/page.tsx` | Erst einfügen, wenn der Erlaubnisbescheid vorliegt |
| `datenschutz-ergaenzung-maklertaetigkeit.md` | Ergänzungsabschnitt für `app/(site)/datenschutz/page.tsx` | Erst einfügen, wenn echte Vermittlungstätigkeit (nicht nur Bewertungsrechner) startet |
| `vermoegensschadenhaftpflicht-vergleich.md` | Recherche-Notiz: Angebotsvergleich Vermögensschadenhaftpflicht (Hiscox, Exali, R+V, VHV, Continentale, Vergleichsportale) | Vor Gewerbeanmeldung/erster echter Vermittlung als Entscheidungsgrundlage lesen |
| `maklerprovision-preismodell.md` | Recherche-Notiz: marktübliche Provisionssätze BW, Bestellerprinzip vs. Halbteilungsgrundsatz (§656c BGB), BGH-Rechtsprechung 2025 | Als Grundlage für das Preismodell lesen, sobald die §34c-Erlaubnis erteilt ist |
| `naechste-schritte-nach-34c-erlaubnis.md` | Recherche-Notiz: übliche IHK-Bearbeitungsdauer für §34c-Anträge (IHK statt Gewerbeamt zuständig in BW), Ablauf/Kosten der Gewerbeanmeldung bei der Stadt Heidenheim danach, IHK-Pflichtmitgliedschaft/Beitrag als Existenzgründer | Für die Zeitplanung (u. a. Ramirez-Verbleib) und als Vorbereitung auf Schritt 5 der Aktivierungs-Checkliste unten lesen |
| `post-erlaubnis-launch-checkliste.md` | Konsolidierte Schritt-für-Schritt-Checkliste für die Zeit direkt nach Erlaubniserteilung (führt Gewerbeanmeldung, IHK-Mitgliedschaft, VSH, Impressum/Datenschutz, Preismodell und Maklervertrag/Exposé-Pflichtangaben zusammen; neu recherchiert: §87 GEG-Pflichtangaben in Exposés) | Als zentraler Startpunkt lesen, sobald der Erlaubnisbescheid vorliegt — verlinkt alle anderen Dateien in dieser Tabelle an der richtigen Stelle |
| `impressum-pflichtangaben-34c-verifiziert.md` | Recherche-Notiz: WebSearch-Verifizierung von `impressum-ergaenzung-34c.md` (§5 Abs.1 Nr.3 DDG, IHK Ostwürttemberg als zu nennende Aufsichtsbehörde, Korrektur: kein Kammerberuf-Zusatz nötig, Bußgeld-/Abmahnrisiko) | Vor Aktivierung von `impressum-ergaenzung-34c.md` lesen — enthält die Korrektur zur Berufsbezeichnungs-Zeile |
| `gwg-identifizierungspflichten-verifiziert.md` | Recherche-Notiz: WebSearch-Verifizierung der GwG-Identifizierungspflichten (§§11/12/8 GwG) — wer Verpflichteter ist, welche Angaben ab wann zu erheben sind, Ausweisprüfung, 5-Jahre-Aufbewahrung, Abgrenzung Transparenzregister vs. goAML-Verdachtsmeldung | Löst Punkt 6 der Aktivierungs-Checkliste unten inhaltlich; Grundlage für `tools/gwg-identifizierungs-checkliste.html` |
| `gwg-risikoanalyse-sicherungsmassnahmen.md` | Entwurf der dokumentierten Risikoanalyse (§5 GwG) und internen Sicherungsmaßnahmen (§6 GwG) — Risikoeinschätzung typischer Kundenkonstellationen, Geldwäschebeauftragter/Schulung/Zuverlässigkeitsprüfung für den Einzelmakler-Fall, konkreter Meldeweg goAML im Verdachtsfall | Erlaubnisnummer/-datum in Teil A.4 einsetzen und der Aufsichtsbehörde auf Anfrage vorlegbar halten, sobald der Geschäftsbetrieb startet |
| `datenschutz-generator-empfehlung-maklertaetigkeit.md` | Recherche-Notiz: Vergleich eRecht24/IT-Recht Kanzlei/datenschutz-generator.de gegen den bestehenden Eigenentwurf für die Maklertätigkeits-Ergänzung — Ergebnis: kein bezahlter Generator nötig, nur kostenloser Lesevergleich vor Aktivierung empfohlen | Vor Aktivierung von `datenschutz-ergaenzung-maklertaetigkeit.md` als kostenlosen Gegencheck lesen |

Die bereits live auf der Website vorhandenen Dokumente (`/impressum`, `/datenschutz`,
`/agb`, `/widerruf`) sind inhaltlich schon solide und sagen an mehreren Stellen
korrekt, dass die Maklertätigkeit noch nicht aufgenommen ist (z. B. Impressum:
„nicht um eine gewerbliche Immobilienmaklertätigkeit im Sinne des § 34c GewO";
AGB Abschnitt „Hinweis"). Diese Formulierungen müssen beim Aktivieren der Ergänzungen
mit angepasst/entfernt werden.

## Aktivierungs-Checkliste (sobald die §34c-Erlaubnis erteilt ist)

1. Erlaubnisbescheid der IHK Ostwürttemberg genau lesen: Erlaubnisnummer, Datum,
   exakte Bezeichnung der erteilenden Behörde notieren (steht auf dem Bescheid —
   nicht zwangsläufig identisch mit „IHK Ostwürttemberg", je nach Bundesland kann
   das Gewerbeamt/Ordnungsamt der Stadt Heidenheim die formal erlaubniserteilende
   Stelle sein, auch wenn die IHK die Antragsunterlagen prüft. Auf dem Bescheid
   nachsehen, nicht raten).
2. ~~`impressum-ergaenzung-34c.md` mit den echten Werten befüllen~~ — **erledigt
   10.10.2026**: neuer Abschnitt „Angaben zur Erlaubnis nach § 34c GewO" in
   `app/(site)/impressum/page.tsx` (Erteilungsdatum 18.09.2026, IHK
   Ostwürttemberg mit Adresse/Link als Aufsichtsbehörde; kein separates
   Erlaubnisnummer-Feld, da auf dem Bescheid keines ausgewiesen ist), der Satz
   zur „nicht gewerblichen Maklertätigkeit" entfernt.
3. ~~`datenschutz-ergaenzung-maklertaetigkeit.md` als neuen `<Section>`-Block
   einfügen~~ — **erledigt 10.10.2026**: Abschnitt 8 „Maklervermittlung
   (Interessenten- und Objektverwaltung)" in `app/(site)/datenschutz/page.tsx`,
   Folgeabschnitte 9–17 umnummeriert.
4. ~~Hinweis-Kasten in `app/(site)/agb/page.tsx` aktualisieren~~ — **erledigt
   10.10.2026**: verweist jetzt auf die erteilte Erlaubnis statt „in
   Vorbereitung".
5. ~~Gewerbe anmelden~~ — **erledigt 10.10.2026** bei der Stadt Heidenheim
   (externe/behördliche Aktion, von Finn selbst ausgeführt).
6. ~~Geldwäschegesetz (GwG) beachten~~ — **erledigt, HIGH confidence** (siehe
   `gwg-identifizierungspflichten-verifiziert.md`): Immobilienmakler sind ab
   Aufnahme der Tätigkeit „Verpflichtete" nach § 2 Abs. 1 Nr. 14 GwG.
   Identifizierungspflicht (§ 11 GwG) greift spätestens, wenn eine Vertragspartei
   den Kaufvertrag(sentwurf) der anderen erhält; Ausweisprüfung nach § 12 GwG;
   5 Jahre Aufbewahrung nach § 8 GwG. Für den praktischen Ablauf pro Mandant:
   `tools/gwg-identifizierungs-checkliste.html` ausfüllen, bevor ein
   Maklervertrag abgeschlossen wird. Verdachtsmeldungen über das goAML-Portal
   betreffen nur den seltenen tatsächlichen Verdachtsfall, nicht den
   Normalablauf, und sind bewusst nicht Teil dieses Tools.
