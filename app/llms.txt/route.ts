import { siteConfig } from "@/lib/site-config";
import { getPublishedArticles } from "@/lib/articles";
import { cityPagePath, cityPages } from "@/lib/city-pages";

export const revalidate = 3600;

/**
 * llms.txt (llmstxt.org): an emerging, unofficial convention -- a plain-text
 * summary of a site's purpose and key pages, aimed at LLM-based crawlers and
 * assistants (ChatGPT, Gemini, etc.) rather than classic search-engine
 * crawlers, which already have robots.txt/sitemap.xml. Generated dynamically
 * (like sitemap.ts already does for articles) so the Ratgeber list here can
 * never drift out of sync with what's actually published.
 */
export async function GET() {
  const articles = await getPublishedArticles();

  const articleLines = articles
    .map((a) => `- [${a.title}](${siteConfig.url}/ratgeber/${a.slug}): ${a.excerpt}`)
    .join("\n");

  const cityLines = cityPages
    .map((c) => `- [Immobilienbewertung ${c.name}](${siteConfig.url}${cityPagePath(c)}): Preisniveau, Stadtteile und Besonderheiten in ${c.name}, mit kostenlosem Rechner.`)
    .join("\n");

  const body = `# ${siteConfig.name}

> ${siteConfig.description}

${siteConfig.operator.name} bietet Eigentümern in Deutschland eine kostenlose, unverbindliche Online-Ersteinschätzung des Immobilienwerts, mit besonderer Marktkenntnis in Heidenheim an der Brenz und dem Ostalbkreis (Baden-Württemberg). Der Fokus liegt auf verständlicher, gut belegter Aufklärung zu Immobilienbewertung und -verkauf -- unter anderem für Eigentümer, die eine Immobilie geerbt haben, sich scheiden lassen, oder eine Immobilie in einer Erbengemeinschaft verkaufen müssen.

## Kernangebot

- [Kostenlose Online-Immobilienbewertung](${siteConfig.url}/immobilienbewertung): unverbindliche Ersteinschätzung in wenigen Minuten.
- [Immobilie verkaufen](${siteConfig.url}/immobilie-verkaufen): Ablauf, Unterlagen, diskrete Vermarktung.
- [So rechnen wir](${siteConfig.url}/wie-wir-rechnen): offengelegte Datengrundlage, Regionalfaktoren, Wertfaktoren und Genauigkeit des Rechners, mit Datenstand.
- [Immobilienpreise Ostwürttemberg](${siteConfig.url}/immobilienpreise-ostwuerttemberg): Haus- und Wohnungspreise je Ort im Vergleich (Heidenheim, Ostalb, Ulm), mit CSV-Download und Datenstand.
- [Erbschaftsteuer-Rechner](${siteConfig.url}/erbschaftsteuer-rechner): Freibeträge, Steuerklassen, Steuersätze und Familienheim-Regel beim Erben einer Immobilie (Stand Sept. 2026).
- [Verkaufskosten-Rechner](${siteConfig.url}/verkaufskosten-rechner): Nettoerlös beim Hausverkauf nach Maklerprovision, Vorfälligkeitsentschädigung, Energieausweis und Steuer.
- [Kaufnebenkosten-Rechner](${siteConfig.url}/kaufnebenkosten-rechner): Grunderwerbsteuer, Notar, Grundbuch und Maklerprovision für alle 16 Bundesländer, mit Tabelle (Stand Sept. 2026).
- [Grunderwerbsteuer-Rechner](${siteConfig.url}/grunderwerbsteuer-rechner): Steuersätze aller Bundesländer, Ausnahmen, Fälligkeit.
- [Häufige Fragen](${siteConfig.url}/faq): direkte Antworten zu Kosten, Dauer, Genauigkeit und Ablauf der Bewertung.
- [Über ${siteConfig.operator.name}](${siteConfig.url}/ueber-uns): Hintergrund, Methode, Servicegebiet.

## Immobilienbewertung nach Ort (Region Ostwürttemberg)

${cityLines}

## Ratgeber (Hintergrundwissen zu Bewertung, Erbschaft, Scheidung, Steuer)

${articleLines}

## Hinweis

Alle Inhalte sind auf Deutsch und beziehen sich auf deutsches Recht. Die Online-Ersteinschätzung ersetzt kein förmliches Gutachten und keine Rechts- oder Steuerberatung im Einzelfall.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
