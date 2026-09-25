import { resolveLocation } from "./geocoding";
import {
  conditionMultiplier,
  energyClassMultiplier as sharedEnergyClassMultiplier,
  featureBonus,
  floorLevelMultiplier,
  moistureIssuesMultiplier,
  pricePerSqmByType,
  plotPricePerSqm,
  resolveRegionFactor,
  topFloorElevatorBonus,
  yearBuiltMultiplier,
  type ConditionLevel,
  type EnergyClass,
  type FeatureId,
  type FloorLevel,
  type YearBuiltBucket,
} from "./valuation-benchmarks";

/**
 * The internal, detailed assessment — richer than the public quick-estimate
 * form. Every field is optional ("weiß nicht" is a first-class answer, not
 * an error) since the whole point is that the agent fills in what they
 * actually know from a site visit / phone call and leaves the rest blank.
 * More answered fields -> a tighter, more confident range, not a different
 * calculation path.
 */
export type Rating = "sehr-gut" | "gut" | "mittel" | "einfach" | null;
export type YesNoUnknown = "ja" | "nein" | null;

export interface ProAssessment {
  propertyType: "haus" | "wohnung" | "grundstueck" | "mehrfamilienhaus" | null;
  address: string;
  yearBuilt: YearBuiltBucket | null;
  condition: ConditionLevel | null;

  // A. Lage
  microLocation: Rating;
  noise: "keine" | "gering" | "erheblich" | null;
  publicTransport: Rating;
  amenities: Rating;

  // B. Gebäude & Fläche
  yearBuiltExact: string;
  livingArea: string;
  plotArea: string;
  rooms: string;
  bathrooms: string;
  floors: string;

  // C. Zustand im Detail
  roof: "neu-saniert" | "gepflegt" | "renovierungsbeduerftig" | null;
  facade: "modernisiert" | "teilweise" | "unsaniert" | null;
  windows: "mehrfachverglast" | "teilweise" | "einfachverglast" | null;
  heating: "waermepumpe" | "gas-oel-neu" | "gas-oel-alt" | "fernwaerme" | null;
  electrics: "erneuert" | "teilweise" | "original" | null;
  basement: "trocken-ausgebaut" | "trocken" | "feucht" | "kein-keller" | null;

  // D. Energie
  energyClass: string; // "A+".."H" or ""
  energyValue: string; // kWh/m²a, free text/number

  // Etage + Aufzug (wohnung only — same value drivers as the public
  // calculator, see valuation-benchmarks.ts floorLevelMultiplier)
  floorLevel: FloorLevel | null;
  hasElevator: YesNoUnknown;

  // Gesamteindruck bei Besichtigung: riecht/wirkt die Immobilie unauffällig,
  // oder gibt es wahrnehmbare Feuchtigkeits-/Schimmel-/Geruchsauffälligkeiten
  // über den reinen Kellerzustand (siehe `basement` oben) hinaus? Das ist der
  // vor-Ort-Eindruck, den ein Sachverständiger als ersten Hinweis auf
  // Feuchteschäden nutzt.
  odorImpression: "unauffaellig" | "leicht-auffaellig" | "deutlich-auffaellig" | null;

  // E. Ausstattung (reuse the public form's feature ids where they overlap)
  features: FeatureId[];

  // F. Besonderheiten
  heritageProtection: YesNoUnknown;
  leaseholdLand: YesNoUnknown;
  rented: YesNoUnknown;
  rentedIncome: string;
  renovationBacklog: "keiner" | "gering" | "erheblich" | null;

  // G. Eigene Einschätzung
  knownLandValue: string; // €/m², overrides the geocoded plot price if set
  marketNotes: string; // free text
}

