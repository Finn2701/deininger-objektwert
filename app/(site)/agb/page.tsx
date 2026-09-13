import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "AGB",
  robots: { index: false, follow: true },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-10">
      <h2 className="font-display text-lg font-medium text-ink">{title}</h2>
      <div className="mt-3 space-y-3 text-ink-soft/90">{children}</div>
    </div>
  );
}

export default function AgbPage() {
  return (
    <>
      <main className="pt-32 pb-24">
        <Container className="max-w-2xl">
          <h1 className="font-display text-3xl font-medium text-ink">
            Allgemeine Geschäftsbedingungen
          </h1>
          <p className="mt-2 text-ink-soft/70">{siteConfig.name}</p>

          <p className="mt-6 rounded-lg border border-line bg-paper-dim px-4 py-3 text-sm text-ink-soft/90">
            Hinweis: Die gewerbliche gemäß § 34c GewO angezeigte Maklertätigkeit befindet sich
            derzeit in Vorbereitung. Bis zur offiziellen Aufnahme dieser Tätigkeit bietet{" "}
            {siteConfig.operator.name} ausschließlich den kostenlosen, unverbindlichen
            Online-Bewertungsrechner auf dieser Website an. Diese AGB regeln bereits jetzt den
            Rahmen für künftige Beratungs- und Vermittlungsleistungen.
          </p>

          <Section title="1. Geltungsbereich">
            <p>
              Diese Allgemeinen Geschäftsbedingungen (nachfolgend „AGB“) gelten für alle
              Geschäftsbeziehungen zwischen
            </p>
            <p>
              {siteConfig.name}
              <br />
              {siteConfig.operator.name}
              <br />
              {siteConfig.operator.street}
              <br />
              {siteConfig.operator.zipCity}
              <br />
              E-Mail:{" "}
              <a href={`mailto:${siteConfig.email}`} className="text-ink hover:text-ink-soft">
                {siteConfig.email}
              </a>
            </p>
            <p>(nachfolgend „Auftragnehmer“) und den Kunden (nachfolgend „Auftraggeber“).</p>
            <p>Die AGB gelten insbesondere für Leistungen im Bereich:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Immobilienbewertung und Immobilienanalyse</li>
              <li>Immobilienvermittlung</li>
              <li>Nachweis- und Vermittlungsleistungen</li>
              <li>Beratungsleistungen im Zusammenhang mit Immobilien</li>
            </ul>
            <p>
              Abweichende Bedingungen des Auftraggebers gelten nur, wenn diese ausdrücklich
              schriftlich bestätigt wurden.
            </p>
          </Section>

          <Section title="2. Leistungen von Deininger Objektwert">
            <p>
              {siteConfig.name} unterstützt Eigentümer und Interessenten bei der Einschätzung und
              Vermittlung von Immobilien. Die Leistungen können insbesondere umfassen:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>erste Einschätzung des Immobilienwertes</li>
              <li>Analyse relevanter Objektmerkmale</li>
              <li>Beratung zur Vorbereitung eines Verkaufs</li>
              <li>Vermittlung von Immobilien</li>
              <li>Unterstützung bei Verkaufsprozessen</li>
            </ul>
            <p>
              Der genaue Umfang der Leistung ergibt sich aus der jeweiligen Vereinbarung zwischen
              Auftragnehmer und Auftraggeber.
            </p>
          </Section>

          <Section title="3. Immobilienbewertungen">
            <p>
              Eine durch {siteConfig.name} erstellte Bewertung oder Einschätzung stellt
              grundsätzlich keine amtliche Verkehrswertermittlung gemäß gesetzlicher Vorschriften
              dar, sofern dies nicht ausdrücklich vereinbart wurde.
            </p>
            <p>Die Bewertung basiert unter anderem auf:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Angaben des Auftraggebers</li>
              <li>vorhandenen Objektinformationen</li>
              <li>Marktdaten</li>
              <li>Erfahrungswerten</li>
              <li>allgemeinen Bewertungsverfahren</li>
            </ul>
            <p>
              Die tatsächliche Marktentwicklung kann dazu führen, dass ein erzielbarer
              Verkaufspreis von der Einschätzung abweicht. Eine Garantie für einen bestimmten
              Verkaufspreis wird nicht übernommen.
            </p>
          </Section>

          <Section title="4. Mitwirkungspflichten des Auftraggebers">
            <p>
              Der Auftraggeber verpflichtet sich, alle für die Leistung erforderlichen Angaben
              vollständig und wahrheitsgemäß zur Verfügung zu stellen. Dies betrifft insbesondere:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Eigentumsverhältnisse</li>
              <li>Grundstücks- und Gebäudedaten</li>
              <li>Wohnflächenangaben</li>
              <li>Modernisierungen</li>
              <li>bekannte Mängel</li>
            </ul>
            <p>
              Für Schäden oder Verzögerungen aufgrund falscher oder unvollständiger Angaben
              übernimmt {siteConfig.name} keine Verantwortung.
            </p>
          </Section>

          <Section title="5. Zustandekommen eines Maklervertrages">
            <p>Ein Maklervertrag kommt zustande, wenn:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>der Auftraggeber ein entsprechendes Angebot annimmt, oder</li>
              <li>eine ausdrückliche Beauftragung erfolgt, oder</li>
              <li>eine individuelle Vereinbarung getroffen wird.</li>
            </ul>
            <p>
              Die bloße Nutzung der Website, insbesondere des kostenlosen Bewertungsrechners, oder
              eine unverbindliche Anfrage stellt keinen Maklervertrag dar.
            </p>
          </Section>

          <Section title="6. Maklerprovision">
            <p>
              Sofern eine provisionspflichtige Vermittlungsleistung erbracht wird, entsteht ein
              Anspruch auf Maklerprovision nur, wenn:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>ein wirksamer Maklervertrag besteht,</li>
              <li>eine Nachweis- oder Vermittlungsleistung erfolgt,</li>
              <li>aufgrund dieser Tätigkeit ein Hauptvertrag (z. B. Kaufvertrag) zustande kommt.</li>
            </ul>
            <p>
              Die Höhe der Provision richtet sich nach der individuellen Vereinbarung sowie den
              gesetzlichen Vorschriften.
            </p>
          </Section>

          <Section title="7. Haftung">
            <p>
              {siteConfig.name} haftet für Schäden nur bei Vorsatz und grober Fahrlässigkeit. Für
              leicht fahrlässige Pflichtverletzungen haftet {siteConfig.name} nur bei Verletzung
              wesentlicher Vertragspflichten.
            </p>
            <p>
              Die Haftung für mittelbare Schäden, entgangenen Gewinn oder nicht vorhersehbare
              Schäden ist ausgeschlossen, soweit gesetzlich zulässig.
            </p>
          </Section>

          <Section title="8. Externe Daten und Informationen">
            <p>
              Bei der Erstellung von Bewertungen können Informationen aus verschiedenen Quellen
              verwendet werden. {siteConfig.name} übernimmt keine Gewähr für die vollständige
              Richtigkeit externer Daten.
            </p>
          </Section>

          <Section title="9. Datenschutz">
            <p>
              Die Verarbeitung personenbezogener Daten erfolgt entsprechend der{" "}
              <a href="/datenschutz" className="text-ink hover:text-ink-soft">
                Datenschutzerklärung
              </a>{" "}
              von {siteConfig.name}. Die aktuelle Datenschutzerklärung ist jederzeit auf der
              Website abrufbar.
            </p>
          </Section>

          <Section title="10. Widerrufsrecht für Verbraucher">
            <p>
              Verbrauchern steht bei außerhalb von Geschäftsräumen oder mittels
              Fernkommunikationsmitteln geschlossenen Verträgen grundsätzlich ein gesetzliches
              Widerrufsrecht zu. Über das Bestehen und die Bedingungen eines Widerrufsrechts wird
              der Verbraucher gesondert informiert, siehe unsere{" "}
              <a href="/widerruf" className="text-ink hover:text-ink-soft">
                Widerrufsbelehrung
              </a>
              .
            </p>
          </Section>

          <Section title="11. Schlussbestimmungen">
            <p>
              Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt die
              Wirksamkeit der übrigen Bestimmungen unberührt. Es gilt das Recht der Bundesrepublik
              Deutschland.
            </p>
          </Section>

          <p className="mt-10 text-xs text-ink-soft/60">Stand: September 2026</p>
        </Container>
      </main>
    </>
  );
}
