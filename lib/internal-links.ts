import { cityPagePath, cityPages, type CityPage } from "@/lib/city-pages";

export interface ToolLink {
  href: string;
  title: string;
  text: string;
}

const KAUFNEBENKOSTEN: ToolLink = {
  href: "/kaufnebenkosten-rechner",
  title: "Kaufnebenkosten-Rechner",
  text: "Grunderwerbsteuer, Notar, Grundbuch und Makler für alle Bundesländer berechnen.",
};

const GRUNDERWERBSTEUER: ToolLink = {
  href: "/grunderwerbsteuer-rechner",
  title: "Grunderwerbsteuer-Rechner",
  text: "Steuersätze aller Bundesländer, Ausnahmen und Beispielrechnung.",
};

const METHODIK: ToolLink = {
  href: "/wie-wir-rechnen",
  title: "So rechnet unser Immobilienwert-Rechner",
  text: "Datengrundlage, Faktoren und Genauigkeit der Wertspanne, mit Datenstand.",
};

function plainText(article: { title: string; content_html: string }) {
  return `${article.title} ${article.content_html.replace(/<[^>]*>/g, " ")}`.toLowerCase();
}

function hashSlug(slug: string) {
  let hash = 0;
  for (const char of slug) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return hash;
}

/**
 * Passende Rechner und Ortsseiten für einen Ratgeber-Artikel, abgeleitet aus dem Text. Orte, die im
 * Artikel vorkommen, stehen zuerst; der Rest wird deterministisch nach Slug aufgefüllt, damit jede
 * Ortsseite über die Zeit von mehreren Artikeln verlinkt wird und nicht immer dieselben drei Orte.
 */
export function relatedLinksForArticle(article: { slug: string; title: string; content_html: string }) {
  const text = plainText(article);
  const tools: ToolLink[] = [];

  if (/(kaufnebenkosten|nebenkosten|makler|notar|finanzier|eigenkapital|immobilie kaufen|hauskauf)/.test(text)) {
    tools.push(KAUFNEBENKOSTEN);
  }
  if (/(grunderwerb|steuer|erb|schenk|scheid|kaufvertrag)/.test(text)) {
    tools.push(GRUNDERWERBSTEUER);
  }
  if (/(wert|bewert|preis|bodenrichtwert|verkehrswert)/.test(text)) {
    tools.push(METHODIK);
  }
  if (tools.length === 0) tools.push(METHODIK);

  const mentioned = cityPages.filter((city) => text.includes(city.name.toLowerCase().replace(/ \(.*\)$/, "")));
  const start = hashSlug(article.slug) % cityPages.length;
  const rotated = [...cityPages.slice(start), ...cityPages.slice(0, start)];
  const cities: CityPage[] = [];
  for (const city of [...mentioned, ...rotated]) {
    if (!cities.includes(city)) cities.push(city);
    if (cities.length === 3) break;
  }

  return { tools: tools.slice(0, 3), cities: cities.map((city) => ({ name: city.name, href: cityPagePath(city) })) };
}
