import Image from "next/image";
import { Container } from "../ui/container";
import { Reveal } from "../ui/reveal";

export function StatementSection() {
  return (
    <section className="relative flex h-[70vh] min-h-[480px] items-center overflow-hidden bg-ink">
      <Image
        src="/images/story/garten-dach-transition.png"
        alt="Blick über Terrasse und Garten auf Dach und Photovoltaikanlage"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-ink/55" />
      {/* Eases the cut from the dark photographic hero into the paper-toned
          sections below instead of a hard line at the section boundary. */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-paper" />

      <Container className="relative">
        <Reveal>
          <span className="mb-5 block h-px w-12 bg-accent" aria-hidden />
          <p className="max-w-2xl font-display text-2xl leading-snug text-balance text-paper md:text-4xl">
            Jede Immobilie erzählt ihre eigene Geschichte. Wir hören genau hin, bevor wir über
            ihren Wert sprechen.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
