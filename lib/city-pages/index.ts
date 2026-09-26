import { cityFactor } from "@/lib/valuation-benchmarks";
import { aalen } from "./aalen";
import { ellwangen } from "./ellwangen";
import { giengen } from "./giengen";
import { heidenheim } from "./heidenheim";
import { herbrechtingen } from "./herbrechtingen";
import { oberkochen } from "./oberkochen";
import { schwaebischGmuend } from "./schwaebisch-gmuend";
import { ulm } from "./ulm";
import { koenigsbronn } from "./koenigsbronn";
import { nattheim } from "./nattheim";
import { steinheimAmAlbuch } from "./steinheim-am-albuch";
import { gerstetten } from "./gerstetten";
import { sontheimAnDerBrenz } from "./sontheim-an-der-brenz";
import { dischingen } from "./dischingen";
import { niederstotzingen } from "./niederstotzingen";
import { bopfingen } from "./bopfingen";
import { neresheim } from "./neresheim";
import type { CityPage } from "./types";

export type { CityPage } from "./types";

export const cityPages: CityPage[] = [
  heidenheim,
  aalen,
  ulm,
  giengen,
  schwaebischGmuend,
  herbrechtingen,
  oberkochen,
  ellwangen,
  koenigsbronn,
  nattheim,
  steinheimAmAlbuch,
  gerstetten,
  sontheimAnDerBrenz,
  dischingen,
  niederstotzingen,
  bopfingen,
  neresheim,
];

export const CITY_PAGE_PREFIX = "immobilienbewertung-";

export function cityPagePath(city: CityPage): string {
  return `/${CITY_PAGE_PREFIX}${city.slug}`;
}

export function getCityPageBySlug(pathSegment: string): CityPage | undefined {
  if (!pathSegment.startsWith(CITY_PAGE_PREFIX)) return undefined;
  const slug = pathSegment.slice(CITY_PAGE_PREFIX.length);
  return cityPages.find((city) => city.slug === slug);
}

/** Regionalfaktor aus dem echten Rechner (Heidenheim = 1,00) -- Ortsseite und Rechner nutzen dieselbe Quelle. */
export function cityRegionFactor(city: CityPage): number {
  return cityFactor[city.factorKey] ?? 1;
}
