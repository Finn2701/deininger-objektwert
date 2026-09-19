# Rechtliche Pflichtdokumente für den Maklerbetrieb (Vorbereitung)

Status: **Vorbereitet, noch nicht aktiv.** Die §34c-Erlaubnis (IHK Ostwürttemberg)
ist beantragt, aber noch nicht erteilt. Diese Dokumente liegen bewusst nur hier
im `docs/legal/`-Ordner und sind **nicht** in die öffentliche Website (`app/(site)/...`)
eingebunden — es wäre irreführend, jetzt schon aufzutreten, als sei die Erlaubnis
bereits erteilt (Wettbewerbsrecht, §5 UWG). Sobald der Erlaubnisbescheid da ist,
können sie mit den echten Angaben aus dem Bescheid befüllt und aktiviert werden.

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
2. `impressum-ergaenzung-34c.md` mit den echten Werten befüllen und als neuen
   `<Section>`-Block in `app/(site)/impressum/page.tsx` einfügen; den Satz zum
   „nicht gewerbliche Maklertätigkeit" im bestehenden Impressum entfernen/anpassen.
3. `datenschutz-ergaenzung-maklertaetigkeit.md` als neuen `<Section>`-Block in
   `app/(site)/datenschutz/page.tsx` einfügen (Nummerierung der Folgeabschnitte
   anpassen).
4. In `app/(site)/agb/page.tsx` den Hinweis-Kasten oben („Die gewerbliche gemäß
   § 34c GewO angezeigte Maklertätigkeit befindet sich derzeit in Vorbereitung...")
   entfernen bzw. auf den Ist-Zustand aktualisieren.
5. Gewerbe anmelden (erst nach Erlaubniserteilung möglich, siehe AGENTS.md-Notiz
   zum §34c-Verfahren) — das ist eine externe/behördliche Aktion und braucht
   Finns eigene Ausführung, kein Website-Task.
6. Geldwäschegesetz (GwG) beachten: Immobilienmakler sind ab Aufnahme der
   Tätigkeit „Verpflichtete" nach § 2 Abs. 1 Nr. 14 GwG — das bedeutet u. a.
   Identifizierungspflichten (Ausweiskopie) bei Vertragsparteien in bestimmten
   Fällen und eine Registrierung im Transparenzregister-Meldeportal (goAML) für
   Verdachtsfälle. Das ist inhaltlich nicht Teil dieser Website-Vorlagen, aber
   sollte vor dem ersten echten Vermittlungsfall einmal kurz recherchiert werden
   (kostenlose Info z. B. beim Bundesverwaltungsamt/Zoll, keine Ausgabe nötig).
