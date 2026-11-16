import Link from "next/link";
import { Container } from "@/components/ui/container";
import { breadcrumbJsonLd, faqJsonLd, personJsonLd } from "@/lib/structured-data";
import { siteConfig } from "@/lib/site-config";

type SalePageKind = "house" | "apartment";

const content = {
  house: {
    path: "/haus-verkaufen-aalen",
    breadcrumb: "Haus verkaufen in Aalen",
    serviceName: "Hausverkauf in Aalen",
    eyebrow: "Hausverkauf · Aalen und Stadtbezirke",
    heading: "Haus verkaufen in Aalen: Wert, Unterlagen und Mikrolage sauber einordnen",
    intro:
      "Zwischen Kernstadt, Wasseralfingen, Unterkochen und den ländlicheren Teilorten unterscheiden sich Grundstücke, Gebäudebestand und Nachfrage. Ein belastbarer Angebotspreis braucht deshalb mehr als einen stadtweiten Durchschnittswert.",
    cta: "Hauswert kostenlos einschätzen",
    asideTitle: "Vor dem Verkaufsstart klären",
    asideItems: [
      "Welche Modernisierungen sind belegt?",
      "Sind Wohnfläche, Grundrisse und Genehmigungen vollständig?",
      "Welche Besonderheiten hat Grundstück oder Mikrolage?",
      "Welcher Verkaufspreis ist für Käufer finanzierbar?",
    ],
    documentTitle: "Unterlagen-Checkliste für den Hausverkauf",
    documents: [
      ["Eigentum", "aktueller Grundbuchauszug, Flurkarte und gegebenenfalls Erbnachweis"],
      ["Gebäude", "Grundrisse, Wohnflächenberechnung, Baubeschreibung und Baugenehmigungen"],
      ["Energie", "gültiger Energieausweis sowie Angaben zu Heizung, Fenstern und Dämmung"],
      ["Modernisierung", "Rechnungen oder eine Liste mit Jahr und Umfang der Arbeiten"],
      ["Grundstück", "Erschließung, Baulasten, Rechte, Stellplätze und Nebengebäude"],
    ],
    priceTitle: "Was den Hauspreis in Aalen besonders beeinflusst",
    priceFactors: [
      ["Mikrolage", "Kernstadt, Weststadt, Wasseralfingen, Unterkochen und kleinere Teilorte sind nicht pauschal vergleichbar."],
      ["Grundstück", "Größe, Zuschnitt, Zufahrt, Bebaubarkeit und Bodenrichtwert wirken direkt auf die Einordnung."],
      ["Gebäude", "Baujahr, Restnutzungsdauer, Energiezustand, Wohnfläche und Modernisierungen bestimmen die Zielgruppe."],
    ],
    faqs: [
      {
        question: "Was ist der erste Schritt beim Hausverkauf in Aalen?",
        answer:
          "Starten Sie mit einer realistischen Wertspanne und einer Bestandsaufnahme der Unterlagen. Danach werden Zustand, Grundstück und die konkrete Lage in Aalen eingeordnet, bevor ein Angebotspreis festgelegt wird.",
      },
      {
        question: "Welche Unterlagen brauche ich für den Verkauf eines Hauses?",
        answer:
          "Typischerweise werden Grundbuchauszug, Flurkarte, Grundrisse, Wohnflächenberechnung, Baubeschreibung und Energieausweis benötigt. Je nach Objekt kommen Genehmigungen, Modernisierungsnachweise sowie Angaben zu Rechten und Belastungen hinzu.",
      },
      {
        question: "Soll ich mein Haus vor dem Verkauf renovieren?",
        answer:
          "Nicht automatisch. Kleine sichtbare Mängel und fehlende Unterlagen lassen sich oft sinnvoll beheben. Eine größere Modernisierung sollte nur erfolgen, wenn der wahrscheinliche Mehrerlös die Kosten und das Zeitrisiko rechtfertigt.",
      },
      {
        question: "Ist die kostenlose Bewertung ein Verkehrswertgutachten?",
        answer:
          "Nein. Die Online-Bewertung liefert eine unverbindliche erste Wertspanne. Für gerichtliche oder steuerliche Zwecke kann ein Gutachten eines qualifizierten Sachverständigen erforderlich sein.",
      },
    ],
  },
  apartment: {
    path: "/wohnung-verkaufen-aalen",
    breadcrumb: "Wohnung verkaufen in Aalen",
    serviceName: "Wohnungsverkauf in Aalen",
    eyebrow: "Wohnungsverkauf · Aalen und Stadtbezirke",
    heading: "Wohnung verkaufen in Aalen: Wert und WEG-Unterlagen nachvollziehbar vorbereiten",
    intro:
      "Bei einer Eigentumswohnung prüfen Käufer nicht nur Lage und Räume, sondern auch die gesamte Wohnanlage. Hausgeld, Rücklage, Beschlüsse und geplante Sanierungen gehören deshalb vor dem ersten Besichtigungstermin auf den Tisch.",
    cta: "Wohnungswert kostenlos einschätzen",
    asideTitle: "Vor der Vermarktung klären",
    asideItems: [
      "Wie hoch sind Hausgeld und Erhaltungsrücklage?",
      "Welche Maßnahmen hat die WEG beschlossen?",
      "Ist die Wohnung frei oder vermietet?",
      "Gibt es Stellplatz, Keller oder Sondernutzungsrechte?",
    ],
    documentTitle: "Unterlagen-Checkliste für die Eigentumswohnung",
    documents: [
      ["Rechtliche Grundlage", "Grundbuchauszug, Teilungserklärung und Aufteilungsplan"],
      ["Wohnungseigentümergemeinschaft", "Protokolle, Beschlusssammlung, Wirtschaftsplan und Hausgeldabrechnung"],
      ["Gebäude", "Energieausweis, Grundriss, Wohnflächenangabe und Modernisierungsnachweise"],
      ["Finanzen", "Hausgeld, Erhaltungsrücklage, Sonderumlagen und geplante Maßnahmen"],
      ["Bei Vermietung", "Mietvertrag, Miethöhe, Nebenkostenabrechnung und Kautionsnachweis"],
    ],
    priceTitle: "Was den Wohnungspreis in Aalen besonders beeinflusst",
    priceFactors: [
      ["Wohnung", "Wohnfläche, Grundriss, Etage, Balkon, Stellplatz, Ausstattung und Zustand."],
      ["Wohnanlage", "Baujahr, Energiezustand, Aufzug, Gemeinschaftseigentum und anstehende Sanierungen."],
      ["Markt", "Mikrolage, Vergleichsangebote, Vermietung und die Nachfrage von Eigennutzern oder Kapitalanlegern."],
    ],
    faqs: [
      {
        question: "Welche WEG-Unterlagen brauche ich beim Wohnungsverkauf?",
        answer:
          "Wichtig sind Teilungserklärung und Aufteilungsplan, Wirtschaftsplan, aktuelle Hausgeldabrechnung, Protokolle der Eigentümerversammlungen und Angaben zur Erhaltungsrücklage. Hinzu kommen Grundbuchauszug, Grundriss, Wohnflächenangabe und Energieausweis.",
      },
      {
        question: "Kann ich eine vermietete Wohnung in Aalen verkaufen?",
        answer:
          "Ja. Der Mietvertrag bleibt grundsätzlich bestehen. Käufer benötigen deshalb klare Angaben zu Mietvertrag, Miethöhe, Nebenkosten, Kaution und bisherigen Anpassungen. Eine vermietete Wohnung richtet sich meist stärker an Kapitalanleger.",
      },
      {
        question: "Was beeinflusst den Wert einer Wohnung in Aalen?",
        answer:
          "Neben Lage und Wohnfläche zählen Etage, Aufzug, Balkon, Stellplatz, Grundriss, Zustand und Energieeffizienz. Auch Hausgeld, Rücklage, beschlossene Sanierungen und der Zustand des Gemeinschaftseigentums wirken auf die Kaufentscheidung.",
      },
      {
        question: "Ist die erste Bewertung kostenlos?",
        answer:
          "Ja. Die Online-Ersteinschätzung ist kostenlos und unverbindlich. Sie liefert eine Wertspanne und ersetzt kein gerichtsfestes Verkehrswertgutachten.",
      },
    ],
  },
} as const;

