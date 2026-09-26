import type { SettlementTier } from "./geocoding";

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
  lastUpdated: "2026-09-26",
  note: "Manuell kalibrierter Richtwert, kein Live-Scan. Auf Zuruf aktualisierbar.",
};

/**
 * Regional price factor relative to the Heidenheim baseline above (1.0 =
 * Heidenheim price level, ~2.875 €/m² blended). The visitor's location is
 * resolved live via OpenStreetMap/Nominatim (see lib/geocoding.ts) so the
 * tool works anywhere in Germany, not just Heidenheim.
 *
 * Refreshed 2026-09-22 against current published city-level €/m² figures
 * (immowelt's September-2026 city comparison and the national
 * ImmoScout24/Statista averages) for the directly-cited cities below;
 * everything else is judged from generally known regional price tiers the
 * same "researched, not live-scraped" way the original Heidenheim numbers
 * were — intentionally coarse, good enough to put a property in the right
 * bracket, never a substitute for a local appraisal. Covers at least one
 * anchor city per federal state plus a handful of well-known secondary
 * cities, so a submission from anywhere in Germany lands close to the right
 * price level even before the settlement-tier fallback below kicks in.
 *
 * Directly sourced (2026-09-22): München 8.181, Hamburg 5.921, Frankfurt
 * 5.524, Berlin 4.990, Köln 4.876, Düsseldorf 4.568, Stuttgart 4.418,
 * Dortmund 2.739, Dresden 3.087 €/m² (immowelt); national blended average
 * 3.164 €/m² (ImmoScout24/Statista).
 */
