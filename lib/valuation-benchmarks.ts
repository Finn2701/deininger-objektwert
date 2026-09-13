/**
 * Regional price benchmarks for the rough valuation estimate.
 *
 * These are NOT live-scraped — they're manually calibrated from published
 * regional market reports and refreshed occasionally on request ("aktualisier
 * den Richtwert"), not on every visitor's submission. A live per-request scan
 * of a portal like ImmoScout24/thinkimmo would violate their terms of use and
 * is disproportionate for a small side project — see the conversation this
 * file was created in for the full reasoning.
 *
 * Sources (checked 2026-09-13):
 * - https://www.engelvoelkers.com/de-de/immobilienpreise/baden-wuerttemberg/heidenheim-an-der-brenz/
 * - https://www.immoscout24.de/immobilienpreise/baden-wuerttemberg/heidenheim-kreis
 * - https://www.immowelt.de/immobilienpreise/baden-wurttemberg/heidenheim-an-der-brenz-89518/ad08de5538
 * - https://www.immoverkauf24.de/immobilienpreise/baden-wuerttemberg/heidenheim-kreis/
 * - https://www.miete-aktuell.de/bodenrichtwert-grundstueckspreise/Heidenheim-an-der-Brenz/Heidenheim-an-der-Brenz/
 *   (average of houses ~2.575–3.270 €/m², Eigentumswohnungen ~2.195–3.082 €/m²,
 *   Bodenrichtwert (Grundstück) ~475 €/m²)
 */
export const benchmarkMeta = {
  region: "Heidenheim an der Brenz",
  lastUpdated: "2026-09-13",
  note: "Manuell kalibrierter Richtwert, kein Live-Scan. Auf Zuruf aktualisierbar.",
};

/** €/m² Wohnfläche, before condition/age adjustments. */
export const pricePerSqmByType: Record<string, number> = {
  haus: 2900,
  wohnung: 2850,
  mehrfamilienhaus: 2600, // multi-family typically trades at a discount per m² vs. owner-occupied
  grundstueck: 0, // land-only: valued via plotPricePerSqm below, not living area
};

/** €/m² Grundstücksfläche (Bodenrichtwert-based), used for the land component. */
export const plotPricePerSqm = 475;

export type YearBuiltBucket = "vor-1950" | "1950-1970" | "1970-1990" | "1990-2010" | "nach-2010" | "unbekannt";

/** Multiplier applied to the living-area value based on build era. */
export const yearBuiltMultiplier: Record<YearBuiltBucket, number> = {
  "vor-1950": 0.82,
  "1950-1970": 0.85,
  "1970-1990": 0.92,
  "1990-2010": 1.0,
  "nach-2010": 1.12,
  unbekannt: 0.92,
};

export type ConditionLevel = "unsaniert" | "teilsaniert" | "modernisiert";

/** Multiplier for overall condition (heating/electric/pipes/modernization). */
export const conditionMultiplier: Record<ConditionLevel, number> = {
  unsaniert: 0.85,
  teilsaniert: 0.96,
  modernisiert: 1.1,
};

export type BathroomCount = "1" | "2" | "3+";

/** A second bathroom is a real value driver; a third adds less on top. */
export const bathroomMultiplier: Record<BathroomCount, number> = {
  "1": 1,
  "2": 1.04,
  "3+": 1.07,
};

/** A self-contained unit with its own kitchen (Einliegerwohnung) adds rental potential. */
export const separateUnitBonus = 1.06;
