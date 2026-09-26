/**
 * Erbschaftsteuer nach ErbStG (Stand der Sätze: siehe ERBSCHAFTSTEUER_STAND). Quellen: §§ 13, 14, 15, 16, 17
 * und 19 ErbStG (gesetze-im-internet.de). Bewusst ohne Importe, damit die Funktionen einzeln testbar sind.
 * Der Rechner liefert eine Orientierung; Steuerbescheid und Steuerberatung im Einzelfall gehen vor.
 */
export const ERBSCHAFTSTEUER_STAND = "September 2026";
export const ERBSCHAFTSTEUER_STAND_ISO = "2026-09-26";

export type TaxClass = "I" | "II" | "III";

export interface Relationship {
  id: string;
  label: string;
  taxClass: TaxClass;
  allowance: number;
  /** Familienheim-Befreiung (§ 13 Abs. 1 Nr. 4b/4c) möglich */
  familyHome: "none" | "spouse" | "child";
  hint?: string;
}

export const relationships: Relationship[] = [
  { id: "ehegatte", label: "Ehegatte oder eingetragener Lebenspartner", taxClass: "I", allowance: 500000, familyHome: "spouse" },
  { id: "kind", label: "Kind (auch Stief- und Adoptivkind)", taxClass: "I", allowance: 400000, familyHome: "child" },
  {
    id: "enkel-eltern-tot",
    label: "Enkel, dessen Elternteil verstorben ist",
    taxClass: "I",
    allowance: 400000,
    familyHome: "child",
    hint: "Kinder verstorbener Kinder werden wie Kinder behandelt.",
  },
  { id: "enkel", label: "Enkel (Eltern leben)", taxClass: "I", allowance: 200000, familyHome: "none" },
  { id: "eltern", label: "Eltern oder Großeltern", taxClass: "I", allowance: 100000, familyHome: "none", hint: "Bei Erbfall Steuerklasse I; bei Schenkung Steuerklasse II." },
  { id: "geschwister", label: "Geschwister, Nichten und Neffen", taxClass: "II", allowance: 20000, familyHome: "none" },
  { id: "schwieger", label: "Schwiegerkinder, Schwiegereltern, Stiefeltern, geschiedene Ehegatten", taxClass: "II", allowance: 20000, familyHome: "none" },
  { id: "sonstige", label: "Übrige (z. B. Lebensgefährte ohne Trauschein, Freunde)", taxClass: "III", allowance: 20000, familyHome: "none" },
];

export function getRelationship(id: string): Relationship {
  return relationships.find((r) => r.id === id) ?? relationships[0];
}

/** Wertgrenzen des § 19 Abs. 1 ErbStG: bis einschließlich Grenze gilt der Satz je Steuerklasse (in %). */
const brackets: { upTo: number; rates: Record<TaxClass, number> }[] = [
  { upTo: 75000, rates: { I: 7, II: 15, III: 30 } },
  { upTo: 300000, rates: { I: 11, II: 20, III: 30 } },
  { upTo: 600000, rates: { I: 15, II: 25, III: 30 } },
  { upTo: 6000000, rates: { I: 19, II: 30, III: 30 } },
  { upTo: 13000000, rates: { I: 23, II: 35, III: 50 } },
  { upTo: 26000000, rates: { I: 27, II: 40, III: 50 } },
  { upTo: Infinity, rates: { I: 30, II: 43, III: 50 } },
];

export const taxBracketTable = brackets.map((b, i) => ({
  from: i === 0 ? 0 : brackets[i - 1].upTo,
  upTo: b.upTo,
  rates: b.rates,
}));

/** Steuer auf einen steuerpflichtigen Erwerb inkl. Härteausgleich nach § 19 Abs. 3 ErbStG. */
export function inheritanceTax(taxable: number, taxClass: TaxClass): { tax: number; rate: number } {
  if (taxable <= 0) return { tax: 0, rate: 0 };
  const index = brackets.findIndex((b) => taxable <= b.upTo);
  const bracket = brackets[index];
  const rate = bracket.rates[taxClass];
  const plain = (taxable * rate) / 100;
  if (index === 0) return { tax: plain, rate };

  const previous = brackets[index - 1];
  const taxAtLimit = (previous.upTo * previous.rates[taxClass]) / 100;
  const difference = plain - taxAtLimit;
  const share = rate > 30 ? 0.75 : 0.5;
  const capped = share * (taxable - previous.upTo);
  return { tax: taxAtLimit + Math.min(difference, capped), rate };
}

export interface InheritanceInput {
  relationshipId: string;
  /** Steuerwert des gesamten Erwerbs (Immobilie + übriges Vermögen) */
  totalValue: number;
  /** Wert des Familienheims, das ganz oder teilweise steuerfrei bleiben kann */
  familyHomeValue: number;
  /** Wohnfläche des Familienheims in m² (relevant bei Kindern: Befreiung nur bis 200 m²) */
  familyHomeArea: number;
  /** Nachlassverbindlichkeiten, Bestattungskosten u. Ä. */
  debts: number;
  /** Besonderer Versorgungsfreibetrag (§ 17), falls zutreffend */
  supportAllowance: number;
  /** Frühere Erwerbe derselben Person in den letzten zehn Jahren (§ 14) */
  priorAcquisitions: number;
}

export interface InheritanceResult {
  taxClass: TaxClass;
  allowance: number;
  supportAllowance: number;
  familyHomeExempt: number;
  taxable: number;
  rate: number;
  tax: number;
  effectiveRate: number;
  netInheritance: number;
}

export function computeInheritance(input: InheritanceInput): InheritanceResult {
  const relationship = getRelationship(input.relationshipId);
  const total = Math.max(0, input.totalValue);
  const home = Math.min(total, Math.max(0, input.familyHomeValue));
  const debts = Math.max(0, input.debts);
  const prior = Math.max(0, input.priorAcquisitions);
  const support = Math.max(0, input.supportAllowance);

  let exempt = 0;
  if (relationship.familyHome === "spouse") {
    exempt = home;
  } else if (relationship.familyHome === "child") {
    const area = input.familyHomeArea > 0 ? input.familyHomeArea : 0;
    exempt = area > 200 ? (home * 200) / area : home;
  }

  const acquisition = Math.max(0, total - exempt - debts);
  const allowances = relationship.allowance + support;
  const taxable = Math.max(0, acquisition + prior - allowances);
  const priorTaxable = Math.max(0, prior - allowances);

  const withAll = inheritanceTax(taxable, relationship.taxClass);
  const priorTax = inheritanceTax(priorTaxable, relationship.taxClass).tax;
  const tax = Math.max(0, Math.round((withAll.tax - priorTax) * 100) / 100);

  return {
    taxClass: relationship.taxClass,
    allowance: relationship.allowance,
    supportAllowance: support,
    familyHomeExempt: exempt,
    taxable,
    rate: withAll.rate,
    tax,
    effectiveRate: total > 0 ? (tax / total) * 100 : 0,
    netInheritance: Math.max(0, total - tax),
  };
}
