import type { Metadata } from "next";
import { getFaqsWithIds } from "@/lib/faq-admin";
import { saveFaqItem, deleteFaqItem } from "../actions";

export const metadata: Metadata = {
  title: "FAQ",
  robots: { index: false, follow: false },
};

export default async function BackendFaqPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const { saved, error } = await searchParams;
  const faqs = await getFaqsWithIds();

  return (
    <div>
      <h1 className="font-display text-2xl font-medium text-ink">FAQ</h1>
      <p className="mt-2 text-sm text-ink-soft">
        Fragen &amp; Antworten für die FAQ-Seite, sortiert nach Reihenfolge.
      </p>

      {saved ? (
        <p className="mt-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
          Gespeichert.
        </p>
      ) : null}
      {error ? (
        <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      ) : null}

      <div className="mt-8 space-y-6">
        {faqs.map((faq, index) => (
          <form
            key={faq.id ?? `new-${index}`}
            action={saveFaqItem}
            className="rounded-xl border border-line p-5"
          >
            <input type="hidden" name="id" value={faq.id ?? ""} />
            <div className="grid gap-4 sm:grid-cols-[80px_1fr]">
              <div>
                <label className="block text-xs text-ink-soft">Reihenfolge</label>
                <input
                  type="number"
                  name="sort_order"
                  defaultValue={faq.sort_order}
                  className="mt-1.5 w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-ink"
                />
              </div>
              <div>
                <label className="block text-xs text-ink-soft">Frage</label>
                <input
                  type="text"
                  name="question"
                  defaultValue={faq.question}
                  required
                  className="mt-1.5 w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-ink"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-xs text-ink-soft">Antwort</label>
              <textarea
                name="answer"
                rows={3}
                defaultValue={faq.answer}
                required
                className="mt-1.5 w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-ink"
              />
            </div>
            <div className="mt-4 flex gap-3">
              <button
                type="submit"
                className="rounded-full bg-ink px-5 py-2 text-xs text-paper transition-colors hover:bg-ink-soft"
              >
                Speichern
              </button>
              {faq.id ? (
                <button
                  type="submit"
                  formAction={deleteFaqItem}
                  className="rounded-full border border-line px-5 py-2 text-xs text-ink-soft hover:text-ink"
                >
                  Löschen
                </button>
              ) : null}
            </div>
          </form>
        ))}

        <form action={saveFaqItem} className="rounded-xl border border-dashed border-line p-5">
          <input type="hidden" name="id" value="" />
          <p className="text-sm font-medium text-ink">Neue Frage hinzufügen</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-[80px_1fr]">
            <div>
              <label className="block text-xs text-ink-soft">Reihenfolge</label>
              <input
                type="number"
                name="sort_order"
                defaultValue={faqs.length}
                className="mt-1.5 w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-ink"
              />
            </div>
            <div>
              <label className="block text-xs text-ink-soft">Frage</label>
              <input
                type="text"
                name="question"
                required
                className="mt-1.5 w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-ink"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-xs text-ink-soft">Antwort</label>
            <textarea
              name="answer"
              rows={3}
              required
              className="mt-1.5 w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-ink"
            />
          </div>
          <button
            type="submit"
            className="mt-4 rounded-full bg-ink px-5 py-2 text-xs text-paper transition-colors hover:bg-ink-soft"
          >
            Hinzufügen
          </button>
        </form>
      </div>
    </div>
  );
}
