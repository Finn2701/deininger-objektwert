import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { ValuationForm } from "@/components/valuation-form/valuation-form";
import { getPublishedArticles } from "@/lib/articles";
import {
  CITY_PAGE_PREFIX,
  cityPagePath,
  cityPages,
  cityRegionFactor,
  getCityPageBySlug,
  type CityPage,
} from "@/lib/city-pages";
import { computeKaufnebenkosten, formatEuroExact, formatPercent, getStateRates } from "@/lib/kaufnebenkosten";
import { siteConfig } from "@/lib/site-config";
import { benchmarkMeta } from "@/lib/valuation-benchmarks";
import { breadcrumbJsonLd, cityServiceJsonLd, faqJsonLd } from "@/lib/structured-data";

export const revalidate = 3600;

// Only the hand-written city pages exist; any other single-segment URL is a
// normal 404 rather than an empty/placeholder page.
export const dynamicParams = false;

export function generateStaticParams() {
  return cityPages.map((city) => ({ ortslug: `${CITY_PAGE_PREFIX}${city.slug}` }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ortslug: string }>;
}): Promise<Metadata> {
  const { ortslug } = await params;
  const city = getCityPageBySlug(ortslug);
  if (!city) return {};

  return {
    title: city.seoTitle,
    description: city.metaDescription,
    alternates: { canonical: cityPagePath(city) },
    openGraph: {
      title: city.seoTitle,
      description: city.metaDescription,
      url: `${siteConfig.url}${cityPagePath(city)}`,
      type: "website",
    },
  };
}

const euro = (value: number) =>
  new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0 }).format(value);

function PriceCard({
  label,
  value,
  range,
}: {
  label: string;
  value: number;
  range?: [number, number];
}) {
  return (
    <div className="rounded-2xl border border-line bg-paper-dim p-6">
      <p className="text-xs font-medium tracking-[0.16em] text-ink-soft/70 uppercase">{label}</p>
      <p className="mt-3 font-display text-3xl font-medium text-ink">
        {euro(value)} <span className="text-base font-normal text-ink-soft/70">€/m²</span>
      </p>
      {range ? (
        <p className="mt-2 text-sm text-ink-soft/80">
          Spanne im Angebot: {euro(range[0])} – {euro(range[1])} €/m²
        </p>
      ) : null}
    </div>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <>
      <p className="text-xs font-medium tracking-[0.2em] text-accent uppercase">{eyebrow}</p>
      <h2 className="mt-3 max-w-2xl font-display text-2xl leading-[1.2] font-medium text-ink md:text-3xl">
        {title}
      </h2>
    </>
  );
}

