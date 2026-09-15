import type { Metadata } from "next";
import { ArticleForm } from "../article-form";

export const metadata: Metadata = {
  title: "Neuer Artikel",
  robots: { index: false, follow: false },
};

export default function NewArticlePage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-medium text-ink">Neuer Ratgeber-Artikel</h1>
      <div className="mt-8">
        <ArticleForm />
      </div>
    </div>
  );
}
