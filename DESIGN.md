---
name: Deininger Objektwert
description: Ein Blatt der Ulmer Schule: Raster, eine Grotesk, ein kobaltblauer Signalton, Haarlinien.
colors:
  paper: "#f2f4f5"
  paper-dim: "#e5e9ec"
  stone: "#d1d7db"
  stone-dark: "#8a959b"
  ink: "#0f1519"
  ink-soft: "#364046"
  line: "rgba(15, 21, 25, 0.16)"
  accent: "#1f3fd6"
  accent-text: "#1a35b8"
typography:
  display:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 7.4vw, 6rem)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-0.028em"
    fontVariation: "'wdth' 108"
  headline:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "3rem"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.028em"
    fontVariation: "'wdth' 108"
  title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.028em"
    fontVariation: "'wdth' 108"
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.43
rounded:
  none: "0"
spacing:
  gutter-sm: "20px"
  gutter-md: "32px"
  gutter-lg: "48px"
  section-y: "128px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "#ffffff"
    rounded: "{rounded.none}"
    padding: "16px 24px"
  button-primary-hover:
    backgroundColor: "{colors.ink}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "14px 22px"
  button-ghost-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  statement-band:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
---

# Design System: Deininger Objektwert

## Overview

**Creative North Star: "Das Ulmer Blatt"**

Die Seite ist gesetzt wie ein Blatt der HfG Ulm (Otl Aicher): ein zwölfspaltiges Raster, eine Schrift, ein Signalton, jede Zahl und jede Beschriftung sitzt auf einer Linie. Gliederung entsteht ausschließlich durch Haarlinien in Blauschwarz, Flächenwechsel zwischen Neutralweiß und Blauschwarz und randlose rechteckige Bilder. Es gibt weder Rundungen noch Schatten noch Verläufe.

Der Ton ist ruhig, genau und handwerklich. Der kobaltblaue Button ist das einzige farbige Handlungselement; alles andere ist Tinte auf kühlem Papier.

**Key Characteristics:**
- Kühles Neutralweiß als Grund, kein Creme; Blauschwarz als Schrift und Linie.
- Genau ein Signalton (Kobalt) für Handlung, Fokus und Textmarkierung.
- Eine Grotesk (Archivo) mit Breitenachse 108 in Überschriften, enge Laufweite.
- Beschriftungen stehen in der schmalen linken Randspalte unter einer Linie, nie über der Überschrift.
- Bilder rechteckig, randlos im Raster, ohne Überlagerung.
- Bewegung nur als Zeichnen einer Linie und kurzer Einblendversatz.

## Colors

Kühle Neutraltöne und Blauschwarz mit einem einzigen Kobaltblau.

### Primary
- **Signalkobalt** (accent): Hauptbutton, Fokusring, Textauswahl, Links in Artikeltext. Der einzige gesättigte Ton.
- **Kobalt für Text** (accent-text): dunklere Variante für Fließtextlinks auf Neutralweiß (ca. 7:1).

### Neutral
- **Kühles Neutralweiß** (paper): Seitengrund, Kopfzeile, Scrollleiste.
- **Neutralweiß gedämpft** (paper-dim) und **Stein** (stone): Flächen und Trenner der Formulare und Rechner, selten.
- **Stein dunkel** (stone-dark): Scrollleiste.
- **Blauschwarz** (ink): Schrift, alle Haarlinien, Statement-Band, Hover-Fläche der Buttons.
- **Blauschwarz weich** (ink-soft): Fließtext, Einleitungen, Nebenangaben.
- **Haarlinie hell** (line): Trenner in der mobilen Navigation und in Listen.

### Named Rules
**The One Signal Rule.** Kobalt steht nur für Handlung und Fokus. Keine zweite Farbe, keine Kobaltflächen als Dekor.

**The Cool Ground Rule.** Der Grund bleibt kühl und neutral; warme Cremetöne gehören nicht in dieses System.

## Typography

**Display Font:** Archivo (Variable, Achse wdth, mit system-ui Fallback)
**Body Font:** Archivo
**Label/Mono Font:** keine; Labels sind Archivo 500.

**Character:** Eine Grotesk trägt alles: die Breitenachse (wdth 108) und das Gewicht unterscheiden Überschrift und Text. Ziffern in Tabellen, Preisen und Rechnern laufen tabellarisch.

### Hierarchy
- **Display** (700, clamp(2.75rem, 7.4vw, 6rem), 0.98): nur die H1 der Startseite, max. 16ch breit.
- **Headline** (600, 1.875rem mobil, 3rem ab md, 1.05): H2 in Abschnittsköpfen; Stufe xl springt auf 4.5rem bis 6rem (der eine Maßstabssprung pro Seite).
- **Title** (600, 1.5rem bis 1.875rem): H3 in Faktor-Zeilen, in Spalte 1 bis 3.
- **Body** (400, 1.0625rem bis 1.25rem, 1.6 bis 1.75): Fließtext in Blauschwarz weich; Zeilenlänge max. ca. 34 bis 42rem.
- **Label** (500, 0.875rem): Randspaltenbeschriftung und Tabellenzeilen; Fakten-Etiketten 0.75rem in Blauschwarz weich.

### Named Rules
**The One Face Rule.** Keine zweite Schriftfamilie. Hierarchie entsteht aus Breite, Gewicht und Größe.

