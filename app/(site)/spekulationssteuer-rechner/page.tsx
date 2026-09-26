import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { DataTable, SectionH2 } from "@/components/calculators/content";
import { SpekulationssteuerCalculator } from "@/components/calculators/spekulationssteuer-calculator";
import { FREIGRENZE_EUR, SPEKULATIONSSTEUER_STAND, SPEKULATIONSSTEUER_STAND_ISO } from "@/lib/spekulationssteuer";
import { breadcrumbJsonLd, faqJsonLd, webApplicationJsonLd } from "@/lib/structured-data";

const PATH = "/spekulationssteuer-rechner";

export const metadata: Metadata = {
  title: "Spekulationssteuer-Rechner Immobilie",
  description:
    "Spekulationssteuer beim Immobilienverkauf berechnen: Zehn-Jahres-Frist, Eigennutzung, Erbe und Freigrenze nach § 23 EStG – mit Rechner und Beispielen.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Spekulationssteuer-Rechner für Immobilien",
    description: "Frist, Eigennutzung und Gewinn: Was beim Verkauf einer Immobilie an Steuer anfällt.",
    url: PATH,
    type: "website",
  },
};

const euro = (value: number) => new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0 }).format(value);
const dateDe = (iso: string) =>
  new Intl.DateTimeFormat("de-DE", { dateStyle: "long" }).format(new Date(`${iso}T12:00:00Z`));

const faqs = [
  {
    question: "Wann fällt beim Immobilienverkauf Spekulationssteuer an?",
    answer:
      "Wenn zwischen Kauf und Verkauf nicht mehr als zehn Jahre liegen und Sie die Immobilie nicht selbst bewohnt haben. Dann ist der Gewinn nach § 23 EStG einkommensteuerpflichtig. Wer länger als zehn Jahre wartet oder die Ausnahme für Eigennutzung erfüllt, zahlt keine Spekulationssteuer.",
  },
  {
    question: "Wie berechnet sich der Gewinn?",
    answer:
      "Verkaufspreis minus Verkaufskosten (zum Beispiel Makler, Energieausweis) minus Anschaffungskosten. Zu den Anschaffungskosten zählen der Kaufpreis, die Kaufnebenkosten (Notar, Grunderwerbsteuer, Makler) und nachträgliche Herstellungskosten wie Anbauten oder umfassende Modernisierungen. Haben Sie die Immobilie vermietet und Abschreibungen (AfA) geltend gemacht, mindern diese die Anschaffungskosten und erhöhen damit den Gewinn.",
  },
  {
    question: "Wann gilt die Ausnahme für Eigennutzung?",
    answer:
      "Der Gewinn bleibt steuerfrei, wenn Sie die Immobilie zwischen Kauf und Verkauf ausschließlich selbst bewohnt haben, oder wenn Sie sie im Jahr des Verkaufs und in den beiden Jahren davor selbst bewohnt haben. Die drei Kalenderjahre müssen nicht voll ausgenutzt sein: Zieht man im Verkaufsjahr aus und verkauft, reicht schon das Bewohnen in den beiden Vorjahren und einem Teil des Verkaufsjahres.",
  },
  {
    question: "Wie ist es bei einer geerbten Immobilie?",
    answer:
      "Der Erbe tritt bei der Frist in die Position des Erblassers ein: Für die Zehn-Jahres-Frist zählt der Kauf durch den Erblasser (§ 23 Abs. 1 Satz 3 EStG). Hat der Verstorbene das Haus vor mehr als zehn Jahren gekauft, können Sie es sofort steuerfrei verkaufen. Wurde es erst vor kurzem gekauft, läuft dessen Frist weiter. Nutzen Sie selbst das geerbte Haus als Wohnung, kann auch die Ausnahme für Eigennutzung greifen. Details im Ratgeber zur Nachlassimmobilie.",
  },
  {
    question: "Was ist die Freigrenze von 1.000 Euro?",
    answer:
      "Bleibt der gesamte Gewinn aus privaten Veräußerungsgeschäften im Kalenderjahr unter 1.000 Euro, ist er steuerfrei. Erreicht er 1.000 Euro oder mehr, ist der gesamte Betrag steuerpflichtig. Es ist also eine Freigrenze, kein Freibetrag. Gewinne aus anderen privaten Veräußerungsgeschäften desselben Jahres, etwa aus Wertpapieren oder Kryptowerten, zählen mit.",
  },
  {
    question: "Wie hoch ist die Steuer?",
    answer:
      "Der Gewinn wird zu Ihrem übrigen Einkommen addiert und mit Ihrem persönlichen Einkommensteuersatz versteuert. Es gibt keinen festen Satz. Je nach Einkommen liegt die zusätzliche Belastung häufig zwischen 25 und 42 Prozent; hinzu können Solidaritätszuschlag und Kirchensteuer kommen. Der Rechner nimmt Ihren angegebenen Steuersatz und rechnet ohne Zuschläge.",
  },
  {
    question: "Wo gebe ich den Verkauf an?",
    answer:
      "In der Einkommensteuererklärung des Verkaufsjahres, in der Anlage SO (sonstige Einkünfte, private Veräußerungsgeschäfte). Maßgeblich für das Jahr ist der Abschluss des Kaufvertrags, nicht der Zahlungseingang.",
  },
];

