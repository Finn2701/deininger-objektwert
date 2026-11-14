import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { breadcrumbJsonLd, faqJsonLd, personJsonLd } from "@/lib/structured-data";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Haus verkaufen in Heidenheim: Ablauf, Unterlagen & Bewertung",
  description:
    "Haus in Heidenheim verkaufen: kostenlose Wertspanne, vollständige Unterlagen-Checkliste und klarer Ablauf von der Vorbereitung bis zum Notartermin.",
  alternates: { canonical: "/haus-verkaufen-heidenheim" },
};

const checklist = [
  ["Eigentum", "aktueller Grundbuchauszug, Flurkarte und gegebenenfalls Erbnachweis"],
  ["Gebäude", "Grundrisse, Wohnflächenberechnung, Baubeschreibung und Baugenehmigungen"],
  ["Energie", "gültiger Energieausweis und Angaben zu Heizung, Fenstern und Dämmung"],
  ["Modernisierung", "Rechnungen oder eine Liste mit Jahr und Umfang der Arbeiten"],
  ["Laufende Kosten", "Grundsteuer, Versicherungen und bei Vermietung der Mietvertrag"],
] as const;

const faqs = [
  {
    question: "Was ist der erste Schritt beim Hausverkauf in Heidenheim?",
    answer:
      "Am Anfang stehen eine realistische Preiseinschätzung und die Sichtung der Unterlagen. Die kostenlose Online-Bewertung liefert eine erste Wertspanne; Zustand, Mikrolage und Besonderheiten des Grundstücks werden anschließend persönlich eingeordnet.",
  },
  {
    question: "Welche Unterlagen brauche ich für den Verkauf eines Hauses?",
    answer:
      "Typischerweise werden Grundbuchauszug, Flurkarte, Grundrisse, Wohnflächenberechnung, Baubeschreibung und Energieausweis benötigt. Je nach Objekt kommen Baugenehmigungen, Modernisierungsnachweise, Mietverträge oder Unterlagen zu Rechten und Belastungen hinzu.",
  },
  {
    question: "Muss ich vor dem Verkauf renovieren?",
    answer:
      "Nicht automatisch. Kleine sichtbare Mängel und fehlende Unterlagen lassen sich oft sinnvoller beheben als eine teure Komplettmodernisierung. Entscheidend ist, Kosten und voraussichtlichen Mehrerlös vorab gegeneinander abzuwägen.",
  },
  {
    question: "Ist die Online-Bewertung ein Verkehrswertgutachten?",
    answer:
      "Nein. Sie ist eine kostenlose, unverbindliche Ersteinschätzung als Wertspanne. Für gerichtliche oder steuerliche Zwecke kann ein Gutachten eines qualifizierten Sachverständigen erforderlich sein.",
  },
];

