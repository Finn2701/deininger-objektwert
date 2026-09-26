import { ogCard, ogSize } from "@/lib/og-card";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Erbschaftsteuer-Rechner für Immobilien";

export default function Image() {
  return ogCard({
    kicker: "Rechner",
    title: "Erbschaftsteuer-Rechner",
    subtitle: "Freibeträge, Steuerklassen und Familienheim beim Erben einer Immobilie",
  });
}
