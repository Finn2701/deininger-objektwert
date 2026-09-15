import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { ArticleForm, DeleteArticleButton } from "../article-form";

export const metadata: Metadata = {
  title: "Artikel bearbeiten",
  robots: { index: false, follow: false },
};

export default async function EditArticlePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  const { id } = await params;
  const { saved } = await searchParams;
  const supabase = await createClient();
  const { data: article } = await supabase.from("articles").select("*").eq("id", id).single();

  if (!article) {
    return <p className="text-sm text-ink-soft">Artikel nicht gefunden.</p>;
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <h1 className="font-display text-2xl font-medium text-ink">{article.title}</h1>
        <DeleteArticleButton id={article.id} />
      </div>
      {saved ? <p className="mt-2 text-sm text-ink-soft/70">Gespeichert.</p> : null}
      <div className="mt-8">
        <ArticleForm article={article} />
      </div>
    </div>
  );
}
