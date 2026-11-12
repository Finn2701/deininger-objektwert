import Image from "next/image";
import { Container } from "../ui/container";
import { Reveal } from "../ui/reveal";

export function StatementSection() {
  return (
    <section className="border-t border-ink bg-ink text-paper">
      <div className="mx-auto grid w-full max-w-[96rem] lg:grid-cols-12">
        <div className="flex items-center lg:col-span-7">
          <Container className="py-20 md:py-28 lg:!mx-0 lg:max-w-none">
            <Reveal>
              <p className="font-display max-w-2xl text-3xl leading-[1.12] font-semibold text-balance md:text-5xl">
                Jede Immobilie erzählt ihre eigene Geschichte. Wir hören genau hin, bevor wir über
                ihren Wert sprechen.
              </p>
            </Reveal>
          </Container>
        </div>
        <div className="relative aspect-[4/3] lg:col-span-5 lg:aspect-auto">
          <Image
            src="/images/story/garten-dach-transition.png"
            alt="Blick über Terrasse und Garten auf Dach und Photovoltaikanlage"
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
