import type { Metadata } from "next";
import Link from "next/link";
import { Experience } from "@/components/entwurf2/experience";
import { getFaqs } from "@/components/sections/faq-section";
import { RatgeberTeaserSection } from "@/components/sections/home/ratgeber-teaser-section";
import { SiteFooter } from "@/components/layout/site-footer";
import { primaryNav, siteConfig } from "@/lib/site-config";
import { faqJsonLd, realEstateAgentJsonLd, websiteJsonLd } from "@/lib/structured-data";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: "Immobilienmakler Heidenheim | Immobilie bewerten – kostenlos online | Deininger Objektwert" },
  description:
    "Zugelassener Immobilienmakler (§ 34c GewO) in Heidenheim: persönliche Verkaufsbegleitung von Finn Deininger – oder starten Sie unverbindlich mit der kostenlosen Online-Wertspanne in wenigen Minuten, deutschlandweit nutzbar.",
  alternates: { canonical: "/" },
};

const display = "font-[family-name:var(--font-gabarito)] font-black tracking-[-0.02em]";

const btn =
  "inline-flex items-center gap-3 rounded-full bg-[#ffd23f] px-7 py-4 text-base font-bold text-[#0a2b33] transition-transform duration-200 hover:scale-[1.03] active:scale-[0.99]";

const stages = [
  {
    side: "left",
    count: "1 von 4",
    title: "Lage",
    body: "Die Mikrolage beeinflusst den Immobilienwert oft stärker als einzelne Ausstattungsdetails: Infrastruktur, Nachbarschaft, Verkehrsanbindung und die allgemeine Nachfrage in der jeweiligen Straße oder dem Viertel. Zwei baugleiche Häuser können je nach Lage deutlich unterschiedlich viel wert sein.",
  },
  {
    side: "left",
    count: "2 von 4",
    title: "Substanz & Bauweise",
    body: "Baujahr, Bauweise, Fassade und der bauliche Zustand bilden die Grundlage jeder Bewertung. Ein gut instand gehaltenes Haus aus den 1990er-Jahren kann wertstabiler sein als ein neueres Objekt mit Sanierungsstau – entscheidend ist der tatsächliche Zustand, nicht nur das Baujahr auf dem Papier.",
  },
  {
    side: "right",
    count: "3 von 4",
    title: "Technik & Energie",
    body: "Heizungsart, Elektrik, Leitungen und die energetische Ausstattung gewinnen spürbar an Bedeutung – auch mit Blick auf steigende Energiekosten und regulatorische Anforderungen. Eine moderne Wärmepumpe oder eine Photovoltaikanlage wirkt sich messbar auf Nachfrage und erzielbaren Preis aus.",
  },
  {
    side: "left",
    count: "4 von 4",
    title: "Wohnfläche & Grundriss",
    body: "Nicht allein die Quadratmeterzahl zählt, sondern auch Aufteilung, Zuschnitt und Nutzbarkeit der Räume. Ein durchdachter, offener Grundriss mit gutem Lichteinfall wird am Markt häufig höher bewertet als eine größere, aber ungünstig geschnittene Fläche.",
  },
];

const steps = [
  {
    n: "1",
    title: "Angaben zur Immobilie",
    body: "Objektart, Lage, Wohn- und Grundstücksfläche, Baujahr sowie der Zustand von Heizung, Elektrik und Leitungen – in wenigen, klar geführten Schritten.",
  },
  {
    n: "2",
    title: "Automatische Ersteinschätzung",
    body: "Aus Ihren Angaben und aktuellen Marktdaten für Ihre Region entsteht eine erste Wertspanne – sofort und kostenlos.",
  },
  {
    n: "3",
    title: "Bei Bedarf: persönliches Gespräch",
    body: "Möchten Sie die Einschätzung vertiefen oder über einen Verkauf sprechen, melden wir uns unverbindlich bei Ihnen.",
  },
];

