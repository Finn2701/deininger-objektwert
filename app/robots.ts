import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

/**
 * Suchmaschinen und KI-Assistenten dürfen die öffentlichen Seiten lesen und zitieren.
 * Nur das Backend bleibt gesperrt. Die KI-Crawler sind ausdrücklich genannt, damit die
 * Erlaubnis eindeutig ist (Antwortmaschinen wie ChatGPT, Perplexity, Gemini, Claude).
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/backend", "/api/"] },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/", disallow: ["/backend", "/api/"] })),
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
