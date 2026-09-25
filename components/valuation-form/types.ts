import type { ConditionLevel, EnergyClass, FeatureId, FloorLevel, YearBuiltBucket } from "@/lib/valuation-benchmarks";

export type PropertyType = "haus" | "wohnung" | "grundstueck" | "mehrfamilienhaus";

export type ContactDay = "mo" | "di" | "mi" | "do" | "fr" | "sa" | "so";
export type ContactTime = "vormittags" | "nachmittags" | "abends";

export interface ValuationFormData {
  propertyType: PropertyType | null;
  location: string;
  livingArea: string;
  plotArea: string;
  yearBuilt: YearBuiltBucket | null;
  condition: ConditionLevel | null;
  features: FeatureId[];
  // Optional precision-improving fields: all null/false-safe by default so
  // skipping them never blocks the form, but each filled-in one both feeds
  // a real adjustment in valuation-estimate.ts and narrows the shown range
  // (see PRECISION_SIGNALS there) — "more info = a tighter estimate" is
  // meant literally, not just as copy.
  energyClass: EnergyClass | null;
  floorLevel: FloorLevel | null; // wohnung only
  hasElevator: boolean | null; // wohnung only
  moistureIssues: boolean | null;
  name: string;
  email: string;
  phone: string;
  contactConsent: boolean;
  contactDays: ContactDay[];
  contactTime: ContactTime | null;
  contactNotes: string;
}

export const initialValuationFormData: ValuationFormData = {
  propertyType: null,
  location: "",
  livingArea: "",
  plotArea: "",
  yearBuilt: null,
  condition: null,
  features: [],
  energyClass: null,
  floorLevel: null,
  hasElevator: null,
  moistureIssues: null,
  name: "",
  email: "",
  phone: "",
  contactConsent: false,
  contactDays: [],
  contactTime: null,
  contactNotes: "",
};
