import Image from "next/image";
import Link from "next/link";
import { getContentOverrides, withOverrides } from "@/lib/content";

const defaults = {
  "home.hero.eyebrow":
    "Kostenlose Immobilienbewertung in Heidenheim an der Brenz – deutschlandweit nutzbar",
  "home.hero.title": "Was ist Ihre Immobilie wirklich wert?",
  "home.hero.lede":
    "Lage, Substanz, Technik und Markt entscheiden über den tatsächlichen Wert – nicht eine Zahl aus dem Internet. In wenigen Minuten zu einer ersten, unverbindlichen Ersteinschätzung.",
};

const facts = [
  { label: "Zulassung", value: "§ 34c GewO" },
  { label: "Aufsicht", value: "IHK Ostwürttemberg" },
  { label: "Sitz", value: "Heidenheim an der Brenz" },
];

export async function HomeHero() {
  const overrides = await getContentOverrides(Object.keys(defaults));
  const t = withOverrides(defaults, overrides);

  return (
    <section className="border-b border-ink">
      <div className="mx-auto grid w-full max-w-[96rem] lg:grid-cols-12">
        <div className="flex flex-col px-5 pt-10 pb-10 sm:px-8 lg:col-span-6 lg:min-h-[calc(100svh-4.5rem-5.5rem)] lg:justify-between lg:px-12 lg:pt-16 lg:pb-12">
          <div>
            <h1 className="font-display max-w-[16ch] text-[clamp(2.75rem,7.4vw,6rem)] leading-[0.98] font-bold text-balance text-ink">
              {t["home.hero.title"]}
            </h1>
            <p className="mt-8 max-w-[34rem] text-lg leading-relaxed text-ink-soft md:text-xl">{t["home.hero.lede"]}</p>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 lg:mt-14">
            <Link href="/immobilienbewertung" className="btn-primary">
              Kostenlose Ersteinschätzung starten
              <svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden>
                <path d="M0 6h16M11 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </Link>
            <Link
              href="/immobilie-verkaufen"
              className="text-[0.9375rem] font-medium text-ink underline decoration-ink/40 hover:decoration-ink"
            >
              Immobilie verkaufen
            </Link>
          </div>
        </div>

        <div className="relative order-first aspect-[4/3] lg:order-none lg:col-span-6 lg:aspect-auto">
          <Image
            src="/images/story/drone-wide.png"
            alt="Luftaufnahme eines gepflegten Einfamilienhauses in einer Wohnsiedlung in Heidenheim an der Brenz"
            fill
            priority
            fetchPriority="high"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-[28%_50%]"
          />
        </div>
      </div>

      <div className="relative">
        <span aria-hidden className="rule-draw absolute inset-x-0 top-0 h-px bg-ink" />
        <div className="mx-auto grid w-full max-w-[96rem] lg:grid-cols-12">
          <p className="px-5 py-5 text-sm text-ink-soft sm:px-8 lg:col-span-6 lg:px-12">{t["home.hero.eyebrow"]}</p>
          <dl className="grid grid-cols-3 border-t border-ink lg:col-span-6 lg:border-t-0 lg:border-l">
            {facts.map((fact, index) => (
              <div
                key={fact.label}
                className={`px-5 py-5 sm:px-8 lg:px-6 ${index > 0 ? "border-l border-ink" : ""}`}
              >
                <dt className="text-xs text-ink-soft">{fact.label}</dt>
                <dd className="mt-1 text-sm font-semibold text-ink md:text-base">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
