/**
 * Regional price benchmarks for the rough valuation estimate.
 *
 * The base €/m² figures below are NOT live-scraped — they're manually
 * calibrated from published regional market reports for Heidenheim, refreshed
 * occasionally on request, not on every visitor's submission. A live
 * per-request scan of a portal like ImmoScout24/thinkimmo would violate their
 * terms of use and is disproportionate for a small side project — see the
 * conversation this file was created in for the full reasoning.
 *
 * Nationwide reach comes from a different, legitimate mechanism instead: the
 * visitor's typed location is geocoded live (see lib/geocoding.ts, OpenStreetMap
 * /Nominatim) to a state/city, which selects a manually-researched regional
 * multiplier (below) applied to the Heidenheim baseline — so a submission from
 * Munich or Berlin doesn't get priced as if it were in Heidenheim.
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

/**
 * Regional price factor relative to the Heidenheim baseline above (1.0 =
 * Heidenheim price level). The visitor's location is resolved live via
 * OpenStreetMap/Nominatim (see lib/geocoding.ts) so the tool works anywhere
 * in Germany, not just Heidenheim — but the factors themselves are manually
 * calibrated from generally published regional market levels (comparable to
 * reports by empirica-systeme, Wüest Partner, and similar aggregators), the
 * same "researched, not live-scraped" approach as the Heidenheim numbers
 * above. Intentionally coarse (state-level, plus a handful of major-city
 * overrides) — good enough to put a property in the right price bracket,
 * not a substitute for a local appraisal.
 */
export const cityFactor: Record<string, number> = {
  münchen: 2.8,
  frankfurt: 1.75,
  "frankfurt am main": 1.75,
  stuttgart: 1.55,
  hamburg: 1.8,
  berlin: 1.6,
  köln: 1.35,
  koeln: 1.35,
  düsseldorf: 1.3,
  duesseldorf: 1.3,
  nürnberg: 1.4,
  nuernberg: 1.4,
  augsburg: 1.2,
  freiburg: 1.4,
  mainz: 1.3,
  wiesbaden: 1.3,
  hannover: 1.0,
  leipzig: 0.9,
  dresden: 0.95,
  bremen: 0.9,
  heidenheim: 1.0,
  "heidenheim an der brenz": 1.0,
};

export const stateFactor: Record<string, number> = {
  "baden-württemberg": 1.05,
  "baden-wuerttemberg": 1.05,
  bayern: 1.3,
  berlin: 1.6,
  brandenburg: 0.85,
  bremen: 0.9,
  hamburg: 1.8,
  hessen: 1.1,
  "mecklenburg-vorpommern": 0.65,
  niedersachsen: 0.75,
  "nordrhein-westfalen": 0.85,
  "rheinland-pfalz": 0.8,
  saarland: 0.6,
  sachsen: 0.65,
  "sachsen-anhalt": 0.5,
  "schleswig-holstein": 0.9,
  thüringen: 0.55,
  thueringen: 0.55,
};

function normalize(value: string): string {
  // Lowercase only — city/state keys below keep their German umlauts, so
  // stripping diacritics here would make "München" miss the "münchen" key.
  return value.toLowerCase().trim();
}

/**
 * Picks the most specific match available: exact city override, then the
 * Kreis-level "Heidenheim" special case (so the Kreis, not just the city,
 * keeps the precise local numbers), then the state average, then the
 * Heidenheim baseline (factor 1) if nothing resolved at all.
 */
export function resolveRegionFactor(geo: { state: string | null; county: string | null; city: string | null } | null): {
  factor: number;
  label: string | null;
} {
  if (!geo) return { factor: 1, label: null };

  const cityKey = geo.city ? normalize(geo.city) : null;
  const countyKey = geo.county ? normalize(geo.county) : null;
  const stateKey = geo.state ? normalize(geo.state) : null;

  if (cityKey && cityFactor[cityKey] !== undefined) {
    return { factor: cityFactor[cityKey], label: geo.city };
  }
  if (countyKey?.includes("heidenheim")) {
    return { factor: 1, label: geo.county };
  }
  if (stateKey && stateFactor[stateKey] !== undefined) {
    return { factor: stateFactor[stateKey], label: geo.state };
  }
  return { factor: 1, label: geo.city ?? geo.state ?? null };
}

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

export type FeatureId =
  | "zweites-bad"
  | "neue-kueche"
  | "aussenbereich"
  | "keller"
  | "stellplatz"
  | "einliegerwohnung";

/** Each selected feature adds its share on top of the base value; effects are additive, not compounding. */
export const featureBonus: Record<FeatureId, number> = {
  "zweites-bad": 0.03,
  "neue-kueche": 0.02,
  aussenbereich: 0.02,
  keller: 0.015,
  stellplatz: 0.02,
  einliegerwohnung: 0.06, // self-contained unit with its own kitchen adds rental potential
};
