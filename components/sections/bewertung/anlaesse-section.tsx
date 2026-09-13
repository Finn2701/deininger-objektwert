import { Container } from "../../ui/container";
import { Reveal } from "../../ui/reveal";
import { SectionHeading } from "../../ui/section-heading";

const anlaesse = [
  {
    title: "Verkauf vorbereiten",
    body: "Bevor eine Immobilie inseriert wird, hilft eine realistische Einschätzung, den Angebotspreis richtig zu setzen. Zu hoch angesetzte Preise führen oft zu langer Vermarktungsdauer und Preisabschlägen, zu niedrig angesetzte lassen Geld auf dem Tisch liegen.",
  },
  {
    title: "Erbschaft oder Scheidung",
    body: "Bei einer Erbengemeinschaft oder im Rahmen einer Scheidung muss der Wert einer Immobilie oft nachvollziehbar zwischen mehreren Parteien geklärt werden. Eine erste Orientierung erleichtert das Gespräch, ersetzt bei strittigen Fällen aber kein gerichtsfestes Gutachten.",
  },
  {
    title: "Finanzierung oder Umschuldung",
    body: "Banken kalkulieren Beleihungswerte oft konservativer als der tatsächliche Marktwert. Wer den ungefähren Marktwert seiner Immobilie kennt, kann Finanzierungs- oder Umschuldungsgespräche gezielter führen.",
  },
  {
    title: "Vermietung statt Verkauf",
    body: "Auch wer nicht verkaufen, sondern vermieten möchte, profitiert von einer Werteinschätzung: Sie zeigt, in welcher Preisklasse sich die Immobilie am regionalen Markt bewegt und ob eine Vermietung oder ein Verkauf wirtschaftlich sinnvoller ist.",
  },
];

export function AnlaesseSection() {
  return (
    <section className="border-t border-line py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Wann sinnvoll"
          title="Wann lohnt sich eine Immobilienbewertung?"
          lede="Eine Wertermittlung ist nicht nur beim Verkauf hilfreich – auch in anderen Situationen schafft ein realistischer Marktwert Klarheit."
        />

        <div className="mt-14 grid gap-10 sm:grid-cols-2 md:gap-12">
          {anlaesse.map((item) => (
            <Reveal key={item.title}>
              <h3 className="font-display text-lg font-medium text-ink">{item.title}</h3>
              <p className="mt-3 text-sm text-ink-soft/90">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
