import Link from "next/link";
import { Container } from "../../ui/container";
import { cityPagePath, cityPages } from "@/lib/city-pages";

export const verkaufenFaqs = [
  {
    question: "Wie lange dauert der Verkauf einer Immobilie?",
    answer:
      "Von der ersten Preisfindung bis zum Notartermin vergehen in der Regel mehrere Monate. Die Zeit hängt stark vom Preis, vom Zustand und von der Nachfrage vor Ort ab: Ein realistisch angesetztes Objekt in gefragter Lage findet oft in wenigen Wochen einen Käufer, ein überteuertes bleibt deutlich länger im Angebot. Bis das Geld fließt, kommen noch Beurkundung, Finanzierungsbestätigung und Kaufpreisfälligkeit dazu.",
  },
  {
    question: "Welche Unterlagen brauche ich für den Verkauf?",
    answer:
      "Grundbuchauszug, Flurkarte, Energieausweis, Grundrisse und Baubeschreibung gehören immer dazu. Bei Eigentumswohnungen kommen Teilungserklärung, Protokolle der letzten Eigentümerversammlungen, Wirtschaftsplan und Hausgeldabrechnung dazu. Bei Erbimmobilien braucht es zusätzlich Erbschein oder Testament samt Eröffnungsprotokoll. Die vollständige Liste steht weiter oben auf dieser Seite.",
  },
  {
    question: "Brauche ich für den Verkauf einen Energieausweis?",
    answer:
      "Ja. Bei Verkauf und Vermietung muss der Energieausweis spätestens bei der Besichtigung vorliegen, und in der Anzeige müssen die Energiekennwerte genannt werden. Verstöße können mit Bußgeld geahndet werden. Worauf es bei Bedarfs- und Verbrauchsausweis ankommt, erklärt der Ratgeber zum Energieausweis beim Hausverkauf.",
  },
  {
    question: "Wer zahlt beim Immobilienverkauf die Notarkosten?",
    answer:
      "Üblicherweise der Käufer. Die Notar- und Grundbuchkosten sowie die Grunderwerbsteuer tragen im Normalfall die Käufer; der Verkäufer trägt eigene Kosten wie einen eventuellen Makleranteil, die Löschung einer Grundschuld oder eine Vorfälligkeitsentschädigung der Bank.",
  },
  {
    question: "Wann muss ich beim Verkauf Steuern zahlen?",
    answer:
      "Wer eine nicht selbst genutzte Immobilie innerhalb von zehn Jahren nach dem Kauf mit Gewinn verkauft, muss den Gewinn nach § 23 EStG versteuern. Selbst genutzte Immobilien sind unter bestimmten Bedingungen ausgenommen. Bei geerbten Immobilien läuft die Frist ab dem Kauf durch den Erblasser weiter. Details im Ratgeber zur Spekulationssteuer.",
  },
  {
    question: "Kann ich vor dem Verkauf wissen, was meine Immobilie wert ist?",
    answer:
      "Ja, und das sollten Sie. Der kostenlose Online-Rechner liefert in wenigen Minuten eine erste Wertspanne, die auf Lage, Baujahr, Zustand und Energieklasse aufbaut. Sie ersetzt kein Gutachten, gibt aber eine realistische Grundlage für die Preisvorstellung und für Gespräche mit Interessenten.",
  },
];

const linkClass = "underline decoration-line underline-offset-4 hover:text-ink";

