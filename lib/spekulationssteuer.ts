/**
 * Spekulationssteuer (private Veräußerungsgeschäfte, § 23 EStG) beim Immobilienverkauf.
 * Grundlage: § 23 Abs. 1 Nr. 1 (Zehn-Jahres-Frist, Ausnahme Eigennutzung), Abs. 1 Satz 3 (Erbe tritt in die
 * Anschaffung des Erblassers ein), Abs. 3 (Gewinn, Freigrenze 1.000 Euro). Wortlaut geprüft auf
 * gesetze-im-internet.de. Bewusst ohne Importe, damit die Logik einzeln testbar ist.
 */
export const SPEKULATIONSSTEUER_STAND = "September 2026";
export const SPEKULATIONSSTEUER_STAND_ISO = "2026-09-26";
/** Freigrenze: bleibt der Gesamtgewinn des Jahres UNTER diesem Betrag, ist er steuerfrei; ab 1.000 € der gesamte Gewinn. */
export const FREIGRENZE_EUR = 1000;
export const FRIST_JAHRE = 10;

export type UsageKind = "durchgehend" | "drei-jahre" | "nein";

export const usageOptions: { value: UsageKind; label: string; hint: string }[] = [
  { value: "nein", label: "Vermietet, leer stehend oder gemischt genutzt", hint: "Es zählt die Zehn-Jahres-Frist." },
  {
    value: "drei-jahre",
    label: "Im Verkaufsjahr und in den beiden Jahren davor selbst bewohnt",
    hint: "Reicht für die Steuerfreiheit, auch wenn Sie vorher vermietet haben.",
  },
  {
    value: "durchgehend",
    label: "Seit dem Kauf durchgehend selbst bewohnt",
    hint: "Steuerfrei, auch innerhalb der Zehn-Jahres-Frist.",
  },
];

export type SaleStatus =
  | "ungueltig"
  | "steuerfrei-eigennutzung"
  | "steuerfrei-frist"
  | "verlust"
  | "unter-freigrenze"
  | "steuerpflichtig";

export interface SpeculationInput {
  /** ISO-Datum (JJJJ-MM-TT) der Anschaffung; bei Erbe: des Kaufs durch den Erblasser */
  purchaseDate: string;
  /** ISO-Datum des Verkaufs (Datum des Kaufvertrags) */
  saleDate: string;
  salePrice: number;
  /** Anschaffungskosten (Kaufpreis) */
  purchasePrice: number;
  /** Anschaffungsnebenkosten (Notar, Grundbuch, Grunderwerbsteuer, Makler beim Kauf) */
  purchaseCosts: number;
  /** Herstellungs-/nachträgliche Kosten (Modernisierung, Anbau) */
  improvements: number;
  /** Bei Vermietung steuerlich abgezogene Abschreibungen (AfA); sie mindern die Anschaffungskosten */
  depreciationClaimed: number;
  /** Verkaufskosten (Makler, Energieausweis, Vorfälligkeitsentschädigung, Inserate) */
  saleCosts: number;
  usage: UsageKind;
  /** persönlicher Grenzsteuersatz in % */
  marginalRatePercent: number;
}

export interface SpeculationResult {
  status: SaleStatus;
  gain: number;
  tax: number;
  /** frühester Verkaufstag, an dem die Frist abgelaufen ist (ISO) */
  taxFreeFrom: string | null;
  daysUntilTaxFree: number | null;
  /** Steuer, die durch Abwarten bis zum Fristende entfiele */
  taxSavedByWaiting: number;
}

const MS_PER_DAY = 24 * 60 * 60 * 1000;

function parseIso(iso: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return null;
  const date = new Date(`${iso}T00:00:00Z`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function toIso(date: Date) {
  return date.toISOString().slice(0, 10);
}

/**
 * Letzter Tag der Frist: derselbe Kalendertag zehn Jahre später. Steuerfrei ist ein Verkauf erst danach.
 * (29. Februar: das Jahr zehn Jahre später hat ggf. keinen 29.2., dann gilt der 28.2.)
 */
export function fristEnd(purchase: Date): Date {
  const year = purchase.getUTCFullYear() + FRIST_JAHRE;
  const month = purchase.getUTCMonth();
  const day = purchase.getUTCDate();
  const candidate = new Date(Date.UTC(year, month, day));
  if (candidate.getUTCMonth() !== month) return new Date(Date.UTC(year, month + 1, 0));
  return candidate;
}

export function computeSpeculation(input: SpeculationInput): SpeculationResult {
  const purchase = parseIso(input.purchaseDate);
  const sale = parseIso(input.saleDate);
  const empty = { gain: 0, tax: 0, taxFreeFrom: null, daysUntilTaxFree: null, taxSavedByWaiting: 0 };
  if (!purchase || !sale || sale.getTime() < purchase.getTime()) {
    return { status: "ungueltig", ...empty };
  }

  const end = fristEnd(purchase);
  const taxFreeFromDate = new Date(end.getTime() + MS_PER_DAY);
  const taxFreeFrom = toIso(taxFreeFromDate);
  const expired = sale.getTime() > end.getTime();

  const positive = (v: number) => (Number.isFinite(v) && v > 0 ? v : 0);
  const acquisitionCost = Math.max(
    0,
    positive(input.purchasePrice) + positive(input.purchaseCosts) + positive(input.improvements) - positive(input.depreciationClaimed)
  );
  const gain = Math.round((positive(input.salePrice) - positive(input.saleCosts) - acquisitionCost) * 100) / 100;

  if (input.usage === "durchgehend" || input.usage === "drei-jahre") {
    return { status: "steuerfrei-eigennutzung", ...empty, gain, taxFreeFrom: null };
  }
  if (expired) {
    return { status: "steuerfrei-frist", ...empty, gain, taxFreeFrom };
  }

  const daysUntilTaxFree = Math.max(0, Math.ceil((taxFreeFromDate.getTime() - sale.getTime()) / MS_PER_DAY));
  const rate = Math.min(Math.max(Number.isFinite(input.marginalRatePercent) ? input.marginalRatePercent : 0, 0), 100);
  const tax = gain >= FREIGRENZE_EUR ? Math.round(((gain * rate) / 100) * 100) / 100 : 0;

  const status: SaleStatus = gain <= 0 ? "verlust" : gain < FREIGRENZE_EUR ? "unter-freigrenze" : "steuerpflichtig";
  return { status, gain, tax, taxFreeFrom, daysUntilTaxFree, taxSavedByWaiting: tax };
}
