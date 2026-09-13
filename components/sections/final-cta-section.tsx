import Link from "next/link";
import { Container } from "../ui/container";
import { Reveal } from "../ui/reveal";

export function FinalCtaSection() {
  return (
    <section className="border-t border-line py-20 md:py-28">
      <Container className="text-center">
        <Reveal>
          <h2 className="mx-auto max-w-xl font-display text-2xl leading-[1.2] font-medium text-ink md:text-3xl">
            Wie viel ist Ihre Immobilie wert?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-balance text-ink-soft/90">
            In wenigen Minuten zu einer ersten, unverbindlichen Einschätzung — kostenlos, ohne
            Verpflichtung.
          </p>
          <Link
            href="/immobilienbewertung"
            className="mt-8 inline-flex rounded-full bg-ink px-7 py-3.5 text-sm text-paper transition-colors hover:bg-ink-soft"
          >
            Jetzt kostenlos bewerten lassen
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
