import Image from "next/image";
import { Container } from "../ui/container";
import { Reveal } from "../ui/reveal";

export function DiscreteSection() {
  return (
    <section id="diskrete-vermittlung" className="scroll-mt-24 border-t border-line py-24 md:py-32">
      <Container className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
        <Reveal className="order-2 aspect-[4/5] overflow-hidden rounded-2xl md:order-1">
          <Image
            src="/images/story/technik-waermepumpe.png"
            alt="Gepflegtes Einfamilienhaus, Seitenansicht mit Garage"
            width={1200}
            height={1500}
            sizes="(min-width: 768px) 45vw, 100vw"
            className="h-full w-full object-cover"
          />
        </Reveal>

        <div className="order-1 md:order-2">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.2em] text-accent-text uppercase">
              Diskrete Vermittlung
            </p>
            <h2 className="mt-4 font-display text-3xl leading-[1.15] font-medium text-ink md:text-4xl">
              Nicht jede Immobilie muss öffentlich inseriert werden.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 text-balance text-ink-soft/90 md:text-lg">
              Eine Option ist die diskrete Vermarktung: zunächst ohne öffentliches Inserat, mit
              gezielter statt breiter Ansprache. Das schützt Ihre Privatsphäre und eignet sich
              besonders bei besonderen Lagen oder wenn Nachbarschaft und Umfeld nicht informiert
              werden sollen.
            </p>
            <p className="mt-5 text-balance text-ink-soft/90 md:text-lg">
              Zeigt sich so kein passender Käufer, lässt sich die Vermarktung jederzeit
              nachvollziehbar erweitern.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
