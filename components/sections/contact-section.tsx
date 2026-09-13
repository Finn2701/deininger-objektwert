import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Container } from "../ui/container";
import { Reveal } from "../ui/reveal";
import { SectionHeading } from "../ui/section-heading";

export function ContactSection() {
  return (
    <section id="kontakt" className="scroll-mt-24 border-t border-line py-24 md:py-32">
      <Container className="grid gap-12 md:grid-cols-2 md:gap-16">
        <SectionHeading
          eyebrow="Kontakt"
          title="Sprechen wir über Ihre Immobilie."
          lede="Für eine detaillierte Einschätzung oder einfach ein erstes, unverbindliches Gespräch."
        />

        <Reveal delay={0.1}>
          <div className="space-y-4 text-lg">
            <a href={`mailto:${siteConfig.email}`} className="block text-ink hover:text-ink-soft">
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
  );
}
