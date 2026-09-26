import type { Metadata } from "next";
import { HomeHero } from "@/components/sections/home/home-hero";
import { AdvisorSection } from "@/components/sections/home/advisor-section";
import { ValueFactorsSection } from "@/components/sections/home/value-factors-section";
import { HowItWorksSection } from "@/components/sections/home/how-it-works-section";
import { StatementSection } from "@/components/sections/statement-section";
import { RatgeberTeaserSection } from "@/components/sections/home/ratgeber-teaser-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { realEstateAgentJsonLd, websiteJsonLd } from "@/lib/structured-data";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Immobilienbewertung Heidenheim – kostenlos",
  description:
    "Immobilie kostenlos bewerten in Heidenheim und deutschlandweit: unverbindliche Online-Wertspanne in wenigen Minuten, persönlich betreut von Finn Deininger.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(realEstateAgentJsonLd()) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }} />
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
