import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { breadcrumbJsonLd, faqJsonLd, personJsonLd } from "@/lib/structured-data";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Wohnung verkaufen in Heidenheim: Unterlagen, Wert & Ablauf",
  description:
    "Wohnung in Heidenheim verkaufen: Wert kostenlos einschätzen, WEG-Unterlagen vollständig vorbereiten und den Verkauf Schritt für Schritt planen.",
  alternates: { canonical: "/wohnung-verkaufen-heidenheim" },
};

const faqs = [
  {
    question: "Welche WEG-Unterlagen brauche ich beim Wohnungsverkauf?",
    answer:
      "Wichtig sind Teilungserklärung und Aufteilungsplan, Wirtschaftsplan, aktuelle Hausgeldabrechnung, Protokolle der Eigentümerversammlungen und Angaben zur Erhaltungsrücklage. Hinzu kommen Grundbuchauszug, Grundriss, Wohnflächenangabe und Energieausweis.",
  },
  {
    question: "Kann ich eine vermietete Wohnung verkaufen?",
    answer:
      "Ja. Der bestehende Mietvertrag bleibt grundsätzlich bestehen. Für Käufer sind deshalb Mietvertrag, Miethöhe, Nebenkosten, Kaution und bisherige Anpassungen besonders wichtig. Eigennutzer und Kapitalanleger bewerten eine vermietete Wohnung unterschiedlich.",
  },
  {
    question: "Was beeinflusst den Wert einer Wohnung in Heidenheim?",
    answer:
      "Neben Lage und Wohnfläche zählen Etage, Aufzug, Balkon oder Terrasse, Stellplatz, Grundriss, Zustand, Energieeffizienz sowie Hausgeld und Zustand der Wohnanlage. Auch beschlossene Sanierungen und die Höhe der Erhaltungsrücklage wirken auf die Kaufentscheidung.",
  },
  {
    question: "Ist die erste Bewertung kostenlos?",
    answer:
      "Ja. Die Online-Ersteinschätzung ist kostenlos und unverbindlich. Sie liefert eine Wertspanne und ersetzt kein gerichtsfestes Verkehrswertgutachten.",
  },
];

const documents = [
  ["Rechtliche Grundlage", "Grundbuchauszug, Teilungserklärung und Aufteilungsplan"],
  ["Wohnungseigentümergemeinschaft", "Protokolle, Beschlusssammlung, Wirtschaftsplan und Hausgeldabrechnung"],
  ["Gebäude", "Energieausweis, Grundriss, Wohnflächenangabe und Modernisierungsnachweise"],
  ["Finanzen", "Hausgeld, Erhaltungsrücklage, Sonderumlagen und geplante Maßnahmen"],
  ["Bei Vermietung", "Mietvertrag, Miethöhe, Nebenkostenabrechnung und Kautionsnachweis"],
] as const;

