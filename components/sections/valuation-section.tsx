import { Container } from "../ui/container";
import { Reveal } from "../ui/reveal";
import { SectionHeading } from "../ui/section-heading";
import { ValuationForm } from "../valuation-form/valuation-form";

const drivers = [
  { number: "01", label: "Lage" },
  { number: "02", label: "Wohnfläche & Grundriss" },
  { number: "03", label: "Grundstück" },
  { number: "04", label: "Technik & Zustand" },
  { number: "05", label: "Markt" },
];

export function ValuationSection() {
  return (
    <section id="bewertung" className="scroll-mt-24 py-24 md:py-32">
      <Container className="grid gap-16 md:grid-cols-2 md:gap-12">
        <div>
          <SectionHeading
            eyebrow="Immobilienbewertung"
            title="Eine realistische Einschätzung statt einer Zahl aus dem Internet."
            lede="Wir betrachten Ihre Immobilie entlang der fünf Ebenen, die ihren Wert tatsächlich bestimmen – und ordnen sie in die aktuelle Marktlage ein."
          />

          <Reveal delay={0.1} className="mt-10">
            <ul className="space-y-3">
              {drivers.map((driver) => (
                <li key={driver.number} className="flex items-baseline gap-4 border-t border-line py-3 first:border-t-0">
                  <span className="font-display text-sm text-accent-text">{driver.number}</span>
                  <span className="text-ink-soft">{driver.label}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.15} className="mt-10">
            <p className="text-sm text-ink-soft/80">
              Füllen Sie das Formular aus – in wenigen Schritten, ohne Verpflichtung.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <ValuationForm />
        </Reveal>
      </Container>
    </section>
  );
}
