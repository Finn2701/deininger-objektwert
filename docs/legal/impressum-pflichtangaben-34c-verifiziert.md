# Recherche-Notiz: Website-Pflichtangaben nach §34c-Gewerbeanmeldung (verifiziert)

Stand: 2026-09-20. Reine WebSearch-Recherche (keine externe Aktion, 0€ Kosten).
Verifiziert und ergänzt den bereits vorbereiteten Entwurf in
`impressum-ergaenzung-34c.md` (bisher unverifizierter Entwurf ohne
Quellenangaben) nach demselben Muster wie `naechste-schritte-nach-34c-erlaubnis.md`
und `post-erlaubnis-launch-checkliste.md`.

**Hinweis zur Aufgabenstellung:** Der Auftrag für diese Recherche verwies auf
eine Datei `docs/pflichten-nach-34c-erlaubnis-checkliste.md` und eine
Migration `20260920070000_fortbildung_gwg_34c_korrektur.sql` (angeblich
bereits Punkt 6 "Fortbildungspflicht" und Punkt 3 "GwG-Grundpflichten"
verifiziert). Beide Dateien existieren in diesem Repo nicht — die tatsächliche
Checkliste heißt `post-erlaubnis-launch-checkliste.md` und enthält keinen
"Fortbildungspflicht"-Punkt. Es gibt auch keine bestehende
`memory_entries`-Migration im `supabase/migrations/`-Ordner. Diese Notiz
behandelt trotzdem den inhaltlichen Kern der Aufgabe (Website-Pflichtangaben
Impressum/Datenschutz), da dieser unabhängig von der falschen Dateireferenz
ein echtes offenes Recherchethema war (siehe `README.md`, Tabelle:
`impressum-ergaenzung-34c.md` war als unverifizierter Entwurf markiert).

## 1. Rechtsgrundlage: § 5 Abs. 1 Nr. 3 DDG (Nachfolger von § 5 TMG)

**HIGH confidence, mehrere übereinstimmende Quellen (mehrere IHKs, gesetze-im-internet.de):**
Seit 14.05.2024 regelt das Digitale-Dienste-Gesetz (DDG) die frühere
TMG-Impressumspflicht. § 5 Abs. 1 Nr. 3 DDG verlangt: Wird der Dienst im
Rahmen einer Tätigkeit erbracht, die einer behördlichen Zulassung bedarf
(erlaubnispflichtiges Gewerbe), muss die **zuständige Aufsichtsbehörde
samt Anschrift** angegeben werden. Immobilienmakler nach § 34c GewO werden in
mehreren IHK-Merkblättern (Rhein-Neckar, München, Elbe-Weser, Nordschwarzwald)
explizit als Beispiel für diese Pflicht genannt.

## 2. Welche Behörde für Finn konkret zu nennen ist

**HIGH confidence (deckt sich mit bereits bestehender Recherche in
`naechste-schritte-nach-34c-erlaubnis.md`):** In Baden-Württemberg ist seit
1.3.2019 (§ 4 GewOZuVO) die IHK sowohl Erlaubnis- als auch Aufsichtsbehörde
für § 34c GewO — nicht das Gewerbeamt. Für Finns Impressum bedeutet das: Es
muss **keine andere Behörde** als die bereits bekannte IHK Ostwürttemberg
recherchiert werden. Die im Bescheid genannte Behörde (siehe Schritt 0 der
Launch-Checkliste) ist zugleich die im Impressum zu nennende
Aufsichtsbehörde — in den meisten Bundesländern (aber nicht allen, z. B.
teils noch Gewerbe-/Ordnungsämter) sind Erlaubnis- und Aufsichtsbehörde
identisch; für BW ist das laut Quellenlage der Fall.

## 3. Korrektur am bestehenden Entwurf (`impressum-ergaenzung-34c.md`)

**HIGH confidence, mehrere unabhängige Quellen (e-recht24, fachanwalt.de,
IHK-Merkblätter):** Immobilienmakler nach § 34c GewO sind **kein
"reglementierter Beruf"/Kammerberuf** im Sinne von § 5 Abs. 1 Nr. 4/5 DDG
(das betrifft z. B. Steuerberater, Architekten, Ärzte, Rechtsanwälte — Berufe
mit einer echten Berufskammer und eigenem Berufsrecht). Für Immobilienmakler
gilt **nur** Nr. 3 (Aufsichtsbehörde + Anschrift), nicht die zusätzlichen
Kammerberuf-Angaben (Kammer, gesetzliche Berufsbezeichnung + Verleihungsstaat,
Berufsrechtliche Regelungen + Fundstelle).

Der bestehende Entwurf in `impressum-ergaenzung-34c.md` enthält die Zeile
„Berufsbezeichnung „Immobilienmakler" verliehen in: Deutschland." — das ist
rechtlich **keine zwingende Pflichtangabe** für dieses Gewerbe (schadet nicht,
ist aber unnötig und suggeriert fälschlich einen Kammerberuf-Status). Die
einzige zwingende Zusatzangabe ist Name + volle Anschrift der IHK
Ostwürttemberg als Aufsichtsbehörde, verbunden mit der Nennung der
Erlaubnisgrundlage (§ 34c Abs. 1 Nr. 1 GewO). Ein Link auf die Website der
IHK ist nicht zweifelsfrei zwingend, wird aber von mehreren Quellen
(u. a. ra-plutte.de) sicherheitshalber empfohlen, da strittig ist, ob Adresse
allein genügt — **im Zweifel beides angeben** (Adresse + Link), wie im
bestehenden Entwurf bereits vorgesehen.