export default function WohnungVerkaufenHeidenheimPage() {
  const path = "/wohnung-verkaufen-heidenheim";
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([
        { name: "Start", url: "/" },
        { name: "Immobilie verkaufen", url: "/immobilie-verkaufen" },
        { name: "Wohnung verkaufen in Heidenheim", url: path },
      ])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Service", name: "Wohnungsverkauf in Heidenheim an der Brenz",
        serviceType: "Immobilienvermittlung und Verkaufsbegleitung", url: `${siteConfig.url}${path}`,
        provider: personJsonLd(), areaServed: { "@type": "City", name: "Heidenheim an der Brenz" },
      }) }} />

      <main>
        <section className="py-20 md:py-28">
          <Container className="grid gap-12 md:grid-cols-[1.15fr_0.85fr]">
            <div>
              <p className="text-sm font-medium text-ink-soft">Wohnungsverkauf · Heidenheim an der Brenz</p>
              <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.1] font-medium md:text-5xl">
                Wohnung verkaufen in Heidenheim: Wert, WEG-Unterlagen und Ablauf im Griff
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-ink-soft/90">
                Bei einer Eigentumswohnung kaufen Interessenten nicht nur die Räume, sondern einen Anteil an der gesamten Anlage.
                Vollständige WEG-Unterlagen und transparente Kosten sind deshalb genauso wichtig wie Lage und Zustand der Wohnung.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/immobilienbewertung-heidenheim" className="btn btn-primary">Wohnungswert kostenlos einschätzen</Link>
                <Link href="/kontakt" className="btn btn-secondary">Verkauf besprechen</Link>
              </div>
            </div>
            <aside className="border border-line bg-paper-dim p-6 md:p-8">
              <h2 className="font-display text-2xl font-medium">Vor der Vermarktung klären</h2>
              <ul className="mt-5 list-disc space-y-3 pl-5 text-ink-soft/90">
                <li>Welche Maßnahmen hat die WEG beschlossen?</li>
                <li>Wie hoch sind Hausgeld und Erhaltungsrücklage?</li>
                <li>Ist die Wohnung frei oder vermietet?</li>
                <li>Gibt es Stellplatz, Sondernutzungsrechte oder Keller?</li>
              </ul>
            </aside>
          </Container>
        </section>

        <section className="border-t border-line py-16 md:py-20">
          <Container>
            <h2 className="font-display text-3xl font-medium">Unterlagen-Checkliste für die Eigentumswohnung</h2>
            <div className="mt-8 overflow-x-auto border border-line">
              <table className="w-full min-w-[680px] text-left">
                <thead className="bg-paper-dim"><tr><th className="p-4 font-medium">Bereich</th><th className="p-4 font-medium">Vorbereiten</th></tr></thead>
                <tbody className="divide-y divide-line">
                  {documents.map(([area, items]) => <tr key={area}><td className="p-4 font-medium">{area}</td><td className="p-4 text-ink-soft/90">{items}</td></tr>)}
                </tbody>
              </table>
            </div>
          </Container>
        </section>

        <section className="border-t border-line py-16 md:py-20">
          <Container>
            <h2 className="font-display text-3xl font-medium">So entsteht ein nachvollziehbarer Angebotspreis</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                ["Wohnung", "Wohnfläche, Grundriss, Etage, Außenfläche, Stellplatz, Ausstattung und Zustand."],
                ["Gebäude", "Baujahr, Energiezustand, Gemeinschaftseigentum, Aufzug und anstehende Sanierungen."],
                ["Markt", "Mikrolage, vergleichbare Angebote, Nachfrage und Finanzierbarkeit für die Zielgruppe."],
              ].map(([title, text]) => <div key={title} className="border border-line p-6"><h3 className="font-display text-xl font-medium">{title}</h3><p className="mt-3 text-ink-soft/90">{text}</p></div>)}
            </div>
            <p className="mt-8 max-w-3xl text-ink-soft/90">
              Die <Link href="/immobilienbewertung-heidenheim" className="underline">Immobilienbewertung in Heidenheim</Link> gibt den regionalen Rahmen.
              Für die einzelne Wohnung braucht es zusätzlich die konkreten Objekt- und WEG-Daten.
            </p>
          </Container>
        </section>

        <section className="border-t border-line py-16 md:py-20">
          <Container className="max-w-4xl">
            <h2 className="font-display text-3xl font-medium">Häufige Fragen zum Wohnungsverkauf</h2>
            <div className="mt-8 divide-y divide-line border-y border-line">
              {faqs.map((faq) => <div key={faq.question} className="py-6"><h3 className="font-display text-lg font-medium">{faq.question}</h3><p className="mt-2 text-ink-soft/90">{faq.answer}</p></div>)}
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm">
              <Link href="/verkaufskosten-rechner" className="underline">Verkaufskosten berechnen</Link>
              <Link href="/unterlagen-einreichen" className="underline">Unterlagen einreichen</Link>
              <Link href="/immobilie-verkaufen" className="underline">Verkaufsablauf ansehen</Link>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