export default async function CityPageRoute({ params }: { params: Promise<{ ortslug: string }> }) {
  const { ortslug } = await params;
  const city = getCityPageBySlug(ortslug);
  if (!city) notFound();

  const path = cityPagePath(city);
  const state = getStateRates(city.stateCode ?? "BW");
  const example = computeKaufnebenkosten({
    kaufpreis: 350000,
    stateCode: state.code,
    maklerPercent: state.maklerBuyerShare,
    notarPercent: 1.5,
  });
  const factor = cityRegionFactor(city);
  const published = await getPublishedArticles();
  const related = city.relatedArticles
    .map((slug) => published.find((article) => article.slug === slug))
    .filter((article): article is NonNullable<typeof article> => Boolean(article));
  const neighbors = city.neighbors
    .map((slug) => cityPages.find((c) => c.slug === slug))
    .filter((c): c is CityPage => Boolean(c));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cityServiceJsonLd(city.name, path)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(city.faq)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Start", url: "/" },
              { name: "Immobilienbewertung", url: "/immobilienbewertung" },
              { name: city.name, url: path },
            ])
          ),
        }}
      />

      <main>
        <section className="py-20 md:py-28">
          <Container className="grid gap-16 md:grid-cols-2 md:gap-12">
            <div>
              <p className="text-xs font-medium tracking-[0.2em] text-accent uppercase">
                Immobilienbewertung · {city.kreis}
              </p>
              <h1 className="mt-4 max-w-xl font-display text-3xl leading-[1.15] font-medium text-ink md:text-4xl">
                {city.h1}
              </h1>
              <p className="mt-5 max-w-lg text-balance text-ink-soft/90 md:text-lg">{city.lead}</p>

              <dl className="mt-10 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {city.facts.map((fact) => (
                  <div key={fact.label} className="border-t border-line pt-3">
                    <dt className="text-xs text-ink-soft/60">{fact.label}</dt>
                    <dd className="mt-1 text-sm text-ink">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <Reveal delay={0.05}>
              <ValuationForm defaultLocation={city.calculatorLocation} />
            </Reveal>
          </Container>
        </section>

        <section className="border-t border-line py-16 md:py-20">
          <Container>
            <SectionHeading eyebrow="Marktlage" title={`Was Immobilien in ${city.name} aktuell kosten`} />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <PriceCard label="Eigentumswohnung" value={city.prices.wohnung} range={city.prices.wohnungRange} />
              <PriceCard label="Haus" value={city.prices.haus} range={city.prices.hausRange} />
            </div>
            <div className="mt-8 max-w-3xl space-y-5 text-ink-soft/90">
              {city.market.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 max-w-3xl rounded-xl border border-line p-5 text-sm text-ink-soft/80">
              <p>
                <strong className="font-medium text-ink">Stand und Quellen:</strong> Preise sind
                durchschnittliche Angebotspreise (Stand: {city.prices.asOf}), keine beurkundeten
                Kaufpreise. Der Rechner nutzt für {city.name} einen Regionalfaktor von{" "}
                <strong className="font-medium text-ink">{factor.toFixed(2).replace(".", ",")}</strong>{" "}
                (Heidenheim = 1,00; Datenstand des Rechners: {benchmarkMeta.lastUpdated}).{" "}
                <Link href="/wie-wir-rechnen" className="underline decoration-line underline-offset-4 hover:text-ink">
                  So rechnen wir
                </Link>
                . Alle Orte im Vergleich:{" "}
                <Link href="/immobilienpreise-ostwuerttemberg" className="underline decoration-line underline-offset-4 hover:text-ink">
                  Immobilienpreise in Ostwürttemberg
                </Link>
                .
              </p>
              <ul className="mt-3 space-y-1">
                {city.prices.sources.map((source) => (
                  <li key={source.url}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-line underline-offset-4 hover:text-ink"
                    >
                      {source.label}
                    </a>
                  </li>
                ))}
              </ul>
              {city.prices.note ? <p className="mt-3 text-ink-soft/70">{city.prices.note}</p> : null}
            </div>
          </Container>
        </section>

        <section className="border-t border-line py-16 md:py-20">
          <Container>
            <SectionHeading eyebrow="Lagen" title={`Stadtteile und Lagen in ${city.name}`} />
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {city.quarters.map((quarter) => (
                <div key={quarter.name} className="rounded-2xl border border-line p-6">
                  <h3 className="font-display text-lg font-medium text-ink">{quarter.name}</h3>
                  <p className="mt-2 text-sm text-ink-soft/90">{quarter.note}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className="border-t border-line py-16 md:py-20">
          <Container>
            <SectionHeading eyebrow="Nachfrage" title={`Wirtschaft und Nachfrage in ${city.name}`} />
            <div className="mt-8 max-w-3xl space-y-5 text-ink-soft/90">
              {city.economy.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </Container>
        </section>

        <section className="border-t border-line py-16 md:py-20">
          <Container>
            <SectionHeading eyebrow="Verkauf" title={`Worauf Sie beim Verkauf in ${city.name} achten sollten`} />
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {city.sellingNotes.map((note) => (
                <div key={note.title} className="rounded-2xl border border-line bg-paper-dim p-6">
                  <h3 className="font-display text-lg font-medium text-ink">{note.title}</h3>
                  <p className="mt-3 text-sm text-ink-soft/90">{note.text}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className="border-t border-line py-16 md:py-20">
          <Container>
            <SectionHeading eyebrow="Rechner" title={`Kaufnebenkosten in ${city.name}`} />
            <div className="mt-8 max-w-3xl space-y-4 text-ink-soft/90">
              <p>
                In {state.name} beträgt die Grunderwerbsteuer {formatPercent(state.grunderwerbsteuer)}. Kauft jemand
                in {city.name} ein Haus für 350.000 Euro, sind das {formatEuroExact(example.grunderwerbsteuer)}. Mit
                Notar und Grundbuch (rund 1,5 %) und einer Käufer-Maklerprovision von {formatPercent(state.maklerBuyerShare)}{" "}
                kommen rund {formatEuroExact(example.nebenkosten)} an Nebenkosten zusammen ({formatPercent(example.nebenkostenPercent)}).
                Für Verkäufer ist das relevant, weil Käufer diese Summe als Eigenkapital mitbringen müssen und den Kaufpreis
                entsprechend kalkulieren.
              </p>
              <p>
                Eigene Zahlen rechnen Sie im{" "}
                <Link href="/kaufnebenkosten-rechner" className="underline decoration-line underline-offset-4 hover:text-ink">
                  Kaufnebenkosten-Rechner
                </Link>{" "}
                oder im{" "}
                <Link href="/grunderwerbsteuer-rechner" className="underline decoration-line underline-offset-4 hover:text-ink">
                  Grunderwerbsteuer-Rechner
                </Link>
                .
              </p>
            </div>
          </Container>
        </section>

        <section className="border-t border-line py-16 md:py-20">
          <Container>
            <SectionHeading eyebrow="FAQ" title={`Häufige Fragen zur Immobilienbewertung in ${city.name}`} />
            <div className="mt-8 max-w-3xl divide-y divide-line border-y border-line">
              {city.faq.map((item) => (
                <div key={item.question} className="py-6">
                  <h3 className="font-display text-lg font-medium text-ink">{item.question}</h3>
                  <p className="mt-2 text-ink-soft/90">{item.answer}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {related.length > 0 ? (
          <section className="border-t border-line py-16 md:py-20">
            <Container>
              <SectionHeading eyebrow="Ratgeber" title="Weiterführende Artikel" />
              <ul className="mt-8 grid gap-3 md:grid-cols-3">
                {related.map((article) => (
                  <li key={article.slug}>
                    <Link
                      href={`/ratgeber/${article.slug}`}
                      className="block h-full rounded-xl border border-line p-5 transition-colors hover:border-ink"
                    >
                      <span className="font-display text-base font-medium text-ink">{article.title}</span>
                      <span className="mt-2 block text-sm text-accent">Weiterlesen →</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Container>
          </section>
        ) : null}

        <section className="border-t border-line py-16 md:py-20">
          <Container>
            <SectionHeading eyebrow="Region" title="Immobilienbewertung in Nachbarorten" />
            <ul className="mt-8 flex flex-wrap gap-3">
              {[...neighbors, ...cityPages.filter((c) => c.slug !== city.slug && !neighbors.includes(c))].map((c) => (
                <li key={c.slug}>
                  <Link
                    href={cityPagePath(c)}
                    className="inline-block rounded-full border border-line px-4 py-2 text-sm text-ink-soft transition-colors hover:border-ink hover:text-ink"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-10 max-w-2xl text-sm text-ink-soft/80">
              {siteConfig.name} sitzt in {siteConfig.region}; die Online-Bewertung funktioniert
              deutschlandweit. Möchten Sie Ihre Einschätzung vertiefen oder haben Unterlagen zur Hand,
              können Sie{" "}
              <Link href="/unterlagen-einreichen" className="underline decoration-line underline-offset-4 hover:text-ink">
                Unterlagen direkt einreichen
              </Link>{" "}
              oder sich über die{" "}
              <Link href="/kontakt" className="underline decoration-line underline-offset-4 hover:text-ink">
                Kontaktseite
              </Link>{" "}
              melden.
            </p>
          </Container>
        </section>
      </main>
    </>
  );
}
