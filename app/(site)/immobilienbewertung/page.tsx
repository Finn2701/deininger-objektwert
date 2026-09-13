import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { ValuationForm } from "@/components/valuation-form/valuation-form";
import { BewertungsmethodenSection } from "@/components/sections/bewertung/bewertungsmethoden-section";
import { AnlaesseSection } from "@/components/sections/bewertung/anlaesse-section";
import { siteConfig } from "@/lib/site-config";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { getContentOverrides, withOverrides } from "@/lib/content";

export const metadata: Metadata = {
  title: "Immobilie bewerten lassen – Immobilienwert ermitteln Heidenheim",
  description:
    "Haus oder Wohnung bewerten lassen: kostenloser Online-Rechner für Heidenheim an der Brenz und deutschlandweit. Objektart, Lage, Baujahr und Zustand eingeben – Wertspanne sofort erhalten.",
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
    "Egal wo in Deutschland Ihre Immobilie steht – ob Haus, Wohnung, Mehrfamilienhaus oder unbebautes Grundstück: Beantworten Sie ein paar Fragen zu Lage, Baujahr, Fläche und Zustand und erhalten sofort eine erste Wertspanne. Besonders fundiert ist unsere Einschätzung für {region} und Umgebung, wo wir den Markt aus erster Hand kennen.",
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

              <Reveal delay={0.15} className="mt-8">
                <p className="text-sm text-ink-soft/80">
                  Grundriss, Energieausweis oder Fotos schon zur Hand?{" "}
                  <Link href="/unterlagen-einreichen" className="text-ink underline decoration-line underline-offset-4 hover:text-ink-soft">
                    Unterlagen direkt einreichen
                  </Link>{" "}
                  für eine persönliche statt automatische Einschätzung.
                </p>
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