export const emptyAssessment: ProAssessment = {
  propertyType: null,
  address: "",
  yearBuilt: null,
  condition: null,
  microLocation: null,
  noise: null,
  publicTransport: null,
  amenities: null,
  yearBuiltExact: "",
  livingArea: "",
  plotArea: "",
  rooms: "",
  bathrooms: "",
  floors: "",
  roof: null,
  facade: null,
  windows: null,
  heating: null,
  electrics: null,
  basement: null,
  energyClass: "",
  energyValue: "",
  floorLevel: null,
  hasElevator: null,
  odorImpression: null,
  features: [],
  heritageProtection: null,
  leaseholdLand: null,
  rented: null,
  rentedIncome: "",
  renovationBacklog: null,
  knownLandValue: "",
  marketNotes: "",
};

const ratingMultiplier: Record<Exclude<Rating, null>, number> = {
  "sehr-gut": 1.08,
  gut: 1.03,
  mittel: 1,
  einfach: 0.93,
};

const roofMultiplier = { "neu-saniert": 1.04, gepflegt: 1, renovierungsbeduerftig: 0.93 } as const;
const facadeMultiplier = { modernisiert: 1.05, teilweise: 1, unsaniert: 0.92 } as const;
const windowsMultiplier = { mehrfachverglast: 1.02, teilweise: 1, einfachverglast: 0.95 } as const;
const heatingMultiplier = {
  waermepumpe: 1.05,
  "gas-oel-neu": 1.02,
  "gas-oel-alt": 0.96,
  fernwaerme: 1.01,
} as const;
const electricsMultiplier = { erneuert: 1.03, teilweise: 1, original: 0.94 } as const;
const basementMultiplier = {
  "trocken-ausgebaut": 1.03,
  trocken: 1,
  feucht: 0.96,
  "kein-keller": 0.98,
} as const;
const renovationBacklogMultiplier = { keiner: 1, gering: 0.97, erheblich: 0.88 } as const;
const noiseMultiplier = { keine: 1, gering: 0.98, erheblich: 0.93 } as const;
const odorMultiplier = { unauffaellig: 1, "leicht-auffaellig": 0.97, "deutlich-auffaellig": moistureIssuesMultiplier } as const;

/** "A+".."H" (this form's display format) -> the shared benchmark's key format ("a-plus".."h"). */
function toSharedEnergyClassKey(display: string): EnergyClass | null {
  const key = display.trim().toLowerCase().replace("+", "-plus");
  const valid: EnergyClass[] = ["a-plus", "a", "b", "c", "d", "e", "f", "g", "h"];
  return (valid as string[]).includes(key) ? (key as EnergyClass) : null;
}

export interface ProEstimate {
  low: number;
  high: number;
  headline: number;
  region: string;
  regionMatched: boolean;
  confidence: "niedrig" | "mittel" | "hoch";
  answeredFields: number;
  totalFields: number;
}

function roundTo(value: number, step: number) {
  return Math.round(value / step) * step;
}

/**
 * Fields that count toward the "how much do we actually know" confidence
 * score. Floor/lift only exist for apartments — counting them for a house
 * would permanently cap its achievable confidence, since they'd always be
 * null — so the field list is type-aware rather than a single flat list.
 */
function confidenceFields(propertyType: ProAssessment["propertyType"]): (keyof ProAssessment)[] {
  const base: (keyof ProAssessment)[] = [
    "microLocation",
    "noise",
    "publicTransport",
    "amenities",
    "roof",
    "facade",
    "windows",
    "heating",
    "electrics",
    "basement",
    "energyClass",
    "heritageProtection",
    "leaseholdLand",
    "renovationBacklog",
    "odorImpression",
  ];
  return propertyType === "wohnung" ? [...base, "floorLevel", "hasElevator"] : base;
}

