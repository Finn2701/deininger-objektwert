import { HtmlEditor } from "@/components/backend/html-editor";
import { saveArticle, deleteArticle } from "../ratgeber-actions";
import type { Article } from "@/lib/articles";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-sm text-ink-soft">{label}</p>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

const FORM_ID = "article-form";

// datetime-local inputs need "YYYY-MM-DDTHH:mm" with no timezone suffix.
function toDatetimeLocal(value?: string | null): string {
  if (!value) return "";
  return value.slice(0, 16);
}

export function ArticleForm({ article }: { article?: Article }) {
  return (
    <form id={FORM_ID} action={saveArticle} className="space-y-6">
      {article ? <input type="hidden" name="id" value={article.id} /> : null}

      <Field label="Titel">
        <input
          name="title"
          defaultValue={article?.title}
          required
          className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-ink outline-none focus:border-ink"
        />
      </Field>

      <Field label="URL-Slug (leer lassen für automatische Generierung aus dem Titel)">
        <input
          name="slug"
          defaultValue={article?.slug}
          placeholder="z-b-mein-artikel"
          className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-ink outline-none focus:border-ink"
        />
      </Field>

      <Field label="Kurzbeschreibung (Vorschau in der Liste)">
        <textarea
          name="excerpt"
          defaultValue={article?.excerpt}
          rows={2}
          className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-ink outline-none focus:border-ink"
        />
      </Field>

      <Field label="Meta-Beschreibung (für Google, max. ca. 160 Zeichen)">
        <textarea
          name="meta_description"
          defaultValue={article?.meta_description}
          rows={2}
          className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-ink outline-none focus:border-ink"
        />
      </Field>

      <Field label="Inhalt">
        <HtmlEditor name="content_html" defaultValue={article?.content_html ?? ""} />
      </Field>

      <label className="flex items-center gap-2 text-sm text-ink-soft">
        <input type="checkbox" name="published" defaultChecked={article?.published ?? true} className="h-4 w-4 accent-ink" />
        Veröffentlicht (sichtbar unter /ratgeber)
      </label>

      <Field label="Geplante automatische Veröffentlichung (optional, nur solange noch nicht veröffentlicht)">
        <input
          type="datetime-local"
          name="scheduled_publish_at"
          defaultValue={toDatetimeLocal(article?.scheduled_publish_at)}
          className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-ink outline-none focus:border-ink"
        />
      </Field>

      <button type="submit" className="rounded-full bg-ink px-6 py-2.5 text-sm text-paper hover:bg-ink-soft">
        Speichern
      </button>
    </form>
  );
}

export function DeleteArticleButton({ id }: { id: string }) {
  return (
    <form action={deleteArticle}>
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="text-xs text-ink-soft/50 hover:text-red-600">
        Artikel löschen
      </button>
    </form>
  );
}
