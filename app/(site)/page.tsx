import type { Metadata } from "next";
import { HomeHero } from "@/components/sections/home/home-hero";
import { AdvisorSection } from "@/components/sections/home/advisor-section";
import { ValueFactorsSection } from "@/components/sections/home/value-factors-section";
import { HowItWorksSection } from "@/components/sections/home/how-it-works-section";
import { StatementSection } from "@/components/sections/statement-section";
import { RatgeberTeaserSection } from "@/components/sections/home/ratgeber-teaser-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { HomeFaqSection } from "@/components/sections/home/home-faq-section";
import { getFaqs } from "@/components/sections/faq-section";
import { faqJsonLd, realEstateAgentJsonLd, websiteJsonLd } from "@/lib/structured-data";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: "Immobilienmakler Heidenheim | Immobilie bewerten – kostenlos online | Deininger Objektwert" },
  description:
    "Zugelassener Immobilienmakler (§ 34c GewO) in Heidenheim: persönliche Verkaufsbegleitung von Finn Deininger – oder starten Sie unverbindlich mit der kostenlosen Online-Wertspanne in wenigen Minuten, deutschlandweit nutzbar.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const faqs = (await getFaqs()).slice(0, 8);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(realEstateAgentJsonLd()) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} />
      <main>
        <HomeHero />
        <ValueFactorsSection />
        <AdvisorSection />
        <HowItWorksSection />
        <StatementSection />
        <RatgeberTeaserSection />
        <HomeFaqSection faqs={faqs} />
        <FinalCtaSection />
      </main>
    </>
  );
}
