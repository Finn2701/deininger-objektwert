import { siteConfig } from "@/lib/site-config";
import { getPublishedArticles } from "@/lib/articles";

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

  const body = `# ${siteConfig.name}

> ${siteConfig.description}

${siteConfig.operator.name} bietet Eigentümern in Deutschland eine kostenlose, unverbindliche Online-Ersteinschätzung des Immobilienwerts, mit besonderer Marktkenntnis in Heidenheim an der Brenz und dem Ostalbkreis (Baden-Württemberg). Der Fokus liegt auf verständlicher, gut belegter Aufklärung zu Immobilienbewertung und -verkauf -- unter anderem für Eigentümer, die eine Immobilie geerbt haben, sich scheiden lassen, oder eine Immobilie in einer Erbengemeinschaft verkaufen müssen.

## Kernangebot

- [Kostenlose Online-Immobilienbewertung](${siteConfig.url}/immobilienbewertung): unverbindliche Ersteinschätzung in wenigen Minuten.
- [Immobilie verkaufen](${siteConfig.url}/immobilie-verkaufen): Ablauf, Unterlagen, diskrete Vermarktung.
- [Häufige Fragen](${siteConfig.url}/faq): direkte Antworten zu Kosten, Dauer, Genauigkeit und Ablauf der Bewertung.
- [Über ${siteConfig.operator.name}](${siteConfig.url}/ueber-uns): Hintergrund, Methode, Servicegebiet.

## Ratgeber (Hintergrundwissen zu Bewertung, Erbschaft, Scheidung, Steuer)

${articleLines}

## Hinweis

Alle Inhalte sind auf Deutsch und beziehen sich auf deutsches Recht. Die Online-Ersteinschätzung ersetzt kein förmliches Gutachten und keine Rechts- oder Steuerberatung im Einzelfall.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
