import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { cityPagePath, cityPages } from "@/lib/city-pages";
import { siteConfig } from "@/lib/site-config";
import { breadcrumbJsonLd, faqJsonLd, webPageJsonLd } from "@/lib/structured-data";
import { RANGE_SPREAD, TYPICAL_HOUSE_PLOT_SQM } from "@/lib/valuation-estimate";
import {
  benchmarkMeta,
  cityFactor,
  conditionMultiplier,
  energyClassMultiplier,
  featureBonus,
  floorLevelMultiplier,
  moistureIssuesMultiplier,
  plotPricePerSqm,
  pricePerSqmByType,
  settlementTierAdjustment,
  stateFactor,
  topFloorElevatorBonus,
  yearBuiltMultiplier,
} from "@/lib/valuation-benchmarks";
import { featureOptions } from "@/components/valuation-form/steps-data";

const PATH = "/wie-wir-rechnen";

export const metadata: Metadata = {
  title: "So rechnet der Immobilienwert-Rechner",
  description:
    "Datengrundlage, Regionalfaktoren für ganz Deutschland, Wertfaktoren (Energieklasse, Zustand, Etage) und Genauigkeit des Immobilienwert-Rechners – mit Datenstand.",
  alternates: { canonical: PATH },
};

const pct = (factor: number) => {
  const delta = Math.round((factor - 1) * 1000) / 10;
  const text = new Intl.NumberFormat("de-DE", { minimumFractionDigits: 0, maximumFractionDigits: 1 }).format(delta);
  return delta > 0 ? `+${text} %` : `${text} %`;
};
const num = (value: number) => new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0 }).format(value);
const factorText = (value: number) => value.toFixed(2).replace(".", ",");
const dateDe = (iso: string) =>
  new Intl.DateTimeFormat("de-DE", { dateStyle: "long" }).format(new Date(`${iso}T12:00:00Z`));

const yearLabels: Record<string, string> = {
  "vor-1950": "Vor 1950",
  "1950-1970": "1950 bis 1970",
  "1970-1990": "1970 bis 1990",
  "1990-2010": "1990 bis 2010",
  "nach-2010": "Nach 2010",
  unbekannt: "Unbekannt",
};
const conditionLabels: Record<string, string> = {
  unsaniert: "Original / lange nicht saniert",
  teilsaniert: "Teilweise modernisiert",
  modernisiert: "Vollständig saniert",
};
const energyLabels: Record<string, string> = {
  "a-plus": "A+",
  a: "A",
  b: "B",
  c: "C",
  d: "D",
  e: "E",
  f: "F",
  g: "G",
  h: "H",
};

/** Ortsschlüssel ohne Umlaut-/Zusatz-Varianten, damit jede Stadt nur einmal in der Tabelle steht. */
function canonicalCityKey(key: string) {
  return key
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ \(.*\)$/, "")
    .replace(/ (an der brenz|am main|im breisgau)$/, "");
}

function buildCityRows() {
  const seen = new Map<string, { name: string; factor: number }>();
  for (const [key, factor] of Object.entries(cityFactor)) {
    const canon = canonicalCityKey(key);
    if (seen.has(canon)) continue;
    const name = key
      .replace(/ \(.*\)$/, "")
      .replace(/ (an der brenz|am main|im breisgau)$/, "")
      .replace(/\b\p{L}/gu, (c) => c.toUpperCase());
    seen.set(canon, { name, factor });
  }
  return [...seen.values()].sort((a, b) => a.name.localeCompare(b.name, "de"));
}

function buildStateRows() {
  const seen = new Map<string, { name: string; factor: number }>();
  for (const [key, factor] of Object.entries(stateFactor)) {
    const canon = key.replace(/ä/g, "ae").replace(/ü/g, "ue");
    if (seen.has(canon)) continue;
    seen.set(canon, { name: key.replace(/\b\p{L}/gu, (c) => c.toUpperCase()), factor });
  }
  return [...seen.values()].sort((a, b) => a.name.localeCompare(b.name, "de"));
}

