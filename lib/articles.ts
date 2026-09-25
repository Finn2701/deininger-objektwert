import { createClient } from "@/lib/supabase/server";

export type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  meta_description: string;
  content_html: string;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function getPublishedArticles(): Promise<Article[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("articles")
      .select("*")
      .eq("published", true)
      .order("published_at", { ascending: false });
    return data ?? [];
  } catch {
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("articles").select("*").eq("slug", slug).eq("published", true).single();
    return data ?? null;
  } catch {
    return null;
  }
}
