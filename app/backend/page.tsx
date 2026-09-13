import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { updateLeadStatus } from "./actions";

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

export default async function BackendLeadsPage() {
  const supabase = await createClient();
  const { data: leads, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="font-display text-2xl font-medium text-ink">Anfragen</h1>
      <p className="mt-2 text-sm text-ink-soft">
        Eingaben aus dem Bewertungsrechner auf der Website.
      </p>

      {error ? (
        <p className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          Anfragen konnten nicht geladen werden: {error.message}
        </p>
      ) : null}

      {leads && leads.length === 0 ? (
        <p className="mt-8 text-sm text-ink-soft">Noch keine Anfragen eingegangen.</p>
      ) : null}

      <div className="mt-8 space-y-4">
        {leads?.map((lead) => (
          <div key={lead.id} className="rounded-xl border border-line p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
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
                <p className="mt-1 font-medium text-ink">
                  {lead.property_type ?? "–"} · {lead.location || "keine Lage angegeben"}
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

            <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:grid-cols-4">
              <div>
                <dt className="text-ink-soft/70">Wohnfläche</dt>
                <dd className="text-ink">{lead.living_area || "–"} m²</dd>
              </div>
              <div>
                <dt className="text-ink-soft/70">Grundstück</dt>
                <dd className="text-ink">{lead.plot_area || "–"} m²</dd>
              </div>
              <div>
                <dt className="text-ink-soft/70">Baujahr</dt>
                <dd className="text-ink">{lead.year_built ?? "–"}</dd>
              </div>
              <div>
                <dt className="text-ink-soft/70">Zustand</dt>
                <dd className="text-ink">{lead.condition ?? "–"}</dd>
              </div>
              <div>
                <dt className="text-ink-soft/70">Badezimmer</dt>
                <dd className="text-ink">{lead.bathrooms ?? "–"}</dd>
              </div>
              <div>
                <dt className="text-ink-soft/70">Einliegerwohnung</dt>
                <dd className="text-ink">
                  {lead.has_separate_unit === true ? "Ja" : lead.has_separate_unit === false ? "Nein" : "–"}
                </dd>
              </div>
              <div>
                <dt className="text-ink-soft/70">Wertspanne</dt>
                <dd className="text-ink">
                  {formatEuro(lead.estimate_low)} – {formatEuro(lead.estimate_high)}
                </dd>
              </div>
              <div>
                <dt className="text-ink-soft/70">Name</dt>
                <dd className="text-ink">{lead.name || "–"}</dd>
              </div>
              <div>
                <dt className="text-ink-soft/70">E-Mail</dt>
                <dd className="text-ink">
                  {lead.email ? (
                    <a href={`mailto:${lead.email}`} className="underline">
                      {lead.email}
                    </a>
                  ) : (
                    "–"
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-ink-soft/70">Telefon</dt>
                <dd className="text-ink">{lead.phone || "–"}</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}
