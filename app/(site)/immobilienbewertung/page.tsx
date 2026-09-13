import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { ValuationForm } from "@/components/valuation-form/valuation-form";
import { BewertungsmethodenSection } from "@/components/sections/bewertung/bewertungsmethoden-section";
import { AnlaesseSection } from "@/components/sections/bewertung/anlaesse-section";
import { siteConfig } from "@/lib/site-config";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { getContentOverrides, withOverrides } from "@/lib/content";

export const metadata: Metadata = {
  title: "Immobilienwert ermitteln – kostenloser Online-Rechner",
  description:
    "Immobilie bewerten lassen in wenigen Minuten: kostenloser Online-Rechner für Heidenheim an der Brenz und Umgebung. Objektart, Lage, Baujahr und Zustand eingeben – Wertspanne sofort erhalten.",
  alternates: { canonical: "/immobilienbewertung" },
};

const drivers = [
  { number: "01", label: "Lage" },
  { number: "02", label: "Wohnfläche & Grundriss" },
  { number: "03", label: "Grundstück" },
  { number: "04", label: "Technik & Zustand" },
  { number: "05", label: "Markt" },
];

const defaults = {
  "bewertung.hero.title": "Immobilienwert ermitteln – kostenlos und unverbindlich.",
  "bewertung.hero.lede":
    "Egal ob Haus, Wohnung, Mehrfamilienhaus oder unbebautes Grundstück in {region} und Umgebung: Beantworten Sie ein paar Fragen zu Lage, Baujahr, Fläche und Zustand – Sie erhalten sofort eine erste Wertspanne.",
};

export default async function ImmobilienbewertungPage() {
  const overrides = await getContentOverrides(Object.keys(defaults));
  const t = withOverrides(defaults, overrides);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Start", url: "/" },
              { name: "Immobilienbewertung", url: "/immobilienbewertung" },
            ])
          ),
        }}
      />
      <main>
        <section className="py-20 md:py-28">
          <Container className="grid gap-16 md:grid-cols-2 md:gap-12">
            <div>
              <p className="text-xs font-medium tracking-[0.2em] text-accent uppercase">
                Immobilienbewertung
              </p>
              <h1 className="mt-4 max-w-xl font-display text-3xl leading-[1.15] font-medium text-ink md:text-4xl">
                {t["bewertung.hero.title"]}
              </h1>
              <p className="mt-5 max-w-lg text-balance text-ink-soft/90 md:text-lg">
                {t["bewertung.hero.lede"].replace("{region}", siteConfig.region)}
              </p>

              <Reveal delay={0.1} className="mt-10">
                <ul className="space-y-3">
                  {drivers.map((driver) => (
                    <li
                      key={driver.number}
                      className="flex items-baseline gap-4 border-t border-line py-3 first:border-t-0"
                    >
                      <span className="font-display text-sm text-accent">{driver.number}</span>
                      <span className="text-ink-soft">{driver.label}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <Reveal delay={0.05}>
              <ValuationForm />
            </Reveal>
          </Container>
        </section>

        <AnlaesseSection />
        <BewertungsmethodenSection />
      </main>
    </>
  );
}
