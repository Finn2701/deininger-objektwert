import { Container } from "../../ui/container";
import { getContentOverrides, withOverrides } from "@/lib/content";

const defaults = {
  "verkaufen.hero.title": "Eine Immobilie zu verkaufen ist mehr als ein Inserat.",
  "verkaufen.hero.lede":
    "Vom ersten Werteindruck über die richtige Vermarktungsstrategie bis zum Notartermin: Ein strukturierter Ablauf hilft, einen realistischen Preis zu erzielen und den Verkaufsprozess planbar zu halten.",
};

export async function VerkaufenHero() {
  const overrides = await getContentOverrides(Object.keys(defaults));
  const t = withOverrides(defaults, overrides);

  return (
    <section className="py-20 md:py-28">
      <Container className="max-w-3xl">
        <h1 className="font-display text-3xl leading-[1.15] font-medium text-ink md:text-5xl">
          {t["verkaufen.hero.title"]}
        </h1>
        <p className="mt-4 text-sm font-medium text-ink-soft">
          Immobilie verkaufen
        </p>
        <p className="mt-6 text-balance text-ink-soft/90 md:text-lg">
          {t["verkaufen.hero.lede"]}
        </p>
      </Container>
    </section>
  );
}
