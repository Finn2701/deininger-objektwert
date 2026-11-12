import Link from "next/link";
import { Container } from "../../ui/container";
import { Reveal } from "../../ui/reveal";
import { SectionHeading } from "../../ui/section-heading";

const steps = [
  {
    number: "01",
    title: "Angaben zur Immobilie",
    body: "Objektart, Lage, Wohn- und Grundstücksfläche, Baujahr sowie der Zustand von Heizung, Elektrik und Leitungen – in wenigen, klar geführten Schritten.",
  },
  {
    number: "02",
    title: "Automatische Ersteinschätzung",
    body: "Aus Ihren Angaben und aktuellen Marktdaten für Ihre Region entsteht eine erste Wertspanne – sofort und kostenlos.",
  },
  {
    number: "03",
    title: "Bei Bedarf: persönliches Gespräch",
    body: "Möchten Sie die Einschätzung vertiefen oder über einen Verkauf sprechen, melden wir uns unverbindlich bei Ihnen.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="border-t border-ink py-20 md:py-32">
      <Container>
        <SectionHeading eyebrow="So funktioniert's" title="In drei Schritten zur ersten Einschätzung." size="xl" />

        <div className="mt-16 grid border-t border-ink md:mt-24 md:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.08}>
              <div
                className={`h-full py-8 md:py-10 md:pr-8 ${
                  index > 0 ? "border-t border-ink md:border-t-0 md:border-l md:pl-8" : ""
                }`}
              >
                <span className="font-display text-7xl leading-none font-bold text-accent md:text-8xl">{step.number}</span>
                <h3 className="font-display mt-8 text-xl font-semibold text-ink md:text-2xl">{step.title}</h3>
                <p className="mt-3 max-w-sm text-base leading-relaxed text-ink-soft">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-4 border-t border-ink pt-10">
          <Link href="/immobilienbewertung" className="btn-primary">
            Jetzt kostenlos starten
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden>
              <path d="M0 6h16M11 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
