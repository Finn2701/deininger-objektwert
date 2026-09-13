import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Projekte",
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

const confidenceLabel: Record<string, string> = {
  niedrig: "Grobe Schätzung",
  mittel: "Solide Schätzung",
  hoch: "Präzise Schätzung",
};

export default async function ProjectsPage() {
  const supabase = await createClient();
  const { data: projects, error } = await supabase
    .from("projects")
    .select("*, customers(name)")
    .order("updated_at", { ascending: false });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-2xl font-medium text-ink">Projekte</h1>
        <Link
          href="/backend/projekte/neu"
          className="rounded-full bg-ink px-4 py-2 text-sm text-paper hover:bg-ink-soft"
        >
          + Neues Projekt
        </Link>
      </div>

      {error ? (
        <p className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          Projekte konnten nicht geladen werden: {error.message}
        </p>
      ) : null}

      {projects && projects.length === 0 ? (
        <p className="mt-8 text-sm text-ink-soft">Noch keine Projekte angelegt.</p>
      ) : null}

      <div className="mt-8 space-y-3">
        {projects?.map((project) => (
          <Link
            key={project.id}
            href={`/backend/projekte/${project.id}`}
            className="block rounded-xl border border-line p-4 hover:border-ink-soft"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium text-ink">{project.title}</p>
                  <span className="rounded-full bg-line/60 px-2.5 py-0.5 text-[11px] text-ink-soft">
                    {project.status}
                  </span>
                </div>
                <p className="mt-0.5 text-sm text-ink-soft">
                  {(project.customers as { name: string } | null)?.name ?? "Kein Kunde verknüpft"}
                  {project.address ? ` · ${project.address}` : ""}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium text-ink">{formatEuro(project.estimate_headline)}</p>
                {project.confidence ? (
                  <p className="text-xs text-ink-soft/60">{confidenceLabel[project.confidence] ?? project.confidence}</p>
                ) : null}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
