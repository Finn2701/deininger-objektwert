import type { Metadata } from "next";
import { saveCustomer } from "../../crm-actions";

export const metadata: Metadata = {
  title: "Neuer Kunde",
  robots: { index: false, follow: false },
};

export default async function NewCustomerPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="max-w-xl">
      <h1 className="font-display text-2xl font-medium text-ink">Neuer Kunde</h1>

      {error ? (
        <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      ) : null}

      <form action={saveCustomer} className="mt-6 space-y-4">
        <div>
          <label className="text-sm text-ink-soft">Name *</label>
          <input
            name="name"
            required
            className="mt-1.5 w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-ink outline-none focus:border-ink"
          />
        </div>
        <div>
          <label className="text-sm text-ink-soft">E-Mail</label>
          <input
            name="email"
            type="email"
            className="mt-1.5 w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-ink outline-none focus:border-ink"
          />
        </div>
        <div>
          <label className="text-sm text-ink-soft">Telefon</label>
          <input
            name="phone"
            type="tel"
            className="mt-1.5 w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-ink outline-none focus:border-ink"
          />
        </div>
        <div>
          <label className="text-sm text-ink-soft">Adresse</label>
          <input
            name="address"
            className="mt-1.5 w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-ink outline-none focus:border-ink"
          />
        </div>
        <div>
          <label className="text-sm text-ink-soft">Notizen</label>
          <textarea
            name="notes"
            rows={4}
            className="mt-1.5 w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-ink outline-none focus:border-ink"
          />
        </div>
        <button type="submit" className="rounded-full bg-ink px-6 py-2.5 text-sm text-paper hover:bg-ink-soft">
          Kunde anlegen
        </button>
      </form>
    </div>
  );
}
