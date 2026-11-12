import Image from "next/image";
import { Container } from "../../ui/container";
import { Reveal } from "../../ui/reveal";
import { SectionHeading } from "../../ui/section-heading";

const factors = [
  {
    number: "01",
    title: "Lage",
    image: "/images/story/drone-approach.png",
    alt: "Einfamilienhaus mit Garten in einer gewachsenen Wohnsiedlung, aus der Luft",
    wide: true,
    body: "Die Mikrolage beeinflusst den Immobilienwert oft stärker als einzelne Ausstattungsdetails: Infrastruktur, Nachbarschaft, Verkehrsanbindung und die allgemeine Nachfrage in der jeweiligen Straße oder dem Viertel. Zwei baugleiche Häuser können je nach Lage deutlich unterschiedlich viel wert sein.",
  },
  {
    number: "02",
    title: "Substanz & Bauweise",
    image: "/images/story/facade-entrance.png",
    alt: "Fassade und Eingangsbereich eines gepflegten Einfamilienhauses",
    body: "Baujahr, Bauweise, Fassade und der bauliche Zustand bilden die Grundlage jeder Bewertung. Ein gut instand gehaltenes Haus aus den 1990er-Jahren kann wertstabiler sein als ein neueres Objekt mit Sanierungsstau – entscheidend ist der tatsächliche Zustand, nicht nur das Baujahr auf dem Papier.",
  },
  {
    number: "03",
    title: "Technik & Energie",
    image: "/images/story/technik-waermepumpe.png",
    alt: "Moderne Wärmepumpe an der Außenwand eines Wohnhauses",
    zoom: true,
    body: "Heizungsart, Elektrik, Leitungen und die energetische Ausstattung gewinnen spürbar an Bedeutung – auch mit Blick auf steigende Energiekosten und regulatorische Anforderungen. Eine moderne Wärmepumpe oder eine Photovoltaikanlage wirkt sich messbar auf Nachfrage und erzielbaren Preis aus.",
  },
  {
    number: "04",
    title: "Wohnfläche & Grundriss",
    image: "/images/story/interior-wohnkueche.png",
    alt: "Offener, lichtdurchfluteter Wohn- und Küchenbereich",
    body: "Nicht allein die Quadratmeterzahl zählt, sondern auch Aufteilung, Zuschnitt und Nutzbarkeit der Räume. Ein durchdachter, offener Grundriss mit gutem Lichteinfall wird am Markt häufig höher bewertet als eine größere, aber ungünstig geschnittene Fläche.",
  },
];

export function ValueFactorsSection() {
  return (
    <section id="wertfaktoren" className="scroll-mt-24 py-20 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Was den Wert bestimmt"
          title="Vier Faktoren, die in jede Immobilienbewertung einfließen."
          lede="Der Wert einer Immobilie entsteht nicht durch eine einzelne Zahl, sondern durch das Zusammenspiel mehrerer Faktoren. Unser Online-Rechner berücksichtigt genau diese Punkte."
        />

        <div className="mt-16 md:mt-24">
          {factors.map((factor) => (
            <Reveal key={factor.number}>
              <article className="grid gap-6 border-t border-ink py-8 md:grid-cols-12 md:gap-8 md:py-10">
                <h3 className="font-display text-2xl leading-tight font-semibold text-ink md:col-span-3 md:text-3xl">
                  {factor.title}
                </h3>
                <p
                  className={`max-w-xl text-base leading-relaxed text-ink-soft md:text-lg ${
                    factor.wide ? "md:col-span-9" : "md:col-span-5"
                  }`}
                >
                  {factor.body}
                </p>
                <div
                  className={`relative overflow-hidden ${
                    factor.wide ? "aspect-[16/8] md:col-span-12 md:mt-6 md:aspect-[21/8]" : "aspect-[4/3] md:col-span-4"
                  }`}
                >
                  <Image
                    src={factor.image}
                    alt={factor.alt}
                    fill
                    sizes={factor.wide ? "100vw" : "(min-width: 768px) 30vw, 100vw"}
                    className={`object-cover ${factor.zoom ? "origin-[88%_52%] scale-[1.9] object-[88%_52%]" : ""}`}
                  />
                </div>
              </article>
            </Reveal>
          ))}
          <div className="border-t border-ink" />
        </div>
      </Container>
    </section>
  );
}
