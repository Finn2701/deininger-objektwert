import type { Metadata } from "next";
import { HomeHero } from "@/components/sections/home/home-hero";
import { AdvisorSection } from "@/components/sections/home/advisor-section";
import { ValueFactorsSection } from "@/components/sections/home/value-factors-section";
import { HowItWorksSection } from "@/components/sections/home/how-it-works-section";
import { StatementSection } from "@/components/sections/statement-section";
import { RatgeberTeaserSection } from "@/components/sections/home/ratgeber-teaser-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { realEstateAgentJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Immobilienbewertung Heidenheim – kostenlose Ersteinschätzung",
  description:
    "Immobilie bewerten lassen in Heidenheim an der Brenz und deutschlandweit: kostenlose, unverbindliche Online-Immobilienbewertung in wenigen Minuten. Persönlich betreut von Finn Deininger.",
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
        <AdvisorSection />
        <HowItWorksSection />
        <StatementSection />
        <RatgeberTeaserSection />
        <FinalCtaSection />
      </main>
    </>
  );
}
