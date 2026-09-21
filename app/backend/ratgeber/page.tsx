import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { toggleArticlePublished } from "@/app/backend/ratgeber-actions";

export const metadata: Metadata = {
  title: "Ratgeber",
  robots: { index: false, follow: false },
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("de-DE", { dateStyle: "medium" }).format(new Date(value));
}

export default async function BackendRatgeberPage() {
  const supabase = await createClient();
  const { data: articles } = await supabase.from("articles").select("*").order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-2xl font-medium text-ink">Ratgeber-Artikel</h1>
        <Link
          href="/backend/ratgeber/neu"
          className="rounded-full bg-ink px-5 py-2 text-sm text-paper hover:bg-ink-soft"
        >
          Neuer Artikel
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {(articles ?? []).length === 0 ? (
          <p className="text-sm text-ink-soft/70">Noch keine Artikel.</p>
        ) : null}
        {(articles ?? []).map((article) => (
          <div key={article.id} className="rounded-xl border border-line p-4 hover:border-ink">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Link href={`/backend/ratgeber/${article.id}`} className="font-display text-lg font-medium text-ink hover:underline">
                {article.title}
              </Link>
              <div className="flex shrink-0 items-center gap-2">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs ${
                    article.published ? "bg-line/50 text-ink-soft" : "border border-dashed border-line text-ink-soft/60"
                  }`}
                >
                  {article.published ? "Veröffentlicht" : "Entwurf"}
                </span>
                <form action={toggleArticlePublished}>
                  <input type="hidden" name="id" value={article.id} />
                  <input type="hidden" name="next_published" value={(!article.published).toString()} />
                  <button
                    type="submit"
                    className={
                      article.published
                        ? "rounded-full border border-line px-3 py-1 text-xs text-ink-soft hover:border-ink hover:text-ink"
                        : "rounded-full bg-ink px-3 py-1 text-xs text-paper hover:bg-ink-soft"
                    }
                  >
                    {article.published ? "Auf Entwurf setzen" : "Veröffentlichen"}
                  </button>
                </form>
              </div>
            </div>
            <Link href={`/backend/ratgeber/${article.id}`} className="block">
              <p className="mt-1 text-sm text-ink-soft/70">/ratgeber/{article.slug}</p>
              <p className="mt-1 text-xs text-ink-soft/50">{formatDate(article.created_at)}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
