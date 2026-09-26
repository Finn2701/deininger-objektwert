import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { getArticleBySlug, getPublishedArticles } from "@/lib/articles";
import { relatedLinksForArticle } from "@/lib/internal-links";
import { articleSeo } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";

export const revalidate = 3600;

export async function generateStaticParams() {
  const articles = await getPublishedArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};

  const seo = articleSeo(article);
  return {
    title: { absolute: seo.title },
    description: seo.description,
    alternates: { canonical: `/ratgeber/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: seo.description,
      publishedTime: article.published_at ?? article.created_at,
      modifiedTime: article.updated_at,
    },
  };
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("de-DE", { dateStyle: "long" }).format(new Date(value));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const otherArticles = (await getPublishedArticles())
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);
  const related = relatedLinksForArticle(article);

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
            <p className="mt-6 text-xs text-ink-soft/60">
              {formatDate(article.published_at ?? article.created_at)} · von{" "}
              <Link href="/ueber-uns" className="underline hover:text-ink">
                {siteConfig.operator.name}
              </Link>
            </p>
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

            <div className="mt-14 grid gap-8 rounded-2xl border border-line p-6 md:grid-cols-2">
              <div>
                <p className="font-display text-lg font-medium text-ink">Passende Rechner</p>
                <ul className="mt-4 space-y-3">
                  {related.tools.map((tool) => (
                    <li key={tool.href}>
                      <Link href={tool.href} className="text-sm font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-ink">
                        {tool.title}
                      </Link>
                      <p className="mt-0.5 text-sm text-ink-soft/80">{tool.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-display text-lg font-medium text-ink">Immobilienbewertung vor Ort</p>
                <ul className="mt-4 space-y-2">
                  {related.cities.map((city) => (
                    <li key={city.href}>
                      <Link href={city.href} className="text-sm text-ink-soft/90 underline decoration-line underline-offset-4 hover:text-ink">
                        Immobilie bewerten in {city.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {otherArticles.length > 0 && (
              <div className="mt-14">
                <p className="font-display text-lg font-medium text-ink">Das könnte Sie auch interessieren</p>
                <ul className="mt-4 space-y-3">
                  {otherArticles.map((a) => (
                    <li key={a.slug}>
                      <Link href={`/ratgeber/${a.slug}`} className="text-sm text-ink-soft/90 underline hover:text-ink">
                        {a.title}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href="/faq" className="mt-4 inline-block text-sm text-ink-soft/70 underline hover:text-ink">
                  Häufige Fragen zur Immobilienbewertung ansehen
                </Link>
              </div>
            )}
          </Container>
        </article>
      </main>
    </>
  );
}
