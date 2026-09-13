import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { featureOptions } from "@/components/valuation-form/steps-data";
import { updateLeadStatus } from "./actions";

const featureLabels = Object.fromEntries(featureOptions.map((f) => [f.value, f.label]));

export const metadata: Metadata = {
  title: "Anfragen",
  robots: { index: false, follow: false },
};

const statusOptions = ["neu", "kontaktiert", "erledigt", "kein Interesse"];

function formatDate(value: string) {
  return new Intl.DateTimeFormat("de-DE", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function formatEuro(value: number | null) {
  if (value === null) return "–";
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function Fact({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs text-ink-soft/60">{label}</dt>
      <dd className="mt-0.5 text-ink">{value}</dd>
    </div>
  );
}

export default async function BackendLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const { filter } = await searchParams;
  const supabase = await createClient();
  const { data: leads, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  const contactCount = leads?.filter((lead) => lead.wants_contact).length ?? 0;
  const totalCount = leads?.length ?? 0;

  const visibleLeads =
    filter === "kontakt" ? leads?.filter((lead) => lead.wants_contact) : leads;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-medium text-ink">Anfragen</h1>
          <p className="mt-2 text-sm text-ink-soft">
            {totalCount} Nutzung{totalCount === 1 ? "" : "en"} des Bewertungsrechners, davon{" "}
            {contactCount} mit Kontaktwunsch.
          </p>
        </div>
        <div className="flex gap-2 text-sm">
          <Link
            href="/backend"
            className={`rounded-full border px-4 py-1.5 ${
              !filter ? "border-ink bg-ink text-paper" : "border-line text-ink-soft hover:text-ink"
            }`}
          >
            Alle ({totalCount})
          </Link>
          <Link
            href="/backend?filter=kontakt"
            className={`rounded-full border px-4 py-1.5 ${
              filter === "kontakt"
                ? "border-ink bg-ink text-paper"
                : "border-line text-ink-soft hover:text-ink"
            }`}
          >
            Kontakt gewünscht ({contactCount})
          </Link>
        </div>
      </div>

      {error ? (
        <p className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          Anfragen konnten nicht geladen werden: {error.message}
        </p>
      ) : null}

      {visibleLeads && visibleLeads.length === 0 ? (
        <p className="mt-8 text-sm text-ink-soft">
          {filter === "kontakt" ? "Noch keine Kontaktanfragen." : "Noch keine Anfragen eingegangen."}
        </p>
      ) : null}

      <div className="mt-8 space-y-4">
        {visibleLeads?.map((lead) => (
          <div
            key={lead.id}
            className={`rounded-xl border p-5 ${
              lead.wants_contact ? "border-accent/40" : "border-line"
            }`}
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-xs text-ink-soft/70">{formatDate(lead.created_at)}</p>
                  {lead.wants_contact ? (
                    <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-[11px] font-medium text-accent">
                      Kontakt gewünscht
                    </span>
                  ) : (
                    <span className="rounded-full bg-line/60 px-2.5 py-0.5 text-[11px] font-medium text-ink-soft/70">
                      Nur Ansicht
                    </span>
                  )}
                </div>
                <p className="mt-1.5 font-display text-lg font-medium text-ink">
                  {lead.property_type ?? "–"} · {lead.location || "keine Lage angegeben"}
                </p>
                <p className="mt-0.5 text-sm text-ink-soft">
                  {formatEuro(lead.estimate_low)} – {formatEuro(lead.estimate_high)}
                </p>
              </div>

              <form action={updateLeadStatus} className="flex items-center gap-2">
                <input type="hidden" name="id" value={lead.id} />
                <select
                  name="status"
                  defaultValue={lead.status}
                  className="rounded-full border border-line bg-paper px-3 py-1.5 text-xs text-ink"
                >
                  {statusOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="rounded-full border border-line px-3 py-1.5 text-xs text-ink-soft hover:text-ink"
                >
                  Speichern
                </button>
              </form>
            </div>

            <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-line pt-4 text-sm sm:grid-cols-4">
              <Fact label="Wohnfläche" value={lead.living_area ? `${lead.living_area} m²` : "–"} />
              <Fact label="Grundstück" value={lead.plot_area ? `${lead.plot_area} m²` : "–"} />
              <Fact label="Baujahr" value={lead.year_built ?? "–"} />
              <Fact label="Zustand" value={lead.condition ?? "–"} />
            </dl>

            {lead.features && lead.features.length > 0 ? (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {lead.features.map((id: string) => (
                  <span
                    key={id}
                    className="rounded-full bg-line/50 px-2.5 py-0.5 text-[11px] text-ink-soft"
                  >
                    {featureLabels[id] ?? id}
                  </span>
                ))}
              </div>
            ) : null}

            {lead.wants_contact ? (
              <div className="mt-4 rounded-lg bg-accent/5 p-4">
                <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
                  <Fact label="Name" value={lead.name || "–"} />
                  <Fact
                    label="E-Mail"
                    value={
                      lead.email ? (
                        <a href={`mailto:${lead.email}`} className="underline">
                          {lead.email}
                        </a>
                      ) : (
                        "–"
                      )
                    }
                  />
                  <Fact
                    label="Telefon"
                    value={
                      lead.phone ? (
                        <a href={`tel:${lead.phone}`} className="underline">
                          {lead.phone}
                        </a>
                      ) : (
                        "–"
                      )
                    }
                  />
                </dl>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