function Arrow() {
  return (
    <svg width="20" height="14" viewBox="0 0 18 12" fill="none" aria-hidden>
      <path d="M0 6h16M11 1l5 5-5 5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export default async function Entwurf2Page() {
  const allFaqs = await getFaqs();
  const faqs = allFaqs.slice(0, 8);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(realEstateAgentJsonLd()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} />
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-[#0c3c47]/85 px-5 py-4 sm:px-8 lg:px-12">
        <Link href="/" className={`${display} text-lg uppercase tracking-[0.02em] text-[#f6f3ec]`}>
          Deininger <span className="font-medium tracking-[0.18em] text-[#a9c4c9]">Objektwert</span>
        </Link>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Hauptnavigation">
          {primaryNav.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-semibold text-[#cfe0e3] transition-colors hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/immobilienbewertung" className={`${btn} whitespace-nowrap !px-5 !py-2.5 !text-sm`}>
          Wert einschätzen
        </Link>
      </header>

      <main>
        <Experience>
          {/* Start */}
          <section className="flex min-h-svh items-end px-5 pt-28 pb-14 sm:px-8 md:items-center md:pb-0 lg:px-12">
            <div className="max-w-xl rounded-3xl bg-[#0c3c47]/80 p-6 md:bg-transparent md:p-0">
              <h1 className={`${display} text-[clamp(2.4rem,7vw,6.25rem)] leading-[0.95] text-balance`}>
                Was ist Ihre Immobilie wirklich wert?
              </h1>
              <p className="mt-4 max-w-md text-base leading-relaxed text-[#cfe0e3] md:mt-6 md:text-xl">
                Lage, Substanz, Technik und Markt entscheiden über den tatsächlichen Wert – nicht eine Zahl aus dem
                Internet. In wenigen Minuten zu einer ersten, unverbindlichen Ersteinschätzung.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Link href="/immobilienbewertung" className={btn}>
                  Kostenlose Ersteinschätzung starten <Arrow />
                </Link>
                <Link href="/immobilie-verkaufen" className="text-base font-semibold underline decoration-[#ffd23f] decoration-2 underline-offset-4">
                  Immobilie verkaufen
                </Link>
              </div>
              <p className="mt-10 hidden items-center gap-3 text-sm text-[#a9c4c9] md:flex">
                <span className="inline-block h-8 w-5 rounded-full border-2 border-[#a9c4c9] p-1" aria-hidden>
                  <span className="block h-1.5 w-full scroll-hint rounded-full bg-[#ffd23f]" />
                </span>
                Nach unten scrollen: Ihr Haus als Modell
              </p>
            </div>
          </section>

          {/* Vier Faktoren */}
          {stages.map((stage, i) => (
            <section
              key={stage.title}
              className="flex min-h-[115svh] items-end px-5 pb-14 sm:px-8 md:items-center md:pb-0 lg:px-12"
            >
              <div
                className={`w-full rounded-3xl bg-[#0c3c47]/90 p-6 md:w-[38%] md:bg-transparent md:p-0 ${
                  stage.side === "right" ? "md:ml-auto" : ""
                }`}
              >
                {i === 0 && (
                  <p className="mb-6 text-base font-semibold text-[#ffd23f]">
                    Vier Faktoren, die in jede Immobilienbewertung einfließen.
                  </p>
                )}
                <p className="text-sm font-semibold text-[#a9c4c9]">{stage.count}</p>
                <h2 className={`${display} mt-2 text-4xl leading-[1] md:text-6xl`}>{stage.title}</h2>
                <p className="mt-5 text-lg leading-relaxed text-[#cfe0e3]">{stage.body}</p>
              </div>
            </section>
          ))}

          {/* Schluss der Bühne */}
          <section className="flex min-h-svh items-end px-5 pb-14 sm:px-8 md:items-center md:pb-0 lg:px-12">
            <div className="max-w-xl rounded-3xl bg-[#0c3c47]/85 p-6 md:bg-transparent md:p-0">
              <h2 className={`${display} text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] text-balance`}>
                Wie viel ist Ihre Immobilie wert?
              </h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-[#cfe0e3] md:text-xl">
                In wenigen Minuten zu einer ersten, unverbindlichen Einschätzung — kostenlos, ohne Verpflichtung.
              </p>
              <Link href="/immobilienbewertung" className={`${btn} mt-8`}>
                Jetzt kostenlos bewerten lassen <Arrow />
              </Link>
            </div>
          </section>
        </Experience>

        {/* Ansprechpartner */}
        <section className="bg-[#ffd23f] px-5 py-20 text-[#0a2b33] sm:px-8 md:py-32 lg:px-12">
          <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[auto_1fr] md:gap-16">
            <div
              className={`${display} flex h-28 w-28 items-center justify-center rounded-full bg-[#0a2b33] text-4xl text-[#ffd23f] md:h-40 md:w-40 md:text-6xl`}
              aria-hidden
            >
              FD
            </div>
            <div>
              <h2 className={`${display} text-5xl leading-[0.95] md:text-8xl`}>{siteConfig.operator.name}</h2>
              <p className="mt-3 text-base font-bold">Ihr Ansprechpartner</p>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed md:text-xl">
                Ich bewerte und begleite Immobilien in {siteConfig.region} und Umgebung persönlich — von der ersten
                Einschätzung bis zum Gespräch über einen möglichen Verkauf. Keine anonyme Formel, kein Callcenter: Sie
                sprechen direkt mit mir, und ich erkläre Ihnen nachvollziehbar, wie sich der Wert Ihrer Immobilie
                zusammensetzt.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
                <Link
                  href="/ueber-uns"
                  className="inline-flex rounded-full bg-[#0a2b33] px-6 py-3.5 text-base font-bold text-[#ffd23f] transition-transform hover:scale-[1.03]"
                >
                  Mehr über meinen Ansatz
                </Link>
                <a href={`mailto:${siteConfig.email}`} className="text-base font-bold underline decoration-2 underline-offset-4">
                  {siteConfig.email}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* In drei Schritten */}
        <section className="px-5 py-20 sm:px-8 md:py-32 lg:px-12">
          <div className="mx-auto max-w-6xl">
            <h2 className={`${display} max-w-3xl text-5xl leading-[0.95] md:text-7xl`}>
              In drei Schritten zur ersten Einschätzung.
            </h2>
            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {steps.map((step) => (
                <div key={step.n} className="rounded-3xl bg-[#082a32] p-7 md:p-9">
                  <span
                    className={`${display} flex h-14 w-14 items-center justify-center rounded-full bg-[#ffd23f] text-3xl text-[#0a2b33]`}
                  >
                    {step.n}
                  </span>
                  <h3 className={`${display} mt-8 text-2xl leading-tight`}>{step.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-[#cfe0e3]">{step.body}</p>
                </div>
              ))}
            </div>
            <Link href="/immobilienbewertung" className={`${btn} mt-12`}>
              Jetzt kostenlos starten <Arrow />
            </Link>
          </div>
        </section>

        {/* Fragen */}
        <section className="bg-[#082a32] px-5 py-20 sm:px-8 md:py-32 lg:px-12">
          <div className="mx-auto max-w-4xl">
            <h2 className={`${display} text-5xl leading-[0.95] md:text-7xl`}>Antworten, bevor Sie anfragen.</h2>
            <div className="mt-12">
              {faqs.map((faq) => (
                <details key={faq.question} className="group border-t border-[#1d5662]">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-xl font-bold md:text-2xl [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#ffd23f] text-xl leading-none text-[#0a2b33] transition-transform duration-300 group-open:rotate-45"
                      aria-hidden
                    >
                      +
                    </span>
                  </summary>
                  <p className="max-w-3xl pb-7 text-base leading-relaxed text-[#cfe0e3] md:text-lg">{faq.answer}</p>
                </details>
              ))}
              <div className="border-t border-[#1d5662]" />
            </div>
          </div>
        </section>
      </main>

      <div className="bg-paper text-ink">
        <RatgeberTeaserSection />
        <SiteFooter />
      </div>
    </>
  );
}
