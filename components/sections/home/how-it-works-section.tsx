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
    <section className="border-t border-line py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="So funktioniert's"
          title="In drei Schritten zur ersten Einschätzung."
          align="center"
        />

        <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
          {steps.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.08}>
              <div className="border-t border-line pt-6">
                <span className="font-display text-sm text-accent">{step.number}</span>
                <h3 className="mt-3 font-display text-xl font-medium text-ink">{step.title}</h3>
                <p className="mt-3 text-sm text-ink-soft/90">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-14 text-center">
          <Link
            href="/immobilienbewertung"
            className="inline-flex rounded-full bg-ink px-7 py-3.5 text-sm text-paper transition-colors hover:bg-ink-soft"
          >
            Jetzt kostenlos starten
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
