import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { getPublishedArticles } from "@/lib/articles";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Ratgeber – Wissenswertes rund um Immobilienbewertung",
  description:
    "Verständlich erklärt: Wie das Finanzamt eine geerbte Immobilie bewertet, was eine Immobilienbewertung kostet und was der Bodenrichtwert bedeutet.",
  alternates: { canonical: "/ratgeber" },
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("de-DE", { dateStyle: "long" }).format(new Date(value));
}

export default async function RatgeberPage() {
  const articles = await getPublishedArticles();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([{ name: "Start", url: "/" }, { name: "Ratgeber", url: "/ratgeber" }])),
        }}
      />
      <main>
        <section className="py-20 md:py-28">
          <Container>
            <p className="text-xs font-medium tracking-[0.2em] text-accent uppercase">Ratgeber</p>
            <h1 className="mt-4 max-w-2xl font-display text-3xl leading-[1.15] font-medium text-ink md:text-4xl">
              Wissenswertes rund um Immobilienbewertung
            </h1>
            <p className="mt-5 max-w-xl text-balance text-ink-soft/90 md:text-lg">
              Verständlich erklärt, ohne Makler-Floskeln: Hintergründe, die bei einer Bewertung wirklich
              weiterhelfen.
            </p>

            {articles.length === 0 ? (
              <p className="mt-12 text-sm text-ink-soft/70">Aktuell sind keine Artikel verfügbar.</p>
            ) : (
              <div className="mt-14 grid gap-8 sm:grid-cols-2">
                {articles.map((article, i) => (
                  <Reveal key={article.id} delay={i * 0.05}>
                    <Link
                      href={`/ratgeber/${article.slug}`}
                      className="block rounded-2xl border border-line p-6 transition-colors hover:border-ink"
                    >
                      <p className="text-xs text-ink-soft/60">{formatDate(article.created_at)}</p>
                      <h2 className="mt-2 font-display text-xl font-medium text-ink">{article.title}</h2>
                      <p className="mt-3 text-sm text-ink-soft/90">{article.excerpt}</p>
                      <span className="mt-4 inline-block text-sm text-accent underline decoration-accent/40 underline-offset-4">
                        Weiterlesen →
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </div>
            )}
          </Container>
        </section>
      </main>
    </>
  );
}
