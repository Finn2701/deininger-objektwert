import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Datenschutz",
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

export default function DatenschutzPage() {
  return (
    <>
      <main className="pt-32 pb-24">
        <Container className="max-w-2xl">
          <h1 className="font-display text-3xl font-medium text-ink">Datenschutzerklärung</h1>
          <p className="mt-6 text-ink-soft/90">
            Diese Erklärung informiert Sie darüber, welche personenbezogenen Daten wir bei der
            Nutzung dieser Website verarbeiten, zu welchem Zweck und auf welcher Rechtsgrundlage.
          </p>

          <Section title="1. Verantwortlicher">
            <p>
              {siteConfig.operator.name}
              <br />
              {siteConfig.operator.street}
              <br />
              {siteConfig.operator.zipCity}
              <br />
              {siteConfig.operator.country}
            </p>
            <p>
              E-Mail:{" "}
              <a href={`mailto:${siteConfig.email}`} className="text-ink hover:text-ink-soft">
                {siteConfig.email}
              </a>
            </p>
          </Section>

          <Section title="2. Hosting">
            <p>
              Diese Website wird bei Vercel Inc. (USA) gehostet. Beim Aufruf der Seite verarbeitet
              Vercel automatisch technische Daten wie IP-Adresse, Datum und Uhrzeit des Zugriffs,
              aufgerufene Seite, verwendeter Browser und Betriebssystem (Server-Logfiles). Diese
              Verarbeitung ist zur technischen Bereitstellung der Website erforderlich
              (Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO, berechtigtes Interesse an einem
              sicheren und funktionsfähigen Betrieb der Website). Die Übermittlung in die USA
              erfolgt auf Grundlage des EU-US Data Privacy Framework bzw. der EU-Standardvertragsklauseln.
            </p>
          </Section>

          <Section title="3. Bewertungsformular">
            <p>
              Wenn Sie unseren Immobilienbewertungsrechner nutzen, verarbeiten wir die von Ihnen
              eingegebenen Objektdaten (z. B. Objektart, Lage, Fläche, Baujahr, Zustand,
              Ausstattung), um Ihnen eine unverbindliche Ersteinschätzung des Immobilienwerts
              anzuzeigen. Diese Angaben werden dauerhaft gespeichert, damit wir die Nutzung unseres
              Rechners nachvollziehen und unser Angebot verbessern können.
            </p>
            <p>
              Wenn Sie zusätzlich angeben, dass Sie persönlich kontaktiert werden möchten,
              verarbeiten wir außerdem Ihren Namen sowie die von Ihnen angegebenen Kontaktdaten
              (E-Mail-Adresse, optional Telefonnummer), um mit Ihnen zu dieser Einschätzung in
              Kontakt zu treten. Ohne diese Angabe werden keine Kontaktdaten von Ihnen erhoben.
            </p>
            <p>
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Anfrage vorvertraglicher Maßnahmen),
              soweit Sie um Kontaktaufnahme gebeten haben, andernfalls Art. 6 Abs. 1 lit. f DSGVO
              (berechtigtes Interesse an der Auswertung der Nutzung unseres kostenlosen Angebots).
            </p>
          </Section>

          <Section title="4. Datenbank / Auftragsverarbeitung">
            <p>
              Die über das Bewertungsformular erhobenen Daten speichern wir bei unserem
              Datenbank-Dienstleister Supabase, Serverstandort Frankfurt am Main (EU). Mit Supabase
              besteht ein Auftragsverarbeitungsvertrag gemäß Art. 28 DSGVO. Der Zugriff auf diese
              Daten ist technisch auf den Verantwortlichen beschränkt.
            </p>
          </Section>

          <Section title="5. Spam- und Missbrauchsschutz">
            <p>
              Zum Schutz des Formulars vor automatisierten Zugriffen (Bots) kann der Dienst
              Cloudflare Turnstile eingesetzt werden. Dabei werden technische Merkmale Ihres
              Zugriffs verarbeitet, ohne dass ein klassisches Tracking-Cookie gesetzt wird.
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem vor
              Missbrauch geschützten Angebot).
            </p>
          </Section>

          <Section title="6. Cookies und Analyse-Tools">
            <p>
              Diese Website setzt aktuell keine Analyse- oder Marketing-Cookies ein. Es werden nur
              technisch notwendige Daten verarbeitet, die für den Betrieb der Website und die
              Nutzung des Bewertungsformulars erforderlich sind.
            </p>
          </Section>

          <Section title="7. Speicherdauer">
            <p>
              Über das Bewertungsformular übermittelte Daten speichern wir, bis der jeweilige
              Zweck erreicht ist bzw. bis Sie der Verarbeitung widersprechen oder eine Löschung
              verlangen. Kontaktanfragen werden nach Abschluss der Anfrage sowie unter
              Berücksichtigung gesetzlicher Aufbewahrungspflichten gelöscht.
            </p>
          </Section>

          <Section title="8. Ihre Rechte">
            <p>
              Sie haben das Recht auf Auskunft über die von uns zu Ihrer Person gespeicherten
              Daten (Art. 15 DSGVO) sowie auf Berichtigung (Art. 16 DSGVO), Löschung (Art. 17
              DSGVO), Einschränkung der Verarbeitung (Art. 18 DSGVO), Datenübertragbarkeit (Art. 20
              DSGVO) und Widerspruch gegen die Verarbeitung (Art. 21 DSGVO). Wenden Sie sich hierzu
              an{" "}
              <a href={`mailto:${siteConfig.email}`} className="text-ink hover:text-ink-soft">
                {siteConfig.email}
              </a>
              .
            </p>
            <p>
              Außerdem steht Ihnen ein Beschwerderecht bei einer Datenschutz-Aufsichtsbehörde zu,
              insbesondere in dem Mitgliedstaat Ihres gewöhnlichen Aufenthaltsorts, Ihres
              Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes.
            </p>
          </Section>

          <p className="mt-10 text-xs text-ink-soft/60">Stand: September 2026</p>
        </Container>
      </main>
    </>
  );
}
