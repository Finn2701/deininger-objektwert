import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { getArticleBySlug } from "@/lib/articles";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.meta_description,
    alternates: { canonical: `/ratgeber/${article.slug}` },
  };
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("de-DE", { dateStyle: "long" }).format(new Date(value));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(article)) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Start", url: "/" },
              { name: "Ratgeber", url: "/ratgeber" },
              { name: article.title, url: `/ratgeber/${article.slug}` },
            ])
          ),
        }}
      />
      <main>
        <article className="py-20 md:py-28">
          <Container className="max-w-3xl">
            <Link href="/ratgeber" className="text-sm text-ink-soft/70 hover:text-ink">
              ← Ratgeber
            </Link>
            <p className="mt-6 text-xs text-ink-soft/60">{formatDate(article.created_at)}</p>
            <h1 className="mt-2 font-display text-3xl leading-[1.15] font-medium text-ink md:text-4xl">
              {article.title}
            </h1>

            <div className="prose-article mt-10 max-w-none" dangerouslySetInnerHTML={{ __html: article.content_html }} />

            <div className="mt-14 rounded-2xl border border-line p-6">
              <p className="font-display text-lg font-medium text-ink">
                Wie viel ist Ihre Immobilie wert?
              </p>
              <p className="mt-2 text-sm text-ink-soft/90">
                In wenigen Minuten zu einer ersten, unverbindlichen Einschätzung — kostenlos.
              </p>
              <Link
                href="/immobilienbewertung"
                className="mt-4 inline-flex rounded-full bg-ink px-5 py-2.5 text-sm text-paper hover:bg-ink-soft"
              >
                Jetzt kostenlos bewerten lassen
              </Link>
            </div>
          </Container>
        </article>
      </main>
    </>
  );
}
