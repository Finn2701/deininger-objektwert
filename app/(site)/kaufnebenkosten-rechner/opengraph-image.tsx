import { ogCard, ogSize } from "@/lib/og-card";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Kaufnebenkosten-Rechner für alle Bundesländer";

export default function Image() {
  return ogCard({
    kicker: "Rechner",
    title: "Kaufnebenkosten-Rechner",
    subtitle: "Grunderwerbsteuer, Notar, Grundbuch und Makler – alle 16 Bundesländer",
  });
}
