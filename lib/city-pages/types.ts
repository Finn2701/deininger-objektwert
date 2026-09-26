export interface CityPriceSource {
  label: string;
  url: string;
}

export interface CityPrices {
  /** Durchschnittlicher Angebotspreis Eigentumswohnung, €/m² */
  wohnung: number;
  /** Durchschnittlicher Angebotspreis Haus, €/m² */
  haus: number;
  wohnungRange?: [number, number];
  hausRange?: [number, number];
  /** z. B. "September 2026" -- Stand der Portalauswertung */
  asOf: string;
  sources: CityPriceSource[];
  /** Optionaler Hinweis, wenn die Datenlage dünn/widersprüchlich ist (kleine Orte). */
  note?: string;
}

export interface CityQuarter {
  name: string;
  note: string;
}

export interface CityFaq {
  question: string;
  answer: string;
}

/**
 * Inhalt einer Orts-Landingpage (/immobilienbewertung-<slug>). Jeder Ort hat
 * bewusst eigene, recherchierte Texte -- Google straft Seiten ab, die nur den
 * Ortsnamen in einen Textbaustein einsetzen (Doorway-/Thin-Content-Muster).
 * Alle Zahlen stammen aus den in `prices.sources` genannten Auswertungen bzw.
 * öffentlichen Stadt-/Statistikangaben; nichts hier ist geschätzt, ohne es zu
 * sagen.
 */
export interface CityPage {
  slug: string;
  name: string;
  /** Schlüssel in lib/valuation-benchmarks.ts cityFactor (lowercase) */
  factorKey: string;
  kreis: string;
  /** Vorbelegung des Lage-Felds im eingebetteten Rechner */
  calculatorLocation: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  lead: string;
  facts: { label: string; value: string }[];
  prices: CityPrices;
  market: string[];
  quarters: CityQuarter[];
  economy: string[];
  sellingNotes: { title: string; text: string }[];
  faq: CityFaq[];
  neighbors: string[];
  relatedArticles: string[];
}