export async function computeProEstimate(a: ProAssessment): Promise<ProEstimate | null> {
  const livingArea = Number(a.livingArea) || 0;
  const plotArea = Number(a.plotArea) || 0;

  const geo = await resolveLocation(a.address);
  const { factor: regionFactor, label: regionLabel } = resolveRegionFactor(geo);
  const knownLandValue = Number(a.knownLandValue) || 0;
  const scaledPlotPrice = knownLandValue > 0 ? knownLandValue : plotPricePerSqm * regionFactor;

  let mid: number;
  const isLand = a.propertyType === "grundstueck";

  if (isLand) {
    if (plotArea <= 0) return null;
    mid = plotArea * scaledPlotPrice;
  } else {
    if (!a.propertyType || livingArea <= 0) return null;

    let value = pricePerSqmByType[a.propertyType] * regionFactor * livingArea;

    if (a.yearBuilt) value *= yearBuiltMultiplier[a.yearBuilt];
    if (a.condition) value *= conditionMultiplier[a.condition];

    if (a.microLocation) value *= ratingMultiplier[a.microLocation];
    if (a.noise) value *= noiseMultiplier[a.noise];
    if (a.publicTransport) value *= ratingMultiplier[a.publicTransport];
    if (a.amenities) value *= ratingMultiplier[a.amenities];
    if (a.roof) value *= roofMultiplier[a.roof];
    if (a.facade) value *= facadeMultiplier[a.facade];
    if (a.windows) value *= windowsMultiplier[a.windows];
    if (a.heating) value *= heatingMultiplier[a.heating];
    if (a.electrics) value *= electricsMultiplier[a.electrics];
    if (a.basement) value *= basementMultiplier[a.basement];
    if (a.renovationBacklog) value *= renovationBacklogMultiplier[a.renovationBacklog];
    if (a.odorImpression) value *= odorMultiplier[a.odorImpression];

    // Same, more accurately sourced ladder as the public calculator (see
    // valuation-benchmarks.ts) — replaces this form's own older, flatter
    // estimate now that both tools can share one researched source.
    const sharedEnergyKey = toSharedEnergyClassKey(a.energyClass);
    if (sharedEnergyKey) {
      const ladder = a.propertyType === "wohnung" ? sharedEnergyClassMultiplier.wohnung : sharedEnergyClassMultiplier.haus;
      value *= ladder[sharedEnergyKey];
    }

    if (a.propertyType === "wohnung" && a.floorLevel) {
      let floorFactor = floorLevelMultiplier[a.floorLevel];
      if (a.floorLevel === "oberste-etage" && a.hasElevator === "ja") floorFactor += topFloorElevatorBonus;
      value *= floorFactor;
    }

    if (a.heritageProtection === "ja") value *= 0.95;
    if (a.leaseholdLand === "ja") value *= 0.85;

    const featureMultiplier = 1 + a.features.reduce((sum, id) => sum + (featureBonus[id] ?? 0), 0);
    value *= featureMultiplier;

    const typicalPlot = 500;
    const plotBonus =
      a.propertyType !== "wohnung" && plotArea > typicalPlot
        ? (plotArea - typicalPlot) * scaledPlotPrice * 0.5
        : 0;

    mid = value + plotBonus;
  }

  if (!Number.isFinite(mid) || mid <= 0) return null;

  // Land has no confidence checklist of its own — the only thing left to
  // know beyond plot area is whether we have a locally known Bodenrichtwert
  // instead of the geocoded regional guess.
  const answeredFields = isLand
    ? knownLandValue > 0
      ? 1
      : 0
    : confidenceFields(a.propertyType).filter((key) => a[key] !== null && a[key] !== "").length;
  const totalFields = isLand ? 1 : confidenceFields(a.propertyType).length;
  const completeness = answeredFields / totalFields;

  // More known fields -> tighter, more confident range: 22% wide at zero
  // knowledge, down to 10% wide with everything filled in.
  const spread = 0.22 - completeness * 0.12;
  const low = roundTo(mid * (1 - spread * 0.55), 2500);
  const high = roundTo(mid * (1 + spread * 0.45), 2500);
  const headline = roundTo(mid, 2500);

  const confidence: ProEstimate["confidence"] =
    completeness >= 0.65 ? "hoch" : completeness >= 0.3 ? "mittel" : "niedrig";

  return {
    low,
    high,
    headline,
    region: regionLabel ?? "Heidenheim an der Brenz",
    regionMatched: regionLabel !== null,
    confidence,
    answeredFields,
    totalFields,
  };
}
