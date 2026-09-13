import type { Metadata } from "next";
import { HomeHero } from "@/components/sections/home/home-hero";
import { ValueFactorsSection } from "@/components/sections/home/value-factors-section";
import { HowItWorksSection } from "@/components/sections/home/how-it-works-section";
import { StatementSection } from "@/components/sections/statement-section";
import { realEstateAgentJsonLd } from "@/lib/structured-data";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Immobilienbewertung ${siteConfig.region} – kostenlose Ersteinschätzung`,
  description:
    "Kostenlose Online-Immobilienbewertung für Heidenheim an der Brenz und Umgebung: Ermitteln Sie in wenigen Minuten eine erste, unverbindliche Einschätzung des Werts Ihrer Immobilie.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(realEstateAgentJsonLd()) }}
      />
      <main>
        <HomeHero />
        <ValueFactorsSection />
        <HowItWorksSection />
        <StatementSection />
      </main>
    </>
  );
}
