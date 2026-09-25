import type { ValuationFormData } from "@/components/valuation-form/types";
import { resolveLocation } from "./geocoding";
import {
  benchmarkMeta,
  conditionMultiplier,
  energyClassMultiplier,
  featureBonus,
  floorLevelMultiplier,
  moistureIssuesMultiplier,
  plotPricePerSqm,
  pricePerSqmByType,
  resolveRegionFactor,
  topFloorElevatorBonus,
  yearBuiltMultiplier,
} from "./valuation-benchmarks";

export type EstimatePrecision = "basis" | "erweitert" | "detailliert";

export interface ValuationEstimate {
  low: number;
  high: number;
  headline: number;
  region: string;
  asOf: string;
  regionMatched: boolean;
  /** How many of the optional accuracy-improving fields were filled in — drives both the range width above and the frontend's precision label. */
  precision: EstimatePrecision;
}

const TYPICAL_HOUSE_PLOT_SQM = 500;

function roundTo(value: number, step: number) {
  return Math.round(value / step) * step;
}

/**
 * Every optional field the visitor could still fill in narrows the range
 * below — "genauer mit mehr Angaben" is meant literally, not just as copy.
 * Land submissions only ever ask for plot area, so there's nothing further
 * to narrow on and this always returns 1 (full precision) for them.
 */
function precisionRatio(data: ValuationFormData): number {
  if (!data.propertyType || data.propertyType === "grundstueck") return 1;

  const signals: boolean[] = [
    data.energyClass !== null,
    data.moistureIssues !== null,
    data.features.length > 0,
  ];

  if (data.propertyType === "wohnung") {
    signals.push(data.floorLevel !== null, data.hasElevator !== null);
  } else {
    signals.push(data.plotArea.trim().length > 0);
  }

  return signals.filter(Boolean).length / signals.length;
}

function precisionLabel(ratio: number): EstimatePrecision {
  if (ratio >= 0.67) return "detailliert";
  if (ratio >= 0.34) return "erweitert";
  return "basis";
}

/**
 * Rough, transparent first estimate — not a certified appraisal. Returns a
 * range rather than a single number on purpose: a single "precise" figure
 * would overstate how much a handful of form answers can actually know. The
 * range starts at a wide ±12%/+10% spread and narrows (see precisionRatio)
 * as the visitor fills in the optional accuracy fields — energy class,
 * moisture/odor check, floor+lift for apartments — so "more info, tighter
 * estimate" is an actual computed effect, not just copy on the page. The
 * headline sits in the lower third of the range by design, so a visitor
 * sees an approachable number rather than an optimistic ceiling.
 *
 * Resolves the visitor's typed location live (OpenStreetMap/Nominatim) so
 * the Heidenheim baseline prices scale to wherever in Germany the property
 * actually is, rather than being applied everywhere unchanged. Async
 * because of that lookup; a failed or slow lookup still returns a usable
 * estimate at the Heidenheim baseline (factor 1) rather than blocking.
 */
export async function estimateValue(data: ValuationFormData): Promise<ValuationEstimate | null> {
  const livingArea = Number(data.livingArea) || 0;
  const plotArea = Number(data.plotArea) || 0;

  const geo = await resolveLocation(data.location);
  const { factor: regionFactor, label: regionLabel } = resolveRegionFactor(geo);
  const scaledPlotPrice = plotPricePerSqm * regionFactor;

  let mid: number;
  let isLand = false;

  if (data.propertyType === "grundstueck") {
    isLand = true;
    if (plotArea <= 0) return null;
    mid = plotArea * scaledPlotPrice;
  } else {
    if (!data.propertyType || livingArea <= 0 || !data.yearBuilt || !data.condition) return null;

    const base = pricePerSqmByType[data.propertyType] * regionFactor * livingArea;
    const featureMultiplier = 1 + data.features.reduce((sum, id) => sum + (featureBonus[id] ?? 0), 0);

    const energyLadder = data.propertyType === "wohnung" ? energyClassMultiplier.wohnung : energyClassMultiplier.haus;
    const energyFactor = data.energyClass ? energyLadder[data.energyClass] : 1;

    let floorFactor = 1;
    if (data.propertyType === "wohnung" && data.floorLevel) {
      floorFactor = floorLevelMultiplier[data.floorLevel];
      if (data.floorLevel === "oberste-etage" && data.hasElevator) {
        floorFactor += topFloorElevatorBonus;
      }
    }

    const moistureFactor = data.moistureIssues ? moistureIssuesMultiplier : 1;

    const adjusted =
      base *
      yearBuiltMultiplier[data.yearBuilt] *
      conditionMultiplier[data.condition] *
      featureMultiplier *
      energyFactor *
      floorFactor *
      moistureFactor;

    const plotBonus =
      data.propertyType !== "wohnung" && plotArea > TYPICAL_HOUSE_PLOT_SQM
        ? (plotArea - TYPICAL_HOUSE_PLOT_SQM) * scaledPlotPrice * 0.5
        : 0;

    mid = adjusted + plotBonus;
  }

  if (!Number.isFinite(mid) || mid <= 0) return null;

  const ratio = isLand ? 0 : precisionRatio(data);
  // Base spread (0.88–1.10) matches the original, single fixed spread; each
  // filled-in optional field tightens it, up to ±7 percentage points at
  // full precision. Land has nothing further to narrow on, so it keeps the
  // original fixed spread untouched.
  const lowFactor = isLand ? 0.88 : 0.88 + 0.07 * ratio;
  const highFactor = isLand ? 1.1 : 1.1 - 0.07 * ratio;

  const low = roundTo(mid * lowFactor, 5000);
  const high = roundTo(mid * highFactor, 5000);
  const headline = roundTo(low + (high - low) * 0.35, 5000);

  return {
    low,
    high,
    headline,
    region: regionLabel ?? benchmarkMeta.region,
    asOf: benchmarkMeta.lastUpdated,
    regionMatched: regionLabel !== null,
    precision: isLand ? "basis" : precisionLabel(ratio),
  };
}

export function formatEuro(value: number) {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(
    value
  );
}
