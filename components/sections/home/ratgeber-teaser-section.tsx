import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getPublishedArticles } from "@/lib/articles";

export async function RatgeberTeaserSection() {
  const articles = (await getPublishedArticles()).slice(0, 3);
  if (articles.length === 0) return null;

  return (
    <section className="border-t border-ink py-20 md:py-32">
      <Container>
        <SectionHeading eyebrow="Ratgeber" title="Wissenswertes rund um Immobilienbewertung" />

        <div className="mt-14 md:mt-20">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/ratgeber/${article.slug}`}
              className="group grid gap-3 border-t border-ink py-7 transition-colors hover:bg-paper-dim md:grid-cols-12 md:gap-8 md:py-9"
            >
              <p className="font-display text-xl leading-snug font-semibold text-ink md:col-span-5 md:text-2xl">
                {article.title}
              </p>
              <p className="max-w-xl text-base leading-relaxed text-ink-soft md:col-span-6">{article.excerpt}</p>
              <span
                className="text-ink transition-transform group-hover:translate-x-1 md:col-span-1 md:justify-self-end"
                aria-hidden
              >
                <svg width="22" height="14" viewBox="0 0 18 12" fill="none">
                  <path d="M0 6h16M11 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </span>
            </Link>
          ))}
          <div className="flex justify-end border-t border-ink pt-6">
            <Link href="/ratgeber" className="text-sm font-semibold text-ink underline decoration-ink/40 hover:decoration-ink">
              Alle Artikel
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
