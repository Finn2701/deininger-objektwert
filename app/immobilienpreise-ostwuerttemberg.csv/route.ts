import { getPriceRows, priceRowsToCsv } from "@/lib/price-atlas";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 3600;

export function GET() {
  return new Response(priceRowsToCsv(getPriceRows(), siteConfig.url), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'inline; filename="immobilienpreise-ostwuerttemberg.csv"',
    },
  });
}
