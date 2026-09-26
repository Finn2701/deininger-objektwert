import Image from "next/image";
import Link from "next/link";
import { Container } from "../../ui/container";
import { getContentOverrides, withOverrides } from "@/lib/content";

const defaults = {
  "home.hero.eyebrow":
    "Kostenlose Immobilienbewertung in Heidenheim an der Brenz – deutschlandweit nutzbar",
  "home.hero.title": "Was ist Ihre Immobilie wirklich wert?",
  "home.hero.lede":
    "Lage, Substanz, Technik und Markt entscheiden über den tatsächlichen Wert – nicht eine Zahl aus dem Internet. In wenigen Minuten zu einer ersten, unverbindlichen Ersteinschätzung.",
};

export async function HomeHero() {
  const overrides = await getContentOverrides(Object.keys(defaults));
  const t = withOverrides(defaults, overrides);

  return (
    <section className="relative flex h-[88vh] min-h-[560px] items-end overflow-hidden bg-ink">
      <Image
        src="/images/story/drone-wide.png"
        alt="Luftaufnahme eines gepflegten Einfamilienhauses in einer Wohnsiedlung in Heidenheim an der Brenz"
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-ink/10" />

      <Container className="relative pb-16 md:pb-24">
        <p className="text-xs font-medium tracking-[0.2em] text-paper/70 uppercase">
          {t["home.hero.eyebrow"]}
        </p>
        <h1 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] font-medium text-balance text-paper sm:text-5xl md:text-6xl">
          {t["home.hero.title"]}
        </h1>
        <p className="mt-6 max-w-lg text-balance text-lg text-paper/80">{t["home.hero.lede"]}</p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="/immobilienbewertung"
            className="rounded-full bg-paper px-7 py-3.5 text-sm text-ink transition-colors hover:bg-paper/90"
          >
            Kostenlose Ersteinschätzung starten
          </Link>
          <Link
            href="/immobilie-verkaufen"
            className="text-sm text-paper/80 underline decoration-paper/40 underline-offset-4 transition-colors hover:text-paper"
          >
            Immobilie verkaufen
          </Link>
        </div>
      </Container>
    </section>
  );
}
