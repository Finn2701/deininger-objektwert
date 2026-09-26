import { ogCard, ogSize } from "@/lib/og-card";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Verkaufskosten-Rechner für Haus und Wohnung";

export default function Image() {
  return ogCard({
    kicker: "Rechner",
    title: "Verkaufskosten-Rechner",
    subtitle: "Was bleibt beim Hausverkauf nach Kosten und Darlehensablösung übrig?",
  });
}
