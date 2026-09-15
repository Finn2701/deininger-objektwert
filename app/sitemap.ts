import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getPublishedArticles } from "@/lib/articles";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/immobilienbewertung", priority: 0.9, changeFrequency: "weekly" },
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
    ...articles.map((article) => ({
      url: `${siteConfig.url}/ratgeber/${article.slug}`,
      lastModified: new Date(article.updated_at),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
