import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Kunden",
  robots: { index: false, follow: false },
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("de-DE", { dateStyle: "medium" }).format(new Date(value));
}

export default async function CustomersPage() {
  const supabase = await createClient();
  const { data: customers, error } = await supabase
    .from("customers")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-2xl font-medium text-ink">Kunden</h1>
        <Link
          href="/backend/kunden/neu"
          className="rounded-full bg-ink px-4 py-2 text-sm text-paper hover:bg-ink-soft"
        >
          + Neuer Kunde
        </Link>
      </div>

      {error ? (
        <p className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          Kunden konnten nicht geladen werden: {error.message}
        </p>
      ) : null}

      {customers && customers.length === 0 ? (
        <p className="mt-8 text-sm text-ink-soft">Noch keine Kunden angelegt.</p>
      ) : null}

      <div className="mt-8 space-y-3">
        {customers?.map((customer) => (
          <Link
            key={customer.id}
            href={`/backend/kunden/${customer.id}`}
            className="block rounded-xl border border-line p-4 hover:border-ink-soft"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-medium text-ink">{customer.name}</p>
                <p className="mt-0.5 text-sm text-ink-soft">
                  {[customer.email, customer.phone].filter(Boolean).join(" · ") || "Keine Kontaktdaten"}
                </p>
              </div>
              <p className="text-xs text-ink-soft/60">seit {formatDate(customer.created_at)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