export default function SpekulationssteuerPage() {
  const rows = [
    ["Verkauf nach mehr als 10 Jahren seit dem Kauf", "Steuerfrei"],
    ["Ausschließlich selbst bewohnt seit dem Kauf", "Steuerfrei"],
    ["Selbst bewohnt im Verkaufsjahr und in den beiden Jahren davor", "Steuerfrei"],
    ["Vermietet oder leer, Verkauf innerhalb von 10 Jahren", "Gewinn steuerpflichtig"],
    ["Gewinn unter 1.000 € im Jahr", "Steuerfrei (Freigrenze)"],
    ["Verlust", "Keine Steuer; Verrechnung nur mit Gewinnen aus privaten Veräußerungsgeschäften"],
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webApplicationJsonLd({
              name: "Spekulationssteuer-Rechner",
              description:
                "Berechnet, ob beim Verkauf einer Immobilie Spekulationssteuer nach § 23 EStG anfällt, und wie hoch sie ungefähr ist.",
              path: PATH,
              dateModified: SPEKULATIONSSTEUER_STAND_ISO,
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
              { name: "Spekulationssteuer-Rechner", url: PATH },
            ])
          ),
        }}
      />

      <main>
        <article className="py-20 md:py-28">
          <Container className="max-w-4xl">
            <p className="text-xs font-medium tracking-[0.2em] text-accent-text uppercase">Rechner</p>
            <h1 className="mt-3 font-display text-3xl leading-[1.15] font-medium text-ink md:text-4xl">
              Spekulationssteuer-Rechner für Immobilien
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-ink-soft/90">
              Steuerfrei verkaufen oder nicht? Prüfen Sie Frist, Eigennutzung und Gewinn nach § 23 EStG – Stand{" "}
              {SPEKULATIONSSTEUER_STAND}.
            </p>

            <div className="mt-10">
              <SpekulationssteuerCalculator />
            </div>

            <section className="mt-16 space-y-4 text-ink-soft/90">
              <SectionH2>Die Regeln auf einen Blick</SectionH2>
              <p>
                Die Spekulationssteuer ist keine eigene Steuer, sondern Einkommensteuer auf private
                Veräußerungsgeschäfte (§ 23 EStG). Bei Immobilien betrifft sie Verkäufe innerhalb von zehn Jahren nach
                dem Kauf, wenn Sie die Immobilie nicht selbst bewohnt haben. Maßgeblich für Fristbeginn und -ende sind
                jeweils die Daten der notariellen Kaufverträge.
              </p>
              <DataTable headers={["Situation", "Ergebnis"]} rows={rows} />
              <p className="text-sm text-ink-soft/80">
                Die Freigrenze beträgt {euro(FREIGRENZE_EUR)} Euro Gesamtgewinn im Kalenderjahr. Das Fristende ist der
                Kalendertag, der dem Kaufdatum zehn Jahre später entspricht; steuerfrei verkaufen Sie erst danach.
              </p>
            </section>

            <section className="mt-16 space-y-4 text-ink-soft/90">
              <SectionH2>Ein Rechenbeispiel</SectionH2>
              <p>
                Sie haben 2019 für 250.000 Euro gekauft, zusätzlich 18.000 Euro Nebenkosten gezahlt und 30.000 Euro in
                eine neue Heizung und Fenster investiert. Sie haben vermietet. Im Dezember 2026 verkaufen Sie für 380.000
                Euro und zahlen 12.000 Euro Makler und Energieausweis. Anschaffungskosten insgesamt: 298.000 Euro.
                Verkaufspreis minus Verkaufskosten: 368.000 Euro. Der Gewinn beträgt 70.000 Euro; bei einem persönlichen
                Steuersatz von 35 Prozent sind das rund 24.500 Euro Steuer. Würden Sie den Vertrag erst nach Ablauf der
                Zehn-Jahres-Frist im Jahr 2029 schließen, wäre der Gewinn steuerfrei.
              </p>
            </section>

            <section className="mt-16 space-y-4 text-ink-soft/90">
              <SectionH2>Erbe, Schenkung und Scheidung</SectionH2>
              <p>
                Wer eine Immobilie erbt oder geschenkt bekommt, tritt bei der Frist an die Stelle des bisherigen
                Eigentümers. Hat der Verstorbene sie vor mehr als zehn Jahren gekauft, ist ein Verkauf sofort steuerfrei;
                war es erst vor kurzem, läuft seine Frist weiter. Alles Weitere zu Fristen, Eigennutzung und Vermietung
                nach dem Erbfall steht im Ratgeber{" "}
                <Link href="/ratgeber/nachlassimmobilie-vermieten-oder-verkaufen" className="underline decoration-line underline-offset-4 hover:text-ink">
                  Geerbte Immobilie: vermieten oder verkaufen
                </Link>
                . Bei einer Scheidung hilft der Beitrag zum{" "}
                <Link href="/ratgeber/scheidungsimmobilie-haus-bei-scheidung" className="underline decoration-line underline-offset-4 hover:text-ink">
                  gemeinsamen Haus
                </Link>
                . Die Erbschaftsteuer ist eine eigene Steuer, die Sie im{" "}
                <Link href="/erbschaftsteuer-rechner" className="underline decoration-line underline-offset-4 hover:text-ink">
                  Erbschaftsteuer-Rechner
                </Link>{" "}
                prüfen.
              </p>
            </section>

            <section className="mt-16 space-y-4 text-ink-soft/90">
              <SectionH2>Was der Rechner nicht abbildet</SectionH2>
              <ul className="list-disc space-y-2 pl-5">
                <li>Gemischte Nutzung, zum Beispiel teils selbst bewohnt, teils vermietet: Der Gewinn wird dann aufgeteilt.</li>
                <li>
                  Gewerblichen Grundstückshandel: Wer innerhalb von fünf Jahren mehr als drei Objekte verkauft, gilt
                  häufig als gewerblich; dann greift die Zehn-Jahres-Frist nicht.
                </li>
                <li>Solidaritätszuschlag und Kirchensteuer sowie Ihr genauer Steuertarif.</li>
                <li>Weitere private Veräußerungsgewinne im selben Jahr, die die Freigrenze beeinflussen.</li>
              </ul>
              <p>
                Für Ihre Kalkulation als Verkäufer zeigt der{" "}
                <Link href="/verkaufskosten-rechner" className="underline decoration-line underline-offset-4 hover:text-ink">
                  Verkaufskosten-Rechner
                </Link>
                , was nach allen Kosten übrig bleibt. Ihren Verkaufspreis leiten Sie am besten aus dem{" "}
                <Link href="/immobilienbewertung" className="underline decoration-line underline-offset-4 hover:text-ink">
                  Immobilienwert-Rechner
                </Link>{" "}
                ab.
              </p>
            </section>

            <section className="mt-16 space-y-4 text-ink-soft/90">
              <SectionH2>Häufige Fragen zur Spekulationssteuer</SectionH2>
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
              <h2 className="font-display text-xl font-medium text-ink">Wissen, was die Immobilie wert ist</h2>
              <p className="mt-3 text-sm text-ink-soft/90">
                Ein realistischer Verkaufspreis ist die Basis jeder Steuerrechnung. Die Ersteinschätzung ist kostenlos und
                unverbindlich.
              </p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                <Link href="/immobilienbewertung" className="inline-flex rounded-full bg-ink px-5 py-2.5 text-paper hover:bg-ink-soft">
                  Immobilie kostenlos bewerten
                </Link>
                <Link
                  href="/ratgeber/spekulationssteuer-beim-immobilienverkauf-wann-sie-anfaellt-und-wie-sie-sie-legal-vermeiden"
                  className="inline-flex rounded-full border border-line px-5 py-2.5 text-ink hover:border-ink"
                >
                  Ratgeber zur Spekulationssteuer
                </Link>
              </div>
              <p className="mt-6 text-xs text-ink-soft/80">
                Quelle:{" "}
                <a
                  href="https://www.gesetze-im-internet.de/estg/__23.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-line underline-offset-4 hover:text-ink"
                >
                  § 23 EStG
                </a>
                . Datenstand: {dateDe(SPEKULATIONSSTEUER_STAND_ISO)}. Keine Steuer- oder Rechtsberatung.
              </p>
            </section>
          </Container>
        </article>
      </main>
    </>
  );
}
