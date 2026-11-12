import Link from "next/link";
import { Container } from "../ui/container";
import { Reveal } from "../ui/reveal";

export function FinalCtaSection() {
  return (
    <section className="bg-accent text-white">
      <Container className="py-20 md:py-32">
        <Reveal className="grid gap-10 md:grid-cols-12 md:items-end md:gap-8">
          <div className="md:col-span-8">
            <h2 className="font-display max-w-3xl text-[clamp(2.5rem,6.5vw,5.5rem)] leading-[1] font-bold text-balance">
              Wie viel ist Ihre Immobilie wert?
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/90 md:text-xl">
              In wenigen Minuten zu einer ersten, unverbindlichen Einschätzung — kostenlos, ohne
              Verpflichtung.
            </p>
          </div>
          <div className="md:col-span-4 md:justify-self-end">
            <Link
              href="/immobilienbewertung"
              className="inline-flex items-center gap-3 bg-white px-7 py-5 text-base font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
            >
              Jetzt kostenlos bewerten lassen
              <svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden>
                <path d="M0 6h16M11 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
