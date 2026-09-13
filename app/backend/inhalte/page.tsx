import type { Metadata } from "next";
import { contentRegistry } from "@/lib/content-registry";
import { getContentOverrides } from "@/lib/content";
import { saveContent } from "../actions";

export const metadata: Metadata = {
  title: "Inhalte",
  robots: { index: false, follow: false },
};

export default async function BackendInhaltePage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const overrides = await getContentOverrides(contentRegistry.map((field) => field.key));

  const groups = Array.from(new Set(contentRegistry.map((field) => field.group)));

  return (
    <div>
      <h1 className="font-display text-2xl font-medium text-ink">Inhalte</h1>
      <p className="mt-2 text-sm text-ink-soft">
        Texte, die auf der Website erscheinen. Leer lassen und speichern setzt ein Feld auf den
        Standardtext zurück.
      </p>

      {saved ? (
        <p className="mt-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
          Gespeichert.
        </p>
      ) : null}

      <form action={saveContent} className="mt-8 space-y-10">
        {groups.map((group) => (
          <div key={group}>
            <h2 className="font-display text-lg font-medium text-ink">{group}</h2>
            <div className="mt-4 space-y-5">
              {contentRegistry
                .filter((field) => field.group === group)
                .map((field) => (
                  <div key={field.key}>
                    <label htmlFor={field.key} className="block text-sm text-ink-soft">
                      {field.label}
                    </label>
                    {field.multiline ? (
                      <textarea
                        id={field.key}
                        name={`content.${field.key}`}
                        rows={3}
                        defaultValue={overrides[field.key] ?? ""}
                        placeholder={field.defaultValue}
                        className="mt-1.5 w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink outline-none focus:border-ink"
                      />
                    ) : (
                      <input
                        id={field.key}
                        name={`content.${field.key}`}
                        type="text"
                        defaultValue={overrides[field.key] ?? ""}
                        placeholder={field.defaultValue}
                        className="mt-1.5 w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink outline-none focus:border-ink"
                      />
                    )}
                  </div>
                ))}
            </div>
          </div>
        ))}

        <button
          type="submit"
          className="rounded-full bg-ink px-6 py-3 text-sm text-paper transition-colors hover:bg-ink-soft"
        >
          Speichern
        </button>
      </form>
    </div>
  );
}
