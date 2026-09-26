import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { DocumentSubmitForm } from "@/components/document-submit-form";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Unterlagen für die Bewertung einreichen",
  description:
    "Grundriss, Energieausweis oder Fotos zur Hand? Reichen Sie Ihre Unterlagen ein und erhalten Sie eine persönliche, fundierte Einschätzung.",
  alternates: { canonical: "/unterlagen-einreichen" },
};

export default function UnterlagenEinreichenPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Start", url: "/" },
              { name: "Unterlagen einreichen", url: "/unterlagen-einreichen" },
            ])
          ),
        }}
      />
      <main>
        <section className="py-20 md:py-28">
          <Container className="grid gap-16 md:grid-cols-2 md:gap-12">
            <div>
              <p className="text-xs font-medium tracking-[0.2em] text-accent uppercase">
                Für alle mit vollständigen Unterlagen
              </p>
              <h1 className="mt-4 max-w-xl font-display text-3xl leading-[1.15] font-medium text-ink md:text-4xl">
                Sie haben die Unterlagen schon — reichen Sie sie direkt ein.
              </h1>
              <p className="mt-5 max-w-lg text-balance text-ink-soft/90 md:text-lg">
                Grundriss, Energieausweis, Grundbuchauszug oder aktuelle Fotos vorhanden? Dann
                überspringen Sie den Online-Schnellrechner: Laden Sie Ihre Unterlagen direkt hoch
                und erhalten Sie eine persönliche, fundierte Einschätzung statt einer groben
                Wertspanne.
              </p>

              <Reveal delay={0.1} className="mt-10">
                <ul className="space-y-3">
                  {[
                    "Grundriss und Wohnflächenberechnung",
                    "Energieausweis",
                    "Grundbuchauszug (falls vorhanden)",
                    "Aktuelle Fotos von innen und außen",
                  ].map((item) => (
                    <li key={item} className="flex items-baseline gap-4 border-t border-line py-3 first:border-t-0">
                      <span className="font-display text-sm text-accent">•</span>
                      <span className="text-ink-soft">{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <Reveal delay={0.05}>
              <DocumentSubmitForm />
            </Reveal>
          </Container>
        </section>
      </main>
    </>
  );
}