export default function HausVerkaufenHeidenheimPage() {
  const path = "/haus-verkaufen-heidenheim";
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([
        { name: "Start", url: "/" },
        { name: "Immobilie verkaufen", url: "/immobilie-verkaufen" },
        { name: "Haus verkaufen in Heidenheim", url: path },
      ])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Hausverkauf in Heidenheim an der Brenz",
        serviceType: "Immobilienvermittlung und Verkaufsbegleitung",
        url: `${siteConfig.url}${path}`,
        provider: personJsonLd(),
        areaServed: { "@type": "City", name: "Heidenheim an der Brenz" },
      }) }} />

      <main>
        <section className="py-20 md:py-28">
          <Container className="grid gap-12 md:grid-cols-[1.15fr_0.85fr]">
            <div>
              <p className="text-sm font-medium text-ink-soft">Immobilienverkauf · Heidenheim an der Brenz</p>
              <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.1] font-medium text-ink md:text-5xl">
                Haus verkaufen in Heidenheim: mit belastbarem Preis und vollständigen Unterlagen
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-ink-soft/90">
                Ein guter Verkauf beginnt vor dem Inserat. Entscheidend sind ein nachvollziehbarer Angebotspreis,
                vollständige Objektunterlagen und ein Ablauf, der Interessenten früh die richtigen Antworten gibt.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/immobilienbewertung-heidenheim" className="btn btn-primary">Hauswert kostenlos einschätzen</Link>
                <Link href="/kontakt" className="btn btn-secondary">Verkauf besprechen</Link>
              </div>
            </div>
            <aside className="border border-line bg-paper-dim p-6 md:p-8">
              <h2 className="font-display text-2xl font-medium">Ihr nächster sinnvoller Schritt</h2>
              <ol className="mt-5 list-decimal space-y-3 pl-5 text-ink-soft/90">
                <li>Kostenlose Wertspanne berechnen.</li>
                <li>Vorhandene Unterlagen zusammentragen.</li>
                <li>Offene Punkte und Verkaufsziel persönlich klären.</li>
              </ol>
              <p className="mt-6 text-sm text-ink-soft">
                Sie sprechen direkt mit {siteConfig.operator.name}, zugelassener Immobilienmakler nach § 34c GewO.
              </p>
            </aside>
          </Container>
        </section>

        <section className="border-t border-line py-16 md:py-20">
          <Container>
            <h2 className="font-display text-3xl font-medium">Unterlagen-Checkliste für den Hausverkauf</h2>
            <p className="mt-4 max-w-3xl text-ink-soft/90">
              Je früher die Unterlagen vollständig sind, desto schneller lassen sich Rückfragen, Finanzierung und Notarvorbereitung bearbeiten.
            </p>
            <div className="mt-8 overflow-x-auto border border-line">
              <table className="w-full min-w-[640px] text-left">
                <thead className="bg-paper-dim"><tr><th className="p-4 font-medium">Bereich</th><th className="p-4 font-medium">Typische Unterlagen</th></tr></thead>
                <tbody className="divide-y divide-line">
                  {checklist.map(([area, documents]) => <tr key={area}><td className="p-4 font-medium">{area}</td><td className="p-4 text-ink-soft/90">{documents}</td></tr>)}
                </tbody>
              </table>
            </div>
            <p className="mt-5 text-sm text-ink-soft">
              Die ausführliche Liste finden Sie unter <Link href="/unterlagen-einreichen" className="underline">Unterlagen einreichen</Link>.
            </p>
          </Container>
        </section>

        <section className="border-t border-line py-16 md:py-20">
          <Container>
            <h2 className="font-display text-3xl font-medium">Ablauf: vom Wert bis zum Notartermin</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                ["1", "Preis festlegen", "Wertspanne, Zustand, Grundstück, Mikrolage und aktuelle Nachfrage zusammenführen."],
                ["2", "Verkauf vorbereiten", "Unterlagen prüfen, offene Angaben klären und die Immobilie nachvollziehbar darstellen."],
                ["3", "Interessenten prüfen", "Anfragen strukturieren, Besichtigungen koordinieren und Finanzierung belegen lassen."],
                ["4", "Vertrag abschließen", "Kaufvertragsentwurf abstimmen, Notartermin begleiten und Übergabe dokumentieren."],
              ].map(([n, title, text]) => (
                <div key={n} className="border border-line p-6"><p className="text-sm font-bold text-accent-text">{n}</p><h3 className="mt-3 font-display text-xl font-medium">{title}</h3><p className="mt-3 text-sm text-ink-soft/90">{text}</p></div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm">
              <Link href="/immobilienbewertung-heidenheim" className="underline">Immobilienbewertung in Heidenheim</Link>
              <Link href="/verkaufskosten-rechner" className="underline">Verkaufskosten berechnen</Link>
              <Link href="/immobilie-verkaufen" className="underline">Gesamten Verkaufsprozess ansehen</Link>
            </div>
          </Container>
        </section>

        <section className="border-t border-line py-16 md:py-20">
          <Container className="max-w-4xl">
            <h2 className="font-display text-3xl font-medium">Häufige Fragen</h2>
            <div className="mt-8 divide-y divide-line border-y border-line">
              {faqs.map((faq) => <div key={faq.question} className="py-6"><h3 className="font-display text-lg font-medium">{faq.question}</h3><p className="mt-2 text-ink-soft/90">{faq.answer}</p></div>)}
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
