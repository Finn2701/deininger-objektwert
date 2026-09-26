import { getPriceRows } from "@/lib/price-atlas";
import { ogCard, ogSize } from "@/lib/og-card";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Immobilienpreise in Ostwürttemberg im Vergleich";

export default function Image() {
  const count = getPriceRows().length;
  return ogCard({
    kicker: "Marktdaten",
    title: "Immobilienpreise in Ostwürttemberg",
    subtitle: `${count} Orte im Vergleich: Haus- und Wohnungspreise pro Quadratmeter`,
  });
}
