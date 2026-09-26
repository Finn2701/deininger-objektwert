import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { DataTable, SectionH2 } from "@/components/calculators/content";
import { VerkaufskostenCalculator } from "@/components/calculators/verkaufskosten-calculator";
import { formatPercent, stateRates } from "@/lib/kaufnebenkosten";
import { VERKAUFSKOSTEN_STAND, VERKAUFSKOSTEN_STAND_ISO } from "@/lib/verkaufskosten";
import { breadcrumbJsonLd, faqJsonLd, webApplicationJsonLd } from "@/lib/structured-data";

const PATH = "/verkaufskosten-rechner";

export const metadata: Metadata = {
  title: "Verkaufskosten-Rechner: Was bleibt übrig?",
  description:
    "Nettoerlös beim Hausverkauf berechnen: Maklerprovision, Vorfälligkeitsentschädigung, Energieausweis, Grundschuldlöschung und Steuer – mit Rechner.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Verkaufskosten-Rechner für Haus und Wohnung",
    description: "Was bleibt beim Immobilienverkauf nach Kosten und Darlehensablösung übrig?",
    url: PATH,
    type: "website",
  },
};

const faqs = [
  {
    question: "Welche Kosten hat der Verkäufer beim Immobilienverkauf?",
    answer:
      "Je nach Fall: die Maklerprovision (falls ein Makler beteiligt ist), den Energieausweis, eine Vorfälligkeitsentschädigung der Bank bei vorzeitiger Darlehensablösung, die Löschung der Grundschuld sowie gegebenenfalls Einkommensteuer auf den Gewinn (Spekulationssteuer). Dazu können Kosten für Fotos, Renovierung oder Umzug kommen. Notar, Grundbuch und Grunderwerbsteuer zahlt in der Regel der Käufer.",
  },
  {
    question: "Wer zahlt die Maklerprovision beim Verkauf?",
    answer:
      "Seit dem 23. Dezember 2020 gilt bei Wohnungen und Einfamilienhäusern, die Verbraucher kaufen: Beauftragen beide Seiten den Makler, zahlen sie die gleiche Provision. Beauftragt nur eine Seite den Makler, darf sie höchstens die Hälfte auf die andere abwälzen. Üblich sind je nach Bundesland 5,95 bis 7,14 Prozent Gesamtprovision inklusive Mehrwertsteuer, also rund 3 bis 3,6 Prozent pro Seite.",
  },
  {
    question: "Wann fällt eine Vorfälligkeitsentschädigung an?",
    answer:
      "Wenn die Bank das Darlehen vor Ablauf der Zinsbindung ablöst und Sie keinen Anspruch auf vorzeitige Kündigung haben. Der Verkauf der Immobilie gilt als berechtigtes Interesse, die Bank darf dann aber für den Zinsausfall eine Entschädigung verlangen (§ 490 Abs. 2 BGB). Nach zehn Jahren seit vollständigem Empfang des Darlehens können Sie mit sechs Monaten Frist kündigen, ohne Entschädigung (§ 489 BGB). Fragen Sie Ihre Bank frühzeitig nach einer schriftlichen Berechnung.",
  },
  {
    question: "Muss ich beim Verkauf Steuern zahlen?",
    answer:
      "Nur unter Bedingungen: Verkaufen Sie eine nicht selbst genutzte Immobilie innerhalb von zehn Jahren nach dem Kauf mit Gewinn, ist der Gewinn nach § 23 EStG einkommensteuerpflichtig. Selbst genutzte Immobilien sind unter bestimmten Bedingungen ausgenommen, und der Gewinn bleibt steuerfrei, wenn die Frist abgelaufen ist. Ob und wie viel Steuer anfällt, prüfen Sie im Spekulationssteuer-Rechner; Hintergründe im Ratgeber zur Spekulationssteuer.",
  },
  {
    question: "Was kostet die Löschung der Grundschuld?",
    answer:
      "Die Bank stellt eine Löschungsbewilligung aus, die notariell beglaubigt und im Grundbuch eingetragen wird. Dafür fallen Notar- und Grundbuchgebühren an, die sich nach der Höhe der Grundschuld richten und meist im Bereich von einigen hundert Euro liegen. Oft übernimmt der Notar die Abwicklung im Rahmen des Kaufvertrags.",
  },
  {
    question: "Kann ich die Kosten senken?",
    answer:
      "Bei der Vorfälligkeitsentschädigung lohnt es sich, das Angebot der Bank prüfen zu lassen, denn die Berechnung ist fehleranfällig. Bei der Provision können Sie verhandeln oder ohne Makler verkaufen. Ein realistischer Preis von Anfang an spart am meisten, denn er verkürzt die Vermarktungszeit und vermeidet spätere Preisnachlässe.",
  },
];

