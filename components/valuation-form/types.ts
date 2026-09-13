import type { ConditionLevel, YearBuiltBucket } from "@/lib/valuation-benchmarks";

export type PropertyType = "haus" | "wohnung" | "grundstueck" | "mehrfamilienhaus";

export interface ValuationFormData {
  propertyType: PropertyType | null;
  location: string;
  livingArea: string;
  plotArea: string;
  yearBuilt: YearBuiltBucket | null;
  condition: ConditionLevel | null;
  rooms: string;
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
  rooms: "",
  name: "",
  email: "",
  phone: "",
  contactConsent: false,
};
