import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteCustomer, saveCustomer } from "../../crm-actions";

export const metadata: Metadata = {
  title: "Kunde bearbeiten",
  robots: { index: false, follow: false },
};

export default async function CustomerDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const { id } = await params;
  const { saved, error } = await searchParams;
  const supabase = await createClient();

  const [{ data: customer }, { data: projects }] = await Promise.all([
    supabase.from("customers").select("*").eq("id", id).single(),
    supabase.from("projects").select("*").eq("customer_id", id).order("created_at", { ascending: false }),
  ]);

  if (!customer) {
    return <p className="text-sm text-ink-soft">Kunde nicht gefunden.</p>;
  }

  return (
    <div className="max-w-xl">
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-display text-2xl font-medium text-ink">{customer.name}</h1>
        <form action={deleteCustomer}>
          <input type="hidden" name="id" value={customer.id} />
          <button type="submit" className="text-sm text-ink-soft/70 hover:text-red-600">
            Löschen
          </button>
        </form>
      </div>

      {saved ? <p className="mt-4 text-sm text-ink-soft/70">Gespeichert.</p> : null}
      {error ? (
        <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      ) : null}

      <form action={saveCustomer} className="mt-6 space-y-4">
        <input type="hidden" name="id" value={customer.id} />
        <div>
          <label className="text-sm text-ink-soft">Name *</label>
          <input
            name="name"
            required
            defaultValue={customer.name}
            className="mt-1.5 w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-ink outline-none focus:border-ink"
          />
        </div>
        <div>
          <label className="text-sm text-ink-soft">E-Mail</label>
          <input
            name="email"
            type="email"
            defaultValue={customer.email ?? ""}
            className="mt-1.5 w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-ink outline-none focus:border-ink"
          />
        </div>
        <div>
          <label className="text-sm text-ink-soft">Telefon</label>
          <input
            name="phone"
            type="tel"
            defaultValue={customer.phone ?? ""}
            className="mt-1.5 w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-ink outline-none focus:border-ink"
          />
        </div>
        <div>
          <label className="text-sm text-ink-soft">Adresse</label>
          <input
            name="address"
            defaultValue={customer.address ?? ""}
            className="mt-1.5 w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-ink outline-none focus:border-ink"
          />
        </div>
        <div>
          <label className="text-sm text-ink-soft">Notizen</label>
          <textarea
            name="notes"
            rows={4}
            defaultValue={customer.notes ?? ""}
            className="mt-1.5 w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-ink outline-none focus:border-ink"
          />
        </div>
        <button type="submit" className="rounded-full bg-ink px-6 py-2.5 text-sm text-paper hover:bg-ink-soft">
          Speichern
        </button>
      </form>

      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-medium text-ink">Projekte</h2>
          <Link
            href={`/backend/projekte/neu?customer_id=${customer.id}`}
            className="text-sm text-ink-soft hover:text-ink"
          >
            + Neues Projekt
          </Link>
        </div>
        {projects && projects.length === 0 ? (
          <p className="mt-3 text-sm text-ink-soft/70">Noch keine Projekte für diesen Kunden.</p>
        ) : (
          <div className="mt-3 space-y-2">
            {projects?.map((project) => (
              <Link
                key={project.id}
                href={`/backend/projekte/${project.id}`}
                className="block rounded-lg border border-line px-4 py-3 text-sm hover:border-ink-soft"
              >
                <span className="text-ink">{project.title}</span>{" "}
                <span className="text-ink-soft/60">· {project.status}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