const faqs = [
  {
    question: "Woher stammen die Preise, mit denen der Rechner arbeitet?",
    answer:
      "Aus veröffentlichten Marktauswertungen (u. a. immowelt, ImmoScout24, Engel & Völkers, Homeday, Statista), die manuell recherchiert und in den Rechner eingepflegt werden – nicht aus einem automatischen Abruf von Inseraten. Den jeweiligen Datenstand nennen wir auf dieser Seite und unter jeder Ortsseite.",
  },
  {
    question: "Wie genau ist die Bewertung?",
    answer:
      "Es ist eine Ersteinschätzung in Form einer Spanne, keine Punktlandung. Je mehr optionale Angaben Sie machen (Energieklasse, Etage, Zustand …), desto enger wird die Spanne – von rund 88–110 % des Mittelwerts auf bis zu 95–103 %. Für Bank, Gericht oder Finanzamt ersetzt sie kein Verkehrswertgutachten.",
  },
  {
    question: "Was ist der Unterschied zwischen Angebotspreis und Kaufpreis?",
    answer:
      "Angebotspreise sind das, was Verkäufer in Portalen verlangen. Beurkundete Kaufpreise liegen häufig etwas darunter. Die amtlichen Bodenrichtwerte und Kaufpreissammlungen der Gutachterausschüsse sind die verlässlichere Quelle für tatsächlich gezahlte Preise – sie sind aber nicht für jede Lage öffentlich einsehbar.",
  },
  {
    question: "Warum werden Stadt-Durchschnitte angepasst?",
    answer:
      "Weil ein Durchschnittspreis für eine ganze Stadt wenig über Ihr Haus oder Ihre Wohnung sagt. Der Rechner startet deshalb mit dem regionalen Preisniveau und passt es an Baujahr, Zustand, Ausstattung, Energieeffizienz und – bei Wohnungen – Etage und Aufzug an.",
  },
];

