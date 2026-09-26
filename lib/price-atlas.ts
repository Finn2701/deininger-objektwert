import { cityPagePath, cityPages, cityRegionFactor } from "@/lib/city-pages";
import { benchmarkMeta } from "@/lib/valuation-benchmarks";

export interface PriceRow {
  slug: string;
  name: string;
  kreis: string;
  haus: number;
  wohnung: number;
  factor: number;
  asOf: string;
  path: string;
  sourceUrl: string;
}

export function getPriceRows(): PriceRow[] {
  return cityPages
    .map((city) => ({
      slug: city.slug,
      name: city.name,
      kreis: city.kreis,
      haus: city.prices.haus,
      wohnung: city.prices.wohnung,
      factor: cityRegionFactor(city),
      asOf: city.prices.asOf,
      path: cityPagePath(city),
      sourceUrl: city.prices.sources[0]?.url ?? "",
    }))
    .sort((a, b) => b.haus - a.haus);
}

export function median(values: number[]) {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : Math.round((sorted[mid - 1] + sorted[mid]) / 2);
}

export const PRICE_ATLAS_PATH = "/immobilienpreise-ostwuerttemberg";
export const PRICE_ATLAS_CSV_PATH = "/immobilienpreise-ostwuerttemberg.csv";
export const priceAtlasUpdated = benchmarkMeta.lastUpdated;

export function priceRowsToCsv(rows: PriceRow[], baseUrl: string) {
  const header = [
    "Ort",
    "Landkreis",
    "Haus in Euro pro Quadratmeter",
    "Wohnung in Euro pro Quadratmeter",
    "Regionalfaktor (Heidenheim = 1,00)",
    "Preisstand",
    "Ortsseite",
    "Erste Quelle",
  ];
  const escape = (value: string | number) => `"${String(value).replace(/"/g, '""')}"`;
  const lines = rows.map((row) =>
    [
      row.name,
      row.kreis,
      row.haus,
      row.wohnung,
      row.factor.toFixed(2).replace(".", ","),
      row.asOf,
      `${baseUrl}${row.path}`,
      row.sourceUrl,
    ]
      .map(escape)
      .join(";")
  );
  // BOM, damit Excel die Umlaute richtig liest; Semikolon als Trennzeichen für deutsche Excel-Einstellungen.
  return `﻿${[header.map(escape).join(";"), ...lines].join("\r\n")}\r\n`;
}
