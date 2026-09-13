import { Container } from "../../ui/container";
import { Reveal } from "../../ui/reveal";
import { SectionHeading } from "../../ui/section-heading";

const methods = [
  {
    name: "Vergleichswertverfahren",
    body: "Der Wert wird aus tatsächlich erzielten Kaufpreisen vergleichbarer Immobilien in ähnlicher Lage abgeleitet. Für Eigentumswohnungen und Einfamilienhäuser in Wohngebieten ist dies das gängigste Verfahren – auch die Grundlage unserer Online-Ersteinschätzung.",
  },
  {
    name: "Sachwertverfahren",
    body: "Hier werden Bodenwert und Herstellungskosten des Gebäudes (unter Berücksichtigung von Alter und Zustand) addiert. Es kommt vor allem zum Einsatz, wenn wenige vergleichbare Verkäufe vorliegen, etwa bei individuell gestalteten Häusern.",
  },
  {
    name: "Ertragswertverfahren",
    body: "Bei vermieteten oder gewerblich genutzten Immobilien steht der erzielbare Ertrag im Vordergrund. Der Wert ergibt sich im Wesentlichen aus den nachhaltig erzielbaren Mieteinnahmen.",
  },
];

export function BewertungsmethodenSection() {
  return (
    <section className="border-t border-line py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Hintergrund"
          title="Wie eine Immobilienbewertung methodisch funktioniert."
          lede="In Deutschland kommen je nach Immobilientyp unterschiedliche, in der Immobilienwertermittlungsverordnung (ImmoWertV) geregelte Verfahren zum Einsatz."
        />

        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {methods.map((method) => (
            <Reveal key={method.name}>
              <h3 className="font-display text-lg font-medium text-ink">{method.name}</h3>
              <p className="mt-3 text-sm text-ink-soft/90">{method.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15} className="mt-12 max-w-2xl">
          <p className="text-sm text-ink-soft/80">
            Unser kostenloser Online-Rechner ersetzt keine der drei Verfahren im Sinne eines
            Gutachtens, sondern liefert eine erste, vergleichswertorientierte Orientierung auf
            Basis Ihrer Angaben und aktueller regionaler Marktdaten. Für eine belastbare
            Wertermittlung – etwa für eine Bank, ein Gericht oder das Finanzamt – ist weiterhin
            ein qualifiziertes Gutachten erforderlich.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