function Table({ headers, rows }: { headers: string[]; rows: (string | number)[][] }) {
  return (
    <div className="mt-6 overflow-x-auto rounded-xl border border-line">
      <table className="w-full min-w-[420px] text-left text-sm">
        <thead className="bg-paper-dim text-xs tracking-[0.1em] text-ink-soft/70 uppercase">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} className={`px-4 py-2.5 ${j === 0 ? "text-ink" : "text-ink-soft"}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="font-display text-2xl leading-[1.2] font-medium text-ink md:text-3xl">{children}</h2>;
}

export default function WieWirRechnenPage() {
  const cityRows = buildCityRows();
  const stateRows = buildStateRows();
  const wohnungBase = pricePerSqmByType.wohnung;
  const hausBase = pricePerSqmByType.haus;

  const sources: { label: string; url: string }[] = [
    { label: "immowelt – Immobilienpreise Deutschland und Städtevergleich (Sept. 2026)", url: "https://www.immowelt.de/immobilienpreise/deutschland" },
    { label: "immowelt – Preisatlas Heidenheim an der Brenz (Basis-Region)", url: "https://www.immowelt.de/immobilienpreise/baden-wurttemberg/heidenheim-an-der-brenz-89518/ad08de5538" },
    { label: "Engel & Völkers – Immobilienpreise Heidenheim an der Brenz", url: "https://www.engelvoelkers.com/de-de/immobilienpreise/baden-wuerttemberg/heidenheim-an-der-brenz/" },
    { label: "ImmoScout24 – Immobilienpreise Heidenheim (Kreis)", url: "https://www.immoscout24.de/immobilienpreise/baden-wuerttemberg/heidenheim-kreis" },
    { label: "miete-aktuell.de – Bodenrichtwert Heidenheim (Grundstückspreis)", url: "https://www.miete-aktuell.de/bodenrichtwert-grundstueckspreise/Heidenheim-an-der-Brenz/Heidenheim-an-der-Brenz/" },
    { label: "immowelt – Preisfaktor Energieeffizienz: bis zu 23 % Aufschlag (2025)", url: "https://www.immowelt.de/ueberuns/presse/pressemitteilungenkontakt/2025/preisfaktor-energieeffizienz-bis-zu-23-prozent-aufschlag-fuer-immobilien-mit-bestem-energiestandard/" },
    { label: "Immobilienmanager – So stark wirkt sich die Energieeffizienzklasse auf Hauspreise aus", url: "https://www.immobilienmanager.de/so-stark-wirkt-sich-die-energieeffizienzklasse-auf-hauspreise-aus-30072024" },
    { label: "AssCompact – Preisunterschiede nach Etage und Aufzug", url: "https://www.asscompact.de/nachrichten/im-dachgeschoss-wohnt-es-sich-am-teuersten" },
    { label: "OpenStreetMap Nominatim – Geokodierung der eingegebenen Lage", url: "https://nominatim.org" },
    { label: "§ 194 BauGB – Verkehrswert (gesetze-im-internet.de)", url: "https://www.gesetze-im-internet.de/bbaug/__194.html" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webPageJsonLd({
              name: "So rechnet der Immobilienwert-Rechner: Datengrundlage & Methode",
              description:
                "Datengrundlage, Regionalfaktoren, Wertfaktoren und Genauigkeit des kostenlosen Immobilienbewertungs-Rechners von Deininger Objektwert.",
              path: PATH,
              dateModified: benchmarkMeta.lastUpdated,
            })
          ),
        }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Start", url: "/" },
              { name: "Immobilienbewertung", url: "/immobilienbewertung" },
              { name: "So rechnen wir", url: PATH },
            ])
          ),
        }}
      />

      <main>
        <article className="py-20 md:py-28">
          <Container className="max-w-4xl">
            <Link href="/immobilienbewertung" className="text-sm text-ink-soft/70 hover:text-ink">
              ← Zum Rechner
            </Link>
            <p className="mt-6 text-xs font-medium tracking-[0.2em] text-accent uppercase">Methodik</p>
            <h1 className="mt-3 font-display text-3xl leading-[1.15] font-medium text-ink md:text-4xl">
              So rechnet unser Immobilienwert-Rechner
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-ink-soft/90">
              Datengrundlage, Faktoren und Grenzen des kostenlosen Rechners – vollständig offengelegt,
              damit Sie nachvollziehen können, wie eine Wertspanne zustande kommt und wie belastbar sie ist.
            </p>

            <div className="mt-8 grid gap-3 rounded-2xl border border-line bg-paper-dim p-6 text-sm sm:grid-cols-3">
              <div>
                <p className="text-xs text-ink-soft/60">Datenstand</p>
                <p className="mt-1 font-medium text-ink">{dateDe(benchmarkMeta.lastUpdated)}</p>
              </div>
              <div>
                <p className="text-xs text-ink-soft/60">Basisregion</p>
                <p className="mt-1 font-medium text-ink">{benchmarkMeta.region}</p>
              </div>
              <div>
                <p className="text-xs text-ink-soft/60">Abdeckung</p>
                <p className="mt-1 font-medium text-ink">Deutschland, {cityRows.length} Städte einzeln</p>
              </div>
            </div>

            <section className="mt-16 space-y-4 text-ink-soft/90">
              <H2>1. Das Grundprinzip</H2>
              <p>
                Der Rechner ist vergleichswertorientiert: Er startet mit einem Quadratmeterpreis, der aus
                veröffentlichten Marktauswertungen für die Basisregion {benchmarkMeta.region} abgeleitet ist,
                skaliert ihn auf den Standort Ihrer Immobilie und passt ihn an deren Eigenschaften an. Am Ende
                steht eine Spanne – bewusst keine einzelne „genaue“ Zahl, weil eine Handvoll Angaben nie mehr
                Präzision hergeben kann.
              </p>
              <p className="rounded-xl border border-line p-4 font-mono text-sm text-ink">
                Wert ≈ Basispreis × Regionalfaktor × Wohnfläche × Baujahr × Zustand × Ausstattung × Energieklasse
                × Etage × Feuchtigkeit (+ Grundstücksanteil)
              </p>
              <Table
                headers={["Objektart", "Basispreis (Region Heidenheim)"]}
                rows={[
                  ["Eigentumswohnung", `${num(wohnungBase)} €/m² Wohnfläche`],
                  ["Haus", `${num(hausBase)} €/m² Wohnfläche`],
                  ["Mehrfamilienhaus", `${num(pricePerSqmByType.mehrfamilienhaus)} €/m² Wohnfläche (Abschlag gegenüber Eigennutzung)`],
                  ["Unbebautes Grundstück", `${num(plotPricePerSqm)} €/m² Grundstücksfläche (Bodenrichtwertniveau)`],
                ]}
              />
              <p>
                Bei Häusern und Mehrfamilienhäusern fließt Grundstücksfläche über {TYPICAL_HOUSE_PLOT_SQM} m² zu{" "}
                {Math.round(RANGE_SPREAD.plotBonusShare * 100)} % des regionalen Bodenpreises in den Wert ein –
                die ersten {TYPICAL_HOUSE_PLOT_SQM} m² gelten als im Hauspreis enthalten.
              </p>
            </section>

            <section className="mt-16 space-y-4 text-ink-soft/90">
              <H2>2. Regionalfaktoren für ganz Deutschland</H2>
              <p>
                Ihre Lage wird über den kostenlosen Geocoder von OpenStreetMap (Nominatim) einem Ort, Kreis und
                Bundesland zugeordnet. Daraus wählt der Rechner den genauesten verfügbaren Faktor – in dieser
                Reihenfolge: <strong className="font-medium text-ink">1)</strong> Stadtfaktor (Tabelle unten),{" "}
                <strong className="font-medium text-ink">2)</strong> Landkreis Heidenheim (Basisregion, Faktor 1,00),{" "}
                <strong className="font-medium text-ink">3)</strong> Bundeslandfaktor, angepasst nach Siedlungsgröße,{" "}
                <strong className="font-medium text-ink">4)</strong> Basisregion, falls die Lage nicht zugeordnet werden
                kann. Faktor 1,00 entspricht dem Preisniveau in Heidenheim (rund 2.875 €/m² im Mittel aus Haus und
                Wohnung).
              </p>
              <p>
                Für Orte ohne eigenen Eintrag wird der Bundeslandfaktor nach Siedlungsgröße angepasst, weil ein
                Landesdurchschnitt große Städte und kleine Dörfer mischt:{" "}
                {Object.entries(settlementTierAdjustment)
                  .map(([tier, value]) => `${{ city: "Stadt", town: "Kleinstadt", village: "Dorf" }[tier]} ${factorText(value)}`)
                  .join(", ")}
                .
              </p>

              <h3 className="pt-4 font-display text-xl font-medium text-ink">Einzelne Städte</h3>
              <Table
                headers={["Stadt", "Faktor", "Richtwert Wohnung (€/m²)", "Richtwert Haus (€/m²)"]}
                rows={cityRows.map((row) => [
                  row.name,
                  factorText(row.factor),
                  num(Math.round((wohnungBase * row.factor) / 10) * 10),
                  num(Math.round((hausBase * row.factor) / 10) * 10),
                ])}
              />
              <p className="text-sm text-ink-soft/70">
                „Richtwert“ = Basispreis × Faktor, vor allen Objektanpassungen. Für die Städte der Region
                Ostwürttemberg finden Sie die zugrunde liegenden Portalwerte samt Quelle auf den Ortsseiten:{" "}
                {cityPages.map((city, i) => (
                  <span key={city.slug}>
                    <Link href={cityPagePath(city)} className="underline decoration-line underline-offset-4 hover:text-ink">
                      {city.name}
                    </Link>
                    {i < cityPages.length - 1 ? ", " : "."}
                  </span>
                ))}
              </p>

              <h3 className="pt-4 font-display text-xl font-medium text-ink">Bundesländer (Durchschnitt)</h3>
              <Table
                headers={["Bundesland", "Faktor"]}
                rows={stateRows.map((row) => [row.name, factorText(row.factor)])}
              />
            </section>

            <section className="mt-16 space-y-4 text-ink-soft/90">
              <H2>3. Was Ihre Immobilie individuell verändert</H2>
              <p>
                Die folgenden Faktoren wirken multiplikativ auf den Basiswert. Prozentwerte zeigen die Änderung
                gegenüber dem neutralen Fall.
              </p>

              <h3 className="pt-4 font-display text-xl font-medium text-ink">Baujahr</h3>
              <Table
                headers={["Baujahr", "Wirkung"]}
                rows={Object.entries(yearBuiltMultiplier).map(([key, value]) => [yearLabels[key] ?? key, pct(value)])}
              />

              <h3 className="pt-4 font-display text-xl font-medium text-ink">Zustand von Heizung, Elektrik und Leitungen</h3>
              <Table
                headers={["Zustand", "Wirkung"]}
                rows={Object.entries(conditionMultiplier).map(([key, value]) => [conditionLabels[key] ?? key, pct(value)])}
              />

              <h3 className="pt-4 font-display text-xl font-medium text-ink">Ausstattung</h3>
              <p>Jedes Merkmal erhöht den Wert um einen kleinen Anteil; die Effekte werden addiert, nicht multipliziert.</p>
              <Table
                headers={["Merkmal", "Zuschlag"]}
                rows={featureOptions.map((option) => [option.label, `+${(featureBonus[option.value] * 100).toFixed(1).replace(".", ",")} %`])}
              />

              <h3 className="pt-4 font-display text-xl font-medium text-ink">Energieeffizienzklasse</h3>
              <p>
                Die Staffelung stützt sich auf aktuelle Auswertungen von Immobilienportalen: Nach immowelt kosten
                Häuser der Klasse A+ rund 16 % mehr als Häuser der Klasse D, Eigentumswohnungen der Klassen A+/A
                rund 23 % mehr; insgesamt liegen zwischen bester und schlechtester Klasse im Schnitt rund 29 %.
                Bei Wohnungen fällt die Kurve nach unten deutlich flacher aus als bei Häusern.
              </p>
              <Table
                headers={["Klasse", "Haus", "Wohnung"]}
                rows={(Object.keys(energyClassMultiplier.haus) as (keyof typeof energyClassMultiplier.haus)[]).map((key) => [
                  energyLabels[key],
                  pct(energyClassMultiplier.haus[key]),
                  pct(energyClassMultiplier.wohnung[key]),
                ])}
              />

              <h3 className="pt-4 font-display text-xl font-medium text-ink">Etage und Aufzug (nur Wohnungen)</h3>
              <Table
                headers={["Lage im Gebäude", "Wirkung"]}
                rows={[
                  ["Erdgeschoss", pct(floorLevelMultiplier.erdgeschoss)],
                  ["Mittlere Etage", pct(floorLevelMultiplier["mittlere-etage"])],
                  ["Oberste Etage ohne Aufzug", pct(floorLevelMultiplier["oberste-etage"])],
                  ["Oberste Etage mit Aufzug", pct(floorLevelMultiplier["oberste-etage"] + topFloorElevatorBonus)],
                ]}
              />

              <h3 className="pt-4 font-display text-xl font-medium text-ink">Feuchtigkeits-, Schimmel- oder Geruchsauffälligkeiten</h3>
              <p>
                Ein muffiger Geruch ist das typische Alltagszeichen für Feuchteschäden, die Gutachter gezielt
                prüfen, weil ihre Beseitigung teuer werden kann. Wer Auffälligkeiten angibt, bekommt einen Abschlag
                von {pct(moistureIssuesMultiplier)}. Anders als bei den Werten oben gibt es dafür keine
                veröffentlichte Marktstudie – der Wert ist eine bewusst moderate Schätzung und als solche
                gekennzeichnet.
              </p>
            </section>

            <section className="mt-16 space-y-4 text-ink-soft/90">
              <H2>4. Spanne und Genauigkeit</H2>
              <p>
                Ohne optionale Angaben rechnet der Rechner mit einer Spanne von {Math.round(RANGE_SPREAD.lowBase * 100)} bis{" "}
                {Math.round(RANGE_SPREAD.highBase * 100)} % des Mittelwerts. Jede zusätzliche Angabe (Energieklasse,
                Feuchtigkeits-Check, Ausstattung, Grundstücksfläche; bei Wohnungen zusätzlich Etage und Aufzug) verengt
                sie – bei vollständigen Angaben auf {Math.round((RANGE_SPREAD.lowBase + RANGE_SPREAD.tighten) * 100)} bis{" "}
                {Math.round((RANGE_SPREAD.highBase - RANGE_SPREAD.tighten) * 100)} %. Die angezeigte Kernzahl liegt
                bewusst im unteren Drittel der Spanne ({Math.round(RANGE_SPREAD.headlinePosition * 100)} % vom unteren
                Rand), damit Sie eine realistische Zahl sehen statt einer optimistischen Obergrenze.
              </p>
              <Table
                headers={["Angaben gemacht", "Bezeichnung im Ergebnis"]}
                rows={[
                  ["Bis ein Drittel der optionalen Felder", "Basis-Schätzung"],
                  ["Mindestens ein Drittel", "Erweiterte Schätzung"],
                  ["Mindestens zwei Drittel", "Detaillierte Schätzung"],
                ]}
              />
              <p>Unbebaute Grundstücke behalten die feste Spanne, weil es dort keine weiteren Angaben gibt, die sie verengen könnten.</p>
            </section>

            <section className="mt-16 space-y-4 text-ink-soft/90">
              <H2>5. Was der Rechner nicht kann</H2>
              <ul className="list-disc space-y-2 pl-5">
                <li>Er sieht Ihre Immobilie nicht: Grundriss, Schnitt, Lage in der Straße, Aussicht, Lärm oder Modernisierungsqualität im Detail fließen nicht ein.</li>
                <li>Er kennt keine Rechte und Lasten (Wohnrecht, Nießbrauch, Erbbaurecht, Denkmalschutz).</li>
                <li>Er rechnet mit Angebotspreisen aus Auswertungen, nicht mit beurkundeten Kaufpreisen der Gutachterausschüsse.</li>
                <li>Er ist kein Gutachten im Sinne von § 194 BauGB und ersetzt kein Verkehrswertgutachten für Bank, Gericht oder Finanzamt.</li>
              </ul>
              <p>
                Wenn Sie eine belastbare Zahl brauchen – etwa für Erbauseinandersetzung, Scheidung oder Finanzierung –,
                ist die Online-Ersteinschätzung der sinnvolle erste Schritt und ein Sachverständigengutachten der
                zweite.
              </p>
            </section>

            <section className="mt-16 space-y-4 text-ink-soft/90">
              <H2>6. Quellen</H2>
              <p>Alle Preisniveaus und Faktoren wurden manuell aus den folgenden veröffentlichten Quellen abgeleitet (zuletzt geprüft: {dateDe(benchmarkMeta.lastUpdated)}):</p>
              <ul className="list-disc space-y-1.5 pl-5">
                {sources.map((source) => (
                  <li key={source.url}>
                    <a href={source.url} target="_blank" rel="noopener noreferrer" className="underline decoration-line underline-offset-4 hover:text-ink">
                      {source.label}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-ink-soft/70">{benchmarkMeta.note}</p>
            </section>

            <section className="mt-16 space-y-4 text-ink-soft/90">
              <H2>7. Änderungsprotokoll</H2>
              <ul className="space-y-3">
                <li>
                  <strong className="font-medium text-ink">26.09.2026:</strong> Eigene Faktoren für Aalen, Ulm (neu kalibriert), Giengen, Herbrechtingen, Oberkochen, Ellwangen und Schwäbisch Gmünd; Ortsseiten für die Region Ostwürttemberg; diese Methodikseite.
                </li>
                <li>
                  <strong className="font-medium text-ink">22.09.2026:</strong> Deutschlandweite Städtetabelle (rund 50 Städte), Siedlungsgrößen-Anpassung für alle übrigen Orte, neue Faktoren Energieklasse, Etage/Aufzug und Feuchtigkeits-Check; Spanne wird mit mehr Angaben enger.
                </li>
                <li>
                  <strong className="font-medium text-ink">13.09.2026:</strong> Erste Version mit Basispreisen für die Region Heidenheim und Bundesland-Faktoren.
                </li>
              </ul>
            </section>

            <section className="mt-16 space-y-4 text-ink-soft/90">
              <H2>Häufige Fragen zur Methode</H2>
              <div className="divide-y divide-line border-y border-line">
                {faqs.map((item) => (
                  <div key={item.question} className="py-6">
                    <h3 className="font-display text-lg font-medium text-ink">{item.question}</h3>
                    <p className="mt-2">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-16 rounded-2xl border border-line bg-paper-dim p-6 md:p-8">
              <h2 className="font-display text-xl font-medium text-ink">Diese Seite zitieren oder verlinken</h2>
              <p className="mt-3 text-sm text-ink-soft/90">
                Sie dürfen die Methodik und die genannten Kennzahlen gern mit Quellenangabe verwenden – für
                Ratgeber, Presse, Studienarbeiten oder Verzeichnisse. Vorschlag für die Quellenangabe:
              </p>
              <p className="mt-4 rounded-lg border border-line bg-paper p-4 font-mono text-sm text-ink">
                Deininger Objektwert: „So rechnet unser Immobilienwert-Rechner“, Datenstand{" "}
                {dateDe(benchmarkMeta.lastUpdated)}, {siteConfig.url}
                {PATH}
              </p>
              <p className="mt-4 text-sm text-ink-soft/80">
                Zur Prüfung Ihres eigenen Objekts nutzen Sie den{" "}
                <Link href="/immobilienbewertung" className="underline decoration-line underline-offset-4 hover:text-ink">
                  kostenlosen Rechner
                </Link>
                ; für die Region Ostwürttemberg gibt es{" "}
                <Link href={cityPagePath(cityPages[0])} className="underline decoration-line underline-offset-4 hover:text-ink">
                  eigene Ortsseiten
                </Link>
                . Fehler entdeckt? Schreiben Sie an{" "}
                <a href={`mailto:${siteConfig.email}`} className="underline decoration-line underline-offset-4 hover:text-ink">
                  {siteConfig.email}
                </a>
                .
              </p>
            </section>
          </Container>
        </article>
      </main>
    </>
  );
}
