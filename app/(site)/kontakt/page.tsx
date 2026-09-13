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
              <p className="text-sm text-ink-soft/70">Ihr Ansprechpartner</p>
              <p className="mt-1 text-lg text-ink">{siteConfig.operator.name}</p>

              <div className="mt-6 space-y-4 text-lg">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="block text-ink hover:text-ink-soft"
                >
                  {siteConfig.email}
                </a>
                <p className="text-base text-ink-soft/80">{siteConfig.operator.zipCity}</p>
              </div>

              <p className="mt-6 max-w-sm text-sm text-ink-soft/80">
                Ich lese jede Nachricht persönlich und melde mich in der Regel innerhalb eines
                Werktags zurück.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/immobilienbewertung"
                  className="inline-flex rounded-full border border-ink px-6 py-3 text-sm text-ink transition-colors hover:bg-ink hover:text-paper"
                >
                  Zum Bewertungsformular
                </Link>
                <Link
                  href="/ueber-uns"
                  className="inline-flex items-center text-sm text-ink-soft underline decoration-line underline-offset-4 hover:text-ink"
                >
                  Mehr über mich
                </Link>
              </div>

              <div className="mt-10 rounded-xl border border-line p-5">
                <p className="text-sm text-ink">
                  Haben Sie Grundriss, Energieausweis oder Fotos schon parat?
                </p>
                <Link
                  href="/unterlagen-einreichen"
                  className="mt-2 inline-flex text-sm text-accent underline decoration-accent/40 underline-offset-4 hover:text-ink"
                >
                  Unterlagen direkt einreichen →
                </Link>
              </div>
            </Reveal>
          </Container>
        </section>
      </main>
    </>
  );
}
