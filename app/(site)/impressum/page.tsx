import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Impressum",
  robots: { index: false, follow: true },
};

export default function ImpressumPage() {
  return (
    <>
      <main className="pt-32 pb-24">
        <Container className="max-w-2xl">
          <h1 className="font-display text-3xl font-medium text-ink">Impressum</h1>

          <div className="mt-8 space-y-6 text-ink-soft/90">
            <div>
              <p className="text-xs font-medium tracking-[0.16em] text-ink-soft/80 uppercase">
                Angaben gemäß § 5 TMG / § 18 Abs. 2 MStV
              </p>
              <p className="mt-3">
                {siteConfig.operator.name}
                <br />
                {siteConfig.operator.street}
                <br />
                {siteConfig.operator.zipCity}
                <br />
                {siteConfig.operator.country}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium tracking-[0.16em] text-ink-soft/80 uppercase">
                Kontakt
              </p>
              <p className="mt-3">
                E-Mail:{" "}
                <a href={`mailto:${siteConfig.email}`} className="text-ink hover:text-ink-soft">
                  {siteConfig.email}
                </a>
              </p>
            </div>

            <div>
              <p className="text-xs font-medium tracking-[0.16em] text-ink-soft/80 uppercase">
                Hinweis zum Angebot
              </p>
              <p className="mt-3">
                Diese Website bietet derzeit ausschließlich eine kostenlose, automatisierte
                Ersteinschätzung des Immobilienwerts an. Es handelt sich nicht um eine
                Wertermittlung durch einen Sachverständigen und nicht um eine gewerbliche
                Immobilienmaklertätigkeit im Sinne des § 34c GewO.
              </p>
            </div>

            <div>
              <p className="text-xs font-medium tracking-[0.16em] text-ink-soft/80 uppercase">
                Verantwortlich für den Inhalt gemäß § 18 Abs. 2 MStV
              </p>
              <p className="mt-3">{siteConfig.operator.name}, Anschrift wie oben.</p>
            </div>

            <div>
              <p className="text-xs font-medium tracking-[0.16em] text-ink-soft/80 uppercase">
                Haftungshinweis
              </p>
              <p className="mt-3">
                Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die
                Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich
                deren Betreiber verantwortlich.
              </p>
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}
