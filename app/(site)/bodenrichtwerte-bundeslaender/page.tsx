import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionH2 } from "@/components/calculators/content";
import { PORTALE_STAND, PORTALE_STAND_ISO, borisD, bodenrichtwertPortale } from "@/lib/bodenrichtwert-portale";
import { siteConfig } from "@/lib/site-config";
import { breadcrumbJsonLd, faqJsonLd, personJsonLd } from "@/lib/structured-data";

const PATH = "/bodenrichtwerte-bundeslaender";

export const metadata: Metadata = {
  title: "Bodenrichtwert abrufen: alle 16 Bundesländer",
  description:
    "Bodenrichtwert online finden: die amtlichen Portale aller 16 Bundesländer mit Direktlink, Anleitung und Hinweisen zu Stichtag und Aussagekraft.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Bodenrichtwert abrufen: Portale aller Bundesländer",
    description: "Alle amtlichen Bodenrichtwert-Portale im Überblick, mit Anleitung und Tipps.",
    url: PATH,
    type: "website",
  },
};

const dateDe = (iso: string) =>
  new Intl.DateTimeFormat("de-DE", { dateStyle: "long" }).format(new Date(`${iso}T12:00:00Z`));

const faqs = [
  {
    question: "Wo finde ich den Bodenrichtwert für mein Grundstück?",
    answer:
      "In dem amtlichen Bodenrichtwert-Portal Ihres Bundeslandes: Sie geben Adresse oder Flurstück ein und sehen auf der Karte die Richtwertzone samt Wert in Euro pro Quadratmeter. Länderübergreifend gibt es zusätzlich das Portal BORIS-D. Die Adressen aller Länderportale finden Sie in der Übersicht oben.",
  },
  {
    question: "Ist die Abfrage kostenlos?",
    answer:
      "Die Einsicht in die Karten ist in allen Bundesländern kostenlos, meist ohne Anmeldung. Kostenpflichtig können schriftliche, beglaubigte Auskünfte der Gutachterausschüsse sein. Für Steuer oder Bank braucht man sie nur selten.",
  },
  {
    question: "Was sagt der Bodenrichtwert aus?",
    answer:
      "Er ist der durchschnittliche Lagewert für den Boden einer Zone, ausgedrückt in Euro pro Quadratmeter und bezogen auf ein unbebautes, erschließungsbeitragsfreies Grundstück (§ 196 BauGB). Er ist kein Preis für Ihr konkretes Grundstück: Zuschnitt, Größe, Bebaubarkeit und Lage innerhalb der Zone können den Wert nach oben oder unten verschieben.",
  },
  {
    question: "Wie oft werden Bodenrichtwerte aktualisiert?",
    answer:
      "Das regeln die Länder unterschiedlich. In Niedersachsen werden sie in der Regel jährlich zum 1. Januar ermittelt, in Sachsen-Anhalt, dem Saarland, Schleswig-Holstein und Thüringen alle zwei Jahre. Im Portal steht immer der Stichtag der angezeigten Werte; achten Sie darauf, dass er aktuell ist.",
  },
  {
    question: "Wie hängt der Bodenrichtwert mit dem Wert meines Hauses zusammen?",
    answer:
      "Der Wert eines bebauten Grundstücks setzt sich aus Bodenwert und Wert der Gebäude zusammen. Der Bodenwert ist grob Grundstücksfläche mal Bodenrichtwert, bereinigt um Besonderheiten. Bei Häusern in guter Lage trägt der Boden einen großen Teil des Wertes, bei Wohnungen einen kleinen Anteil. Für eine schnelle Einschätzung des Gesamtwertes gibt es den kostenlosen Immobilienwert-Rechner.",
  },
  {
    question: "Kann ich den Bodenrichtwert für die Erbschaftsteuer nutzen?",
    answer:
      "Das Finanzamt bewertet ein Grundstück nach dem Bewertungsgesetz und zieht dafür Bodenrichtwerte heran. Sie können den Wert im Portal selbst nachsehen, um die Größenordnung zu prüfen. Ob der Ansatz des Finanzamts zu hoch ist, erklärt der Ratgeber zur geerbten Immobilie.",
  },
];

