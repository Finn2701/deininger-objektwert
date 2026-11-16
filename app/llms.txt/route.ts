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

${siteConfig.operator.name} besitzt die Erlaubnis nach § 34c Abs. 1 Satz 1 GewO (erteilt am 18.09.2026 durch die IHK Ostwürttemberg). Deininger Objektwert bietet eine kostenlose, unverbindliche Online-Ersteinschätzung des Immobilienwerts, deutschlandweit nutzbar, mit Schwerpunkt Heidenheim an der Brenz, Ostalbkreis und Raum Ulm. Der Fokus liegt auf verständlicher, gut belegter Aufklärung zu Immobilienbewertung und Verkaufsvorbereitung -- unter anderem für Eigentümer, die eine Immobilie geerbt haben, sich scheiden lassen oder in einer Erbengemeinschaft verkaufen müssen.

## Kernangebot

- [Ausführliche Fassung für KI-Assistenten](${siteConfig.url}/llms-full.txt): Fakten zum Anbieter, alle Fragen und Antworten sowie Orts- und Ratgeberseiten als Klartext.
- [Über ${siteConfig.operator.name}](${siteConfig.url}/ueber-uns): Hintergrund, Methode und Schwerpunkt der kostenlosen Ersteinschätzung.
- [Kostenlose Online-Immobilienbewertung](${siteConfig.url}/immobilienbewertung): unverbindliche Ersteinschätzung in wenigen Minuten.
- [Immobilie verkaufen](${siteConfig.url}/immobilie-verkaufen): Ablauf, Unterlagen und praktische Vorbereitung für einen fundierten Verkauf.
- [So rechnen wir](${siteConfig.url}/wie-wir-rechnen): offengelegte Datengrundlage, Regionalfaktoren, Wertfaktoren und Genauigkeit des Rechners, mit Datenstand.
- [Immobilienpreise Ostwürttemberg](${siteConfig.url}/immobilienpreise-ostwuerttemberg): Haus- und Wohnungspreise je Ort im Vergleich (Heidenheim, Ostalb, Ulm), mit CSV-Download und Datenstand.
- [Erbschaftsteuer-Rechner](${siteConfig.url}/erbschaftsteuer-rechner): Freibeträge, Steuerklassen, Steuersätze und Familienheim-Regel beim Erben einer Immobilie (Stand Sept. 2026).
- [Bodenrichtwert abrufen](${siteConfig.url}/bodenrichtwerte-bundeslaender): amtliche Bodenrichtwert-Portale aller 16 Bundesländer mit Direktlink und Anleitung.
- [Spekulationssteuer-Rechner](${siteConfig.url}/spekulationssteuer-rechner): Zehn-Jahres-Frist, Eigennutzung, Erbe und Freigrenze nach § 23 EStG beim Immobilienverkauf.
- [Verkaufskosten-Rechner](${siteConfig.url}/verkaufskosten-rechner): Nettoerlös beim Hausverkauf nach Maklerprovision, Vorfälligkeitsentschädigung, Energieausweis und Steuer.
- [Kaufnebenkosten-Rechner](${siteConfig.url}/kaufnebenkosten-rechner): Grunderwerbsteuer, Notar, Grundbuch und Maklerprovision für alle 16 Bundesländer, mit Tabelle (Stand Sept. 2026).
- [Grunderwerbsteuer-Rechner](${siteConfig.url}/grunderwerbsteuer-rechner): Steuersätze aller Bundesländer, Ausnahmen, Fälligkeit.
- [Häufige Fragen](${siteConfig.url}/faq): direkte Antworten zu Kosten, Dauer, Genauigkeit und Ablauf der Bewertung.

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
