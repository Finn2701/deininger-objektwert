import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { DataTable, SectionH2 } from "@/components/calculators/content";
import { KaufnebenkostenCalculator } from "@/components/calculators/kaufnebenkosten-calculator";
import {
  KAUFNEBENKOSTEN_STAND,
  KAUFNEBENKOSTEN_STAND_ISO,
  formatEuroExact,
  formatPercent,
  stateRates,
} from "@/lib/kaufnebenkosten";
import { breadcrumbJsonLd, faqJsonLd, webApplicationJsonLd } from "@/lib/structured-data";

const PATH = "/grunderwerbsteuer-rechner";

export const metadata: Metadata = {
  title: "Grunderwerbsteuer-Rechner 2026",
  description:
    "Grunderwerbsteuer berechnen: aktuelle Steuersätze aller 16 Bundesländer (3,5 bis 6,5 %), Freibeträge, Ausnahmen und Fälligkeit – mit Rechner und Tabelle.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Grunderwerbsteuer-Rechner 2026 – alle Bundesländer",
    description: "Steuersätze, Ausnahmen und Beispielrechnung zur Grunderwerbsteuer in allen 16 Bundesländern.",
    url: PATH,
    type: "website",
  },
};

const faqs = [
  {
    question: "Wie hoch ist die Grunderwerbsteuer 2026?",
    answer:
      "Sie hängt vom Bundesland ab und liegt zwischen 3,5 % (Bayern) und 6,5 % (Brandenburg, Nordrhein-Westfalen, Saarland, Schleswig-Holstein). Baden-Württemberg, Niedersachsen, Rheinland-Pfalz, Sachsen-Anhalt und Thüringen verlangen 5,0 %, Bremen, Hamburg und Sachsen 5,5 %, Berlin, Hessen und Mecklenburg-Vorpommern 6,0 %.",
  },
  {
    question: "Wer muss die Grunderwerbsteuer zahlen?",
    answer:
      "Gesetzlich sind Käufer und Verkäufer Steuerschuldner. Im Kaufvertrag wird die Zahlung aber in der Regel dem Käufer auferlegt, und das Finanzamt wendet sich zuerst an ihn. Klären Sie das im Vertrag ausdrücklich, damit es keine Überraschung gibt.",
  },
  {
    question: "Wann muss die Grunderwerbsteuer bezahlt werden?",
    answer:
      "Nach der Beurkundung meldet der Notar den Kauf dem Finanzamt. Das schickt den Steuerbescheid, den Sie in der Regel innerhalb eines Monats bezahlen müssen. Erst danach stellt es die Unbedenklichkeitsbescheinigung aus, ohne die der Käufer nicht ins Grundbuch eingetragen wird.",
  },
  {
    question: "Wann fällt keine Grunderwerbsteuer an?",
    answer:
      "Befreit sind unter anderem der Erwerb durch Ehegatten und eingetragene Lebenspartner, der Erwerb durch Verwandte in gerader Linie (Eltern, Kinder, Enkel; Geschwister zählen nicht dazu), Erwerbe durch Erbschaft und Schenkung (dafür gilt ggf. die Erbschaft- und Schenkungsteuer) sowie die Übertragung im Zuge der Vermögensauseinandersetzung bei Scheidung. Außerdem entfällt die Steuer, wenn die Gegenleistung höchstens 2.500 Euro beträgt (Freigrenze).",
  },
  {
    question: "Zahle ich Grunderwerbsteuer auch auf die Einbauküche?",
    answer:
      "Nur wenn sie im Kaufpreis für die Immobilie enthalten ist. Wenn Sie mitverkauftes Inventar wie eine Einbauküche oder Möbel im Kaufvertrag getrennt und mit einem angemessenen Betrag ausweisen, gehört dieser Betrag nicht zur Bemessungsgrundlage. Das Finanzamt prüft, ob der Betrag realistisch ist.",
  },
  {
    question: "Gibt es einen Freibetrag für Erstkäufer?",
    answer:
      "Nach dem Stand von " +
      KAUFNEBENKOSTEN_STAND +
      " nicht. Ein Freibetrag für selbst genutztes Wohneigentum wird politisch diskutiert, ein Gesetz dazu ist nicht beschlossen. Maßgeblich ist immer der Satz, der am Tag des Kaufvertrags gilt.",
  },
];

const dateDe = (iso: string) =>
  new Intl.DateTimeFormat("de-DE", { dateStyle: "long" }).format(new Date(`${iso}T12:00:00Z`));

