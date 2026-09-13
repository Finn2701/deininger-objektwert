import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import type { ProAssessment } from "@/lib/pro-valuation";
import { emptyAssessment } from "@/lib/pro-valuation";
import { addProjectNote, deleteProjectNote, saveProjectAssessment } from "../../crm-actions";

export const metadata: Metadata = {
  title: "Projekt",
  robots: { index: false, follow: false },
};

function formatEuro(value: number | null) {
  if (value === null) return "–";
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("de-DE", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

function Pills({
  name,
  options,
  current,
}: {
  name: string;
  options: { value: string; label: string }[];
  current: string | null;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <label key={option.value} className="cursor-pointer">
          <input
            type="radio"
            name={name}
            value={option.value}
            defaultChecked={current === option.value}
            className="peer sr-only"
          />
          <span className="inline-block rounded-full border border-line px-3 py-1.5 text-xs text-ink-soft transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper">
            {option.label}
          </span>
        </label>
      ))}
      <label className="cursor-pointer">
        <input type="radio" name={name} value="" defaultChecked={current === null} className="peer sr-only" />
        <span className="inline-block rounded-full border border-dashed border-line px-3 py-1.5 text-xs text-ink-soft/60 transition-colors peer-checked:border-ink-soft peer-checked:text-ink-soft peer-checked:bg-line/40">
          Weiß nicht
        </span>
      </label>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-sm text-ink-soft">{label}</p>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

function NumberInput({ name, defaultValue, placeholder }: { name: string; defaultValue: string; placeholder?: string }) {
  return (
    <input
      type="number"
      name={name}
      defaultValue={defaultValue}
      placeholder={placeholder}
      className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-ink outline-none focus:border-ink"
    />
  );
}

const ratingOptions = [
  { value: "sehr-gut", label: "Sehr gut" },
  { value: "gut", label: "Gut" },
  { value: "mittel", label: "Mittel" },
  { value: "einfach", label: "Einfach" },
];

const featureOptions = [
  { value: "zweites-bad", label: "Mehr als ein Bad" },
  { value: "neue-kueche", label: "Neuwertige Einbauküche" },
  { value: "aussenbereich", label: "Balkon oder Terrasse" },
  { value: "keller", label: "Keller" },
  { value: "stellplatz", label: "Garage oder Stellplatz" },
  { value: "einliegerwohnung", label: "Einliegerwohnung" },
];

const confidenceLabel: Record<string, string> = {
  niedrig: "Grobe Schätzung — wenige Angaben bekannt",
  mittel: "Solide Schätzung",
  hoch: "Präzise Schätzung — Angaben weitgehend vollständig",
};

export default async function ProjectDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  const { id } = await params;
  const { saved } = await searchParams;
  const supabase = await createClient();

  const [{ data: project }, { data: customers }, { data: notes }] = await Promise.all([
    supabase.from("projects").select("*").eq("id", id).single(),
    supabase.from("customers").select("id, name").order("name"),
    supabase.from("project_notes").select("*").eq("project_id", id).order("created_at", { ascending: false }),
  ]);

  if (!project) {
    return <p className="text-sm text-ink-soft">Projekt nicht gefunden.</p>;
  }

  const a: ProAssessment = { ...emptyAssessment, ...(project.assessment as Partial<ProAssessment>) };

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-medium text-ink">{project.title}</h1>
          {project.address ? <p className="mt-1 text-sm text-ink-soft">{project.address}</p> : null}
        </div>
        <div className="rounded-xl border border-line bg-paper-dim px-5 py-4 text-right">
          <p className="text-xs text-ink-soft/60 uppercase tracking-[0.1em]">Aktuelle Schätzung</p>
          <p className="mt-1 font-display text-2xl font-medium text-ink">{formatEuro(project.estimate_headline)}</p>
          <p className="mt-0.5 text-xs text-ink-soft/70">
            {formatEuro(project.estimate_low)} – {formatEuro(project.estimate_high)}
          </p>
          {project.confidence ? (
            <p className="mt-1 text-xs text-accent">{confidenceLabel[project.confidence] ?? project.confidence}</p>
          ) : null}
        </div>
      </div>

      {saved ? <p className="mt-4 text-sm text-ink-soft/70">Gespeichert.</p> : null}

      <form action={saveProjectAssessment} className="mt-8 space-y-10">
        <input type="hidden" name="id" value={project.id} />

        <section className="grid gap-4 sm:grid-cols-2">
          <Field label="Titel">
            <input
              name="title"
              defaultValue={project.title}
              className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-ink outline-none focus:border-ink"
            />
          </Field>
          <Field label="Status">
            <select
              name="status"
              defaultValue={project.status}
              className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-ink outline-none focus:border-ink"
            >
              <option value="in bearbeitung">In Bearbeitung</option>
              <option value="wartet auf kunde">Wartet auf Kunde</option>
              <option value="abgeschlossen">Abgeschlossen</option>
              <option value="archiviert">Archiviert</option>
            </select>
          </Field>
          <Field label="Kunde">
            <select
              name="customer_id"
              defaultValue={project.customer_id ?? ""}
              className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-ink outline-none focus:border-ink"
            >
              <option value="">Kein Kunde verknüpft</option>
              {customers?.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Adresse (für Regionalbewertung)">
            <input
              name="address"
              defaultValue={a.address || project.address || ""}
              placeholder="z. B. 89522 Heidenheim"
              className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-ink outline-none focus:border-ink"
            />
          </Field>
        </section>

        <section>
          <h2 className="font-display text-lg font-medium text-ink">Objektart & Baujahr</h2>
          <div className="mt-4 space-y-5">
            <Field label="Objektart">
              <Pills
                name="propertyType"
                options={[
                  { value: "haus", label: "Haus" },
                  { value: "wohnung", label: "Wohnung" },
                  { value: "mehrfamilienhaus", label: "Mehrfamilienhaus" },
                  { value: "grundstueck", label: "Grundstück" },
                ]}
                current={a.propertyType}
              />
            </Field>
            <Field label="Baujahr (Zeitraum, für die Grundberechnung)">
              <Pills
                name="yearBuilt"
                options={[
                  { value: "vor-1950", label: "Vor 1950" },
                  { value: "1950-1970", label: "1950–1970" },
                  { value: "1970-1990", label: "1970–1990" },
                  { value: "1990-2010", label: "1990–2010" },
                  { value: "nach-2010", label: "Nach 2010" },
                ]}
                current={a.yearBuilt}
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Baujahr genau">
                <NumberInput name="yearBuiltExact" defaultValue={a.yearBuiltExact} placeholder="z. B. 1998" />
              </Field>
              <Field label="Wohnfläche (m²)">
                <NumberInput name="livingArea" defaultValue={a.livingArea} />
              </Field>
              <Field label="Grundstück (m²)">
                <NumberInput name="plotArea" defaultValue={a.plotArea} />
              </Field>
              <Field label="Zimmer">
                <NumberInput name="rooms" defaultValue={a.rooms} />
              </Field>
              <Field label="Badezimmer">
                <NumberInput name="bathrooms" defaultValue={a.bathrooms} />
              </Field>
              <Field label="Vollgeschosse">
                <NumberInput name="floors" defaultValue={a.floors} />
              </Field>
            </div>
            <Field label="Allgemeiner Zustand (Heizung/Elektrik/Leitungen)">
              <Pills
                name="condition"
                options={[
                  { value: "unsaniert", label: "Unsaniert" },
                  { value: "teilsaniert", label: "Teilsaniert" },
                  { value: "modernisiert", label: "Modernisiert" },
                ]}
                current={a.condition}
              />
            </Field>
          </div>
        </section>

        <section>
          <h2 className="font-display text-lg font-medium text-ink">Lage</h2>
          <div className="mt-4 space-y-5">
            <Field label="Mikrolage">
              <Pills name="microLocation" options={ratingOptions} current={a.microLocation} />
            </Field>
            <Field label="Lärmbelastung">
              <Pills
                name="noise"
                options={[
                  { value: "keine", label: "Keine" },
                  { value: "gering", label: "Gering" },
                  { value: "erheblich", label: "Erheblich" },
                ]}
                current={a.noise}
              />
            </Field>
            <Field label="ÖPNV-Anbindung">
              <Pills name="publicTransport" options={ratingOptions} current={a.publicTransport} />
            </Field>
            <Field label="Nahversorgung (Einkaufen, Ärzte)">
              <Pills name="amenities" options={ratingOptions} current={a.amenities} />
            </Field>
          </div>
        </section>

        <section>
          <h2 className="font-display text-lg font-medium text-ink">Zustand im Detail</h2>
          <div className="mt-4 space-y-5">
            <Field label="Dach">
              <Pills
                name="roof"
                options={[
                  { value: "neu-saniert", label: "Neu / saniert" },
                  { value: "gepflegt", label: "Gepflegt" },
                  { value: "renovierungsbeduerftig", label: "Renovierungsbedürftig" },
                ]}
                current={a.roof}
              />
            </Field>
            <Field label="Fassade / Dämmung">
              <Pills
                name="facade"
                options={[
                  { value: "modernisiert", label: "Modernisiert" },
                  { value: "teilweise", label: "Teilweise" },
                  { value: "unsaniert", label: "Unsaniert" },
                ]}
                current={a.facade}
              />
            </Field>
            <Field label="Fenster">
              <Pills
                name="windows"
                options={[
                  { value: "mehrfachverglast", label: "Mehrfachverglast" },
                  { value: "teilweise", label: "Teilweise" },
                  { value: "einfachverglast", label: "Einfachverglast" },
                ]}
                current={a.windows}
              />
            </Field>
            <Field label="Heizung">
              <Pills
                name="heating"
                options={[
                  { value: "waermepumpe", label: "Wärmepumpe" },
                  { value: "gas-oel-neu", label: "Gas/Öl (neuer)" },
                  { value: "gas-oel-alt", label: "Gas/Öl (alt)" },
                  { value: "fernwaerme", label: "Fernwärme" },
                ]}
                current={a.heating}
              />
            </Field>
            <Field label="Elektrik & Leitungen">
              <Pills
                name="electrics"
                options={[
                  { value: "erneuert", label: "Erneuert" },
                  { value: "teilweise", label: "Teilweise" },
                  { value: "original", label: "Original" },
                ]}
                current={a.electrics}
              />
            </Field>
            <Field label="Keller">
              <Pills
                name="basement"
                options={[
                  { value: "trocken-ausgebaut", label: "Trocken & ausgebaut" },
                  { value: "trocken", label: "Trocken" },
                  { value: "feucht", label: "Feucht" },
                  { value: "kein-keller", label: "Kein Keller" },
                ]}
                current={a.basement}
              />
            </Field>
          </div>
        </section>

        <section>
          <h2 className="font-display text-lg font-medium text-ink">Energie</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Energieeffizienzklasse">
              <Pills
                name="energyClass"
                options={["A+", "A", "B", "C", "D", "E", "F", "G", "H"].map((c) => ({ value: c, label: c }))}
                current={a.energyClass || null}
              />
            </Field>
            <Field label="Energiekennwert (kWh/m²a, optional)">
              <NumberInput name="energyValue" defaultValue={a.energyValue} />
            </Field>
          </div>
        </section>

        <section>
          <h2 className="font-display text-lg font-medium text-ink">Ausstattung</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {featureOptions.map((option) => (
              <label key={option.value} className="cursor-pointer">
                <input
                  type="checkbox"
                  name="features"
                  value={option.value}
                  defaultChecked={a.features.includes(option.value as never)}
                  className="peer sr-only"
                />
                <span className="inline-block rounded-full border border-line px-3 py-1.5 text-xs text-ink-soft transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display text-lg font-medium text-ink">Besonderheiten</h2>
          <div className="mt-4 space-y-5">
            <div className="grid gap-5 sm:grid-cols-3">
              <Field label="Denkmalschutz">
                <Pills
                  name="heritageProtection"
                  options={[
                    { value: "ja", label: "Ja" },
                    { value: "nein", label: "Nein" },
                  ]}
                  current={a.heritageProtection}
                />
              </Field>
              <Field label="Erbbaurecht">
                <Pills
                  name="leaseholdLand"
                  options={[
                    { value: "ja", label: "Ja" },
                    { value: "nein", label: "Nein" },
                  ]}
                  current={a.leaseholdLand}
                />
              </Field>
              <Field label="Vermietet">
                <Pills
                  name="rented"
                  options={[
                    { value: "ja", label: "Ja" },
                    { value: "nein", label: "Nein" },
                  ]}
                  current={a.rented}
                />
              </Field>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Kaltmiete/Monat (falls vermietet)">
                <NumberInput name="rentedIncome" defaultValue={a.rentedIncome} />
              </Field>
              <Field label="Sanierungsstau">
                <Pills
                  name="renovationBacklog"
                  options={[
                    { value: "keiner", label: "Keiner" },
                    { value: "gering", label: "Gering" },
                    { value: "erheblich", label: "Erheblich" },
                  ]}
                  current={a.renovationBacklog}
                />
              </Field>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-display text-lg font-medium text-ink">Eigene Einschätzung</h2>
          <div className="mt-4 space-y-4">
            <Field label="Bekannter Bodenrichtwert (€/m², überschreibt die automatische Regionalschätzung)">
              <NumberInput name="knownLandValue" defaultValue={a.knownLandValue} />
            </Field>
            <Field label="Notizen zu Vergleichsobjekten / Markteinschätzung">
              <textarea
                name="marketNotes"
                defaultValue={a.marketNotes}
                rows={4}
                className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-ink outline-none focus:border-ink"
              />
            </Field>
          </div>
        </section>

        <button type="submit" className="rounded-full bg-ink px-6 py-2.5 text-sm text-paper hover:bg-ink-soft">
          Bewertung speichern & neu berechnen
        </button>
      </form>

      <section className="mt-12 border-t border-line pt-8">
        <h2 className="font-display text-lg font-medium text-ink">Notizen</h2>
        <form action={addProjectNote} className="mt-4 flex gap-2">
          <input type="hidden" name="project_id" value={project.id} />
          <input
            name="content"
            placeholder="Neue Notiz…"
            className="flex-1 rounded-lg border border-line bg-paper px-3.5 py-2.5 text-ink outline-none focus:border-ink"
          />
          <button type="submit" className="rounded-full border border-line px-4 py-2 text-sm text-ink-soft hover:text-ink">
            Hinzufügen
          </button>
        </form>

        <div className="mt-5 space-y-3">
          {notes && notes.length === 0 ? <p className="text-sm text-ink-soft/70">Noch keine Notizen.</p> : null}
          {notes?.map((note) => (
            <div key={note.id} className="rounded-lg border border-line p-4">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm text-ink whitespace-pre-wrap">{note.content}</p>
                <form action={deleteProjectNote}>
                  <input type="hidden" name="id" value={note.id} />
                  <input type="hidden" name="project_id" value={project.id} />
                  <button type="submit" className="text-xs text-ink-soft/50 hover:text-red-600">
                    Löschen
                  </button>
                </form>
              </div>
              <p className="mt-2 text-xs text-ink-soft/60">{formatDateTime(note.created_at)}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
