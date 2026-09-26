import { ogCard, ogSize } from "@/lib/og-card";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Spekulationssteuer-Rechner für Immobilien";

export default function Image() {
  return ogCard({
    kicker: "Rechner",
    title: "Spekulationssteuer-Rechner",
    subtitle: "Zehn-Jahres-Frist, Eigennutzung und Gewinn nach § 23 EStG",
  });
}
