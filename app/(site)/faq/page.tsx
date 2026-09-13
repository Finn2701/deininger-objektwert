import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { getFaqs } from "@/components/sections/faq-section";
import { Reveal } from "@/components/ui/reveal";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Häufige Fragen zur Immobilienbewertung",
  description:
    "Antworten auf häufige Fragen zu Immobilienbewertung, Verkehrswert, Verkaufsablauf und diskreter Vermarktung – für Heidenheim an der Brenz und deutschlandweit.",
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
        <section className="py-20 md:py-28">
          <Container className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.2em] text-accent uppercase">
              Häufige Fragen
            </p>
            <h1 className="mt-4 font-display text-3xl leading-[1.15] font-medium text-ink md:text-5xl">
              Fragen zu Immobilienbewertung und Verkauf
            </h1>

            <div className="mt-14 divide-y divide-line">
              {faqs.map((faq, index) => (
                <Reveal key={faq.question} delay={index * 0.03}>
                  <details className="group py-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-ink">
                      <span className="font-medium">{faq.question}</span>
                      <span className="shrink-0 text-ink-soft/60 transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-3 text-ink-soft/90">{faq.answer}</p>
                  </details>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
