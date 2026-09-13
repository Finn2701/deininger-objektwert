import { Container } from "../../ui/container";
import { Reveal } from "../../ui/reveal";
import { SectionHeading } from "../../ui/section-heading";

const documents = [
  {
    title: "Grundbuchauszug",
    body: "Zeigt Eigentumsverhältnisse sowie eingetragene Lasten und Rechte (z. B. Grundschulden, Wegerechte). Erhältlich beim zuständigen Grundbuchamt.",
  },
  {
    title: "Energieausweis",
    body: "Seit 2014 gesetzlich vorgeschrieben (Gebäudeenergiegesetz). Ohne gültigen Energieausweis darf eine Immobilie nicht beworben werden.",
  },
  {
    title: "Baupläne & Wohnflächenberechnung",
    body: "Grundrisse, Schnitte und eine nachvollziehbare Wohnflächenberechnung schaffen Vertrauen bei Interessenten und beschleunigen die Finanzierungsprüfung.",
  },
  {
    title: "Flurkarte & Lageplan",
    body: "Amtlicher Nachweis von Grundstücksgrenzen und -zuschnitt, erhältlich beim Katasteramt.",
  },
  {
    title: "Teilungserklärung (bei Eigentumswohnungen)",
    body: "Regelt Sondereigentum, Gemeinschaftseigentum und Stimmrechte innerhalb der Eigentümergemeinschaft.",
  },
  {
    title: "Protokolle der Eigentümerversammlung",
    body: "Geben Auskunft über beschlossene Sanierungen, die Instandhaltungsrücklage und mögliche Sonderumlagen.",
  },
];

export function UnterlagenSection() {
  return (
    <section className="border-t border-line py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Vorbereitung"
          title="Diese Unterlagen werden für einen Verkauf benötigt."
          lede="Vollständige Unterlagen schaffen Vertrauen bei Kaufinteressenten und beschleunigen den gesamten Verkaufsprozess spürbar."
        />

        <div className="mt-14 grid gap-x-10 gap-y-8 md:grid-cols-2">
          {documents.map((doc) => (
            <Reveal key={doc.title}>
              <h3 className="font-display text-lg font-medium text-ink">{doc.title}</h3>
              <p className="mt-2 text-sm text-ink-soft/90">{doc.body}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
