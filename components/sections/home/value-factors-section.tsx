import Image from "next/image";
import { Container } from "../../ui/container";
import { Reveal } from "../../ui/reveal";
import { SectionHeading } from "../../ui/section-heading";

const factors = [
  {
    number: "01",
    title: "Lage",
    image: "/images/story/dach-photovoltaik.png",
    alt: "Blick über Dächer einer gewachsenen Wohnsiedlung",
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
    <section id="wertfaktoren" className="scroll-mt-24 border-t border-line py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Was den Wert bestimmt"
          title="Vier Faktoren, die in jede Immobilienbewertung einfließen."
          lede="Der Wert einer Immobilie entsteht nicht durch eine einzelne Zahl, sondern durch das Zusammenspiel mehrerer Faktoren. Unser Online-Rechner berücksichtigt genau diese Punkte."
          align="center"
        />

        <div className="mt-20 space-y-20 md:space-y-28">
          {factors.map((factor, index) => (
            <div
              key={factor.number}
              className="grid items-center gap-10 md:grid-cols-2 md:gap-16"
            >
              <Reveal
                className={`aspect-[4/3] overflow-hidden rounded-2xl ${
                  index % 2 === 1 ? "md:order-2" : ""
                }`}
              >
                <Image
                  src={factor.image}
                  alt={factor.alt}
                  width={1200}
                  height={900}
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="h-full w-full object-cover"
                />
              </Reveal>

              <Reveal delay={0.1} className={index % 2 === 1 ? "md:order-1" : ""}>
                <span className="font-display text-sm text-accent-text">{factor.number}</span>
                <h3 className="mt-3 font-display text-2xl leading-[1.2] font-medium text-ink md:text-3xl">
                  {factor.title}
                </h3>
                <p className="mt-4 text-balance text-ink-soft/90 md:text-lg">{factor.body}</p>
              </Reveal>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
