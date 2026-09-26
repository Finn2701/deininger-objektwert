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
        <p className="text-xs font-medium tracking-[0.2em] text-accent-text uppercase">
          Immobilie verkaufen
        </p>
        <h1 className="mt-4 font-display text-3xl leading-[1.15] font-medium text-ink md:text-5xl">
          {t["verkaufen.hero.title"]}
        </h1>
        <p className="mt-6 text-balance text-ink-soft/90 md:text-lg">
          {t["verkaufen.hero.lede"]}
        </p>
      </Container>
    </section>
  );
}
