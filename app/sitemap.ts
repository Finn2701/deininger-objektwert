import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getPublishedArticles } from "@/lib/articles";
import { cityPagePath, cityPages } from "@/lib/city-pages";
import { benchmarkMeta } from "@/lib/valuation-benchmarks";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/immobilienbewertung", priority: 0.9, changeFrequency: "weekly" },
    { path: "/wie-wir-rechnen", priority: 0.7, changeFrequency: "monthly" },
    { path: "/immobilienpreise-ostwuerttemberg", priority: 0.8, changeFrequency: "monthly" },
    { path: "/kaufnebenkosten-rechner", priority: 0.8, changeFrequency: "monthly" },
    { path: "/grunderwerbsteuer-rechner", priority: 0.8, changeFrequency: "monthly" },
    { path: "/immobilie-verkaufen", priority: 0.8, changeFrequency: "monthly" },
    { path: "/unterlagen-einreichen", priority: 0.6, changeFrequency: "monthly" },
    { path: "/ratgeber", priority: 0.7, changeFrequency: "weekly" },
    { path: "/ueber-uns", priority: 0.6, changeFrequency: "monthly" },
    { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
    { path: "/kontakt", priority: 0.6, changeFrequency: "monthly" },
  ];

  const articles = await getPublishedArticles();

  return [
    ...routes.map((route) => ({
      url: `${siteConfig.url}${route.path}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...cityPages.map((city) => ({
      url: `${siteConfig.url}${cityPagePath(city)}`,
      lastModified: new Date(`${benchmarkMeta.lastUpdated}T12:00:00Z`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...articles.map((article) => ({
      url: `${siteConfig.url}/ratgeber/${article.slug}`,
      lastModified: new Date(article.updated_at),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
