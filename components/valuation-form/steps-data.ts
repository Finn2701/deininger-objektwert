import type { ConditionLevel, EnergyClass, FeatureId, FloorLevel, YearBuiltBucket } from "@/lib/valuation-benchmarks";
import type { ContactDay, ContactTime, PropertyType } from "./types";

export const propertyTypeOptions: { value: PropertyType; label: string }[] = [
  { value: "haus", label: "Haus" },
  { value: "wohnung", label: "Wohnung" },
  { value: "grundstueck", label: "Grundstück" },
  { value: "mehrfamilienhaus", label: "Mehrfamilienhaus" },
];

export const yearBuiltOptions: { value: YearBuiltBucket; label: string }[] = [
  { value: "vor-1950", label: "Vor 1950" },
  { value: "1950-1970", label: "1950 bis 1970" },
  { value: "1970-1990", label: "1970 bis 1990" },
  { value: "1990-2010", label: "1990 bis 2010" },
  { value: "nach-2010", label: "Nach 2010" },
  { value: "unbekannt", label: "Weiß ich nicht genau" },
];

export const conditionOptions: { value: ConditionLevel; label: string; hint: string }[] = [
  {
    value: "unsaniert",
    label: "Original / lange nicht saniert",
    hint: "Heizung, Elektrik und Leitungen sind noch im Ausgangszustand.",
  },
  {
    value: "teilsaniert",
    label: "Teilweise modernisiert",
    hint: "Einzelne Bereiche wurden erneuert, andere sind noch original.",
  },
  {
    value: "modernisiert",
    label: "Vollständig saniert",
    hint: "Heizung, Elektrik und Leitungen wurden in den letzten 15 Jahren erneuert.",
  },
];

export const energyClassOptions: { value: EnergyClass; label: string }[] = [
  { value: "a-plus", label: "A+" },
  { value: "a", label: "A" },
  { value: "b", label: "B" },
  { value: "c", label: "C" },
  { value: "d", label: "D" },
  { value: "e", label: "E" },
  { value: "f", label: "F" },
  { value: "g", label: "G" },
  { value: "h", label: "H" },
];

export const floorLevelOptions: { value: FloorLevel; label: string }[] = [
  { value: "erdgeschoss", label: "Erdgeschoss" },
  { value: "mittlere-etage", label: "Mittlere Etage" },
  { value: "oberste-etage", label: "Oberste Etage / Dachgeschoss" },
];

export const featureOptions: {
  value: FeatureId;
  label: string;
  onlyFor?: PropertyType[];
}[] = [
  { value: "zweites-bad", label: "Mehr als ein Bad" },
  { value: "neue-kueche", label: "Neuwertige Einbauküche" },
  { value: "aussenbereich", label: "Balkon oder Terrasse" },
  { value: "keller", label: "Keller" },
  { value: "stellplatz", label: "Garage oder Stellplatz" },
  {
    value: "einliegerwohnung",
    label: "Einliegerwohnung",
    onlyFor: ["haus"],
  },
];

export const contactDayOptions: { value: ContactDay; label: string }[] = [
  { value: "mo", label: "Mo" },
  { value: "di", label: "Di" },
  { value: "mi", label: "Mi" },
  { value: "do", label: "Do" },
  { value: "fr", label: "Fr" },
  { value: "sa", label: "Sa" },
  { value: "so", label: "So" },
];

export const contactTimeOptions: { value: ContactTime; label: string }[] = [
  { value: "vormittags", label: "Vormittags" },
  { value: "nachmittags", label: "Nachmittags" },
  { value: "abends", label: "Abends" },
];

export const formStepLabels = [
  "Objektart",
  "Lage",
  "Fläche & Grundstück",
  "Baujahr & Zustand",
  "Ausstattung",
  "Kontakt",
] as const;
