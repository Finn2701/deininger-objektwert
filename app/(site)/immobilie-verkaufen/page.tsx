import type { Metadata } from "next";
import { VerkaufenHero } from "@/components/sections/verkaufen/verkaufen-hero";
import { SellingProcessSection } from "@/components/sections/selling-process-section";
import { UnterlagenSection } from "@/components/sections/verkaufen/unterlagen-section";
import { DiscreteSection } from "@/components/sections/discrete-section";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Immobilie verkaufen – Ablauf, Unterlagen & diskrete Vermarktung",
  description:
    "Haus oder Wohnung verkaufen in Heidenheim an der Brenz: Ablauf, benötigte Unterlagen und die Option einer diskreten Vermarktung ohne öffentliches Inserat.",
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
      <main>
        <VerkaufenHero />
        <SellingProcessSection />
        <UnterlagenSection />
        <DiscreteSection />
      </main>
    </>
  );
}
