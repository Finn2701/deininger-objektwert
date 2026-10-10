# Launch-Checkliste: Was nach Erteilung der §34c-Erlaubnis zu tun ist

Status: **Konsolidierte Checkliste, reine Recherche/Zusammenführung — keine
externe Aktion, keine Kosten.** Fasst die bisher verstreuten Recherche-Notizen
in diesem Ordner zu einer einzigen, chronologisch abarbeitbaren Liste
zusammen und schließt eine bisher offene Lücke (Pflichtangaben in
Exposés/Immobilienanzeigen, Punkt 6). Ziel: Sobald der Erlaubnisbescheid der
IHK Ostwürttemberg vorliegt, kann diese Liste von oben nach unten abgearbeitet
werden, ohne dass für die einzelnen Schritte erst noch recherchiert werden
muss.

Diese Datei ersetzt nicht die Detail-Recherchen in den anderen Dateien dieses
Ordners, sondern verlinkt sie an der richtigen Stelle im Ablauf. Bei
Widersprüchen zwischen dieser Übersicht und einer Detail-Datei gilt die
Detail-Datei (dort steckt die genauere Quellenlage).

## Schritt 0 — Bescheid lesen (sofort bei Erhalt)

Erlaubnisnummer, Erteilungsdatum und die exakte Bezeichnung der erteilenden
Behörde vom Bescheid notieren (nicht raten — siehe bereits vorhandener
Hinweis in `README.md`, Aktivierungs-Checkliste Punkt 1). Diese Angaben werden
in Schritt 3 und 4 gebraucht.

## Schritt 1 — Gewerbe anmelden

Externe/behördliche Aktion, muss Finn selbst persönlich erledigen (kein
Website-/Code-Task). Details siehe `naechste-schritte-nach-34c-erlaubnis.md`:

- **Wo:** Stadt Heidenheim an der Brenz, Gewerbeamt, Grabenstraße 15, 89522
  Heidenheim (nicht die IHK — die ist nur für die Erlaubnis selbst zuständig,
  nicht für die Anmeldung). MEDIUM confidence zu Adresse/Öffnungszeiten,
  siehe Detail-Datei.
- **Kosten:** ca. 20–40€ Grundgebühr, ggf. zusätzliche Prüfgebühr für die
  regulierte Tätigkeit (MEDIUM confidence, nicht Heidenheim-spezifisch
  verifiziert). Das ist getrennt von den ca. 200–450€ der §34c-Erlaubnis
  selbst.
- **Mitzubringen:** Personalausweis, der Erlaubnisbescheid (Nachweis der
  Erlaubnis wird bei erlaubnispflichtigen Gewerben üblicherweise verlangt,
  LOW confidence — Heidenheim-spezifisch nicht bestätigt).
- **Form:** Vollständig digitale Anmeldung ist eher unüblich (Unterschrift
  nötig) — vor Ort auf heidenheim.de bzw. dem BW-Serviceportal gegenprüfen,
  ob Terminvereinbarung/Vorausfüllen online möglich ist.
- **Zeitplanung:** Bearbeitungsdauer des Erlaubnisantrags selbst bei der IHK
  Ostwürttemberg ist mit LOW/MEDIUM confidence auf grob 1–3 Monate ab
  vollständiger Einreichung (September 2026) geschätzt — keine belastbare
  Zusage, siehe Detail-Datei für die Quellenlage.

## Schritt 2 — IHK-Pflichtmitgliedschaft (automatisch, nichts zu tun)

Entsteht automatisch mit der Gewerbeanmeldung (wieder IHK Ostwürttemberg).
Beitrag als Existenzgründer voraussichtlich befreit/reduziert in den ersten
Jahren (MEDIUM confidence, Schwellenwerte bei der IHK direkt gegenprüfen,
sobald die Gewerbeanmeldung ansteht) — siehe `naechste-schritte-nach-34c-erlaubnis.md`.

## Schritt 3 — Impressum & Datenschutzerklärung aktivieren

Templates liegen bereits fertig vorbereitet, nur noch mit den echten
Bescheid-Daten zu befüllen und einzufügen:

