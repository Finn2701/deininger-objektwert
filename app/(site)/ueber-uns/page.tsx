import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/lib/site-config";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { getContentOverrides, withOverrides } from "@/lib/content";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Über uns – Finn Deininger, Heidenheim",
  description:
    "Ruhig, sachlich, transparent: So arbeitet Deininger Objektwert bei der Immobilienbewertung. Zuhause in Heidenheim, im Einsatz deutschlandweit.",
  alternates: { canonical: "/ueber-uns" },
};

const defaults = {
  "ueber-uns.title": "Persönlich statt anonym.",
  "ueber-uns.intro":
    "wird von {operator} in {region} betrieben. Die Idee dahinter: eine ruhige, sachliche Herangehensweise an Immobilienbewertung – ohne Verkaufsdruck, ohne Pauschalversprechen, dafür mit einer nachvollziehbaren, transparenten Methode.",
};

export default async function UeberUnsPage() {
  const overrides = await getContentOverrides(Object.keys(defaults));
  const t = withOverrides(defaults, overrides);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Start", url: "/" },
              { name: "Über uns", url: "/ueber-uns" },
            ])
          ),
        }}
      />
      <main>
        <section className="py-20 md:py-28">
          <Container className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.2em] text-accent uppercase">
              Über Deininger Objektwert
            </p>
            <h1 className="mt-4 font-display text-3xl leading-[1.15] font-medium text-ink md:text-5xl">
              {t["ueber-uns.title"]}
            </h1>

            <Reveal delay={0.1}>
              <p className="mt-8 text-balance text-ink-soft/90 md:text-lg">
                Deininger Objektwert{" "}
                {t["ueber-uns.intro"]
                  .replace("{operator}", siteConfig.operator.name)
                  .replace("{region}", siteConfig.region)}
              </p>
              <p className="mt-5 text-balance text-ink-soft/90 md:text-lg">
                Die kostenlose Online-Ersteinschätzung ist bewusst der erste Schritt, nicht das
                Ergebnis: Sie zeigt, welche Faktoren für den Wert einer Immobilie relevant sind,
                und bildet eine sachliche Gesprächsgrundlage für alles Weitere.
              </p>
              <p className="mt-5 text-balance text-ink-soft/90 md:text-lg">
                Eine Zulassung als Immobilienmakler nach § 34c GewO wird derzeit beantragt.
                Solange diese noch aussteht, bleibt der Fokus bewusst auf der kostenlosen
                Ersteinschätzung – Details dazu finden Sie im{" "}
                <a href="/impressum" className="underline decoration-line underline-offset-4 hover:text-ink">
                  Impressum
                </a>
                .
              </p>
            </Reveal>

            <Reveal delay={0.15} className="mt-12">
              <h2 className="font-display text-xl font-medium text-ink">Der Ansatz in Kürze</h2>
              <ul className="mt-4 space-y-3 text-ink-soft/90">
                <li className="border-t border-line pt-3">
                  Nachvollziehbare Bewertung statt Pauschalzahl – mit Angabe der zugrunde
                  liegenden Faktoren.
                </li>
                <li className="border-t border-line pt-3">
                  Persönliches Gespräch statt automatisiertem Formular, sobald es über die
                  Ersteinschätzung hinausgeht.
                </li>
                <li className="border-t border-line pt-3">
                  Diskretion als Option, nicht als Standard – Sie entscheiden, wie sichtbar Ihr
                  Verkauf ist.
                </li>
              </ul>
            </Reveal>

            <Reveal delay={0.2} className="mt-12">
              <h2 className="font-display text-xl font-medium text-ink">Regionale Kompetenz</h2>
              <p className="mt-4 text-balance text-ink-soft/90">
                Zuhause ist {siteConfig.region} — entsprechend gut kenne ich die Nachbarschaften,
                Lagen und Preisniveaus vor Ort. Der Wirkungskreis reicht darüber hinaus über den
                gesamten Ostalbkreis, einschließlich Aalen und den umliegenden Gemeinden. Die
                kostenlose Online-Ersteinschätzung lässt sich darüber hinaus deutschlandweit
                nutzen.
              </p>
            </Reveal>
          </Container>
        </section>
      </main>
    </>
  );
}
