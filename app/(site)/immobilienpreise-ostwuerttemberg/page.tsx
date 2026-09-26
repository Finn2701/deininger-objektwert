import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { DataTable, SectionH2 } from "@/components/calculators/content";
import {
  PRICE_ATLAS_CSV_PATH,
  PRICE_ATLAS_PATH,
  getPriceRows,
  median,
  priceAtlasUpdated,
} from "@/lib/price-atlas";
import { siteConfig } from "@/lib/site-config";
import { breadcrumbJsonLd, faqJsonLd, personJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Immobilienpreise Ostwürttemberg 2026",
  description:
    "Quadratmeterpreise für Häuser und Wohnungen im Vergleich: Heidenheim, Ostalb und Ulm im Überblick – mit Daten zum Download und Quellenangabe.",
  alternates: { canonical: PRICE_ATLAS_PATH },
  openGraph: {
    title: "Immobilienpreise Ostwürttemberg: Städtevergleich 2026",
    description: "Haus- und Wohnungspreise in der Region Heidenheim, Ostalb und Ulm im Vergleich.",
    url: PRICE_ATLAS_PATH,
    type: "article",
  },
};

const euro = (value: number) => new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0 }).format(value);
const dateDe = (iso: string) =>
  new Intl.DateTimeFormat("de-DE", { dateStyle: "long" }).format(new Date(`${iso}T12:00:00Z`));

