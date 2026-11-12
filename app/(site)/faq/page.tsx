import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { getFaqs } from "@/components/sections/faq-section";
import { Reveal } from "@/components/ui/reveal";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/structured-data";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Häufige Fragen zur Immobilienbewertung",
  description:
    "Antworten zu Immobilienbewertung, Verkehrswert, Verkaufsablauf und diskreter Vermarktung – für Heidenheim und deutschlandweit.",
  alternates: { canonical: "/faq" },
};

export default async function FaqPage() {
  const faqs = await getFaqs();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Start", url: "/" },
              { name: "FAQ", url: "/faq" },
            ])
          ),
        }}
      />
      <main>
        <section className="py-20 md:py-32">
          <Container>
            <h1 className="font-display max-w-4xl text-4xl leading-[1.02] font-bold text-balance text-ink md:text-7xl">
              Fragen zu Immobilienbewertung und Verkauf
            </h1>

            <div className="mt-14 md:mt-24">
              {faqs.map((faq, index) => (
                <Reveal key={faq.question} delay={index * 0.02}>
                  <details className="group border-t border-ink">
                    <summary className="grid cursor-pointer list-none gap-3 py-6 md:grid-cols-12 md:gap-8 md:py-8 [&::-webkit-details-marker]:hidden">
                      <span className="font-display text-xl leading-snug font-semibold text-ink md:col-span-11 md:text-2xl">
                        {faq.question}
                      </span>
                      <span
                        className="text-3xl leading-none font-light text-ink transition-transform duration-300 group-open:rotate-45 md:col-span-1 md:justify-self-end"
                        aria-hidden
                      >
                        +
                      </span>
                    </summary>
                    <p className="max-w-3xl pb-8 text-base leading-relaxed text-ink-soft md:pb-10 md:text-lg">{faq.answer}</p>
                  </details>
                </Reveal>
              ))}
              <div className="border-t border-ink" />
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
