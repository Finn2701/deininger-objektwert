import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { DataTable, SectionH2 } from "@/components/calculators/content";
import { KaufnebenkostenCalculator } from "@/components/calculators/kaufnebenkosten-calculator";
import {
  KAUFNEBENKOSTEN_STAND,
  KAUFNEBENKOSTEN_STAND_ISO,
  NOTAR_GRUNDBUCH_DEFAULT_PERCENT,
  formatPercent,
  stateRates,
  totalPercent,
} from "@/lib/kaufnebenkosten";
import { breadcrumbJsonLd, faqJsonLd, webApplicationJsonLd } from "@/lib/structured-data";

const PATH = "/kaufnebenkosten-rechner";

export const metadata: Metadata = {
  title: "Kaufnebenkosten-Rechner 2026",
  description:
    "Kaufnebenkosten für Haus und Wohnung berechnen: Grunderwerbsteuer, Notar, Grundbuch und Makler – für alle 16 Bundesländer, mit Tabelle und Beispielen.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Kaufnebenkosten-Rechner 2026 für alle Bundesländer",
    description:
      "Grunderwerbsteuer, Notar, Grundbuch und Maklerprovision beim Immobilienkauf – Rechner und Tabelle für alle Bundesländer.",
    url: PATH,
    type: "website",
  },
};

const bw = stateRates.find((s) => s.code === "BW")!;
const by = stateRates.find((s) => s.code === "BY")!;

const faqs = [
  {
    question: "Wie hoch sind die Kaufnebenkosten beim Immobilienkauf?",
    answer:
      "Je nach Bundesland und Maklerbeteiligung liegen die Kaufnebenkosten bei rund 5 bis 12 Prozent des Kaufpreises. Ohne Makler sind es in Bayern rund 5,0 Prozent (3,5 % Grunderwerbsteuer plus rund 1,5 % Notar und Grundbuch), in Brandenburg, Nordrhein-Westfalen, dem Saarland und Schleswig-Holstein rund 8,0 Prozent. Mit Käufer-Maklerprovision kommen je nach Land 3 bis 3,6 Prozentpunkte hinzu.",
  },
  {
    question: "Was gehört zu den Kaufnebenkosten?",
    answer:
      "Grunderwerbsteuer, Notar- und Grundbuchkosten sowie – wenn ein Makler den Kauf vermittelt hat – die Maklerprovision des Käufers. Hinzu kommen je nach Fall Kosten für die Finanzierung (Bereitstellungszinsen, Grundschuld), Gutachten oder Umzug und Renovierung; die zählen aber nicht zu den Erwerbsnebenkosten im engeren Sinn.",
  },
  {
    question: "Wer zahlt die Maklerprovision beim Hauskauf?",
    answer:
      "Seit dem 23. Dezember 2020 gilt für Wohnungen und Einfamilienhäuser, die Verbraucher kaufen: Beauftragen beide Seiten den Makler, zahlen beide die gleiche Provision. Beauftragt nur eine Seite den Makler, darf sie höchstens die Hälfte auf die andere Seite abwälzen. Die Höhe selbst ist gesetzlich nicht festgelegt; ortsüblich sind je nach Bundesland 5,95 bis 7,14 Prozent Gesamtprovision inklusive Mehrwertsteuer.",
  },
  {
    question: "Kann ich die Nebenkosten mitfinanzieren?",
    answer:
      "Manche Banken finanzieren Teile der Nebenkosten mit, üblich ist es aber nicht. Die meisten verlangen, dass Sie Grunderwerbsteuer, Notar und Makler aus Eigenkapital bezahlen. Rechnen Sie deshalb für die Finanzierungsplanung immer mit Kaufpreis plus Nebenkosten und nicht nur mit dem Kaufpreis.",
  },
  {
    question: "Wie kann ich Kaufnebenkosten sparen?",
    answer:
      "Bei der Grunderwerbsteuer hilft es, mitverkauftes Inventar (etwa eine Einbauküche) im Kaufvertrag getrennt und angemessen auszuweisen – dafür fällt keine Grunderwerbsteuer an. Beim Makler lohnt es sich zu klären, wer ihn beauftragt hat und ob die Provision verhandelbar ist. Notar- und Grundbuchkosten sind gesetzlich festgelegt und nicht verhandelbar.",
  },
  {
    question: "Wann werden die Kaufnebenkosten fällig?",
    answer:
      "Die Notarkosten stellt der Notar nach der Beurkundung in Rechnung. Die Grunderwerbsteuer wird per Steuerbescheid festgesetzt und ist in der Regel einen Monat nach Bekanntgabe zu zahlen; erst danach stellt das Finanzamt die Unbedenklichkeitsbescheinigung aus, die für die Eintragung ins Grundbuch nötig ist. Die Maklerprovision wird meist mit Abschluss des Kaufvertrags fällig.",
  },
];

