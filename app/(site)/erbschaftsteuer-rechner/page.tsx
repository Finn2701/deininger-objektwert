import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { DataTable, SectionH2 } from "@/components/calculators/content";
import { ErbschaftsteuerCalculator } from "@/components/calculators/erbschaftsteuer-calculator";
import {
  ERBSCHAFTSTEUER_STAND,
  ERBSCHAFTSTEUER_STAND_ISO,
  relationships,
  taxBracketTable,
} from "@/lib/erbschaftsteuer";
import { breadcrumbJsonLd, faqJsonLd, webApplicationJsonLd } from "@/lib/structured-data";

const PATH = "/erbschaftsteuer-rechner";

export const metadata: Metadata = {
  title: "Erbschaftsteuer-Rechner für Immobilien",
  description:
    "Erbschaftsteuer beim Erben einer Immobilie berechnen: Freibeträge, Steuerklassen, Steuersätze und die Steuerfreiheit des Familienheims – mit Rechner.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Erbschaftsteuer-Rechner für Immobilien",
    description: "Freibeträge, Steuerklassen und Steuersätze beim Erben – mit Familienheim-Regel und Rechner.",
    url: PATH,
    type: "website",
  },
};

const euro = (value: number) => new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0 }).format(value);
const dateDe = (iso: string) =>
  new Intl.DateTimeFormat("de-DE", { dateStyle: "long" }).format(new Date(`${iso}T12:00:00Z`));

const faqs = [
  {
    question: "Wie hoch ist der Freibetrag beim Erben einer Immobilie?",
    answer:
      "Das hängt vom Verwandtschaftsgrad ab: Ehegatten und eingetragene Lebenspartner haben 500.000 Euro, Kinder 400.000 Euro, Enkel 200.000 Euro (400.000 Euro, wenn der Elternteil verstorben ist), Eltern und Großeltern 100.000 Euro, Geschwister, Nichten und Neffen sowie nicht verwandte Personen 20.000 Euro. Nur was darüber liegt, wird besteuert. Ehegatten und Kinder können zusätzlich einen Versorgungsfreibetrag haben.",
  },
  {
    question: "Wann ist das geerbte Haus komplett steuerfrei?",
    answer:
      "Wenn es das Familienheim ist: Ehegatten und eingetragene Lebenspartner erben das selbst bewohnte Haus steuerfrei, wenn sie es weiterhin selbst nutzen. Bei Kindern (und Enkeln verstorbener Kinder) gilt das nur bis 200 Quadratmeter Wohnfläche; der Rest wird anteilig besteuert. In beiden Fällen müssen Sie die Immobilie unverzüglich selbst beziehen und zehn Jahre lang selbst nutzen. Ziehen Sie früher aus oder verkaufen Sie, fällt die Steuer nachträglich an, es sei denn, zwingende Gründe hindern Sie an der Selbstnutzung.",
  },
  {
    question: "Muss ich die Erbschaft dem Finanzamt melden?",
    answer:
      "Ja, jeder Erwerb von Todes wegen muss dem Finanzamt in der Regel innerhalb von drei Monaten, nachdem Sie davon erfahren haben, angezeigt werden – auch wenn der Erwerb innerhalb der Freibeträge liegt und keine Steuer anfällt. Ist das Testament vom Nachlassgericht eröffnet worden, ist eine gesonderte Anzeige in der Regel nicht nötig; im Zweifel melden Sie lieber einmal zu viel. Das Finanzamt fordert Sie dann gegebenenfalls zur Abgabe einer Steuererklärung auf.",
  },
  {
    question: "Mit welchem Wert wird die Immobilie angesetzt?",
    answer:
      "Mit dem Steuerwert nach dem Bewertungsgesetz, nicht mit dem Marktpreis. Der Steuerwert weicht häufig nach oben ab. Ist der tatsächliche Verkehrswert niedriger, können Sie diesen nachweisen (§ 198 BewG), zum Beispiel mit einem Gutachten. Wie das geht, erklärt unser Ratgeber zur geerbten Immobilie.",
  },
  {
    question: "Werden frühere Schenkungen angerechnet?",
    answer:
      "Ja. Erwerbe von derselben Person innerhalb von zehn Jahren werden zusammengerechnet (§ 14 ErbStG). Der Freibetrag steht Ihnen für diese Erwerbe insgesamt nur einmal zu. Haben Sie also vor acht Jahren vom Verstorbenen bereits ein Grundstück geschenkt bekommen, mindert das den Freibetrag für die Erbschaft. Der Rechner berücksichtigt das über das Feld „Frühere Erwerbe“ vereinfacht.",
  },
  {
    question: "Kann ich das geerbte Haus steuerfrei verkaufen?",
    answer:
      "Die Erbschaftsteuer fällt unabhängig vom Verkauf an. Zusätzlich kann beim Verkauf Einkommensteuer auf den Gewinn anfallen, die sogenannte Spekulationssteuer, wenn zwischen Anschaffung durch den Verstorbenen und Verkauf weniger als zehn Jahre liegen und die Immobilie nicht selbst genutzt wurde. Erben treten in die Frist des Verstorbenen ein. Mehr dazu im Ratgeber zur Spekulationssteuer.",
  },
  {
    question: "Ändert sich die Erbschaftsteuer bald?",
    answer: `Die Freibeträge sind seit vielen Jahren unverändert. Eine Reform wird politisch diskutiert, ein beschlossenes Gesetz gibt es nach unserem Kenntnisstand (${ERBSCHAFTSTEUER_STAND}) nicht. Maßgeblich ist immer das Recht zum Zeitpunkt des Erbfalls; prüfen Sie den aktuellen Stand, wenn Sie einen Erbfall haben.`,
  },
];