export function AalenSalePage({ kind }: { kind: SalePageKind }) {
  const page = content[kind];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Start", url: "/" },
              { name: "Immobilie verkaufen", url: "/immobilie-verkaufen" },
              { name: page.breadcrumb, url: page.path },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd([...page.faqs])) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: page.serviceName,
            serviceType: "Immobilienbewertung und Verkaufsvorbereitung",
            url: `${siteConfig.url}${page.path}`,
            provider: personJsonLd(),
            areaServed: { "@type": "City", name: "Aalen" },
          }),
        }}
      />

      <main>
        <section className="py-20 md:py-28">
          <Container className="grid gap-12 md:grid-cols-[1.15fr_0.85fr]">
            <div>
              <p className="text-sm font-medium text-ink-soft">{page.eyebrow}</p>
              <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.1] font-medium text-ink md:text-5xl">
                {page.heading}
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-ink-soft/90">{page.intro}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/immobilienbewertung-aalen" className="btn btn-primary">
                  {page.cta}
                </Link>
                <Link href="/kontakt" className="btn btn-secondary">
                  Verkauf besprechen
                </Link>
              </div>
            </div>
            <aside className="border border-line bg-paper-dim p-6 md:p-8">
              <h2 className="font-display text-2xl font-medium">{page.asideTitle}</h2>
              <ul className="mt-5 list-disc space-y-3 pl-5 text-ink-soft/90">
                {page.asideItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-ink-soft">
                Sie sprechen direkt mit {siteConfig.operator.name}. Die Erlaubnis nach § 34c GewO liegt vor.
              </p>
            </aside>
          </Container>
        </section>

        <section className="border-t border-line py-16 md:py-20">
          <Container>
            <h2 className="font-display text-3xl font-medium">{page.documentTitle}</h2>
            <p className="mt-4 max-w-3xl text-ink-soft/90">
              Vollständige Unterlagen verkürzen Rückfragen und helfen Interessenten, Finanzierung und Kaufentscheidung belastbar vorzubereiten.
            </p>
            <div className="mt-8 overflow-x-auto border border-line">
              <table className="w-full min-w-[680px] text-left">
                <thead className="bg-paper-dim">
                  <tr>
                    <th className="p-4 font-medium">Bereich</th>
                    <th className="p-4 font-medium">Vorbereiten</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {page.documents.map(([area, items]) => (
                    <tr key={area}>
                      <td className="p-4 font-medium">{area}</td>
                      <td className="p-4 text-ink-soft/90">{items}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-5 text-sm text-ink-soft">
              Die ausführliche Liste finden Sie unter{" "}
              <Link href="/unterlagen-einreichen" className="underline">
                Unterlagen einreichen
              </Link>
              .
            </p>
          </Container>
        </section>

        <section className="border-t border-line py-16 md:py-20">
          <Container>
            <h2 className="font-display text-3xl font-medium">{page.priceTitle}</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {page.priceFactors.map(([title, text]) => (
                <div key={title} className="border border-line p-6">
                  <h3 className="font-display text-xl font-medium">{title}</h3>
                  <p className="mt-3 text-ink-soft/90">{text}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 max-w-3xl border border-line bg-paper-dim p-6 text-sm text-ink-soft/90">
              <h3 className="font-display text-lg font-medium text-ink">Lokale Marktdaten statt pauschaler Deutschlandwerte</h3>
              <p className="mt-3">
                Der Gutachterausschuss Aalen-Essingen wertet die örtliche Kaufpreissammlung aus. Die Stadt veröffentlicht außerdem
                Bodenrichtwerte und Marktdaten für Kernstadt, Weststadt, Wasseralfingen, Unterkochen und kleinere Teilorte. Diese Daten
                sind ein wichtiger Rahmen, ersetzen aber nicht die Prüfung der einzelnen Immobilie.
              </p>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                <a href="https://www.aalen.de/grundstuecksmarktbericht.6362.htm" className="underline" rel="noreferrer">
                  Grundstücksmarktbericht der Stadt Aalen
                </a>
                <a href="https://www.aalen.de/bodenrichtwerte.27402.25.htm" className="underline" rel="noreferrer">
                  Bodenrichtwerte der Stadt Aalen
                </a>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm">
              <Link href="/immobilienbewertung-aalen" className="underline">
                Immobilienbewertung in Aalen
              </Link>
              <Link href="/verkaufskosten-rechner" className="underline">
                Verkaufskosten berechnen
              </Link>
              <Link href="/immobilie-verkaufen" className="underline">
                Verkaufsablauf ansehen
              </Link>
            </div>
          </Container>
        </section>

        <section className="border-t border-line py-16 md:py-20">
          <Container className="max-w-4xl">
            <h2 className="font-display text-3xl font-medium">Häufige Fragen</h2>
            <div className="mt-8 divide-y divide-line border-y border-line">
              {page.faqs.map((faq) => (
                <div key={faq.question} className="py-6">
                  <h3 className="font-display text-lg font-medium">{faq.question}</h3>
                  <p className="mt-2 text-ink-soft/90">{faq.answer}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