const dateDe = (iso: string) =>
  new Intl.DateTimeFormat("de-DE", { dateStyle: "long" }).format(new Date(`${iso}T12:00:00Z`));

export default function KaufnebenkostenPage() {
  const tableRows = [...stateRates]
    .sort((a, b) => a.name.localeCompare(b.name, "de"))
    .map((s) => [
      s.name,
      formatPercent(s.grunderwerbsteuer),
      formatPercent(s.maklerBuyerShare),
      formatPercent(totalPercent(s, false)),
      formatPercent(totalPercent(s, true)),
    ]);

  const example = 350000;
  const exampleBw = example * (totalPercent(bw, true) / 100);
  const exampleBy = example * (totalPercent(by, true) / 100);
  const eur = (value: number) => new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0 }).format(value);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webApplicationJsonLd({
              name: "Kaufnebenkosten-Rechner",
              description:
                "Berechnet Grunderwerbsteuer, Notar- und Grundbuchkosten und Maklerprovision beim Kauf von Haus, Wohnung oder Grundstück für alle 16 Bundesländer.",
              path: PATH,
              dateModified: KAUFNEBENKOSTEN_STAND_ISO,
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
              { name: "Kaufnebenkosten-Rechner", url: PATH },
            ])
          ),
        }}
      />

      <main>
        <article className="py-20 md:py-28">
          <Container className="max-w-4xl">
            <p className="text-xs font-medium tracking-[0.2em] text-accent uppercase">Rechner</p>
            <h1 className="mt-3 font-display text-3xl leading-[1.15] font-medium text-ink md:text-4xl">
              Kaufnebenkosten-Rechner für Haus und Wohnung
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-ink-soft/90">
              Grunderwerbsteuer, Notar, Grundbuch und Makler: Was beim Immobilienkauf zusätzlich zum Kaufpreis
              fällig wird – für alle 16 Bundesländer, Stand {KAUFNEBENKOSTEN_STAND}.
            </p>

            <div className="mt-10">
              <KaufnebenkostenCalculator mode="nebenkosten" />
            </div>

            <section className="mt-16 space-y-4 text-ink-soft/90">
              <SectionH2>Ein Beispiel: 350.000 Euro in Baden-Württemberg und in Bayern</SectionH2>
              <p>
                Ein Haus für {eur(example)} Euro mit Makler kostet in Baden-Württemberg an Nebenkosten rund{" "}
                {eur(exampleBw)} Euro ({formatPercent(totalPercent(bw, true))}): {formatPercent(bw.grunderwerbsteuer)}{" "}
                Grunderwerbsteuer, {formatPercent(bw.maklerBuyerShare)} Maklerprovision und{" "}
                {formatPercent(NOTAR_GRUNDBUCH_DEFAULT_PERCENT)} für Notar und Grundbuch. Dieselbe Immobilie kostet in
                Bayern rund {eur(exampleBy)} Euro ({formatPercent(totalPercent(by, true))}), weil die
                Grunderwerbsteuer dort nur {formatPercent(by.grunderwerbsteuer)} beträgt. Der Unterschied von{" "}
                {eur(exampleBw - exampleBy)} Euro ist Eigenkapital, das Sie zusätzlich brauchen.
              </p>
              <p>
                Der Effekt zeigt sich vor allem an Landesgrenzen. Wer in Ulm kauft, zahlt 5,0 % Grunderwerbsteuer,
                wer wenige hundert Meter weiter in Neu-Ulm kauft, 3,5 %. Entscheidend ist der Standort der Immobilie,
                nicht der Wohnort des Käufers. Mehr dazu auf den Seiten{" "}
                <Link href="/immobilienbewertung-ulm" className="underline decoration-line underline-offset-4 hover:text-ink">
                  Ulm
                </Link>{" "}
                und{" "}
                <Link href="/immobilienbewertung-bopfingen" className="underline decoration-line underline-offset-4 hover:text-ink">
                  Bopfingen
                </Link>{" "}
                (Grenze zu Bayern).
              </p>
            </section>

            <section className="mt-16 space-y-4 text-ink-soft/90">
              <SectionH2>Kaufnebenkosten nach Bundesland im Vergleich</SectionH2>
              <p>
                Die Tabelle zeigt die Grunderwerbsteuer des jeweiligen Landes, den ortsüblichen Käuferanteil an der
                Maklerprovision (inklusive Mehrwertsteuer) und die Summe der Nebenkosten mit einem Notar- und
                Grundbuchanteil von {formatPercent(NOTAR_GRUNDBUCH_DEFAULT_PERCENT)}. Stand: {dateDe(KAUFNEBENKOSTEN_STAND_ISO)}.
              </p>
              <DataTable
                headers={["Bundesland", "Grunderwerbsteuer", "Makler (Käufer)", "Gesamt ohne Makler", "Gesamt mit Makler"]}
                rows={tableRows}
              />
              <p className="text-sm text-ink-soft/70">
                Maklerprovisionen sind ortsübliche Richtwerte, keine gesetzlichen Sätze. In Teilen Niedersachsens sind
                4,76 bis 5,95 % Gesamtprovision üblich. Notar und Grundbuch: Faustwert, tatsächlich 1,5 bis 2,0 %.
              </p>
            </section>

            <section className="mt-16 space-y-4 text-ink-soft/90">
              <SectionH2>Die vier Posten im Einzelnen</SectionH2>
              <h3 className="font-display text-xl font-medium text-ink">Grunderwerbsteuer</h3>
              <p>
                Die Steuer entsteht, sobald der notarielle Kaufvertrag geschlossen ist, und bemisst sich am Kaufpreis
                (plus übernommene Lasten). Der Satz legt jedes Bundesland selbst fest und liegt zwischen 3,5 % in
                Bayern und 6,5 % in Brandenburg, Nordrhein-Westfalen, dem Saarland und Schleswig-Holstein. Zuletzt
                erhöht hat Bremen zum 1. Juli 2025 von 5,0 auf 5,5 %; Thüringen hat den Satz zum 1. Januar 2024 von
                6,5 auf 5,0 % gesenkt. Die einzelnen Sätze und Beispiele stehen im{" "}
                <Link href="/grunderwerbsteuer-rechner" className="underline decoration-line underline-offset-4 hover:text-ink">
                  Grunderwerbsteuer-Rechner
                </Link>
                .
              </p>
              <h3 className="font-display text-xl font-medium text-ink">Notar und Grundbuch</h3>
              <p>
                Beurkundung des Kaufvertrags, Auflassungsvormerkung, Eigentumsumschreibung und die Eintragung einer
                Grundschuld für die Bank berechnen sich nach dem Gerichts- und Notarkostengesetz (GNotKG). Die Sätze
                sind bundesweit einheitlich und nicht verhandelbar. Sie wurden zum 1. Juni 2025 angehoben. Rechnen Sie
                mit 1,5 bis 2,0 % des Kaufpreises; wenn keine Grundschuld eingetragen wird, sind es eher 1,3 bis 1,5 %.
              </p>
              <h3 className="font-display text-xl font-medium text-ink">Maklerprovision</h3>
              <p>
                Nur wenn ein Makler den Kauf vermittelt hat. Seit dem 23. Dezember 2020 dürfen Verkäufer bei Wohnungen
                und Einfamilienhäusern, die Verbraucher kaufen, die Provision nicht mehr vollständig auf den Käufer
                abwälzen: Der Käuferanteil ist auf die Hälfte begrenzt, der Maklervertrag muss in Textform vorliegen.
                Häufig teilen sich beide Seiten die Provision daher zu gleichen Teilen. Bei einem Kauf direkt vom
                Eigentümer entfällt der Posten.
              </p>
              <h3 className="font-display text-xl font-medium text-ink">Sonstige Kosten</h3>
              <p>
                Nicht in der Berechnung enthalten sind Kosten für Gutachten oder Bauabnahme, Umzug, Renovierung und
                gegebenenfalls Bereitstellungszinsen der Bank. Planen Sie dafür zusätzlich einen Puffer ein.
              </p>
            </section>

            <section className="mt-16 space-y-4 text-ink-soft/90">
              <SectionH2>Häufige Fragen zu den Kaufnebenkosten</SectionH2>
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
              <h2 className="font-display text-xl font-medium text-ink">Sie verkaufen statt zu kaufen?</h2>
              <p className="mt-3 text-sm text-ink-soft/90">
                Als Verkäufer sind die Kaufnebenkosten des Käufers ein Verhandlungsargument: Je höher sie ausfallen,
                desto stärker rechnet der Käufer den Kaufpreis herunter. Wissen Sie, was Ihre Immobilie wert ist,
                bevor Sie verhandeln.
              </p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                <Link
                  href="/immobilienbewertung"
                  className="inline-flex rounded-full bg-ink px-5 py-2.5 text-paper hover:bg-ink-soft"
                >
                  Immobilie kostenlos bewerten
                </Link>
                <Link
                  href="/ratgeber"
                  className="inline-flex rounded-full border border-line px-5 py-2.5 text-ink hover:border-ink"
                >
                  Zum Ratgeber
                </Link>
              </div>
              <p className="mt-6 text-xs text-ink-soft/70">
                Quellen: Grunderwerbsteuergesetze der Länder,{" "}
                <a
                  href="https://www.gesetze-im-internet.de/grestg_1983/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-line underline-offset-4 hover:text-ink"
                >
                  GrEStG
                </a>
                ,{" "}
                <a
                  href="https://www.gesetze-im-internet.de/bgb/__656a.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-line underline-offset-4 hover:text-ink"
                >
                  §§ 656a ff. BGB
                </a>
                , GNotKG. Datenstand: {dateDe(KAUFNEBENKOSTEN_STAND_ISO)}. Keine Steuer- oder Rechtsberatung.
              </p>
            </section>
          </Container>
        </article>
      </main>
    </>
  );
}
