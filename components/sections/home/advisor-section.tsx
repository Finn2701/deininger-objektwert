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
    <section className="border-t border-ink bg-paper-dim py-20 md:py-32">
      <Container className="grid gap-10 md:grid-cols-12 md:gap-8">
        <Reveal className="md:col-span-3 md:row-span-2">
          <div className="flex h-24 w-24 items-center justify-center bg-ink font-display text-3xl font-bold text-paper md:h-32 md:w-32 md:text-4xl">
            {initials}
          </div>
        </Reveal>

        <Reveal delay={0.08} className="md:col-span-9">
          <h2 className="font-display text-4xl leading-[1.05] font-semibold text-ink md:text-6xl">
            {siteConfig.operator.name}
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-soft md:text-xl">
            Ich bewerte und begleite Immobilien in {siteConfig.region} und Umgebung persönlich —
            von der ersten Einschätzung bis zum Gespräch über einen möglichen Verkauf. Keine
            anonyme Formel, kein Callcenter: Sie sprechen direkt mit mir, und ich erkläre Ihnen
            nachvollziehbar, wie sich der Wert Ihrer Immobilie zusammensetzt.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-base">
            <Link href="/ueber-uns" className="btn-ghost">
              Mehr über meinen Ansatz
            </Link>
            <a href={`mailto:${siteConfig.email}`} className="font-medium text-ink underline decoration-ink/40 hover:decoration-ink">
              {siteConfig.email}
            </a>
          </div>
        </Reveal>

        <p className="order-last border-t border-ink pt-3 text-sm font-medium text-ink md:order-none md:col-span-9 md:col-start-4 md:max-w-[12rem]">
          Ihr Ansprechpartner
        </p>
      </Container>
    </section>
  );
}