export default function GrunderwerbsteuerPage() {
  const rows = [...stateRates]
    .sort((a, b) => a.name.localeCompare(b.name, "de"))
    .map((s) => [
      s.name,
      formatPercent(s.grunderwerbsteuer),
      s.since,
      formatEuroExact((300000 * s.grunderwerbsteuer) / 100),
      formatEuroExact((500000 * s.grunderwerbsteuer) / 100),
    ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webApplicationJsonLd({
              name: "Grunderwerbsteuer-Rechner",
              description:
                "Berechnet die Grunderwerbsteuer für Haus, Wohnung und Grundstück in allen 16 Bundesländern.",
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
              { name: "Kaufnebenkosten-Rechner", url: "/kaufnebenkosten-rechner" },
              { name: "Grunderwerbsteuer-Rechner", url: PATH },
            ])
          ),
        }}
      />

      <main>
        <article className="py-20 md:py-28">
          <Container className="max-w-4xl">
            <p className="text-xs font-medium tracking-[0.2em] text-accent uppercase">Rechner</p>
            <h1 className="mt-3 font-display text-3xl leading-[1.15] font-medium text-ink md:text-4xl">
              Grunderwerbsteuer-Rechner für alle Bundesländer
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-ink-soft/90">
              Steuersätze von 3,5 bis 6,5 Prozent, Ausnahmen und Fälligkeit – Stand {KAUFNEBENKOSTEN_STAND}. Alle
              weiteren Nebenkosten finden Sie im{" "}
              <Link href="/kaufnebenkosten-rechner" className="underline decoration-line underline-offset-4 hover:text-ink">
                Kaufnebenkosten-Rechner
              </Link>
              .
            </p>

            <div className="mt-10">
              <KaufnebenkostenCalculator mode="grunderwerbsteuer" />
            </div>

            <section className="mt-16 space-y-4 text-ink-soft/90">
              <SectionH2>Steuersätze aller Bundesländer</SectionH2>
              <p>
                Die Länder legen den Satz selbst fest, seit die Steuer 2006 in ihre Hand gelegt wurde. Der Stand der
                Tabelle ist der {dateDe(KAUFNEBENKOSTEN_STAND_ISO)}; die Spalte „gilt seit“ nennt den Beginn des
                aktuellen Satzes.
              </p>
              <DataTable
                headers={["Bundesland", "Satz", "Gilt seit", "Steuer bei 300.000 €", "Steuer bei 500.000 €"]}
                rows={rows}
              />
              <p>
                Die jüngsten Änderungen: Bremen hat den Satz zum 1. Juli 2025 von 5,0 auf 5,5 % erhöht, Thüringen ihn
                zum 1. Januar 2024 von 6,5 auf 5,0 % gesenkt. Wer einen Kauf plant, sollte immer den am Tag der
                Beurkundung geltenden Satz prüfen.
              </p>
            </section>

            <section className="mt-16 space-y-4 text-ink-soft/90">
              <SectionH2>So wird die Steuer berechnet</SectionH2>
              <p>
                Bemessungsgrundlage ist die Gegenleistung, also im Normalfall der Kaufpreis einschließlich
                übernommener Lasten. Die Steuer ergibt sich aus Kaufpreis mal Steuersatz: Bei 350.000 Euro in
                Baden-Württemberg sind das 350.000 × 5,0 % = 17.500 Euro. Die Maklerprovision, die Notarkosten und die
                Grundbuchkosten gehören nicht zur Bemessungsgrundlage.
              </p>
              <p>
                Beim Neubau kann die Steuer höher ausfallen, als man erwartet: Werden Grundstückskauf und Hausbau
                rechtlich und wirtschaftlich zusammen vereinbart (zum Beispiel beim Bauträger), rechnet das Finanzamt
                den Bau in die Bemessungsgrundlage ein. Kaufen Sie dagegen ein unbebautes Grundstück und beauftragen den
                Bau getrennt, fällt die Steuer nur auf das Grundstück an. Lassen Sie sich das vor Vertragsabschluss
                vom Notar oder Steuerberater bestätigen, weil es auf die Gestaltung im Einzelfall ankommt.
              </p>
            </section>

            <section className="mt-16 space-y-4 text-ink-soft/90">
              <SectionH2>Wann keine Grunderwerbsteuer anfällt</SectionH2>
              <ul className="list-disc space-y-2 pl-5">
                <li>Erwerb durch Ehegatten oder eingetragene Lebenspartner.</li>
                <li>
                  Erwerb durch Verwandte in gerader Linie (Eltern, Kinder, Enkel). Geschwister sind nicht befreit.
                </li>
                <li>
                  Erwerb durch Erbschaft oder Schenkung – die Grunderwerbsteuer entfällt, es kann aber
                  Erbschaft- oder Schenkungsteuer anfallen.
                </li>
                <li>
                  Übertragung einer Immobilie zwischen Ehegatten im Zuge der Vermögensauseinandersetzung nach einer
                  Scheidung. Hintergründe im{" "}
                  <Link
                    href="/ratgeber/scheidungsimmobilie-haus-bei-scheidung"
                    className="underline decoration-line underline-offset-4 hover:text-ink"
                  >
                    Ratgeber zur Scheidungsimmobilie
                  </Link>
                  .
                </li>
                <li>Kaufpreis bis einschließlich 2.500 Euro (Freigrenze; wird sie überschritten, ist die gesamte Steuer fällig).</li>
              </ul>
              <p>
                Wenn Sie eine geerbte Immobilie in einer Erbengemeinschaft besitzen und auseinandersetzen wollen,
                lesen Sie den Beitrag zur{" "}
                <Link
                  href="/ratgeber/erbengemeinschaft-immobilie-verkaufen"
                  className="underline decoration-line underline-offset-4 hover:text-ink"
                >
                  Erbengemeinschaft
                </Link>
                : Die Auseinandersetzung unter Miterben ist unter Umständen ebenfalls von der Steuer befreit.
              </p>
            </section>

            <section className="mt-16 space-y-4 text-ink-soft/90">
              <SectionH2>Ulm und Neu-Ulm: derselbe Fluss, zwei Steuersätze</SectionH2>
              <p>
                In Ulm (Baden-Württemberg) beträgt die Grunderwerbsteuer 5,0 %, im bayerischen Neu-Ulm 3,5 %. Bei
                einem Kaufpreis von 400.000 Euro sind das 20.000 gegenüber 14.000 Euro. Ähnlich ist es an der Grenze
                bei Bopfingen und Nördlingen. Maßgeblich ist immer der Standort der Immobilie, nicht der Wohnort des
                Käufers. Mehr zu den Märkten vor Ort auf unseren Seiten zur{" "}
                <Link href="/immobilienbewertung-ulm" className="underline decoration-line underline-offset-4 hover:text-ink">
                  Immobilienbewertung in Ulm
                </Link>{" "}
                und in{" "}
                <Link href="/immobilienbewertung-bopfingen" className="underline decoration-line underline-offset-4 hover:text-ink">
                  Bopfingen
                </Link>
                .
              </p>
            </section>

            <section className="mt-16 space-y-4 text-ink-soft/90">
              <SectionH2>Häufige Fragen zur Grunderwerbsteuer</SectionH2>
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
              <h2 className="font-display text-xl font-medium text-ink">Sie verkaufen eine Immobilie?</h2>
              <p className="mt-3 text-sm text-ink-soft/90">
                Die Grunderwerbsteuer zahlt in der Regel der Käufer – sie beeinflusst aber, wie viel Käufer für Ihr
                Haus ausgeben können. Eine realistische Preisvorstellung ist die Basis für jeden Verkauf.
              </p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                <Link
                  href="/immobilienbewertung"
                  className="inline-flex rounded-full bg-ink px-5 py-2.5 text-paper hover:bg-ink-soft"
                >
                  Immobilie kostenlos bewerten
                </Link>
                <Link
                  href="/kaufnebenkosten-rechner"
                  className="inline-flex rounded-full border border-line px-5 py-2.5 text-ink hover:border-ink"
                >
                  Alle Kaufnebenkosten berechnen
                </Link>
              </div>
              <p className="mt-6 text-xs text-ink-soft/70">
                Quelle:{" "}
                <a
                  href="https://www.gesetze-im-internet.de/grestg_1983/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-line underline-offset-4 hover:text-ink"
                >
                  Grunderwerbsteuergesetz (GrEStG)
                </a>{" "}
                und Landesgesetze zum Steuersatz. Datenstand: {dateDe(KAUFNEBENKOSTEN_STAND_ISO)}. Keine Steuer- oder
                Rechtsberatung.
              </p>
            </section>
          </Container>
        </article>
      </main>
    </>
  );
}
