import { parseDecimal } from "./parse-decimal";

/** Stand der Sätze in dieser Datei; bei Gesetzesänderungen hier und in den Tabellen nachziehen. */
export const KAUFNEBENKOSTEN_STAND = "September 2026";
export const KAUFNEBENKOSTEN_STAND_ISO = "2026-09-26";

/** Typischer Faustwert für Notar und Grundbuch (Beurkundung, Grundbucheintrag, ggf. Grundschuld), üblich 1,5–2,0 %. */
export const NOTAR_GRUNDBUCH_DEFAULT_PERCENT = 1.5;

export interface StateRates {
  code: string;
  name: string;
  /** Grunderwerbsteuersatz in % */
  grunderwerbsteuer: number;
  /** Datum, seit dem der Satz gilt (TT.MM.JJJJ); bei BW/RP/ST das Datum der letzten Erhöhung */
  since: string;
  /** Üblicher Käuferanteil an der Maklerprovision in % (inkl. MwSt.), wenn ein Makler beteiligt ist */
  maklerBuyerShare: number;
  /** Übliche Gesamtprovision in % (inkl. MwSt.) */
  maklerTotal: number;
  maklerNote?: string;
}

/**
 * Grunderwerbsteuersätze nach dem Stand September 2026 (zuletzt geändert: Bremen, 5,0 → 5,5 % zum
 * 01.07.2025; Thüringen 6,5 → 5,0 % zum 01.01.2024). Maklerprovisionen sind ortsübliche
 * Richtwerte, keine gesetzlichen Sätze.
 */
export const stateRates: StateRates[] = [
  { code: "BW", name: "Baden-Württemberg", grunderwerbsteuer: 5.0, since: "05.11.2011", maklerTotal: 7.14, maklerBuyerShare: 3.57 },
  { code: "BY", name: "Bayern", grunderwerbsteuer: 3.5, since: "01.01.1997", maklerTotal: 7.14, maklerBuyerShare: 3.57 },
  { code: "BE", name: "Berlin", grunderwerbsteuer: 6.0, since: "01.01.2014", maklerTotal: 7.14, maklerBuyerShare: 3.57 },
  { code: "BB", name: "Brandenburg", grunderwerbsteuer: 6.5, since: "01.07.2015", maklerTotal: 7.14, maklerBuyerShare: 3.57 },
  { code: "HB", name: "Bremen", grunderwerbsteuer: 5.5, since: "01.07.2025", maklerTotal: 5.95, maklerBuyerShare: 2.98 },
  { code: "HH", name: "Hamburg", grunderwerbsteuer: 5.5, since: "01.01.2023", maklerTotal: 6.25, maklerBuyerShare: 3.12 },
  { code: "HE", name: "Hessen", grunderwerbsteuer: 6.0, since: "01.08.2014", maklerTotal: 5.95, maklerBuyerShare: 2.98 },
  { code: "MV", name: "Mecklenburg-Vorpommern", grunderwerbsteuer: 6.0, since: "01.07.2019", maklerTotal: 5.95, maklerBuyerShare: 2.98 },
  {
    code: "NI",
    name: "Niedersachsen",
    grunderwerbsteuer: 5.0,
    since: "01.01.2014",
    maklerTotal: 7.14,
    maklerBuyerShare: 3.57,
    maklerNote: "In Teilen Niedersachsens sind 4,76–5,95 % Gesamtprovision üblich.",
  },
  { code: "NW", name: "Nordrhein-Westfalen", grunderwerbsteuer: 6.5, since: "01.01.2015", maklerTotal: 7.14, maklerBuyerShare: 3.57 },
  { code: "RP", name: "Rheinland-Pfalz", grunderwerbsteuer: 5.0, since: "01.03.2012", maklerTotal: 7.14, maklerBuyerShare: 3.57 },
  { code: "SL", name: "Saarland", grunderwerbsteuer: 6.5, since: "01.01.2015", maklerTotal: 7.14, maklerBuyerShare: 3.57 },
  { code: "SN", name: "Sachsen", grunderwerbsteuer: 5.5, since: "01.01.2023", maklerTotal: 7.14, maklerBuyerShare: 3.57 },
  { code: "ST", name: "Sachsen-Anhalt", grunderwerbsteuer: 5.0, since: "01.03.2012", maklerTotal: 7.14, maklerBuyerShare: 3.57 },
  { code: "SH", name: "Schleswig-Holstein", grunderwerbsteuer: 6.5, since: "01.01.2014", maklerTotal: 7.14, maklerBuyerShare: 3.57 },
  { code: "TH", name: "Thüringen", grunderwerbsteuer: 5.0, since: "01.01.2024", maklerTotal: 7.14, maklerBuyerShare: 3.57 },
];

export function getStateRates(code: string): StateRates {
  return stateRates.find((state) => state.code === code) ?? stateRates[0];
}

export interface KaufnebenkostenInput {
  /** Kaufpreis in Euro (Zahl oder Text wie „350.000“ / „349.500,50“) */
  kaufpreis: string | number;
  stateCode: string;
  /** Käuferanteil Makler in %; 0 = kein Makler */
  maklerPercent: number;
  /** Notar + Grundbuch in % */
  notarPercent: number;
  /** Mitverkauftes Inventar (z. B. Einbauküche), das getrennt ausgewiesen wird und nicht der Grunderwerbsteuer unterliegt */
  inventar?: string | number;
}

export interface KaufnebenkostenResult {
  kaufpreis: number;
  grunderwerbsteuer: number;
  grunderwerbsteuerBasis: number;
  notar: number;
  makler: number;
  nebenkosten: number;
  nebenkostenPercent: number;
  gesamtbedarf: number;
}

const round2 = (value: number) => Math.round(value * 100) / 100;

export function computeKaufnebenkosten(input: KaufnebenkostenInput): KaufnebenkostenResult {
  const state = getStateRates(input.stateCode);
  const kaufpreis = Math.max(0, parseDecimal(input.kaufpreis));
  const inventar = Math.min(kaufpreis, Math.max(0, parseDecimal(input.inventar ?? 0)));
  const basis = kaufpreis - inventar;

  const grunderwerbsteuer = round2((basis * state.grunderwerbsteuer) / 100);
  const notar = round2((kaufpreis * Math.max(0, input.notarPercent)) / 100);
  const makler = round2((kaufpreis * Math.max(0, input.maklerPercent)) / 100);
  const nebenkosten = round2(grunderwerbsteuer + notar + makler);

  return {
    kaufpreis,
    grunderwerbsteuer,
    grunderwerbsteuerBasis: basis,
    notar,
    makler,
    nebenkosten,
    nebenkostenPercent: kaufpreis > 0 ? round2((nebenkosten / kaufpreis) * 100) : 0,
    gesamtbedarf: round2(kaufpreis + nebenkosten),
  };
}

/** Gesamte Nebenkosten in % des Kaufpreises für eine Zeile der Länder-Tabelle (mit Makler / ohne Makler). */
export function totalPercent(state: StateRates, withMakler: boolean, notarPercent = NOTAR_GRUNDBUCH_DEFAULT_PERCENT) {
  return round2(state.grunderwerbsteuer + notarPercent + (withMakler ? state.maklerBuyerShare : 0));
}

export const formatPercent = (value: number) =>
  `${new Intl.NumberFormat("de-DE", { minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(value)}00a0%`;

export const formatEuroExact = (value: number) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value);
