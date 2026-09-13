import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/lib/site-config";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontaktieren Sie Deininger Objektwert für eine detaillierte Immobilienbewertung oder ein unverbindliches Gespräch – ansässig in Heidenheim an der Brenz, deutschlandweit erreichbar.",
  alternates: { canonical: "/kontakt" },
};

export default function KontaktPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Start", url: "/" },
              { name: "Kontakt", url: "/kontakt" },
            ])
          ),
        }}
      />
      <main>
        <section className="py-20 md:py-28">
          <Container className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.2em] text-accent uppercase">Kontakt</p>
            <h1 className="mt-4 font-display text-3xl leading-[1.15] font-medium text-ink md:text-5xl">
              Sprechen wir über Ihre Immobilie.
            </h1>
            <p className="mt-6 max-w-lg text-balance text-ink-soft/90 md:text-lg">
              Für eine detaillierte Einschätzung oder einfach ein erstes, unverbindliches
              Gespräch.
            </p>

            <Reveal delay={0.1} className="mt-10">
              <div className="space-y-4 text-lg">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="block text-ink hover:text-ink-soft"
                >
                  {siteConfig.email}
                </a>
                <p className="text-base text-ink-soft/80">{siteConfig.region}</p>
              </div>

              <Link
                href="/immobilienbewertung"
                className="mt-8 inline-flex rounded-full border border-ink px-6 py-3 text-sm text-ink transition-colors hover:bg-ink hover:text-paper"
              >
                Zum Bewertungsformular
              </Link>
            </Reveal>
          </Container>
        </section>
      </main>
    </>
  );
}