const dateDe = (iso: string) =>
  new Intl.DateTimeFormat("de-DE", { dateStyle: "long" }).format(new Date(`${iso}T12:00:00Z`));

export default function VerkaufskostenPage() {
  const rows = [...stateRates]
    .sort((a, b) => a.name.localeCompare(b.name, "de"))
    .map((s) => [s.name, formatPercent(s.maklerTotal), formatPercent(s.maklerBuyerShare)]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webApplicationJsonLd({
              name: "Verkaufskosten-Rechner",
              description:
                "Berechnet, was beim Verkauf von Haus oder Wohnung nach Maklerprovision, Vorfälligkeitsentschädigung, Energieausweis, Grundschuldlöschung und Steuer übrig bleibt.",
              path: PATH,
              dateModified: VERKAUFSKOSTEN_STAND_ISO,
            })
          ),
        }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Start", url: "/" },
              { name: "Immobilie verkaufen", url: "/immobilie-verkaufen" },
              { name: "Verkaufskosten-Rechner", url: PATH },
            ])
          ),
        }}
      />

      <main>
        <article className="py-20 md:py-28">
          <Container className="max-w-4xl">
            <p className="text-xs font-medium tracking-[0.2em] text-accent uppercase">Rechner</p>
            <h1 className="mt-3 font-display text-3xl leading-[1.15] font-medium text-ink md:text-4xl">
              Verkaufskosten-Rechner: Was bleibt beim Hausverkauf übrig?
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-ink-soft/90">
              Vom Verkaufspreis zum Nettoerlös: Maklerprovision, Darlehensablösung, Energieausweis und Steuer auf einen
              Blick – Stand {VERKAUFSKOSTEN_STAND}.
            </p>

            <div className="mt-10">
              <VerkaufskostenCalculator />
            </div>

            <section className="mt-16 space-y-4 text-ink-soft/90">
              <SectionH2>Diese Kosten trägt der Verkäufer</SectionH2>
              <h3 className="font-display text-xl font-medium text-ink">Maklerprovision</h3>
              <p>
                Nur wenn ein Makler den Verkauf vermittelt. Die Provision ist nicht gesetzlich festgelegt, aber
                ortsüblich. Bei Wohnungen und Einfamilienhäusern, die Verbraucher kaufen, darf der Verkäufer sie seit
                dem 23. Dezember 2020 nicht mehr vollständig auf den Käufer abwälzen. Die Tabelle unten zeigt die
                ortsüblichen Werte je Bundesland.
              </p>
              <h3 className="font-display text-xl font-medium text-ink">Vorfälligkeitsentschädigung</h3>
              <p>
                Läuft die Zinsbindung Ihres Darlehens noch, verlangt die Bank für die vorzeitige Ablösung oft eine
                Entschädigung für ihren Zinsausfall. Sie kann je nach Restlaufzeit und Zinsniveau vierstellig oder
                höher sein. Holen Sie das Angebot schriftlich ein, bevor Sie einen Kaufvertrag unterschreiben. Sind
                seit dem vollständigen Empfang des Darlehens mehr als zehn Jahre vergangen, können Sie mit sechs
                Monaten Frist kündigen.
              </p>
              <h3 className="font-display text-xl font-medium text-ink">Energieausweis</h3>
              <p>
                Bei Verkauf muss der Energieausweis spätestens bei der Besichtigung vorliegen; die Kennwerte gehören in
                die Anzeige. Wie Sie den passenden Ausweis wählen, erklärt der{" "}
                <Link href="/ratgeber/energieausweis-beim-hausverkauf-pflicht-fristen-und-was-sich" className="underline decoration-line underline-offset-4 hover:text-ink">
                  Ratgeber zum Energieausweis beim Hausverkauf
                </Link>
                .
              </p>
              <h3 className="font-display text-xl font-medium text-ink">Steuer auf den Gewinn</h3>
              <p>
                Innerhalb von zehn Jahren nach dem Kauf ist der Gewinn bei nicht selbst genutzten Immobilien
                einkommensteuerpflichtig (§ 23 EStG). Ausnahmen gibt es für Eigennutzung. Bei geerbten Immobilien läuft
                die Frist ab dem Kauf durch den Verstorbenen weiter. Die Regeln im Detail:{" "}
                <Link href="/ratgeber/spekulationssteuer-beim-immobilienverkauf-wann-sie-anfaellt-und-wie-sie-sie-legal-vermeiden" className="underline decoration-line underline-offset-4 hover:text-ink">
                  Spekulationssteuer beim Immobilienverkauf
                </Link>
                .
              </p>
            </section>

            <section className="mt-16 space-y-4 text-ink-soft/90">
              <SectionH2>Ortsübliche Maklerprovision nach Bundesland</SectionH2>
              <p>
                Richtwerte inklusive Mehrwertsteuer, Stand {dateDe(VERKAUFSKOSTEN_STAND_ISO)}. Sie sind keine
                gesetzlichen Sätze und im Einzelfall verhandelbar.
              </p>
              <DataTable headers={["Bundesland", "Gesamtprovision", "Anteil pro Seite"]} rows={rows} />
              <p className="text-sm text-ink-soft/70">
                In Teilen Niedersachsens sind 4,76 bis 5,95 % Gesamtprovision üblich.
              </p>
            </section>

            <section className="mt-16 space-y-4 text-ink-soft/90">
              <SectionH2>Was der Käufer zusätzlich zahlt</SectionH2>
              <p>
                Neben dem Kaufpreis trägt der Käufer Grunderwerbsteuer, Notar- und Grundbuchkosten und gegebenenfalls
                seinen Maklerteil. Diese Summe entscheidet mit darüber, wie viel Käufer für Ihr Haus ausgeben können.
                Mit dem{" "}
                <Link href="/kaufnebenkosten-rechner" className="underline decoration-line underline-offset-4 hover:text-ink">
                  Kaufnebenkosten-Rechner
                </Link>{" "}
                sehen Sie, wie hoch die Nebenkosten Ihrer Käufer sind. Den Verkaufspreis selbst leiten Sie am besten
                aus einer belastbaren Wertspanne ab: Der{" "}
                <Link href="/immobilienbewertung" className="underline decoration-line underline-offset-4 hover:text-ink">
                  kostenlose Rechner
                </Link>{" "}
                liefert eine erste Einschätzung, die Preise der Region stehen unter{" "}
                <Link href="/immobilienpreise-ostwuerttemberg" className="underline decoration-line underline-offset-4 hover:text-ink">
                  Immobilienpreise in Ostwürttemberg
                </Link>
                .
              </p>
            </section>

            <section className="mt-16 space-y-4 text-ink-soft/90">
              <SectionH2>Häufige Fragen zu den Verkaufskosten</SectionH2>
              <div className="divide-y divide-line border-y border-line">
                {faqs.map((item) => (
                  <div key={item.question} className="py-6">
                    <h3 className="font-display text-lg font-medium text-ink">{item.question}</h3>
                    <p className="mt-2">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-16 rounded-2xl border border-line bg-paper-dim p-6 md:p-8">
              <h2 className="font-display text-xl font-medium text-ink">Bevor Sie verkaufen: Wert kennen</h2>
              <p className="mt-3 text-sm text-ink-soft/90">
                Ein realistischer Preis ist die Grundlage für jede Rechnung. Die Ersteinschätzung ist kostenlos und
                unverbindlich.
              </p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                <Link href="/immobilienbewertung" className="inline-flex rounded-full bg-ink px-5 py-2.5 text-paper hover:bg-ink-soft">
                  Immobilie kostenlos bewerten
                </Link>
                <Link href="/immobilie-verkaufen" className="inline-flex rounded-full border border-line px-5 py-2.5 text-ink hover:border-ink">
                  Ablauf des Verkaufs
                </Link>
              </div>
              <p className="mt-6 text-xs text-ink-soft/70">
                Quellen: §§ 656a ff. BGB, § 489 und § 490 BGB, § 23 EStG (gesetze-im-internet.de). Datenstand:{" "}
                {dateDe(VERKAUFSKOSTEN_STAND_ISO)}. Keine Steuer- oder Rechtsberatung.
              </p>
            </section>
          </Container>
        </article>
      </main>
    </>
  );
}