export default function ErbschaftsteuerPage() {
  const allowanceRows = relationships.map((r) => [r.label, `Klasse ${r.taxClass}`, `${euro(r.allowance)} €`]);
  const rateRows = taxBracketTable.map((row) => [
    row.upTo === Infinity ? `über ${euro(row.from)} €` : `${row.from === 0 ? "bis" : `${euro(row.from)} bis`} ${euro(row.upTo)} €`,
    `${row.rates.I} %`,
    `${row.rates.II} %`,
    `${row.rates.III} %`,
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webApplicationJsonLd({
              name: "Erbschaftsteuer-Rechner",
              description:
                "Berechnet die Erbschaftsteuer beim Erben einer Immobilie nach Verwandtschaftsgrad, mit Freibeträgen, Steuerklassen und Familienheim-Befreiung.",
              path: PATH,
              dateModified: ERBSCHAFTSTEUER_STAND_ISO,
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
              { name: "Ratgeber", url: "/ratgeber" },
              { name: "Erbschaftsteuer-Rechner", url: PATH },
            ])
          ),
        }}
      />

      <main>
        <article className="py-20 md:py-28">
          <Container className="max-w-4xl">
            <p className="text-xs font-medium tracking-[0.2em] text-accent-text uppercase">Rechner</p>
            <h1 className="mt-3 font-display text-3xl leading-[1.15] font-medium text-ink md:text-4xl">
              Erbschaftsteuer-Rechner für Immobilien
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-ink-soft/90">
              Wie viel Erbschaftsteuer fällt an, wenn Sie ein Haus oder eine Wohnung erben? Freibeträge, Steuerklassen und
              Familienheim-Regel – Stand {ERBSCHAFTSTEUER_STAND}.
            </p>

            <div className="mt-10">
              <ErbschaftsteuerCalculator />
            </div>

            <section className="mt-16 space-y-4 text-ink-soft/90">
              <SectionH2>Freibeträge nach Verwandtschaft</SectionH2>
              <p>
                Der persönliche Freibetrag hängt davon ab, in welchem Verhältnis Sie zum Verstorbenen standen (§ 16
                ErbStG). Bis zu diesem Betrag bleibt der Erwerb steuerfrei; nur der Teil darüber ist steuerpflichtig.
                Die Steuerklasse (§ 15 ErbStG) bestimmt außerdem den Steuersatz.
              </p>
              <DataTable headers={["Erwerber", "Steuerklasse", "Freibetrag"]} rows={allowanceRows} />
              <p className="text-sm text-ink-soft/80">
                Zusätzlich gibt es für Ehegatten einen besonderen Versorgungsfreibetrag von bis zu 256.000 Euro und für
                Kinder bis 27 Jahre je nach Alter zwischen 10.300 und 52.000 Euro (§ 17 ErbStG). Er wird um den
                Kapitalwert steuerfreier Versorgungsbezüge, etwa einer Witwenrente, gekürzt.
              </p>
            </section>

            <section className="mt-16 space-y-4 text-ink-soft/90">
              <SectionH2>Steuersätze nach Steuerklasse</SectionH2>
              <p>
                Der Satz richtet sich nach dem steuerpflichtigen Erwerb, also nach Abzug von Freibeträgen und
                Schulden, und nach der Steuerklasse (§ 19 ErbStG). Der gesamte steuerpflichtige Betrag wird mit dem
                Satz der jeweiligen Stufe besteuert, nicht nur der Teil über der Grenze. Damit ein knapper Sprung in die
                nächste Stufe nicht übermäßig belastet, begrenzt der Härteausgleich die Mehrsteuer auf einen Teil des
                Betrags über der Grenze.
              </p>
              <DataTable
                headers={["Steuerpflichtiger Erwerb", "Klasse I", "Klasse II", "Klasse III"]}
                rows={rateRows}
              />
            </section>

            <section className="mt-16 space-y-4 text-ink-soft/90">
              <SectionH2>Das Familienheim: Haus erben ohne Steuer</SectionH2>
              <p>
                Die wichtigste Ausnahme für Immobilien ist das selbst genutzte Familienheim. Erben Ehegatten oder
                eingetragene Lebenspartner das Haus, in dem der Verstorbene bis zu seinem Tod gewohnt hat, und ziehen
                sie selbst ein oder bleiben sie wohnen, ist der Erwerb steuerfrei – unabhängig von der Größe. Kinder und
                Enkel verstorbener Kinder erhalten die Befreiung nur bis 200 Quadratmeter Wohnfläche; ein größeres Haus
                wird anteilig besteuert (§ 13 Abs. 1 Nr. 4b und 4c ErbStG).
              </p>
              <p>
                Die Bedingung: Sie müssen die Immobilie unverzüglich selbst beziehen und zehn Jahre lang bewohnen. Wer
                früher auszieht oder verkauft, verliert die Befreiung nachträglich. Wer das Haus nicht behalten will,
                sollte den Verkauf deshalb vorher prüfen, zum Beispiel mit dem Ratgeber zur{" "}
                <Link href="/ratgeber/nachlassimmobilie-vermieten-oder-verkaufen" className="underline decoration-line underline-offset-4 hover:text-ink">
                  Nachlassimmobilie: vermieten oder verkaufen
                </Link>
                .
              </p>
            </section>

            <section className="mt-16 space-y-4 text-ink-soft/90">
              <SectionH2>Was ist die Immobilie steuerlich wert?</SectionH2>
              <p>
                Das Finanzamt setzt nicht den Marktpreis an, sondern einen Steuerwert nach dem Bewertungsgesetz, in den auch der Bodenrichtwert einfließt (Portale aller Länder: <Link href="/bodenrichtwerte-bundeslaender" className="underline decoration-line underline-offset-4 hover:text-ink">Bodenrichtwert abrufen</Link>). Der
                liegt oft über dem, was Sie am Markt erzielen würden. Hält das Finanzamt Ihre Immobilie für zu hoch
                bewertet, können Sie einen niedrigeren Verkehrswert nachweisen (§ 198 BewG). Wie das funktioniert und
                wann es sich lohnt, steht im Ratgeber{" "}
                <Link href="/ratgeber/immobilie-geerbt-wert-ermitteln" className="underline decoration-line underline-offset-4 hover:text-ink">
                  Immobilie geerbt: Wie das Finanzamt den Wert ermittelt
                </Link>
                . Eine erste Einschätzung des Marktwerts liefert der{" "}
                <Link href="/immobilienbewertung" className="underline decoration-line underline-offset-4 hover:text-ink">
                  kostenlose Immobilienbewertungs-Rechner
                </Link>
                .
              </p>
              <p>
                Gehört die Immobilie mehreren Erben, gelten weitere Regeln: Wie die{" "}
                <Link href="/ratgeber/erbengemeinschaft-immobilie-verkaufen" className="underline decoration-line underline-offset-4 hover:text-ink">
                  Erbengemeinschaft
                </Link>{" "}
                verkauft und was bei Uneinigkeit droht, erklärt ein eigener Beitrag. Die Grunderwerbsteuer fällt beim
                Erben nicht an; wer die Immobilie von einem Miterben kauft, findet die Sätze im{" "}
                <Link href="/grunderwerbsteuer-rechner" className="underline decoration-line underline-offset-4 hover:text-ink">
                  Grunderwerbsteuer-Rechner
                </Link>
                .
              </p>
            </section>

            <section className="mt-16 space-y-4 text-ink-soft/90">
              <SectionH2>Häufige Fragen zur Erbschaftsteuer bei Immobilien</SectionH2>
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
              <h2 className="font-display text-xl font-medium text-ink">Wissen, was das geerbte Haus wert ist</h2>
              <p className="mt-3 text-sm text-ink-soft/90">
                Für Steuer, Erbauseinandersetzung und Verkauf brauchen Sie eine realistische Wertvorstellung. Die
                kostenlose Ersteinschätzung dauert wenige Minuten.
              </p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                <Link href="/immobilienbewertung" className="inline-flex rounded-full bg-ink px-5 py-2.5 text-paper hover:bg-ink-soft">
                  Immobilie kostenlos bewerten
                </Link>
                <Link href="/ratgeber" className="inline-flex rounded-full border border-line px-5 py-2.5 text-ink hover:border-ink">
                  Zum Ratgeber
                </Link>
              </div>
              <p className="mt-6 text-xs text-ink-soft/80">
                Quellen:{" "}
                <a
                  href="https://www.gesetze-im-internet.de/erbstg_1974/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-line underline-offset-4 hover:text-ink"
                >
                  Erbschaftsteuer- und Schenkungsteuergesetz (ErbStG)
                </a>
                . Datenstand: {dateDe(ERBSCHAFTSTEUER_STAND_ISO)}. Keine Steuer- oder Rechtsberatung.
              </p>
            </section>
          </Container>
        </article>
      </main>
    </>
  );
}
