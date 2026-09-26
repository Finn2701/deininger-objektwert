import { ogCard, ogSize } from "@/lib/og-card";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Grunderwerbsteuer-Rechner für alle Bundesländer";

export default function Image() {
  return ogCard({
    kicker: "Rechner",
    title: "Grunderwerbsteuer-Rechner",
    subtitle: "Steuersätze von 3,5 bis 6,5 % – alle Bundesländer im Überblick",
  });
}
