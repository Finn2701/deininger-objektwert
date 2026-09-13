import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { createProject } from "../../crm-actions";

export const metadata: Metadata = {
  title: "Neues Projekt",
  robots: { index: false, follow: false },
};

export default async function NewProjectPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; customer_id?: string }>;
}) {
  const { error, customer_id } = await searchParams;
  const supabase = await createClient();
  const { data: customers } = await supabase.from("customers").select("id, name").order("name");

  return (
    <div className="max-w-xl">
      <h1 className="font-display text-2xl font-medium text-ink">Neues Projekt</h1>
      <p className="mt-2 text-sm text-ink-soft">
        Titel und Adresse reichen zum Anlegen — die genaue Bewertung füllst du auf der nächsten
        Seite aus.
      </p>

      {error ? (
        <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      ) : null}

      <form action={createProject} className="mt-6 space-y-4">
        <div>
          <label className="text-sm text-ink-soft">Titel *</label>
          <input
            name="title"
            required
            placeholder="z. B. Musterstraße 5, 89522 Heidenheim"
            className="mt-1.5 w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-ink outline-none focus:border-ink"
          />
        </div>
        <div>
          <label className="text-sm text-ink-soft">Adresse</label>
          <input
            name="address"
            placeholder="für die Regionalbewertung"
            className="mt-1.5 w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-ink outline-none focus:border-ink"
          />
        </div>
        <div>
          <label className="text-sm text-ink-soft">Objektart</label>
          <select
            name="property_type"
            className="mt-1.5 w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-ink outline-none focus:border-ink"
          >
            <option value="">Noch offen</option>
            <option value="haus">Haus</option>
            <option value="wohnung">Wohnung</option>
            <option value="mehrfamilienhaus">Mehrfamilienhaus</option>
            <option value="grundstueck">Grundstück</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-ink-soft">Kunde</label>
          <select
            name="customer_id"
            defaultValue={customer_id ?? ""}
            className="mt-1.5 w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-ink outline-none focus:border-ink"
          >
            <option value="">Kein Kunde verknüpft</option>
            {customers?.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="rounded-full bg-ink px-6 py-2.5 text-sm text-paper hover:bg-ink-soft">
          Projekt anlegen
        </button>
      </form>
    </div>
  );
}
