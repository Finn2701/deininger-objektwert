import Link from "next/link";
import { Container } from "../../ui/container";
import { SectionHeading } from "../../ui/section-heading";
import type { FaqItem } from "../faq-section";

/** Die wichtigsten Fragen direkt auf der Startseite: Nutzer sehen sie sofort, Suchmaschinen und KI-Assistenten finden die Antworten als FAQ-Daten. */
export function HomeFaqSection({ faqs }: { faqs: FaqItem[] }) {
  if (faqs.length === 0) return null;

  return (
    <section className="border-t border-ink py-20 md:py-32">
      <Container>
        <SectionHeading eyebrow="Häufige Fragen" title="Antworten, bevor Sie anfragen." />

        <div className="mt-14 md:mt-20">
          {faqs.map((faq) => (
            <details key={faq.question} className="group border-t border-ink">
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
          ))}
          <div className="flex justify-end border-t border-ink pt-6">
            <Link href="/faq" className="text-sm font-semibold text-ink underline decoration-ink/40 hover:decoration-ink">
              Alle Fragen und Antworten
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
