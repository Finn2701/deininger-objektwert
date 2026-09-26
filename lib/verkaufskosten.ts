export const VERKAUFSKOSTEN_STAND = "September 2026";
export const VERKAUFSKOSTEN_STAND_ISO = "2026-09-26";

export interface SaleInput {
  price: number;
  /** offene Restschuld des Darlehens (wird aus dem Erlös abgelöst) */
  remainingLoan: number;
  /** Maklerprovision, Verkäuferanteil in % des Kaufpreises (inkl. MwSt.); 0 = ohne Makler */
  brokerPercent: number;
  prepaymentPenalty: number;
  energyCertificate: number;
  mortgageDeletion: number;
  /** anfallende Einkommensteuer auf den Veräußerungsgewinn (Spekulationssteuer), falls zutreffend */
  capitalGainsTax: number;
  other: number;
}

export interface SaleResult {
  price: number;
  broker: number;
  prepaymentPenalty: number;
  energyCertificate: number;
  mortgageDeletion: number;
  capitalGainsTax: number;
  other: number;
  totalCosts: number;
  costsPercent: number;
  loanRepayment: number;
  netProceeds: number;
}

const round2 = (value: number) => Math.round(value * 100) / 100;
const positive = (value: number) => (Number.isFinite(value) && value > 0 ? value : 0);

export function computeSale(input: SaleInput): SaleResult {
  const price = positive(input.price);
  const broker = round2((price * positive(input.brokerPercent)) / 100);
  const prepaymentPenalty = positive(input.prepaymentPenalty);
  const energyCertificate = positive(input.energyCertificate);
  const mortgageDeletion = positive(input.mortgageDeletion);
  const capitalGainsTax = positive(input.capitalGainsTax);
  const other = positive(input.other);
  const totalCosts = round2(broker + prepaymentPenalty + energyCertificate + mortgageDeletion + capitalGainsTax + other);
  const loanRepayment = positive(input.remainingLoan);

  return {
    price,
    broker,
    prepaymentPenalty,
    energyCertificate,
    mortgageDeletion,
    capitalGainsTax,
    other,
    totalCosts,
    costsPercent: price > 0 ? round2((totalCosts / price) * 100) : 0,
    loanRepayment,
    netProceeds: round2(price - totalCosts - loanRepayment),
  };
}