export function VerkaufenWissenSection() {
  return (
    <>
      <section className="border-t border-line py-16 md:py-20">
        <Container className="max-w-4xl">
          <p className="text-xs font-medium tracking-[0.2em] text-accent uppercase">Preis und Kosten</p>
          <h2 className="mt-3 font-display text-2xl leading-[1.2] font-medium text-ink md:text-3xl">
            Der richtige Preis und was der Verkauf kostet
          </h2>
          <div className="mt-6 space-y-4 text-ink-soft/90">
            <p>
              Der häufigste Fehler beim Verkauf ist ein Preis, der aus Wunschdenken oder aus einem einzelnen
              Portalwert entsteht. Zu hoch angesetzte Objekte bleiben lange im Angebot und verlieren dann oft mehr
              durch spätere Nachlässe, als ein realistischer Startpreis gekostet hätte. Eine belastbare Grundlage sind
              der Vergleich mit ähnlichen Objekten, der Bodenrichtwert und der Zustand Ihrer Immobilie. Wie der{" "}
              <Link href="/immobilienbewertung" className={linkClass}>
                Online-Rechner
              </Link>{" "}
              vorgeht, steht offen auf der Seite{" "}
              <Link href="/wie-wir-rechnen" className={linkClass}>
                So rechnen wir
              </Link>
              ; die Preisniveaus der Region finden Sie in den{" "}
              <Link href="/immobilienpreise-ostwuerttemberg" className={linkClass}>
                Immobilienpreisen für Ostwürttemberg
              </Link>
              .
            </p>
            <p>
              Beim Verkauf fallen auf Verkäuferseite je nach Fall folgende Kosten an: der Energieausweis, eine
              Vorfälligkeitsentschädigung, falls die Bank das Darlehen vor Ablauf der Zinsbindung ablöst, die Löschung
              der Grundschuld beim Notar und Grundbuchamt und – wenn ein Makler beteiligt ist – dessen Provision. Dazu
              kommt gegebenenfalls die Steuer auf den Gewinn, siehe{" "}
              <Link href="/ratgeber/spekulationssteuer-beim-immobilienverkauf-wann-sie-anfaellt-und-wie-sie-sie-legal-vermeiden" className={linkClass}>
                Ratgeber zur Spekulationssteuer
              </Link>
              . Was Ihre Käufer zusätzlich zum Kaufpreis aufbringen müssen, rechnet der{" "}
              <Link href="/kaufnebenkosten-rechner" className={linkClass}>
                Kaufnebenkosten-Rechner
              </Link>{" "}
              aus – ein wichtiges Argument, wenn Käufer den Preis herunterhandeln wollen.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-16 md:py-20">
        <Container className="max-w-4xl">
          <p className="text-xs font-medium tracking-[0.2em] text-accent uppercase">Besondere Situationen</p>
          <h2 className="mt-3 font-display text-2xl leading-[1.2] font-medium text-ink md:text-3xl">
            Verkauf nach Erbe, Scheidung oder in der Erbengemeinschaft
          </h2>
          <div className="mt-6 space-y-4 text-ink-soft/90">
            <p>
              Viele Verkäufe entstehen nicht aus freier Entscheidung, sondern aus einem Ereignis: einem Todesfall,
              einer Trennung oder einer Erbengemeinschaft, die sich nicht einig ist. Dann kommen rechtliche und
              steuerliche Fragen dazu, die im normalen Verkaufsablauf nicht vorkommen. Hilfreich sind unsere Ratgeber
              zur{" "}
              <Link href="/ratgeber/immobilie-geerbt-wert-ermitteln" className={linkClass}>
                geerbten Immobilie
              </Link>
              , zur{" "}
              <Link href="/ratgeber/erbengemeinschaft-immobilie-verkaufen" className={linkClass}>
                Erbengemeinschaft
              </Link>
              , zur{" "}
              <Link href="/ratgeber/teilungsversteigerung-vermeiden" className={linkClass}>
                Teilungsversteigerung
              </Link>{" "}
              und zum{" "}
              <Link href="/ratgeber/scheidungsimmobilie-haus-bei-scheidung" className={linkClass}>
                gemeinsamen Haus bei einer Scheidung
              </Link>
              .
            </p>
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-16 md:py-20">
        <Container className="max-w-4xl">
          <p className="text-xs font-medium tracking-[0.2em] text-accent uppercase">FAQ</p>
          <h2 className="mt-3 font-display text-2xl leading-[1.2] font-medium text-ink md:text-3xl">
            Häufige Fragen zum Immobilienverkauf
          </h2>
          <div className="mt-8 divide-y divide-line border-y border-line">
            {verkaufenFaqs.map((item) => (
              <div key={item.question} className="py-6">
                <h3 className="font-display text-lg font-medium text-ink">{item.question}</h3>
                <p className="mt-2 text-ink-soft/90">{item.answer}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-16 md:py-20">
        <Container className="max-w-4xl">
          <p className="text-xs font-medium tracking-[0.2em] text-accent uppercase">Region</p>
          <h2 className="mt-3 font-display text-2xl leading-[1.2] font-medium text-ink md:text-3xl">
            Immobilie verkaufen in Ihrer Stadt
          </h2>
          <p className="mt-4 max-w-2xl text-ink-soft/90">
            Preisniveau, Stadtteile und Besonderheiten beim Verkauf – für {cityPages.length} Orte in der Region:
          </p>
          <ul className="mt-6 flex flex-wrap gap-3">
            {cityPages.map((city) => (
              <li key={city.slug}>
                <Link
                  href={cityPagePath(city)}
                  className="inline-block rounded-full border border-line px-4 py-2 text-sm text-ink-soft transition-colors hover:border-ink hover:text-ink"
                >
                  {city.name}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
