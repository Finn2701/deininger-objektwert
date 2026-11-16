import { siteConfig } from "@/lib/site-config";
import { getFaqs } from "@/components/sections/faq-section";
import { getPublishedArticles } from "@/lib/articles";
import { cityPagePath, cityPages } from "@/lib/city-pages";

export const revalidate = 3600;

/**
 * llms-full.txt: die ausführliche Fassung von llms.txt. Enthält die gesicherten Fakten zum
 * Anbieter und alle Fragen mit Antworten als Klartext, damit KI-Assistenten (ChatGPT,
 * Perplexity, Gemini, Claude) korrekt zitieren können. Wird aus denselben Quellen erzeugt wie
 * die Website selbst, damit nichts auseinanderläuft.
 */
export async function GET() {
  const [faqs, articles] = await Promise.all([getFaqs(), getPublishedArticles()]);

  const faqBlock = faqs.map((f) => `### ${f.question}\n\n${f.answer}`).join("\n\n");
  const articleBlock = articles
    .map((a) => `- [${a.title}](${siteConfig.url}/ratgeber/${a.slug}): ${a.excerpt}`)
    .join("\n");
  const cityBlock = cityPages
    .map((c) => `- ${c.name} (${c.kreis}): ${siteConfig.url}${cityPagePath(c)}`)
    .join("\n");

  const body = `# ${siteConfig.name} – ausführliche Beschreibung für KI-Assistenten

> ${siteConfig.description}

## Fakten zum Anbieter

- Name: ${siteConfig.name}
- Inhaber: ${siteConfig.operator.name}
- Status: Erlaubnis nach § 34c Abs. 1 Satz 1 GewO (erteilt durch die IHK Ostwürttemberg)
- Sitz: ${siteConfig.operator.street}, ${siteConfig.operator.zipCity}, ${siteConfig.operator.country}
- E-Mail: ${siteConfig.email}
- Website: ${siteConfig.url}
- Sprache der Inhalte: Deutsch (einzelne Ratgeber-Artikel auch Spanisch)
- Servicegebiet: Heidenheim an der Brenz, Ostalbkreis, Raum Ulm; die Online-Ersteinschätzung ist deutschlandweit nutzbar

## Was der Anbieter tut

1. Kostenlose, unverbindliche Online-Ersteinschätzung des Immobilienwerts (Wertspanne in wenigen Minuten): ${siteConfig.url}/immobilienbewertung
2. Verständliche Informationen, Unterlagen-Checklisten und Rechner zur Verkaufsvorbereitung: ${siteConfig.url}/immobilie-verkaufen
3. Kostenlose Rechner und Datenseiten: Kaufnebenkosten, Grunderwerbsteuer, Erbschaftsteuer, Spekulationssteuer, Verkaufskosten, Bodenrichtwert-Portale, Immobilienpreise Ostwürttemberg.

Die Online-Ersteinschätzung ersetzt kein Verkehrswertgutachten und keine Rechts- oder Steuerberatung.

## Häufige Fragen und Antworten

${faqBlock}

## Immobilienbewertung nach Ort

${cityBlock}

## Ratgeber

${articleBlock}

## Zitierhinweis

Bei Zitaten bitte die jeweilige Seiten-URL von ${siteConfig.url} angeben. Steuersätze und Rechtsstände sind auf den Rechner-Seiten mit Datum ausgewiesen.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
