import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Widerrufsbelehrung",
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

export default function WiderrufPage() {
  return (
    <>
      <main className="pt-32 pb-24">
        <Container className="max-w-2xl">
          <h1 className="font-display text-3xl font-medium text-ink">Widerrufsbelehrung</h1>
          <p className="mt-2 text-ink-soft/80">
            Gilt für Verträge über Beratungs- oder Vermittlungsleistungen, die außerhalb von
            Geschäftsräumen oder per Fernkommunikationsmittel geschlossen werden. Für die Nutzung
            des kostenlosen Online-Bewertungsrechners kommt kein Vertrag zustande und diese
            Belehrung ist nicht einschlägig.
          </p>

          <Section title="Widerrufsrecht">
            <p>
              Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu
              widerrufen.
            </p>
            <p>Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses.</p>
            <p>Um Ihr Widerrufsrecht auszuüben, müssen Sie uns:</p>
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
            <p>
              mittels einer eindeutigen Erklärung (z. B. ein mit der Post versandter Brief oder
              eine E-Mail) über Ihren Entschluss informieren, diesen Vertrag zu widerrufen.
            </p>
            <p>
              Sie können dafür das nachfolgende Muster-Widerrufsformular verwenden, das jedoch
              nicht vorgeschrieben ist.
            </p>
          </Section>

          <Section title="Folgen des Widerrufs">
            <p>
              Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von
              Ihnen erhalten haben, unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag
              zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf bei uns eingegangen ist.
            </p>
            <p>
              Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der
              ursprünglichen Transaktion eingesetzt haben, sofern mit Ihnen nichts anderes
              vereinbart wurde. In keinem Fall werden Ihnen wegen dieser Rückzahlung Entgelte
              berechnet.
            </p>
            <p>
              Haben Sie verlangt, dass die Dienstleistung während der Widerrufsfrist beginnen
              soll, so haben Sie uns einen angemessenen Betrag zu zahlen, der dem Anteil der bis
              zu dem Zeitpunkt, zu dem Sie uns von der Ausübung des Widerrufsrechts hinsichtlich
              dieses Vertrags unterrichten, bereits erbrachten Dienstleistungen im Vergleich zum
              Gesamtumfang der im Vertrag vorgesehenen Dienstleistungen entspricht.
            </p>
          </Section>

          <Section title="Erlöschen des Widerrufsrechts bei vollständiger Leistungserbringung">
            <p>
              Das Widerrufsrecht erlischt, wenn wir die vereinbarte Dienstleistung vollständig
              erbracht haben und mit der Ausführung der Dienstleistung erst begonnen haben,
              nachdem:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                Sie ausdrücklich zugestimmt haben, dass wir vor Ablauf der Widerrufsfrist mit der
                Ausführung der Dienstleistung beginnen, und
              </li>
              <li>
                Sie bestätigt haben, dass Ihnen bekannt ist, dass Sie mit vollständiger
                Vertragserfüllung Ihr Widerrufsrecht verlieren.
              </li>
            </ul>
          </Section>

          <Section title="Besonderer Hinweis bei Maklerleistungen">
            <p>
              Bei Maklerverträgen kann die Ausführung der Dienstleistung bereits vor Ablauf der
              Widerrufsfrist beginnen, wenn der Verbraucher dies ausdrücklich verlangt. In diesem
              Fall wird darauf hingewiesen, dass das Widerrufsrecht erlischt, sobald die
              Maklerleistung vollständig erbracht wurde.
            </p>
          </Section>

          <Section title="Muster-Widerrufsformular">
            <p>(Wenn Sie den Vertrag widerrufen möchten, können Sie dieses Formular verwenden.)</p>
            <div className="rounded-lg border border-line p-5">
              <p>An:</p>
              <p className="mt-2">
                {siteConfig.name}
                <br />
                {siteConfig.operator.street}
                <br />
                {siteConfig.operator.zipCity}
                <br />
                E-Mail: {siteConfig.email}
              </p>
              <p className="mt-4">
                Hiermit widerrufe(n) ich/wir den von mir/uns abgeschlossenen Vertrag über die
                Erbringung folgender Dienstleistung:
              </p>
              <p className="mt-4">Bestellt am:</p>
              <p className="mt-4">Name des Verbrauchers:</p>
              <p className="mt-4">Anschrift des Verbrauchers:</p>
              <p className="mt-4">Datum:</p>
              <p className="mt-4 text-sm text-ink-soft/80">
                Unterschrift des Verbrauchers (nur bei Mitteilung auf Papier)
              </p>
            </div>
          </Section>

          <p className="mt-10 text-xs text-ink-soft/80">Stand: September 2026</p>
        </Container>
      </main>
    </>
  );
}
