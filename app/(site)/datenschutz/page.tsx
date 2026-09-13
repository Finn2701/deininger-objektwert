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

          <Section title="1. Verantwortlicher">
            <p>Verantwortlicher für die Datenverarbeitung auf dieser Website ist:</p>
            <p>
              {siteConfig.name}
              <br />
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

          <Section title="2. Allgemeine Hinweise zur Datenverarbeitung">
            <p>
              Der Schutz Ihrer persönlichen Daten ist uns wichtig. Wir behandeln Ihre
              personenbezogenen Daten vertraulich und entsprechend den gesetzlichen
              Datenschutzvorschriften, insbesondere der Datenschutz-Grundverordnung (DSGVO).
            </p>
            <p>
              Diese Datenschutzerklärung informiert Sie darüber, welche personenbezogenen Daten
              wir bei der Nutzung dieser Website verarbeiten, zu welchen Zwecken dies geschieht
              und welche Rechte Ihnen zustehen.
            </p>
          </Section>

          <Section title="3. Hosting der Website">
            <p>Unsere Website wird gehostet bei Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA.</p>
            <p>
              Der Hosting-Anbieter verarbeitet dabei automatisch technische Daten, die für die
              Bereitstellung der Website erforderlich sind, insbesondere IP-Adresse, Datum und
              Uhrzeit des Zugriffs, Browsertyp, Betriebssystem, aufgerufene Seiten und übertragene
              Datenmenge (Server-Logfiles).
            </p>
            <p>
              Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Unser
              berechtigtes Interesse liegt in der sicheren und stabilen Bereitstellung unserer
              Website. Die Übermittlung in die USA erfolgt auf Grundlage des EU-US Data Privacy
              Framework bzw. der EU-Standardvertragsklauseln.
            </p>
          </Section>

          <Section title="4. Server-Log-Dateien">
            <p>Beim Besuch unserer Website werden automatisch Informationen gespeichert. Diese umfassen:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>IP-Adresse des anfragenden Geräts</li>
              <li>Zeitpunkt des Zugriffs</li>
              <li>verwendeter Browser</li>
              <li>Betriebssystem</li>
              <li>Referrer-URL</li>
              <li>Internet-Service-Provider</li>
            </ul>
            <p>
              Die Verarbeitung erfolgt zur Gewährleistung der Sicherheit, zur Fehleranalyse und
              zur technischen Optimierung der Website (Art. 6 Abs. 1 lit. f DSGVO). Eine
              Zusammenführung dieser Daten mit anderen Datenquellen findet nicht statt.
            </p>
            <p>
              Zusätzlich zählen wir serverseitig, wie oft die einzelnen Seiten aufgerufen werden
              (Datum, aufgerufener Pfad, Zähler) — ohne Cookie, ohne IP-Adresse und ohne jede
              Kennung, die Sie als Person oder Ihr Gerät wiedererkennbar macht. Diese Zählung
              dient ausschließlich der Auswertung, welche Inhalte gefragt sind (Art. 6 Abs. 1
              lit. f DSGVO).
            </p>
          </Section>

          <Section title="5. Kontaktaufnahme per E-Mail">
            <p>
              Wenn Sie uns per E-Mail kontaktieren, verarbeiten wir die dabei von Ihnen
              mitgeteilten Angaben (insbesondere Ihre E-Mail-Adresse, Ihren Namen, sofern
              angegeben, und den Inhalt Ihrer Nachricht) zur Bearbeitung Ihrer Anfrage.
            </p>
            <p>
              Die Verarbeitung erfolgt gemäß Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit
              einer möglichen Beauftragung zusammenhängt, andernfalls auf Grundlage von Art. 6
              Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Bearbeitung von Anfragen).
            </p>
            <p>
              Die Daten werden gelöscht, sobald die Anfrage abschließend bearbeitet wurde und
              keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
            </p>
          </Section>

          <Section title="6. Immobilienbewertung">
            <p>
              Wenn Sie über unseren Online-Rechner eine Immobilienbewertung anfragen, verarbeiten
              wir die von Ihnen eingegebenen Angaben zum Objekt: Objektart, Lage, Wohn- und
              Grundstücksfläche, Baujahr, Zustand sowie die von Ihnen ausgewählten
              Ausstattungsmerkmale. Diese Angaben werden gespeichert, um Ihnen die Ersteinschätzung
              anzuzeigen und damit wir die Nutzung unseres kostenlosen Rechners nachvollziehen
              können.
            </p>
            <p>
              Nur wenn Sie im Formular zusätzlich angeben, dass Sie persönlich kontaktiert werden
              möchten, verarbeiten wir auch Ihren Namen sowie die von Ihnen angegebene
              E-Mail-Adresse und optional Ihre Telefonnummer, um mit Ihnen zu dieser Einschätzung
              in Kontakt zu treten. Ohne diese Angabe erheben wir keinerlei Namens- oder
              Kontaktdaten von Ihnen.
            </p>
            <p>
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit Sie um Kontaktaufnahme
              gebeten haben, andernfalls Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der
              Auswertung der Nutzung unseres kostenlosen Angebots).
            </p>
          </Section>

          <Section title="7. Objektunterlagen einreichen">
            <p>
              Über das Formular unter „Unterlagen einreichen" können Sie uns Kontaktdaten, eine
              Nachricht sowie Dokumente zu Ihrer Immobilie (z. B. Grundriss, Energieausweis,
              Grundbuchauszug, Fotos) übermitteln. Diese Dateien speichern wir verschlüsselt in
              einem privaten Speicherbereich bei unserem Auftragsverarbeiter Supabase
              (Serverstandort Frankfurt am Main, EU) und sind ausschließlich für den
              Verantwortlichen einsehbar.
            </p>
            <p>
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, da die Übermittlung auf Ihren
              Wunsch nach einer persönlichen Einschätzung bzw. einer möglichen Beauftragung
              erfolgt.
            </p>
          </Section>

          <Section title="8. Regionale Preiseinordnung (OpenStreetMap)">
            <p>
              Damit die Ersteinschätzung nicht überall in Deutschland dieselben Preise ansetzt,
              gleichen wir den von Ihnen eingegebenen Ort serverseitig mit dem
              Geokodierungsdienst Nominatim der OpenStreetMap Foundation ab, um die passende
              Region (Bundesland bzw. Stadt) zu bestimmen. Dabei wird ausschließlich Ihre
              Ortsangabe übermittelt, keine weiteren personenbezogenen Daten.
            </p>
            <p>
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer
              regional zutreffenden Berechnung). Weitere Informationen:{" "}
              <a
                href="https://osmfoundation.org/wiki/Privacy_Policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink hover:text-ink-soft"
              >
                Datenschutzerklärung der OpenStreetMap Foundation
              </a>
              .
            </p>
          </Section>

          <Section title="9. Datenbank / Auftragsverarbeitung">
            <p>
              Die über das Bewertungsformular erhobenen Daten speichern wir bei unserem
              Datenbank-Dienstleister Supabase, Serverstandort Frankfurt am Main (EU). Mit
              Supabase besteht ein Auftragsverarbeitungsvertrag gemäß Art. 28 DSGVO. Der Zugriff
              auf diese Daten ist technisch auf den Verantwortlichen beschränkt.
            </p>
          </Section>

          <Section title="10. Cookies">
            <p>Wir unterscheiden zwischen zwei Bereichen unserer Website:</p>
            <p>
              Auf den öffentlichen Seiten setzen wir selbst keine Cookies ein. Beim Ausfüllen des
              Bewertungsformulars lädt Ihr Browser das unten beschriebene Sicherheitstool
              Cloudflare Turnstile, das dabei ein technisch notwendiges Cookie zur Spam-Abwehr
              setzen kann (siehe Punkt 11).
            </p>
            <p>
              Im passwortgeschützten Verwaltungsbereich, den ausschließlich der Verantwortliche
              nutzt, wird zusätzlich ein technisch notwendiges Sitzungs-Cookie zur Anmeldung
              gesetzt (Art. 6 Abs. 1 lit. f DSGVO). Dieses Cookie betrifft keine
              Website-Besucher.
            </p>
          </Section>

          <Section title="11. Spam- und Missbrauchsschutz (Cloudflare Turnstile)">
            <p>
              Zum Schutz des Bewertungsformulars vor automatisierten Zugriffen (Bots) setzen wir
              den Dienst Cloudflare Turnstile der Cloudflare, Inc., 101 Townsend St, San
              Francisco, CA 94107, USA, ein. Turnstile prüft im Hintergrund technische Merkmale
              Ihres Zugriffs (z. B. Browser- und Geräteeigenschaften), meist ohne dass Sie
              interagieren müssen, und kann dabei ein Cookie sowie vergleichbare Techniken zur
              Betrugs- und Missbrauchserkennung setzen. Ein klassisches Tracking zu
              Werbezwecken findet dabei nicht statt.
            </p>
            <p>
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem vor
              Missbrauch und Spam geschützten Formular). Die Übermittlung in die USA erfolgt auf
              Grundlage des EU-US Data Privacy Framework bzw. der EU-Standardvertragsklauseln.
              Weitere Informationen:{" "}
              <a
                href="https://www.cloudflare.com/de-de/privacypolicy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink hover:text-ink-soft"
              >
                Datenschutzerklärung von Cloudflare
              </a>
              .
            </p>
          </Section>

          <Section title="12. Analyse-Tools und Google-Dienste">
            <p>
              Wir setzen derzeit keine Analyse- oder Marketing-Tools ein (z. B. Google Analytics,
              Matomo). Die auf dieser Website verwendeten Schriftarten werden beim Bau der Website
              lokal eingebunden; beim Aufruf der Seite findet dadurch keine Verbindung zu
              Google-Servern statt. Sollten wir künftig Analyse-Tools oder weitere Google-Dienste
              einsetzen, erfolgt dies nur nach Ihrer vorherigen Einwilligung gemäß Art. 6 Abs. 1
              lit. a DSGVO und diese Erklärung wird entsprechend aktualisiert.
            </p>
          </Section>

          <Section title="13. Datensicherheit">
            <p>
              Die Übertragung zwischen Ihrem Browser und unserer Website erfolgt verschlüsselt
              (TLS/HTTPS). Der Zugriff auf gespeicherte Anfragedaten ist über
              Zugriffsberechtigungen auf der Datenbank technisch auf den Verantwortlichen
              beschränkt. Wir passen unsere Sicherheitsmaßnahmen fortlaufend an den Stand der
              Technik an.
            </p>
          </Section>

          <Section title="14. Ihre Rechte">
            <p>Ihnen stehen folgende Rechte zu:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Recht auf Auskunft über die von uns zu Ihrer Person gespeicherten Daten (Art. 15 DSGVO)</li>
              <li>Recht auf Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
              <li>Recht auf Löschung, sofern keine gesetzlichen Gründe dagegen sprechen (Art. 17 DSGVO)</li>
              <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
              <li>Recht auf Datenübertragbarkeit in einem strukturierten Format (Art. 20 DSGVO)</li>
              <li>Widerspruchsrecht gegen bestimmte Verarbeitungen (Art. 21 DSGVO)</li>
              <li>Recht, eine erteilte Einwilligung jederzeit mit Wirkung für die Zukunft zu widerrufen</li>
            </ul>
            <p>
              Wenden Sie sich hierzu an{" "}
              <a href={`mailto:${siteConfig.email}`} className="text-ink hover:text-ink-soft">
                {siteConfig.email}
              </a>
              .
            </p>
          </Section>

          <Section title="15. Beschwerderecht bei einer Aufsichtsbehörde">
            <p>
              Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren,
              insbesondere in dem Mitgliedstaat Ihres gewöhnlichen Aufenthaltsorts, Ihres
              Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes. Für {siteConfig.operator.name} ist
              dies der Landesbeauftragte für den Datenschutz und die Informationsfreiheit
              Baden-Württemberg.
            </p>
          </Section>

          <Section title="16. Aktualität und Änderung dieser Datenschutzerklärung">
            <p>
              Wir behalten uns vor, diese Datenschutzerklärung anzupassen, wenn sich rechtliche
              oder technische Änderungen ergeben, etwa beim Einsatz neuer Dienste. Die jeweils
              aktuelle Version finden Sie jederzeit auf dieser Seite.
            </p>
          </Section>

          <p className="mt-10 text-xs text-ink-soft/60">Stand: September 2026</p>
        </Container>
      </main>
    </>
  );
}
