# Datenschutz-Ergänzung — für echte Maklervermittlungstätigkeit

> **Noch nicht aktivieren.** Die bestehende Datenschutzerklärung
> (`app/(site)/datenschutz/page.tsx`) deckt den aktuellen Stand (kostenloser
> Bewertungsrechner, Dokumenten-Upload, Kontaktformular) bereits sauber ab.
> Dieser Abschnitt beschreibt zusätzliche Datenverarbeitung, die erst entsteht,
> sobald echte Vermittlungsfälle laufen (Objekt beauftragt, Interessenten
> werden verwaltet, Besichtigungen organisiert, Notarabwicklung begleitet).
> Erst dann als neue `<Section>` einfügen (Nummerierung der Folgeabschnitte
> anpassen).

## Einzufügender Abschnitt (Beispieltext, an tatsächliche Umsetzung anpassen)

```
Maklervermittlung (Interessenten- und Objektverwaltung)

Sobald Sie uns mit dem Verkauf einer Immobilie beauftragen oder sich als
Kaufinteressent bei uns registrieren, verarbeiten wir zusätzlich zu den oben
genannten Daten:

- bei Verkäufern: Objektunterlagen (Grundbuchauszug, Energieausweis,
  Grundrisse, Fotos, bekannte Mängel und Lasten) sowie die Vertragsdaten aus
  dem Maklervertrag,
- bei Kaufinteressenten: Kontaktdaten, gewünschtes Objektprofil,
  Besichtigungstermine und ggf. Bonitätsangaben, soweit für eine
  Finanzierungsvorprüfung erforderlich und von Ihnen freiwillig mitgeteilt,
- bei Vertragsabschluss: die zur Identifizierung nach dem Geldwäschegesetz
  (GwG) erforderlichen Angaben (z. B. Ausweiskopie), soweit wir als
  Verpflichtete nach § 2 Abs. 1 Nr. 14 GwG hierzu verpflichtet sind.

Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung bzw.
vorvertragliche Maßnahmen) sowie, soweit gesetzlich vorgeschrieben, Art. 6
Abs. 1 lit. c DSGVO (rechtliche Verpflichtung, insbesondere GwG).

Objektunterlagen und Interessentendaten werden gelöscht, sobald sie für die
Vermittlung nicht mehr erforderlich sind und keine gesetzlichen
Aufbewahrungspflichten entgegenstehen (insbesondere die Aufbewahrungsfristen
nach dem GwG von bis zu fünf Jahren für Identifizierungsunterlagen, sofern
diese erhoben wurden).

Eine Weitergabe von Interessentendaten an den Verkäufer bzw. von
Objektdaten an Kaufinteressenten erfolgt nur im für die Vermittlung
erforderlichen Umfang.
```

## Zusätzlich zu prüfen bei Aktivierung

- Falls ein CRM/Datenbank-Tool für Interessentenverwaltung eingesetzt wird
  (z. B. das bestehende Supabase-Setup, siehe `crm_tables`-Migration), diesen
  Abschnitt um den konkreten Anbieter und Serverstandort ergänzen — analog zu
  Abschnitt 9 der bestehenden Datenschutzerklärung.
- Falls Bonitätsauskünfte bei einer Auskunftei (z. B. Schufa) eingeholt werden
  sollten, ist das ein eigener, zustimmungspflichtiger Verarbeitungsschritt
  (Art. 6 Abs. 1 lit. a DSGVO) und separat zu ergänzen — aktuell nicht
  vorgesehen, nur als Hinweis für später.