- `impressum-ergaenzung-34c.md` → neuer Abschnitt in
  `app/(site)/impressum/page.tsx` (Erlaubnisnummer, Datum, Aufsichtsbehörde
  aus Schritt 0 einsetzen; bestehenden Satz „nicht um eine gewerbliche
  Immobilienmaklertätigkeit..." entfernen/anpassen).
- `datenschutz-ergaenzung-maklertaetigkeit.md` → neuer Abschnitt in
  `app/(site)/datenschutz/page.tsx` (kann warten, bis die erste echte
  Vermittlung ansteht — nicht zwingend am selben Tag wie das Impressum,
  da unabhängig von der reinen Gewerbeanmeldung).
- Hinweis-Kasten in `app/(site)/agb/page.tsx` ebenfalls anpassen (steht
  bereits in `README.md` Punkt 4).

Das ist ein Code-Task (Website-Änderung) und keine externe Aktion — kann vom
Zwilling vorbereitet/umgesetzt werden, sobald die echten Bescheid-Daten
vorliegen.

## Schritt 4 — Vermögensschadenhaftpflicht abschließen (freiwillig, empfohlen)

Gesetzlich nicht verpflichtend für reine Maklertätigkeit (Nr. 1), aber vor
dem ersten echten Vermittlungsfall sinnvoll. Angebotsvergleich bereits fertig
in `vermoegensschadenhaftpflicht-vergleich.md`:

- Realistische Bandbreite: ca. 115–370€/Jahr für Einzelmakler ohne
  Mitarbeiter.
- Exali liefert den konkretesten Startpreis (115,06€ netto/Jahr) und deckt
  zusätzlich Sach-/Personenschäden ab.
- Hiscox, Continentale, VHV passen vom Zuschnitt, aber ohne Online-Preis aus
  der Recherche — bräuchten den jeweiligen Online-Rechner für ein konkretes
  Angebot.
- **Das ist eine finanzielle Aktion (Vertragsabschluss) — braucht Finns
  eigene Entscheidung/Freigabe, kein automatischer Abschluss durch den
  Zwilling.**

## Schritt 5 — Preismodell (Provisionssatz) festlegen

Grundlage bereits recherchiert in `maklerprovision-preismodell.md`:

- Baseline-Vorschlag: 7,14% Gesamtprovision inkl. MwSt. bei
  Wohnung/Einfamilienhaus-Verkauf an Verbraucher, hälftig geteilt
  (3,57%/3,57%) — bei Doppeltätigkeit nach §656c BGB ohnehin zwingend, kein
  Verhandlungsspielraum.
- Bei Mehrfamilienhaus/Gewerbe/gewerblichem Käufer: freie Gestaltung möglich.
- Das ist eine reine Preisentscheidung (nicht extern/finanziell im Sinne der
  harten Regeln) — kann vom Zwilling als Vorschlag ausgearbeitet werden,
  Finn entscheidet final.

## Schritt 6 — Pflichtangaben in Maklerverträgen und Exposés (NEU recherchiert)

### 6a. Maklervertrag (bereits abgedeckt)

Vertragsvorlagen liegen fertig vor: `maklervertrag-alleinauftrag.md`,
`maklervertrag-einfacher-auftrag.md`. Formvorgabe bei
Verbraucherverkauf von Wohnung/Einfamilienhaus: **Textform** (§656a BGB,
E-Mail/PDF reicht, keine Unterschrift nötig) — bereits in der bestehenden
Vertragsrecht-Recherche behandelt (siehe `README.md`).

### 6b. Exposé / Immobilienanzeige — bisher nicht recherchiert, jetzt ergänzt

**Pflichtangaben in Immobilienanzeigen nach §87 GEG (Gebäudeenergiegesetz,
vormals EnEV) — MEDIUM/HIGH confidence, mehrere übereinstimmende
Fachquellen:**

Sobald zum Zeitpunkt der Vermarktung bereits ein Energieausweis für das
Objekt vorliegt, müssen folgende Angaben in jeder gewerblichen
Immobilienanzeige (Zeitung, Online-Portal, eigene Website — "kommerzielle
Medien") enthalten sein:

- die Art des Energieausweises (Bedarfs- oder Verbrauchsausweis),
- der Energiebedarf bzw. Energieverbrauchswert des Gebäudes in kWh/(m²·a),
- die im Ausweis genannten wesentlichen Energieträger für die Heizung,
- bei Wohngebäuden: das Baujahr,
- bei Wohngebäuden: die Energieeffizienzklasse.

Diese Pflicht (§87 Abs. 1 GEG) trifft **auch den Makler**, wenn er die
Anzeige veröffentlicht (nicht nur den Verkäufer) — Finn als Makler ist also
direkt in der Pflicht, sobald ein Energieausweis vorliegt und er das Exposé
selbst veröffentlicht (eigene Website, Immobilienportale).

**Bußgeldrahmen (Quellen widersprechen sich leicht — beide Zahlen genannt,
keine davon mit Erstquelle/Gesetzestext gegengeprüft, daher MEDIUM
confidence):** eine Quelle nennt bis zu 10.000€, eine andere bis zu 15.000€
als Bußgeldrahmen für Verstöße gegen §87 Abs. 1 GEG. Zusätzlich besteht das
Risiko einer wettbewerbsrechtlichen Abmahnung durch Mitbewerber (§3a UWG,
da §87 GEG als Marktverhaltensregel gilt). Für eine belastbare Zahl müsste
der genaue Gesetzestext/Bußgeldkatalog des GEG (bzw. die für 2026/2027
angekündigte GModG-Novelle) direkt geprüft werden — hier nur als Warnhinweis
mit Handlungsbedarf vermerkt, keine Grundlage für eine Risikokalkulation.

**Praktische Konsequenz für deininger-objektwert:** Bevor ein Exposé auf der
eigenen Website oder einem Portal veröffentlicht wird, immer prüfen, ob für
das Objekt bereits ein Energieausweis vorliegt — falls ja, müssen die oben
genannten 5 Angaben ins Exposé. Liegt noch kein Energieausweis vor (z. B.
weil der Verkäufer ihn erst beauftragt), entfällt die Pflicht bis zur
Vorlage — der Energieausweis selbst muss aber laut GEG grundsätzlich vor
Beginn der Vermarktung beim Verkäufer angefordert bzw. spätestens bei der
Besichtigung vorgelegt werden (dieser Vorlage-Zeitpunkt wurde hier nicht
vertieft recherchiert — bei Bedarf eigener Recherchepunkt).

Diese Vorlage könnte als konkreter Exposé-Textbaustein (z. B. ein
wiederverwendbarer Abschnitt in der Exposé-Generator-Funktion der Website,
siehe Commit „Add AI exposé generator to the project detail page")
vorbereitet werden, sobald die Erlaubnis erteilt ist — das wäre dann ein
separater Code-Task, hier nur als Recherche-Grundlage festgehalten.

## Schritt 7 — GwG: Einmalige Registrierung als Verpflichteter im goAML-Portal (aktualisiert, Ablauf jetzt HIGH confidence)

**HIGH confidence, siehe `gwg-risikoanalyse-sicherungsmassnahmen.md` Teil E
und Fazit:** Verdachtsmeldungen nach §43 GwG müssen elektronisch über das
goAML-Portal der Zentralstelle für Finanztransaktionsuntersuchungen (FIU)
erstattet werden. Dafür ist eine **einmalige Registrierung als Verpflichteter**
bei der FIU nötig — unabhängig davon, ob je eine Verdachtsmeldung abgegeben
wird (die Registrierungspflicht selbst besteht seit dem 01.01.2024 für alle
GwG-Verpflichteten, darunter ausdrücklich auch Immobilienmakler). Damit im
tatsächlichen Verdachtsfall keine Zeit für die Registrierung selbst verloren
geht, gehört sie bereits kurz nach Betriebsstart erledigt, nicht erst wenn ein
konkreter Verdacht vorliegt:

- **Wo:** goAML-Webportal der FIU (Generalzolldirektion), Registrierungsseite
  direkt unter [goaml.fiu.bund.de/Content/#/register](https://goaml.fiu.bund.de/Content/#/register).
  Im ersten Auswahlschritt die Organisationsart **„Verpflichteter"** wählen
  (nicht „meldende Behörde" — das ist die falsche Kategorie für Makler).
- **Was konkret gebraucht wird (jetzt HIGH confidence, Quelle: offizielles
  FIU-Merkblatt „Erforderliche Dokumente für die Registrierung in goAML Web"
  auf zoll.de):**
  - Ausweiskopie (Personalausweis oder Reisepass) — immer erforderlich.
  - Als Einzelunternehmer (Finn als Einzelmakler ohne Handelsregister-
    eintragung fällt in diese Kategorie): die **Gewerbeanmeldung** aus
    Schritt 1 als Nachweis — kein Handelsregisterauszug nötig (der wird nur
    bei eingetragenen Rechtsformen wie PartG/OHG/KG/e.K. verlangt, für einen
    Einzelmakler nicht einschlägig).
  - Meldung eines Ansprechpartners für die FIU über das separate **Formular
    033571** (zusätzlich zur eigentlichen Registrierung).
  - Ein eigener Geldwäschebeauftragter ist für einen Einzelmakler ohne
    Mitarbeiter nicht vorgeschrieben (siehe bereits `gwg-risikoanalyse-
    sicherungsmassnahmen.md` B.2) — die dafür zusätzlich nötige schriftliche
    Anzeige bei der Aufsichtsbehörde entfällt damit ebenfalls.
- **Bearbeitungsdauer:** Die Freischaltung erfolgt laut mehreren
  übereinstimmenden Fachquellen **innerhalb von 1–2 Werktagen**, sofern alle
  geforderten Dokumente vollständig eingereicht wurden — keine mehrwöchige
  Wartezeit, aber auch kein Sofort-Zugang. Deshalb sinnvoll, die Registrierung
  frühzeitig anzustoßen und nicht erst am Tag des ersten Maklervertrags.
- **Zeitpunkt:** direkt nach Schritt 1 (Gewerbeanmeldung), da die
  Gewerbeanmeldung als Nachweisdokument für die Registrierung selbst gebraucht
  wird — sinnvollerweise noch vor dem ersten echten Maklervertrag erledigen,
  nicht erst abwarten, bis ein Verdachtsfall eintritt.
- **Support bei Rückfragen:** Zoll-Service-Center, Tel. +49 (0)228 303-26070
  (Mo–Fr 8–17 Uhr, außer an bundeseinheitlichen Feiertagen).
- **Kosten:** 0€ (staatliches Meldeportal, keine Gebühr bekannt).
- **Das ist eine externe/behördliche Registrierung bei einer Bundesbehörde —
  braucht Finns eigene Ausführung/Identitätsnachweis, kein Website-/Code-Task
  und kein Automatismus durch den Zwilling.** Der Zwilling hat den konkreten
  Ablauf nur recherchiert und hier dokumentiert, die Registrierung selbst
  NICHT durchgeführt.

**Quellen (neu, für diesen Abschnitt):**
- [Erforderliche Dokumente für die Registrierung in goAML Web (FIU/Zoll, offizielles PDF)](https://www.zoll.de/SharedDocs/Downloads/DE/Links-fuer-Inhaltseiten/Fachthemen/FIU/fiu_goaml_registrierung_dokumente.pdf)
- [Zoll online – Registrierung (offizielle FIU-Seite)](https://www.zoll.de/DE/FIU/Fachliche-Informationen/Registrierung/registrierung_node.html)
- [goAML Web Portal – Registrierung](https://goaml.fiu.bund.de/Content/#/register)
- [Geldwäscheprävention: Registrierungspflicht bei der FIU – IHK Köln](https://www.ihk.de/koeln/hauptnavigation/recht-steuern/geldwaeschepraevention-registrierungspflicht-bei-der-fiu-5927316)
- [Registrierungspflicht für geldwäscherechtlich Verpflichtete beim Meldeportal „goAML Web" – GvW](https://www.gvw.com/aktuelles/blog/detail/registrierungspflicht-fuer-geldwaescherechtlich-verpflichtete-beim-meldeportal-goaml-web)
- [goAML: Registrierungspflicht für alle GwG-Verpflichteten – Update #2 – CMS](https://cms.law/de/deu/legal-updates/goaml-registrierungspflicht-fuer-alle-gwg-verpflichteten-8211-update-2)

## Offene Punkte (bewusst nicht Teil dieser Checkliste)

- **Geldwäschegesetz (GwG):** bereits in `README.md` Punkt 6 als offener
  Punkt vor dem ersten echten Vermittlungsfall vermerkt — hier nicht erneut
  vertieft.
- **Energieausweis-Vorlagepflicht (Zeitpunkt/Bußgeld bei Nichtvorlage selbst,
  getrennt von der Anzeigenpflicht oben):** in dieser Recherche nur
  gestreift, nicht vertieft — eigener Recherchepunkt bei Bedarf.
- **Exakte Bußgeldhöhe §87 GEG:** Quellen widersprüchlich (10.000€ vs.
  15.000€), nicht am Gesetzestext verifiziert — siehe oben.

## Quellen (neu in dieser Datei, zusätzlich zu den bereits in den
Detail-Dateien gelisteten)

- [Energieausweis (GModG) / Pflichtangaben in Immobilienanzeigen – Haufe](https://www.haufe.de/id/beitrag/energieausweis-gmodg-11-pflichtangaben-in-immobilienanzeigen-HI16021441.html)
- [GEG: Der neue Energieausweis – Makler in der Pflicht – Haufe](https://www.haufe.de/immobilien/verwaltung/rechtsprechung-energieausweis-und-maklerpflichten_258_443284.html)
- [GEG-Abmahnung: Diese Informationspflicht haben Makler – immowelt](https://www.immowelt.de/ratgeber/immobilienprofis/abmahnung-gebaeudeenergiegesetz)
- [GModG-Infoportal – Angaben in Immobilienanzeigen (Bund)](https://www.gmodg.bund.de/GEGPortal/DE/Energieausweise/Immobilienanzeigen/Immobilienanzeigen_node.html)
- [Pflichtangaben Exposé: GEG, Energieausweis & Courtage](https://www.immobilien-rostock-mv.de/lexikon/veroeffentlichungspflicht/)
- [Pflichtangaben in Immobilienanzeigen – immovance.de](https://immovance.de/pflichtangaben-in-immobilienanzeigen-welche-informationen-muessen-in-der-anzeige-stehen/)
- [GModG für Makler: Inseratspflicht, Vorlage, Übergabe, Bußgelder – energyausweis.de](https://www.energyausweis.de/blog/gmodg-fuer-makler-inseratspflicht-vorlage-uebergabe-und-bussgelder-ab-inkrafttreten)
