import Link from "next/link";
import { Container } from "@/components/ui/container";
import { getPublishedArticles } from "@/lib/articles";

export async function RatgeberTeaserSection() {
  const articles = (await getPublishedArticles()).slice(0, 3);
  if (articles.length === 0) return null;

  return (
    <section className="border-t border-line py-20 md:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium tracking-[0.2em] text-accent-text uppercase">Ratgeber</p>
            <h2 className="mt-3 font-display text-2xl font-medium text-ink md:text-3xl">
              Wissenswertes rund um Immobilienbewertung
            </h2>
          </div>
          <Link
            href="/ratgeber"
            className="text-sm text-ink-soft underline decoration-ink-soft/30 underline-offset-4 hover:text-ink"
          >
            Alle Artikel
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/ratgeber/${article.slug}`}
              className="block rounded-2xl border border-line p-5 transition-colors hover:border-ink"
            >
              <p className="font-display text-base font-medium text-ink">{article.title}</p>
              <p className="mt-2 text-sm text-ink-soft/90">{article.excerpt}</p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