export default function PriceAtlasPage() {
  const rows = getPriceRows();
  const count = rows.length;
  const maxHaus = Math.max(...rows.map((row) => row.haus));
  const medianHaus = median(rows.map((row) => row.haus));
  const medianWohnung = median(rows.map((row) => row.wohnung));
  const byHaus = [...rows].sort((a, b) => b.haus - a.haus);
  const byWohnung = [...rows].sort((a, b) => b.wohnung - a.wohnung);
  const priciest = byHaus[0];
  const cheapest = byHaus[byHaus.length - 1];
  const priciestFlat = byWohnung[0];
  const cheapestFlat = byWohnung[byWohnung.length - 1];
  const heidenheim = rows.find((row) => row.slug === "heidenheim");
  const ulm = rows.find((row) => row.slug === "ulm");
  const withoutUlm = rows.filter((row) => row.slug !== "ulm");
  const minWithoutUlm = Math.min(...withoutUlm.map((r) => r.haus));
  const maxWithoutUlm = Math.max(...withoutUlm.map((r) => r.haus));

  const faqs = [
    {
      question: "Wo sind die Immobilien in Ostwürttemberg am teuersten?",
      answer: `Nach der Auswertung liegt ${priciest.name} bei Häusern vorn (rund ${euro(priciest.haus)} €/m²), bei Eigentumswohnungen ${priciestFlat.name} (rund ${euro(priciestFlat.wohnung)} €/m²). Am günstigsten sind Häuser in ${cheapest.name} (rund ${euro(cheapest.haus)} €/m²) und Wohnungen in ${cheapestFlat.name} (rund ${euro(cheapestFlat.wohnung)} €/m²).`,
    },
    {
      question: "Wie aktuell sind die Preise?",
      answer: `Datenstand des Rechners ist der ${dateDe(priceAtlasUpdated)}. Die Preise der einzelnen Orte stammen aus veröffentlichten Marktauswertungen aus dem Jahr 2026, überwiegend aus den Monaten Juli bis September; der genaue Stand steht auf jeder Ortsseite.`,
    },
    {
      question: "Sind das Kaufpreise oder Angebotspreise?",
      answer:
        "Es sind durchschnittliche Angebotspreise aus Immobilienportalen, keine beurkundeten Kaufpreise. Tatsächlich gezahlte Preise liegen häufig etwas darunter. Verlässliche Kaufpreise liefern die Gutachterausschüsse der Landkreise und Städte.",
    },
    {
      question: "Darf ich die Daten verwenden?",
      answer: `Ja, mit Quellenangabe und Link auf diese Seite (${siteConfig.url}${PRICE_ATLAS_PATH}). Die Tabelle steht als CSV-Datei zum Download bereit. Bitte geben Sie den Datenstand mit an, weil sich die Werte ändern.`,
    },
  ];

  const datasetJsonLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "Immobilienpreise Ostwürttemberg: Haus- und Wohnungspreise je Ort",
    description: `Durchschnittliche Angebotspreise für Häuser und Eigentumswohnungen in ${count} Orten der Region Heidenheim, Ostalb und Ulm (Euro pro Quadratmeter) mit Regionalfaktor und Datenstand.`,
    url: `${siteConfig.url}${PRICE_ATLAS_PATH}`,
    inLanguage: "de-DE",
    isAccessibleForFree: true,
    dateModified: priceAtlasUpdated,
    creator: personJsonLd(),
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    spatialCoverage: { "@type": "Place", name: "Ostwürttemberg, Baden-Württemberg, Deutschland" },
    temporalCoverage: "2026",
    keywords: ["Immobilienpreise", "Quadratmeterpreis", "Ostwürttemberg", "Heidenheim", "Ostalbkreis", "Ulm"],
    distribution: {
      "@type": "DataDownload",
      encodingFormat: "text/csv",
      contentUrl: `${siteConfig.url}${PRICE_ATLAS_CSV_PATH}`,
    },
  };

  const tableRows = rows.map((row) => [
    row.name,
    row.kreis,
    `${euro(row.haus)} €`,
    `${euro(row.wohnung)} €`,
    row.factor.toFixed(2).replace(".", ","),
  ]);

  const citation = `Deininger Objektwert: „Immobilienpreise Ostwürttemberg“, Datenstand ${dateDe(priceAtlasUpdated)}, ${siteConfig.url}${PRICE_ATLAS_PATH}`;
  const htmlSnippet = `<a href="${siteConfig.url}${PRICE_ATLAS_PATH}">Immobilienpreise Ostwürttemberg – Deininger Objektwert</a>`;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Start", url: "/" },
              { name: "Immobilienbewertung", url: "/immobilienbewertung" },
              { name: "Immobilienpreise Ostwürttemberg", url: PRICE_ATLAS_PATH },
            ])
          ),
        }}
      />

      <main>
        <article className="py-20 md:py-28">
          <Container className="max-w-4xl">
            <Link href="/immobilienbewertung" className="text-sm text-ink-soft/80 hover:text-ink">
              ← Zum Rechner
            </Link>
            <p className="mt-6 text-xs font-medium tracking-[0.2em] text-accent-text uppercase">Marktdaten</p>
            <h1 className="mt-3 font-display text-3xl leading-[1.15] font-medium text-ink md:text-4xl">
              Immobilienpreise in Ostwürttemberg: {count} Orte im Vergleich
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-ink-soft/90">
              Was Häuser und Eigentumswohnungen in Heidenheim, auf der Ostalb und rund um Ulm pro Quadratmeter kosten –
              Datenstand {dateDe(priceAtlasUpdated)}.
            </p>

            <div className="mt-8 grid gap-3 rounded-2xl border border-line bg-paper-dim p-6 text-sm sm:grid-cols-3">
              <div>
                <p className="text-xs text-ink-soft/80">Mittelwert (Median) Haus</p>
                <p className="mt-1 font-display text-2xl font-medium text-ink">{euro(medianHaus)} €/m²</p>
              </div>
              <div>
                <p className="text-xs text-ink-soft/80">Mittelwert (Median) Wohnung</p>
                <p className="mt-1 font-display text-2xl font-medium text-ink">{euro(medianWohnung)} €/m²</p>
              </div>
              <div>
                <p className="text-xs text-ink-soft/80">Orte in der Auswertung</p>
                <p className="mt-1 font-display text-2xl font-medium text-ink">{count}</p>
              </div>
            </div>

            <section className="mt-16 space-y-4 text-ink-soft/90">
              <SectionH2>Das Wichtigste in Kürze</SectionH2>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <strong className="font-medium text-ink">{priciest.name}</strong> ist bei Häusern am teuersten (rund{" "}
                  {euro(priciest.haus)} €/m²),{" "}
                  <strong className="font-medium text-ink">{cheapest.name}</strong> am günstigsten (rund{" "}
                  {euro(cheapest.haus)} €/m²).
                </li>
                {heidenheim && ulm ? (
                  <li>
                    Ulm liegt mit rund {euro(ulm.haus)} €/m² bei Häusern etwa{" "}
                    {Math.round((ulm.haus / heidenheim.haus - 1) * 100)} % über Heidenheim (rund{" "}
                    {euro(heidenheim.haus)} €/m²) – der größte Sprung der Region.
                  </li>
                ) : null}
                <li>
                  Ohne Ulm bewegen sich die Hauspreise der übrigen Orte zwischen rund {euro(minWithoutUlm)} und{" "}
                  {euro(maxWithoutUlm)} €/m².
                </li>
                <li>
                  Bei Eigentumswohnungen führt {priciestFlat.name} (rund {euro(priciestFlat.wohnung)} €/m²), am
                  günstigsten sind sie in {cheapestFlat.name} (rund {euro(cheapestFlat.wohnung)} €/m²).
                </li>
              </ul>
            </section>

            <section className="mt-16 space-y-4 text-ink-soft/90">
              <SectionH2>Hauspreise im Vergleich</SectionH2>
              <p>Durchschnittlicher Angebotspreis für Häuser in Euro pro Quadratmeter, absteigend sortiert.</p>
              <ol className="mt-6 space-y-2.5">
                {rows.map((row) => (
                  <li key={row.slug} className="grid grid-cols-[7.5rem_1fr_4.25rem] items-center gap-3 text-sm sm:grid-cols-[11rem_1fr_5rem]">
                    <Link href={row.path} className="text-ink leading-snug underline decoration-line underline-offset-4 hover:decoration-ink">
                      {row.name}
                    </Link>
                    <div className="h-3 rounded-full bg-paper-dim" aria-hidden="true">
                      <div className="h-3 rounded-full bg-accent" style={{ width: `${Math.round((row.haus / maxHaus) * 100)}%` }} />
                    </div>
                    <span className="text-right text-ink">{euro(row.haus)} €</span>
                  </li>
                ))}
              </ol>
            </section>

            <section className="mt-16 space-y-4 text-ink-soft/90">
              <SectionH2>Alle Werte in der Tabelle</SectionH2>
              <p>
                Der Regionalfaktor zeigt, wie der Immobilienwert-Rechner den jeweiligen Ort gegenüber Heidenheim (=
                1,00) gewichtet. Ein Klick auf den Ort führt zur Ortsseite mit Stadtteilen, Quellen und Verkaufshinweisen.
              </p>
              <DataTable
                headers={["Ort", "Landkreis", "Haus €/m²", "Wohnung €/m²", "Faktor"]}
                rows={tableRows}
              />
              <p className="text-sm text-ink-soft/80">
                Angebotspreise aus veröffentlichten Marktauswertungen (u. a. immowelt, ImmoScout24, Homeday), Stand
                2026, überwiegend Juli bis September. In kleinen Orten schwanken die Durchschnitte je nach Portal, siehe die
                Hinweise auf den Ortsseiten.
              </p>
              <p>
                <a
                  href={PRICE_ATLAS_CSV_PATH}
                  download
                  className="inline-flex rounded-full bg-ink px-5 py-2.5 text-sm text-paper hover:bg-ink-soft"
                >
                  Tabelle als CSV herunterladen
                </a>
              </p>
            </section>

            <section className="mt-16 space-y-4 text-ink-soft/90">
              <SectionH2>So lesen Sie die Zahlen</SectionH2>
              <p>
                Ein Ortsdurchschnitt fasst alte und neue, große und kleine, gepflegte und sanierungsbedürftige
                Immobilien zusammen. Er zeigt, wo das Preisniveau liegt, nicht, was ein bestimmtes Haus kostet. Zwei
                Häuser in derselben Straße können mehrere hundert Euro pro Quadratmeter auseinanderliegen, je nach
                Zustand, Baujahr und Energieeffizienz.
              </p>
              <p>
                Außerdem sind es Angebotspreise. Beurkundete Kaufpreise liegen erfahrungsgemäß etwas darunter und
                stehen nur den Gutachterausschüssen vollständig zur Verfügung. Wie aus dem Ortsniveau eine
                Wertspanne für Ihre Immobilie wird, erklärt die Seite{" "}
                <Link href="/wie-wir-rechnen" className="underline decoration-line underline-offset-4 hover:text-ink">
                  So rechnen wir
                </Link>
                . Für Ihre eigene Immobilie nutzen Sie den{" "}
                <Link href="/immobilienbewertung" className="underline decoration-line underline-offset-4 hover:text-ink">
                  kostenlosen Rechner
                </Link>
                , für die Kosten beim Kauf den{" "}
                <Link href="/kaufnebenkosten-rechner" className="underline decoration-line underline-offset-4 hover:text-ink">
                  Kaufnebenkosten-Rechner
                </Link>
                .
              </p>
            </section>

            <section className="mt-16 space-y-4 text-ink-soft/90">
              <SectionH2>Häufige Fragen zu den Preisen</SectionH2>
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
              <h2 className="font-display text-xl font-medium text-ink">Daten zitieren oder verlinken</h2>
              <p className="mt-3 text-sm text-ink-soft/90">
                Sie dürfen die Zahlen gern mit Quellenangabe verwenden – für Artikel, Studienarbeiten, Verzeichnisse
                oder Ihre eigene Website. Vorschlag für die Quellenangabe:
              </p>
              <p className="mt-4 rounded-lg border border-line bg-paper p-4 font-mono text-sm break-words text-ink">{citation}</p>
              <p className="mt-4 text-sm text-ink-soft/90">Oder als Link für Ihre Website:</p>
              <p className="mt-2 rounded-lg border border-line bg-paper p-4 font-mono text-xs break-all text-ink">{htmlSnippet}</p>
            </section>
          </Container>
        </article>
      </main>
    </>
  );
}
