import type { ValuationFormData } from "@/components/valuation-form/types";
import {
  benchmarkMeta,
  conditionMultiplier,
  featureBonus,
  plotPricePerSqm,
  pricePerSqmByType,
  yearBuiltMultiplier,
} from "./valuation-benchmarks";

export interface ValuationEstimate {
  low: number;
  high: number;
  headline: number;
  region: string;
  asOf: string;
}

const TYPICAL_HOUSE_PLOT_SQM = 500;

function roundTo(value: number, step: number) {
  return Math.round(value / step) * step;
}

/**
 * Rough, transparent first estimate — not a certified appraisal. Returns a
 * range rather than a single number on purpose: a single "precise" figure
 * would overstate how much a handful of form answers can actually know.
 * The headline sits in the lower third of the range by design, so a visitor
 * sees an approachable number rather than an optimistic ceiling.
 */
export function estimateValue(data: ValuationFormData): ValuationEstimate | null {
  const livingArea = Number(data.livingArea) || 0;
  const plotArea = Number(data.plotArea) || 0;

  let mid: number;

  if (data.propertyType === "grundstueck") {
    if (plotArea <= 0) return null;
    mid = plotArea * plotPricePerSqm;
  } else {
    if (!data.propertyType || livingArea <= 0 || !data.yearBuilt || !data.condition) return null;

    const base = pricePerSqmByType[data.propertyType] * livingArea;
    const featureMultiplier = 1 + data.features.reduce((sum, id) => sum + (featureBonus[id] ?? 0), 0);
    const adjusted =
      base * yearBuiltMultiplier[data.yearBuilt] * conditionMultiplier[data.condition] * featureMultiplier;

    const plotBonus =
      data.propertyType !== "wohnung" && plotArea > TYPICAL_HOUSE_PLOT_SQM
        ? (plotArea - TYPICAL_HOUSE_PLOT_SQM) * plotPricePerSqm * 0.5
        : 0;

    mid = adjusted + plotBonus;
  }

  if (!Number.isFinite(mid) || mid <= 0) return null;

  const low = roundTo(mid * 0.88, 5000);
  const high = roundTo(mid * 1.1, 5000);
  const headline = roundTo(low + (high - low) * 0.35, 5000);

  return { low, high, headline, region: benchmarkMeta.region, asOf: benchmarkMeta.lastUpdated };
}

export function formatEuro(value: number) {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(
    value
  );
}
