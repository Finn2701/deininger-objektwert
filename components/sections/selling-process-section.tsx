import { Container } from "../ui/container";
import { Reveal } from "../ui/reveal";
import { SectionHeading } from "../ui/section-heading";

const steps = [
  {
    number: "01",
    title: "Kostenlose Ersteinschätzung",
    body: "Ausgangspunkt ist der Online-Rechner: Lage, Fläche, Baujahr und Zustand ergeben eine erste Wertspanne.",
  },
  {
    number: "02",
    title: "Persönliches Gespräch",
    body: "Bei Interesse folgt ein unverbindliches Gespräch, um die Einschätzung zu vertiefen und offene Fragen zu klären.",
  },
  {
    number: "03",
    title: "Vermarktungsoptionen",
    body: "Je nach Situation kommen unterschiedliche Wege infrage – öffentlich oder zunächst diskret ohne Inserat.",
  },
  {
    number: "04",
    title: "Verkaufsprozess",
    body: "Besichtigungen, Preisverhandlung und Notartermin bis zur Übergabe – begleitet, sobald die formalen Voraussetzungen dafür stehen.",
  },
];

export function SellingProcessSection() {
  return (
    <section id="verkaufen" className="scroll-mt-24 border-t border-line py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Immobilie verkaufen"
          title="So kann ein Verkauf ablaufen, wenn Sie sich dafür entscheiden."
          align="center"
        />

        <div className="mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
          {steps.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.08}>
              <div className="border-t border-line pt-6">
                <span className="font-display text-sm text-accent-text">{step.number}</span>
                <h3 className="mt-3 font-display text-xl font-medium text-ink">{step.title}</h3>
                <p className="mt-3 text-sm text-ink-soft/90">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
