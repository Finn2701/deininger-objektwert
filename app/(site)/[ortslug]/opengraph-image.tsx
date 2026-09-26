import { CITY_PAGE_PREFIX, cityPages, getCityPageBySlug } from "@/lib/city-pages";
import { ogCard, ogSize } from "@/lib/og-card";

export const size = ogSize;
export const contentType = "image/png";

export async function generateStaticParams() {
  return cityPages.map((city) => ({ ortslug: `${CITY_PAGE_PREFIX}${city.slug}` }));
}

export default async function Image({ params }: { params: Promise<{ ortslug: string }> }) {
  const { ortslug } = await params;
  const city = getCityPageBySlug(ortslug);
  const euro = (value: number) => new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0 }).format(value);

  return ogCard({
    kicker: "Immobilienbewertung",
    title: city ? `Immobilie bewerten in ${city.name}` : "Immobilienbewertung",
    subtitle: city
      ? `Haus ca. ${euro(city.prices.haus)} €/m² · Wohnung ca. ${euro(city.prices.wohnung)} €/m² · Stand ${city.prices.asOf}`
      : undefined,
  });
}
