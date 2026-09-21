"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/articles";

function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

async function uniqueSlug(supabase: Awaited<ReturnType<typeof createClient>>, base: string, excludeId?: string) {
  let slug = base || "artikel";
  let suffix = 2;
  for (;;) {
    let query = supabase.from("articles").select("id").eq("slug", slug);
    if (excludeId) query = query.neq("id", excludeId);
    const { data } = await query.maybeSingle();
    if (!data) return slug;
    slug = `${base}-${suffix}`;
    suffix += 1;
  }
}

export async function saveArticle(formData: FormData) {
  const id = str(formData, "id");
  const title = str(formData, "title");
  const excerpt = str(formData, "excerpt");
  const metaDescription = str(formData, "meta_description");
  const contentHtml = str(formData, "content_html");
  const published = formData.get("published") === "on";
  const requestedSlug = slugify(str(formData, "slug") || title);

  if (!title || !contentHtml) {
    redirect(
      `/backend/ratgeber${id ? `/${id}` : "/neu"}?error=${encodeURIComponent("Titel und Inhalt sind erforderlich")}`
    );
  }

  const supabase = await createClient();
  const slug = await uniqueSlug(supabase, requestedSlug, id || undefined);

  const row = {
    slug,
    title,
    excerpt: excerpt || title,
    meta_description: metaDescription || excerpt || title,
    content_html: contentHtml,
    published,
    updated_at: new Date().toISOString(),
  };

  if (id) {
    await supabase.from("articles").update(row).eq("id", id);
    revalidatePath(`/backend/ratgeber/${id}`);
    revalidatePath("/backend/ratgeber");
    revalidatePath("/ratgeber");
    revalidatePath(`/ratgeber/${slug}`);
    redirect(`/backend/ratgeber/${id}?saved=1`);
  } else {
    const { data, error } = await supabase.from("articles").insert(row).select("id").single();
    if (error || !data) {
      redirect(`/backend/ratgeber/neu?error=${encodeURIComponent(error?.message ?? "Speichern fehlgeschlagen")}`);
    }
    revalidatePath("/backend/ratgeber");
    revalidatePath("/ratgeber");
    redirect(`/backend/ratgeber/${data.id}?saved=1`);
  }
}

// Quick publish/unpublish toggle from the list view (/backend/ratgeber),
// so Finn doesn't have to open each article's full edit form just to flip
// one field -- useful now that the growth engine (scripts/growth-loop.mjs)
// can queue up many drafts at once for him to work through over time.
export async function toggleArticlePublished(formData: FormData) {
  const id = str(formData, "id");
  const nextPublished = formData.get("next_published") === "true";
  const supabase = await createClient();

  const { data: article } = await supabase.from("articles").select("slug").eq("id", id).single();

  await supabase
    .from("articles")
    .update({ published: nextPublished, updated_at: new Date().toISOString() })
    .eq("id", id);

  revalidatePath("/backend/ratgeber");
  revalidatePath("/ratgeber");
  if (article?.slug) revalidatePath(`/ratgeber/${article.slug}`);
}

export async function deleteArticle(formData: FormData) {
  const id = str(formData, "id");
  const supabase = await createClient();
  await supabase.from("articles").delete().eq("id", id);
  revalidatePath("/backend/ratgeber");
  revalidatePath("/ratgeber");
  redirect("/backend/ratgeber?deleted=1");
}
