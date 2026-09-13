import type { BathroomCount, ConditionLevel, YearBuiltBucket } from "@/lib/valuation-benchmarks";

export type PropertyType = "haus" | "wohnung" | "grundstueck" | "mehrfamilienhaus";

export interface ValuationFormData {
  propertyType: PropertyType | null;
  location: string;
  livingArea: string;
  plotArea: string;
  yearBuilt: YearBuiltBucket | null;
  condition: ConditionLevel | null;
  bathrooms: BathroomCount | null;
  hasSeparateUnit: boolean | null;
  name: string;
  email: string;
  phone: string;
  contactConsent: boolean;
}

export const initialValuationFormData: ValuationFormData = {
  propertyType: null,
  location: "",
  livingArea: "",
  plotArea: "",
  yearBuilt: null,
  condition: null,
  bathrooms: null,
  hasSeparateUnit: null,
  name: "",
  email: "",
  phone: "",
  contactConsent: false,
};
