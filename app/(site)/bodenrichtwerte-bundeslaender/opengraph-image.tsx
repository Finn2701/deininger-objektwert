import { ogCard, ogSize } from "@/lib/og-card";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Bodenrichtwert abrufen: Portale aller Bundesländer";

export default function Image() {
  return ogCard({
    kicker: "Wegweiser",
    title: "Bodenrichtwert abrufen",
    subtitle: "Die amtlichen Portale aller 16 Bundesländer mit Direktlink",
  });
}