export const cityFactor: Record<string, number> = {
  // Umland Heidenheim/Ostalb (Faktor = Mittel aus Haus- und Wohnungspreis relativ zu Heidenheim, Stand 09/2026)
  königsbronn: 0.91,
  koenigsbronn: 0.91,
  nattheim: 0.9,
  "steinheim am albuch": 0.93,
  gerstetten: 0.89,
  "sontheim an der brenz": 0.96,
  dischingen: 0.9,
  niederstotzingen: 0.92,
  bopfingen: 0.91,
  neresheim: 0.92,
  // Bayern
  münchen: 2.85,
  nürnberg: 1.29,
  nuernberg: 1.29,
  augsburg: 1.11,
  regensburg: 1.5,
  würzburg: 1.25,
  wuerzburg: 1.25,
  ingolstadt: 1.18,
  // Baden-Württemberg
  stuttgart: 1.54,
  freiburg: 1.46,
  "freiburg im breisgau": 1.46,
  karlsruhe: 1.11,
  mannheim: 0.94,
  heilbronn: 0.9,
  // Ulm neu kalibriert 2026-09-26: immowelt (Aug. 2026) Haus 4.535 / Wohnung
  // 4.320 €/m² -> Ø 4.428 / 2.875 = 1,54 (vorher grob geschätzt 1,15).
  ulm: 1.54,
  // Ostwürttemberg (2026-09-26, Faktor = Ø aus Haus- und Wohnungspreis laut
  // Portalauswertungen / 2.875 €/m² Heidenheim-Basis, siehe lib/city-pages):
  aalen: 1.19,
  giengen: 0.99,
  "giengen an der brenz": 0.99,
  herbrechtingen: 0.97,
  oberkochen: 0.99,
  ellwangen: 1.0,
  "ellwangen (jagst)": 1.0,
  "schwäbisch gmünd": 1.14,
  "schwaebisch gmuend": 1.14,
  tübingen: 1.5,
  tuebingen: 1.5,
  heidenheim: 1.0,
  "heidenheim an der brenz": 1.0,
  // Berlin / Brandenburg
  berlin: 1.74,
  potsdam: 1.46,
  cottbus: 0.49,
  // Bremen
  bremen: 1.01,
  // Hamburg
  hamburg: 2.06,
  // Hessen
  frankfurt: 1.92,
  "frankfurt am main": 1.92,
  wiesbaden: 1.32,
  darmstadt: 1.25,
  kassel: 0.7,
  // Mecklenburg-Vorpommern
  rostock: 0.94,
  // Niedersachsen
  hannover: 1.11,
  braunschweig: 0.83,
  oldenburg: 0.9,
  osnabrück: 0.87,
  osnabrueck: 0.87,
  // Nordrhein-Westfalen
  köln: 1.7,
  koeln: 1.7,
  düsseldorf: 1.59,
  duesseldorf: 1.59,
  dortmund: 0.95,
  essen: 0.73,
  bonn: 1.36,
  münster: 1.32,
  muenster: 1.32,
  aachen: 1.11,
  duisburg: 0.59,
  // Rheinland-Pfalz
  mainz: 1.32,
  trier: 1.01,
  koblenz: 0.94,
  kaiserslautern: 0.73,
  // Saarland
  saarbrücken: 0.66,
  saarbruecken: 0.66,
  // Sachsen
  leipzig: 0.9,
  dresden: 1.07,
  chemnitz: 0.45,
  // Sachsen-Anhalt
  magdeburg: 0.56,
  halle: 0.59,
  "halle (saale)": 0.59,
  // Schleswig-Holstein
  kiel: 1.01,
  lübeck: 1.11,
  luebeck: 1.11,
  // Thüringen
  erfurt: 0.73,
  jena: 0.94,
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
 * A state's average factor blends its big cities with its many villages, so
 * a place Nominatim couldn't map to an explicit city/state entry above
 * shouldn't just inherit the flat state average — that would price a real
 * city the same as a hamlet. This nudges the state average up or down based
 * on which Nominatim address field actually matched (see SettlementTier in
 * lib/geocoding.ts): a "city"-tier place is probably a real town above the
 * state's blended average, a "village" is probably below it. Coarse on
 * purpose — it only fires when there's no better, explicit match.
 */
export const settlementTierAdjustment: Record<Exclude<SettlementTier, null>, number> = {
  city: 1.15,
  town: 1.0,
  village: 0.85,
};

/**
 * Picks the most specific match available: exact city override, then the
 * Kreis-level "Heidenheim" special case (so the Kreis, not just the city,
 * keeps the precise local numbers), then the state average adjusted for
 * settlement tier, then the Heidenheim baseline (factor 1) if nothing
 * resolved at all.
 */
export function resolveRegionFactor(
  geo: {
    state: string | null;
    county: string | null;
    city: string | null;
    settlementTier?: SettlementTier;
  } | null
): {
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
    const tierAdjustment = geo.settlementTier ? settlementTierAdjustment[geo.settlementTier] : 1.0;
    return { factor: stateFactor[stateKey] * tierAdjustment, label: geo.city ?? geo.state };
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

export type EnergyClass = "a-plus" | "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h";

/**
 * Multiplier ladder centered on class D ("mittel", 1.0). Grounded in current
 * published studies (checked 2026-09-22): immowelt/JLL report up to ~23%
 * premium for A+/A apartments and ~16% for A+ houses vs. class D, a ~28.7%
 * spread top-to-bottom overall, and a notably flatter curve for apartments
 * than houses (a class-H apartment is only ~4% cheaper than class D, while
 * the effect compounds much faster for houses). Two separate ladders reflect
 * that asymmetry; "unbekannt" (not asked/not known) applies no adjustment.
 * Sources: immowelt "Preisfaktor Energieeffizienz" (2025), JLL analysis
 * cited therein.
 */
export const energyClassMultiplier: {
  haus: Record<EnergyClass, number>;
  wohnung: Record<EnergyClass, number>;
} = {
  haus: {
    "a-plus": 1.16,
    a: 1.13,
    b: 1.08,
    c: 1.04,
    d: 1.0,
    e: 0.95,
    f: 0.9,
    g: 0.85,
    h: 0.82,
  },
  wohnung: {
    "a-plus": 1.23,
    a: 1.2,
    b: 1.1,
    c: 1.04,
    d: 1.0,
    e: 0.99,
    f: 0.98,
    g: 0.97,
    h: 0.96,
  },
};

export type FloorLevel = "erdgeschoss" | "mittlere-etage" | "oberste-etage";

/**
 * Wohnung-only adjustment for floor position. Ground floor trades at a
 * discount (less privacy/light, often no balcony); the top floor is only a
 * premium when there's an elevator (walk-up top floors are a known negative
 * for buyers) — see `topFloorElevatorBonus` below, applied on top of this.
 * Middle floors are the neutral case. Source: current German market
 * reporting on floor-level pricing (immobilien-erfahrung.de, mieten-und
 * -leben.de, checked 2026-09-22) — directional and coarse, not a precise
 * per-floor coefficient.
 */
export const floorLevelMultiplier: Record<FloorLevel, number> = {
  erdgeschoss: 0.95,
  "mittlere-etage": 1.0,
  "oberste-etage": 1.0,
};

/** Extra premium for a top-floor apartment specifically when there's a lift; without one, top floor stays neutral. */
export const topFloorElevatorBonus = 0.05;

/**
 * A musty/damp smell is the standard lay indicator of the moisture and mould
 * damage professional Bausachverständige specifically check for, and such
 * damage is expensive to remediate — so this is a real, defensible penalty,
 * not just a cosmetic detail. There is no single published percentage for
 * this (unlike the energy-class figures above), so the size of the discount
 * is a deliberately moderate, transparent estimation heuristic rather than a
 * cited statistic.
 */
export const moistureIssuesMultiplier = 0.92;