**The Margin Label Rule.** Eine Beschriftung steht unter einer Haarlinie in der linken Spalte (3 von 12) neben der Überschrift, nie als Zeile über ihr.

## Layout

Zwölfspaltiges Raster. Inhaltscontainer maximal 84rem, Hero und Statement-Band bis 96rem; seitlicher Einzug 20px, 32px ab sm, 48px ab lg. Abschnitte atmen mit 80px (mobil) bis 128px (ab md) vertikal. Typische Teilungen: Hero 6/6 mit Bild randlos bis zur Fensterkante und Höhe passend zum Viewport; Statement 7/5; Faktor-Zeilen 3/5/4, eine Zeile mit Bild über volle 12 Spalten (21:8). Unter dem Hero läuft eine Haarlinie mit Tabellenzeile aus drei Fakten, getrennt durch senkrechte Haarlinien. Mobil kollabiert alles in eine Spalte, das Bild rückt über den Text. Kopfzeile sticky, 64px mobil, 72px ab md, Haarlinie unten.

## Elevation & Depth

Flach. Es gibt keine Schatten, Verläufe oder Überlagerungen. Tiefe entsteht durch Haarlinien (1px Blauschwarz) und den Flächenwechsel zu Blauschwarz im Statement-Band.

### Named Rules
**The Flat Rule.** Kein box-shadow, kein Verlauf, keine Bildüberlagerung. Zustände werden über Farbwechsel gezeigt.

## Shapes

Rechtwinklig. Radius ist überall 0, auch beim Fokusring. Bilder sind rechteckig und randlos. Strukturlinien sind 1px in Blauschwarz (ink), nur Listentrenner nutzen die helle Haarlinie (line).

## Components

### Buttons
- **Shape:** rechteckig, kein Radius.
- **Primary:** Kobaltfläche, weiße Schrift 600, 0.9375rem, Padding 16px 24px, optional Pfeil-SVG.
- **Hover / Focus:** Fläche wird Blauschwarz (0.2s); aktiv 1px nach unten; Fokus 2px Kobalt-Kontur mit 3px Abstand.
- **Ghost:** 1px Blauschwarz-Rahmen, Schrift Blauschwarz; Hover invertiert zu Blauschwarz mit Neutralweiß.
- **Textlink:** Blauschwarz 500, Unterstreichung 1px in 40% Tinte, Hover voll.

### Navigation
Flache Kopfzeile in Neutralweiß mit Haarlinie unten. Wortmarke in Archivo 700 Versalien mit Bildmarke. Punkte: 0.875rem 500, Hover invertiert zu Blauschwarz. Mobil: Menüknopf mit 1px Rahmen, Liste klappt auf, Trenner in heller Haarlinie.

### Abschnittskopf (Signature)
Linke Randspalte: DrawRule (1px Linie, zeichnet sich einmal von links in 1s) mit Beschriftung darunter; rechts H2 und Einleitung. Der Einblendversatz (14px, 0.6s) gilt für den Inhalt.

### Statement-Band
Blauschwarze Fläche, Neutralweiß-Text in 600, daneben ein randloses Foto (7/5).

### Faktor-Zeile
Obere Haarlinie, H3 links, Text und Bild nebeneinander; ein Bild darf auf volle Breite gehen.

### Bewegung
Easing cubic-bezier(0.16, 1, 0.3, 1). Hero-Linie `rule-draw` 1.1s, Abschnittslinien DrawRule 1s, Reveal 0.6s. Bei prefers-reduced-motion entfallen Zeichnen und Versatz. Kein Bildversatz oder Drift.

## Do's and Don'ts

### Do:
- **Do** nutze Haarlinien (1px, ink) zur Gliederung und setze Beschriftungen in die linke Randspalte unter eine Linie.
- **Do** halte Kobalt für Buttons, Fokus und Textlinks; Fließtextlinks in accent-text.
- **Do** lasse Bilder rechteckig und randlos ins Raster laufen, mit mindestens einem großen Maßstabssprung je Seite.
- **Do** setze Zahlen tabellarisch.

### Don't:
- **Don't** Radius, Schatten, Verläufe oder Bildüberlagerungen verwenden.
- **Don't** eine zweite Schrift oder eine zweite Signalfarbe einführen.
- **Don't** Creme-Grund, Serifenüberschriften oder warme Akzente verwenden.
- **Don't** Bilder per Pan, Drift oder Parallax bewegen.

## Bildherkunft (offen)

Die Fotos unter `public/images/story/` sind illustrativ. Ihre Herkunft und Erzeugungsweise sind im Repository nicht belegt. Der Betreiber muss die Quelle bestätigen, bevor sie als echte Objektfotos präsentiert werden; bis dahin gelten sie nicht als dokumentierte Belege.

## Nicht übernommen (Abweichungen im Build)

- Die Liste `factors` in `value-factors-section.tsx` führt ein unbenutztes Feld `number`; die Zahl wird nicht angezeigt und ist keine Systemregel.
- Der Hero-Zoom (`scale-[1.9]`) auf dem Technikbild ist ein Bildausschnitt, keine Systemregel.
- Die Wortmarke setzt Versalien mit weiter Laufweite (10px, 0.3em) für "Objektwert"; sie gehört zur Marke, nicht zu den Beschriftungen und wird nicht auf neue Labels übertragen.