**Empfohlene Ergänzung/Korrektur für `impressum-ergaenzung-34c.md` bei
Aktivierung:** die Zeile zur Berufsbezeichnung/Verleihungsstaat weglassen
oder als optional kennzeichnen; stattdessen sicherstellen, dass die
Aufsichtsbehörden-Zeile die volle Postanschrift **und** die Website der IHK
Ostwürttemberg enthält (nicht nur den Namen).

## 4. Sanktionsrisiko bei fehlender/unvollständiger Angabe

**HIGH confidence (Primärquelle gesetze-im-internet.de + mehrere Sekundärquellen):**
- Zivilrechtlich: Wettbewerbsrechtlicher Verstoß (Abmahnrisiko durch
  Mitbewerber/Verbände) — z. B. LG Leipzig, Urteil vom 06.12.2014,
  Az. 05 O 848/13, hat das Fehlen der Aufsichtsbehörde bei einem
  Immobilienmakler-Impressum als abmahnfähig bestätigt.
- Ordnungswidrigkeitenrechtlich: § 33 Abs. 2 Nr. 1 DDG stellt es unter
  Bußgeld (bis zu 50.000€), wenn eine Pflichtangabe nach § 5 Abs. 1 DDG
  (dazu zählt Nr. 3, die Aufsichtsbehörde) vorsätzlich oder fahrlässig nicht,
  nicht richtig oder nicht vollständig verfügbar gehalten wird.

Praktische Einordnung: Das Risiko besteht erst, sobald die Website den
Eindruck einer aktiven, erlaubnispflichtigen Maklertätigkeit erweckt (siehe
bereits bestehende Warnung in `impressum-ergaenzung-34c.md` zu § 5 UWG,
Irreführung vor Erlaubniserteilung) — also erst ab dem Zeitpunkt, ab dem der
bestehende Hinweis „nicht um eine gewerbliche Immobilienmaklertätigkeit"
entfernt wird.

## 5. Datenschutzerklärung (kurzer Abgleich, keine neue Recherche nötig)

Die in der Aufgabenstellung erwähnte Aktualisierung der Datenschutzerklärung
ist inhaltlich bereits mit dem bestehenden, unverändert gültigen Entwurf
`datenschutz-ergaenzung-maklertaetigkeit.md` abgedeckt (Art. 6 Abs. 1 lit. b/c
DSGVO, GwG-Identifizierungsdaten, Löschfristen). Diese Recherche hat dazu
keine neuen Erkenntnisse ergeben — der bestehende Entwurf bleibt der
richtige Ansatzpunkt bei Aktivierung.

## Fazit für die Checkliste

Punkt "Website-Pflichtangaben" kann von MEDIUM auf **HIGH confidence**
angehoben werden für den Kernpunkt (§ 5 Abs. 1 Nr. 3 DDG, IHK Ostwürttemberg
als zu nennende Aufsichtsbehörde mit voller Anschrift + Link, keine
zusätzlichen Kammerberuf-Angaben nötig). Offen bleibt nur die exakte
Postanschrift der IHK Ostwürttemberg für die Impressum-Zeile — die sollte
direkt aus dem tatsächlichen Erlaubnisbescheid bzw. von der IHK-Website
übernommen werden, sobald aktiviert wird (kein WebSearch-Thema mehr, reine
Abschrift).

## Quellen

- [§ 5 DDG – Einzelnorm (gesetze-im-internet.de)](https://www.gesetze-im-internet.de/ddg/__5.html)
- [§ 33 DDG – Bußgeldvorschriften (gesetze-im-internet.de)](https://www.gesetze-im-internet.de/ddg/__33.html)
- [Internet-Impressum für Ihr Gewerbe gemäß § 34c GewO – IHK Rhein-Neckar](https://www.ihk.de/rhein-neckar/wirtschaftsstandort/branchen/dienstleistungen/immobilienwirtschaft/erlaubnispflichtige-gewerbe-gemaess-34c/internetimpressum-4352104)
- [Internet-Impressum – IHK Elbe-Weser](https://www.ihk.de/elbeweser/branchen-channel/immobilienwirtschaft/internetimpressum-5112982)
- [Internet-Impressum – IHK Nordschwarzwald](https://www.ihk.de/nordschwarzwald/recht/recht/erlaubnisse-und-registrierungen/immobilienmakler-bautraeger-hausverwalter/internet-impressum-4490584)
- [MERKBLATT Recht und Steuern – Internet-Impressum Immobilienmakler (IHK, PDF)](https://www.ihk.de/blueprint/servlet/resource/blob/5826200/4316a91295f506ed7d1cce49d32280d3/impressumspflichten-immobilienmakler-data.pdf)
- [Impressum: Müssen Immobilienmakler im Impressum die Zulassungsbehörde angeben? – e-recht24](https://www.e-recht24.de/impressum/7906-impressum-immobilienmakler.html)
- [Immobilienmakler muss Angaben zur Aufsichtsbehörde im Impressum angeben – fachanwalt.de](https://www.fachanwalt.de/magazin/impressum-recht/immobilienmakler-muss-angaben-zur-aufsichtsbehoerde-im-impressum-angeben)
- [Aufsichtsbehörde in Impressum eines Immobilienmaklers – Kanzlei Plutte](https://www.ra-plutte.de/aufsichtsichtsbehoerde-immobilienmakler-impressum/)
- [Makler müssen im Impressum die Aufsichtsbehörde angeben – ratgeberrecht.eu](https://www.ratgeberrecht.eu/wettbewerbsrecht-aktuell/makler-muessen-im-impressum-die-aufsichtsbehoerde-angeben.html)