export default function BodenrichtwertePage() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Amtliche Bodenrichtwert-Portale der Bundesländer",
    itemListElement: bodenrichtwertPortale.map((portal, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `${portal.state}: ${portal.portal}`,
      url: portal.url,
    })),
  };

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Bodenrichtwert abrufen: alle 16 Bundesländer",
    description: "Übersicht der amtlichen Bodenrichtwert-Portale aller Bundesländer mit Anleitung.",
    url: `${siteConfig.url}${PATH}`,
    dateModified: PORTALE_STAND_ISO,
    inLanguage: "de-DE",
    isPartOf: { "@type": "WebSite", name: siteConfig.name, url: siteConfig.url },
    author: personJsonLd(),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Start", url: "/" },
              { name: "Ratgeber", url: "/ratgeber" },
              { name: "Bodenrichtwerte der Bundesländer", url: PATH },
            ])
          ),
        }}
      />

      <main>
        <article className="py-20 md:py-28">
          <Container className="max-w-4xl">
            <p className="text-xs font-medium tracking-[0.2em] text-accent uppercase">Wegweiser</p>
            <h1 className="mt-3 font-display text-3xl leading-[1.15] font-medium text-ink md:text-4xl">
              Bodenrichtwert abrufen: die Portale aller 16 Bundesländer
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-ink-soft/90">
              Jedes Bundesland betreibt ein eigenes, kostenloses Portal für Bodenrichtwerte. Hier finden Sie alle
              Direktlinks, so wie sie im {PORTALE_STAND} erreichbar waren, und eine kurze Anleitung.
            </p>

            <section className="mt-12 space-y-4 text-ink-soft/90">
              <SectionH2>So finden Sie Ihren Bodenrichtwert</SectionH2>
              <ol className="list-decimal space-y-2 pl-5">
                <li>Öffnen Sie unten das Portal des Bundeslandes, in dem Ihr Grundstück liegt.</li>
                <li>Geben Sie Adresse oder Flurstück ein oder suchen Sie den Ort auf der Karte.</li>
                <li>Klicken Sie auf Ihre Richtwertzone: Angezeigt werden der Wert in Euro pro Quadratmeter, der Stichtag und meist Angaben zur Nutzungsart.</li>
                <li>Prüfen Sie den Stichtag und speichern Sie einen Auszug (PDF), wenn Sie ihn für Bank, Erbe oder Verkauf brauchen.</li>
              </ol>
              <p>
                Was der Wert bedeutet und was er nicht bedeutet, erklärt der Ratgeber{" "}
                <Link href="/ratgeber/bodenrichtwert-erklaert" className="underline decoration-line underline-offset-4 hover:text-ink">
                  Bodenrichtwert erklärt
                </Link>
                .
              </p>
            </section>

            <section className="mt-16">
              <SectionH2>Die Portale der Bundesländer</SectionH2>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {bodenrichtwertPortale.map((portal) => (
                  <li key={portal.code} className="rounded-2xl border border-line p-5">
                    <h3 className="font-display text-lg font-medium text-ink">{portal.state}</h3>
                    <p className="mt-1 text-sm text-ink-soft/90">{portal.portal}</p>
                    {portal.note ? <p className="mt-2 text-xs text-ink-soft/70">{portal.note}</p> : null}
                    <a
                      href={portal.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block text-sm text-ink underline decoration-line underline-offset-4 hover:decoration-ink"
                    >
                      Zum Portal →
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-ink-soft/80">
                Länderübergreifend gibt es außerdem{" "}
                <a
                  href={borisD.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-line underline-offset-4 hover:text-ink"
                >
                  {borisD.name}
                </a>
                , ein Gemeinschaftsprojekt mehrerer Bundesländer. Die Länderportale bieten oft mehr Details, etwa zur
                Geschossflächenzahl oder zum Stichtag. Stand der Links: {dateDe(PORTALE_STAND_ISO)}.
              </p>
            </section>

            <section className="mt-16 space-y-4 text-ink-soft/90">
              <SectionH2>Vom Bodenrichtwert zum Wert Ihrer Immobilie</SectionH2>
              <p>
                Ein Beispiel zur Größenordnung: Bei einem Grundstück von 600 Quadratmetern und einem angenommenen
                Bodenrichtwert von 320 Euro pro Quadratmeter beträgt der Bodenwert rund 192.000 Euro. Dazu kommt der Wert
                des Gebäudes, der von Baujahr, Zustand, Energieeffizienz und Ausstattung abhängt. Die Zahl im Beispiel
                ist frei gewählt und steht nicht für einen bestimmten Ort.
              </p>
              <p>
                Für eine erste Einschätzung des Gesamtwerts nutzen Sie den kostenlosen{" "}
                <Link href="/immobilienbewertung" className="underline decoration-line underline-offset-4 hover:text-ink">
                  Immobilienwert-Rechner
                </Link>
                ; wie er rechnet, steht offen unter{" "}
                <Link href="/wie-wir-rechnen" className="underline decoration-line underline-offset-4 hover:text-ink">
                  So rechnen wir
                </Link>
                . Die Preisniveaus der Region sehen Sie unter{" "}
                <Link href="/immobilienpreise-ostwuerttemberg" className="underline decoration-line underline-offset-4 hover:text-ink">
                  Immobilienpreise in Ostwürttemberg
                </Link>
                . Für Baden-Württemberg ist die Adresse{" "}
                <a
                  href="https://www.gutachterausschuesse-bw.de/borisbw/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-line underline-offset-4 hover:text-ink"
                >
                  BORIS-BW
                </a>
                .
              </p>
            </section>

            <section className="mt-16 space-y-4 text-ink-soft/90">
              <SectionH2>Häufige Fragen zu Bodenrichtwerten</SectionH2>
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
              <h2 className="font-display text-xl font-medium text-ink">Was ist Ihre Immobilie wert?</h2>
              <p className="mt-3 text-sm text-ink-soft/90">
                Der Bodenrichtwert ist nur ein Baustein. Die kostenlose Ersteinschätzung berücksichtigt Lage, Baujahr,
                Zustand und Energieklasse.
              </p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                <Link href="/immobilienbewertung" className="inline-flex rounded-full bg-ink px-5 py-2.5 text-paper hover:bg-ink-soft">
                  Immobilie kostenlos bewerten
                </Link>
                <Link href="/ratgeber/bodenrichtwert-erklaert" className="inline-flex rounded-full border border-line px-5 py-2.5 text-ink hover:border-ink">
                  Bodenrichtwert erklärt
                </Link>
              </div>
            </section>
          </Container>
        </article>
      </main>
    </>
  );
}
