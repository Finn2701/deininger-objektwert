import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { featureOptions } from "@/components/valuation-form/steps-data";
import { SelectAllCheckbox } from "@/components/backend/select-all-checkbox";
import { ConfirmSubmitButton } from "@/components/backend/confirm-submit-button";
import { bulkUpdateLeads, deleteLead, updateLeadStatus, refreshClarityInsights } from "./actions";
import { getClarityInsights } from "@/lib/clarity";
import { createCustomerAndProjectFromLead } from "./crm-actions";

const BULK_FORM_ID = "bulk-leads-form";

const featureLabels = Object.fromEntries(featureOptions.map((f) => [f.value, f.label]));
const dayLabels: Record<string, string> = {
  mo: "Mo",
  di: "Di",
  mi: "Mi",
  do: "Do",
  fr: "Fr",
  sa: "Sa",
  so: "So",
};

const floorLevelLabels: Record<string, string> = {
  erdgeschoss: "Erdgeschoss",
  "mittlere-etage": "Mittlere Etage",
  "oberste-etage": "Oberste Etage / DG",
};

const precisionLabels: Record<string, string> = {
  basis: "Basis-Schätzung",
  erweitert: "Erweiterte Schätzung",
  detailliert: "Detaillierte Schätzung",
};

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

function formatSeconds(value: number | null) {
  if (value === null || !Number.isFinite(value)) return "–";
  const minutes = Math.floor(value / 60);
  const seconds = Math.round(value % 60);
  return `${minutes}:${String(seconds).padStart(2, "0")} Min`;
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
  searchParams: Promise<{ filter?: string; from?: string; to?: string }>;
}) {
  const { filter, from, to } = await searchParams;
  const supabase = await createClient();

  let query = supabase.from("leads").select("*").order("created_at", { ascending: false });
  if (from) query = query.gte("created_at", `${from}T00:00:00`);
  if (to) query = query.lte("created_at", `${to}T23:59:59`);

  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const [{ data: leadsRaw, error }, { data: linkedCustomers }, { data: views }, clarity] = await Promise.all([
    query,
    supabase.from("customers").select("id, lead_id").not("lead_id", "is", null),
    supabase.from("page_views").select("day, path, views").gte("day", thirtyDaysAgo),
    getClarityInsights(supabase),
  ]);

  const today = new Date().toISOString().slice(0, 10);
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const viewStats = (views ?? []).reduce(
    (acc, row) => {
      acc.total30 += row.views;
      if (row.day >= sevenDaysAgo) acc.total7 += row.views;
      if (row.day === today) acc.totalToday += row.views;
      acc.byPath[row.path] = (acc.byPath[row.path] ?? 0) + row.views;
      return acc;
    },
    { total30: 0, total7: 0, totalToday: 0, byPath: {} as Record<string, number> }
  );
  const topPaths = Object.entries(viewStats.byPath)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  const customerByLeadId = new Map((linkedCustomers ?? []).map((c) => [c.lead_id as string, c.id as string]));

  // Leads who want to be contacted always float to the top, regardless of
  // date/filter sort order, since those are the ones that actually need a
  // reply — everything else is just usage stats.
  const leads = [...(leadsRaw ?? [])].sort((a, b) => {
    if (a.wants_contact !== b.wants_contact) return a.wants_contact ? -1 : 1;
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  // Resolve short-lived signed URLs for any uploaded documents (private bucket).
  const filePaths = leads.flatMap((lead) => (lead.files as string[] | null) ?? []);
  const signedUrlByPath = new Map<string, string>();
  if (filePaths.length > 0) {
    const { data: signed } = await supabase.storage
      .from("lead-documents")
      .createSignedUrls(filePaths, 60 * 60);
    signed?.forEach((entry) => {
      if (entry.signedUrl) signedUrlByPath.set(entry.path ?? "", entry.signedUrl);
    });
  }

  const contactCount = leads.filter((lead) => lead.wants_contact).length;
  const totalCount = leads.length;

  const visibleLeads = filter === "kontakt" ? leads.filter((lead) => lead.wants_contact) : leads;

  return (
    <div>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
        <div className="rounded-xl border border-line p-4">
          <p className="text-xs text-ink-soft/60">Aufrufe heute</p>
          <p className="mt-1 font-display text-xl font-medium text-ink">{viewStats.totalToday}</p>
        </div>
        <div className="rounded-xl border border-line p-4">
          <p className="text-xs text-ink-soft/60">Letzte 7 Tage</p>
          <p className="mt-1 font-display text-xl font-medium text-ink">{viewStats.total7}</p>
        </div>
        <div className="rounded-xl border border-line p-4">
          <p className="text-xs text-ink-soft/60">Letzte 30 Tage</p>
          <p className="mt-1 font-display text-xl font-medium text-ink">{viewStats.total30}</p>
        </div>
        <div className="col-span-3 rounded-xl border border-line p-4 sm:col-span-2">
          <p className="text-xs text-ink-soft/60">Meistbesucht (30 Tage)</p>
          <div className="mt-1 space-y-0.5">
            {topPaths.length === 0 ? (
              <p className="text-sm text-ink-soft/50">Noch keine Daten</p>
            ) : (
              topPaths.map(([path, count]) => (
                <p key={path} className="flex justify-between text-sm text-ink-soft">
                  <span className="truncate">{path === "/" ? "Startseite" : path}</span>
                  <span className="text-ink">{count}</span>
                </p>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-line p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-medium tracking-[0.1em] text-ink-soft/70 uppercase">
            Microsoft Clarity (letzte 3 Tage)
          </p>
          <div className="flex items-center gap-3 text-xs text-ink-soft/60">
            {clarity.fetchedAt ? (
              <span>Stand: {formatDate(clarity.fetchedAt)}</span>
            ) : null}
            <form action={refreshClarityInsights}>
              <button type="submit" className="rounded-full border border-line px-3 py-1 text-ink-soft hover:text-ink">
                Aktualisieren
              </button>
            </form>
          </div>
        </div>

        {clarity.error ? (
          <p className="mt-2 text-xs text-amber-700">{clarity.error}</p>
        ) : null}

        {clarity.data ? (
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            <div>
              <p className="text-xs text-ink-soft/60">Sitzungen</p>
              <p className="mt-0.5 font-display text-lg font-medium text-ink">{clarity.data.sessions}</p>
            </div>
            <div>
              <p className="text-xs text-ink-soft/60">Besucher</p>
              <p className="mt-0.5 font-display text-lg font-medium text-ink">{clarity.data.distinctUsers}</p>
            </div>
            <div>
              <p className="text-xs text-ink-soft/60">Bot-Sitzungen</p>
              <p className="mt-0.5 font-display text-lg font-medium text-ink">{clarity.data.botSessions}</p>
            </div>
            <div>
              <p className="text-xs text-ink-soft/60">Ø Seiten/Sitzung</p>
              <p className="mt-0.5 font-display text-lg font-medium text-ink">
                {clarity.data.avgPagesPerSession?.toFixed(1) ?? "–"}
              </p>
            </div>
            <div>
              <p className="text-xs text-ink-soft/60">Ø Verweildauer</p>
              <p className="mt-0.5 font-display text-lg font-medium text-ink">
                {formatSeconds(clarity.data.avgEngagementSeconds)}
              </p>
            </div>
            <div>
              <p className="text-xs text-ink-soft/60">Sessions mit Dead-/Rage-Clicks</p>
              <p className="mt-0.5 font-display text-lg font-medium text-ink">
                {clarity.data.deadClicks} / {clarity.data.rageClicks}
              </p>
            </div>
          </div>
        ) : !clarity.error ? (
          <p className="mt-2 text-sm text-ink-soft/50">Noch keine Daten geladen.</p>
        ) : null}
      </div>

      <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-medium text-ink">Anfragen</h1>
          <p className="mt-2 text-sm text-ink-soft">
            {totalCount} Nutzung{totalCount === 1 ? "" : "en"} des Bewertungsrechners, davon{" "}
            {contactCount} mit Kontaktwunsch.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <Link
            href={{ pathname: "/backend", query: { from, to } }}
            className={`rounded-full border px-4 py-1.5 ${
              !filter ? "border-ink bg-ink text-paper" : "border-line text-ink-soft hover:text-ink"
            }`}
          >
            Alle ({totalCount})
          </Link>
          <Link
            href={{ pathname: "/backend", query: { filter: "kontakt", from, to } }}
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

      <form className="mt-4 flex flex-wrap items-end gap-3 text-sm" action="/backend">
        {filter ? <input type="hidden" name="filter" value={filter} /> : null}
        <label className="block">
          <span className="text-xs text-ink-soft/70">Von</span>
          <input
            type="date"
            name="from"
            defaultValue={from ?? ""}
            className="mt-1 block rounded-lg border border-line bg-paper px-3 py-1.5 text-ink outline-none focus:border-ink"
          />
        </label>
        <label className="block">
          <span className="text-xs text-ink-soft/70">Bis</span>
          <input
            type="date"
            name="to"
            defaultValue={to ?? ""}
            className="mt-1 block rounded-lg border border-line bg-paper px-3 py-1.5 text-ink outline-none focus:border-ink"
          />
        </label>
        <button type="submit" className="rounded-full border border-line px-4 py-1.5 text-ink-soft hover:text-ink">
          Filtern
        </button>
        {from || to ? (
          <Link href={{ pathname: "/backend", query: { filter } }} className="text-ink-soft/70 underline">
            Zurücksetzen
          </Link>
        ) : null}
      </form>

      {error ? (
        <p className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          Anfragen konnten nicht geladen werden: {error.message}
        </p>
      ) : null}

      {visibleLeads.length === 0 ? (
        <p className="mt-8 text-sm text-ink-soft">
          {filter === "kontakt" ? "Noch keine Kontaktanfragen." : "Keine Anfragen im gewählten Zeitraum."}
        </p>
      ) : null}

      {visibleLeads.length > 0 ? (
        <>
          {/* Checkboxes further down reference this form via form="bulk-leads-form"
              rather than nesting inside it, since each lead card already has its
              own per-row forms (status/delete) and forms can't nest in HTML. */}
          <form id={BULK_FORM_ID} action={bulkUpdateLeads} className="mt-6 flex flex-wrap items-center gap-3 rounded-xl border border-line bg-paper-dim p-3 text-sm">
            <label className="flex items-center gap-2 text-ink-soft">
              <SelectAllCheckbox />
              Alle auswählen
            </label>
            <select
              name="bulkStatus"
              defaultValue="kontaktiert"
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
              name="intent"
              value="status"
              className="rounded-full border border-line px-3 py-1.5 text-xs text-ink-soft hover:text-ink"
            >
              Status setzen
            </button>
            <ConfirmSubmitButton
              type="submit"
              name="intent"
              value="delete"
              confirmMessage="Ausgewählte Anfragen wirklich unwiderruflich löschen?"
              className="rounded-full border border-red-200 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50"
            >
              Ausgewählte löschen
            </ConfirmSubmitButton>
          </form>
        </>
      ) : null}

      <div className="mt-8 space-y-4">
        {visibleLeads.map((lead) => {
          const isUpload = lead.source === "unterlagen";
          const files = (lead.files as string[] | null) ?? [];
          const contactDays = (lead.contact_days as string[] | null) ?? [];

          return (
            <div
              key={lead.id}
              className={`rounded-xl border p-5 ${
                lead.wants_contact
                  ? "border-accent/50 bg-accent/[0.04]"
                  : isUpload
                    ? "border-sky-400/40 bg-sky-50/40"
                    : "border-line"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex gap-3">
                  <input
                    type="checkbox"
                    name="ids"
                    value={lead.id}
                    form={BULK_FORM_ID}
                    aria-label="Anfrage auswählen"
                    className="mt-1.5 h-4 w-4 shrink-0 accent-ink"
                  />
                  <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-xs text-ink-soft/70">{formatDate(lead.created_at)}</p>
                    {lead.wants_contact ? (
                      <span className="rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-medium text-paper">
                        ● Kontakt gewünscht
                      </span>
                    ) : (
                      <span className="rounded-full bg-line/60 px-2.5 py-0.5 text-[11px] font-medium text-ink-soft/70">
                        Nur Ansicht
                      </span>
                    )}
                    {isUpload ? (
                      <span className="rounded-full bg-sky-500/15 px-2.5 py-0.5 text-[11px] font-medium text-sky-700">
                        Unterlagen eingereicht
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1.5 font-display text-lg font-medium text-ink">
                    {lead.property_type ?? "–"} · {lead.location || "keine Lage angegeben"}
                  </p>
                  <p className="mt-0.5 flex flex-wrap items-center gap-2 text-sm text-ink-soft">
                    <span>
                      {formatEuro(lead.estimate_low)} – {formatEuro(lead.estimate_high)}
                    </span>
                    {lead.estimate_precision ? (
                      <span className="rounded-full border border-line px-2 py-0.5 text-[11px] text-ink-soft/70">
                        {precisionLabels[lead.estimate_precision] ?? lead.estimate_precision}
                      </span>
                    ) : null}
                  </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
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
                  <form action={deleteLead}>
                    <input type="hidden" name="id" value={lead.id} />
                    <button type="submit" className="text-xs text-ink-soft/50 hover:text-red-600">
                      Löschen
                    </button>
                  </form>
                </div>
              </div>

              <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-line pt-4 text-sm sm:grid-cols-4">
                <Fact label="Wohnfläche" value={lead.living_area ? `${lead.living_area} m²` : "–"} />
                <Fact label="Grundstück" value={lead.plot_area ? `${lead.plot_area} m²` : "–"} />
                <Fact label="Baujahr" value={lead.year_built ?? "–"} />
                <Fact label="Zustand" value={lead.condition ?? "–"} />
                <Fact label="Energieklasse" value={lead.energy_class ? lead.energy_class.toUpperCase().replace("-PLUS", "+") : "–"} />
                {lead.property_type === "wohnung" ? (
                  <>
                    <Fact label="Etage" value={lead.floor_level ? floorLevelLabels[lead.floor_level] ?? lead.floor_level : "–"} />
                    <Fact label="Aufzug" value={lead.has_elevator === null ? "–" : lead.has_elevator ? "Ja" : "Nein"} />
                  </>
                ) : null}
                <Fact
                  label="Feuchtigkeit/Geruch"
                  value={lead.moisture_issues === null ? "–" : lead.moisture_issues ? "Auffällig" : "Unauffällig"}
                />
              </dl>

              {lead.features && lead.features.length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {lead.features.map((id: string) => (
                    <span key={id} className="rounded-full bg-line/50 px-2.5 py-0.5 text-[11px] text-ink-soft">
                      {featureLabels[id] ?? id}
                    </span>
                  ))}
                </div>
              ) : null}

              {lead.message ? (
                <p className="mt-4 rounded-lg bg-paper-dim p-3 text-sm text-ink-soft whitespace-pre-wrap">
                  „{lead.message}“
                </p>
              ) : null}

              {files.length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {files.map((path) => {
                    const url = signedUrlByPath.get(path);
                    const name = path.split("/").pop() ?? path;
                    return url ? (
                      <a
                        key={path}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-sky-400/50 px-3 py-1 text-xs text-sky-700 hover:bg-sky-50"
                      >
                        📎 {name}
                      </a>
                    ) : null;
                  })}
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

                  {contactDays.length > 0 || lead.contact_time ? (
                    <p className="mt-3 text-sm text-ink-soft">
                      Erreichbar:{" "}
                      {contactDays.length > 0 ? contactDays.map((d: string) => dayLabels[d] ?? d).join(", ") : "jederzeit"}
                      {lead.contact_time ? ` · ${lead.contact_time}` : ""}
                    </p>
                  ) : null}

                  {lead.contact_notes ? (
                    <p className="mt-2 text-sm text-ink-soft/90 whitespace-pre-wrap">
                      Notiz: {lead.contact_notes}
                    </p>
                  ) : null}

                  <div className="mt-4">
                    {customerByLeadId.has(lead.id) ? (
                      <Link href={`/backend/kunden/${customerByLeadId.get(lead.id)}`} className="text-sm text-accent underline">
                        Zum Kunden →
                      </Link>
                    ) : (
                      <form action={createCustomerAndProjectFromLead}>
                        <input type="hidden" name="lead_id" value={lead.id} />
                        <button
                          type="submit"
                          className="rounded-full bg-accent px-4 py-1.5 text-xs text-paper hover:bg-accent/90"
                        >
                          Als Kunde & Projekt anlegen
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
