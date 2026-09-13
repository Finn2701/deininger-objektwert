import Link from "next/link";
import { Container } from "../../ui/container";
import { Reveal } from "../../ui/reveal";
import { siteConfig } from "@/lib/site-config";

export function AdvisorSection() {
  const initials = siteConfig.operator.name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <section className="border-t border-line py-24 md:py-32">
      <Container className="grid gap-12 md:grid-cols-[auto_1fr] md:items-start md:gap-16">
        <Reveal>
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-line font-display text-xl text-ink md:h-24 md:w-24 md:text-2xl">
            {initials}
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="text-xs font-medium tracking-[0.2em] text-accent uppercase">
            Ihr Ansprechpartner
          </p>
          <h2 className="mt-4 max-w-xl font-display text-2xl leading-[1.2] font-medium text-ink md:text-3xl">
            {siteConfig.operator.name}
          </h2>
          <p className="mt-4 max-w-xl text-balance text-ink-soft/90 md:text-lg">
            Ich bewerte und begleite Immobilien in {siteConfig.region} und Umgebung persönlich —
            von der ersten Einschätzung bis zum Gespräch über einen möglichen Verkauf. Keine
            anonyme Formel, kein Callcenter: Sie sprechen direkt mit mir, und ich erkläre Ihnen
            nachvollziehbar, wie sich der Wert Ihrer Immobilie zusammensetzt.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-6 text-sm">
            <Link href="/ueber-uns" className="text-ink underline decoration-line underline-offset-4 hover:text-ink-soft">
              Mehr über meinen Ansatz
            </Link>
            <a href={`mailto:${siteConfig.email}`} className="text-ink-soft hover:text-ink">
              {siteConfig.email}
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
