import type { Metadata } from "next";
import { VerkaufenHero } from "@/components/sections/verkaufen/verkaufen-hero";
import { SellingProcessSection } from "@/components/sections/selling-process-section";
import { UnterlagenSection } from "@/components/sections/verkaufen/unterlagen-section";
import { DiscreteSection } from "@/components/sections/discrete-section";
import { VerkaufenWissenSection, verkaufenFaqs } from "@/components/sections/verkaufen/verkaufen-wissen-section";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/structured-data";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Immobilie verkaufen: Ablauf & Unterlagen",
  description:
    "Haus oder Wohnung in Heidenheim verkaufen: Ablauf, benötigte Unterlagen und diskrete Vermarktung ohne öffentliches Inserat.",
  alternates: { canonical: "/immobilie-verkaufen" },
};

export default function ImmobilieVerkaufenPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Start", url: "/" },
              { name: "Immobilie verkaufen", url: "/immobilie-verkaufen" },
            ])
          ),
        }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(verkaufenFaqs)) }} />
      <main>
        <VerkaufenHero />
        <SellingProcessSection />
        <UnterlagenSection />
        <DiscreteSection />
        <VerkaufenWissenSection />
      </main>
    </>
  );
}
