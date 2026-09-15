import type { SupabaseClient } from "@supabase/supabase-js";

// Microsoft Clarity Data Export API: https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-data-export-api
// Max. 10 Requests pro Projekt und Tag, Daten nur für die letzten 1-3 Tage.
// Deshalb wird das Ergebnis in der Tabelle `clarity_cache` zwischengespeichert
// und nur alle paar Stunden neu abgefragt, statt bei jedem Backend-Aufruf.
const CLARITY_API_URL = "https://www.clarity.ms/export-data/api/v1/project-live-insights";
const MIN_REFRESH_INTERVAL_MS = 3 * 60 * 60 * 1000;

type ClarityRow = Record<string, string | number>;
type ClarityMetric = { metricName: string; information: ClarityRow[] };

export type ClarityInsights = {
  sessions: number;
  botSessions: number;
  distinctUsers: number;
  avgPagesPerSession: number | null;
  avgEngagementSeconds: number | null;
  avgScrollDepth: number | null;
  deadClicks: number;
  rageClicks: number;
};

function normalizeMetricName(name: string) {
  return name.replace(/[^a-zA-Z]/g, "").toLowerCase();
}

function num(value: string | number | undefined): number {
  if (value === undefined) return 0;
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : 0;
}

function rowsFor(data: ClarityMetric[], target: string): ClarityRow[] {
  const normalizedTarget = normalizeMetricName(target);
  return data.find((m) => normalizeMetricName(m.metricName) === normalizedTarget)?.information ?? [];
}

function sumNumericFields(rows: ClarityRow[], keyPattern: RegExp): number {
  let total = 0;
  for (const row of rows) {
    for (const [key, value] of Object.entries(row)) {
      if (keyPattern.test(key)) total += num(value);
    }
  }
  return total;
}

function averageNumericFields(rows: ClarityRow[], keyPattern: RegExp): number | null {
  const values: number[] = [];
  for (const row of rows) {
    for (const [key, value] of Object.entries(row)) {
      if (keyPattern.test(key)) values.push(num(value));
    }
  }
  if (values.length === 0) return null;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

async function fetchFromClarityApi(): Promise<{ data?: ClarityInsights; error?: string }> {
  const token = process.env.CLARITY_DATA_EXPORT_TOKEN;
  if (!token) return { error: "Kein CLARITY_DATA_EXPORT_TOKEN gesetzt." };

  let response: Response;
  try {
    response = await fetch(`${CLARITY_API_URL}?numOfDays=3`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
  } catch {
    return { error: "Clarity API nicht erreichbar." };
  }

  if (response.status === 429) return { error: "Tageslimit der Clarity API erreicht (max. 10 Abfragen/Tag)." };
  if (!response.ok) return { error: `Clarity API Fehler (${response.status}).` };

  const data = (await response.json()) as ClarityMetric[];

  const trafficRows = rowsFor(data, "Traffic");
  const sessions = sumNumericFields(trafficRows, /^totalSessionCount$/i);
  const botSessions = sumNumericFields(trafficRows, /^totalBotSessionCount$/i);
  const distinctUsers = sumNumericFields(trafficRows, /distantUserCount|distinctUserCount/i);
  const avgPagesPerSession = averageNumericFields(trafficRows, /PagesPerSession/i);

  const engagementRows = rowsFor(data, "EngagementTime");
  const avgEngagementSeconds = averageNumericFields(engagementRows, /^activeTime$/i);

  const scrollRows = rowsFor(data, "ScrollDepth");
  const avgScrollDepth = averageNumericFields(scrollRows, /scroll|depth/i);

  const deadClicks = sumNumericFields(rowsFor(data, "DeadClickCount"), /^sessionsCount$/i);
  const rageClicks = sumNumericFields(rowsFor(data, "RageClickCount"), /^sessionsCount$/i);

  return {
    data: {
      sessions,
      botSessions,
      distinctUsers,
      avgPagesPerSession,
      avgEngagementSeconds,
      avgScrollDepth,
      deadClicks,
      rageClicks,
    },
  };
}

export async function getClarityInsights(
  supabase: SupabaseClient,
  options: { forceRefresh?: boolean } = {}
): Promise<{ data: ClarityInsights | null; fetchedAt: string | null; error: string | null }> {
  const { data: cached } = await supabase
    .from("clarity_cache")
    .select("payload, fetched_at, error")
    .eq("id", 1)
    .maybeSingle();

  const isStale =
    !cached || Date.now() - new Date(cached.fetched_at).getTime() > MIN_REFRESH_INTERVAL_MS;

  if (!options.forceRefresh && !isStale) {
    return { data: cached.payload as ClarityInsights, fetchedAt: cached.fetched_at, error: cached.error ?? null };
  }

  const { data, error } = await fetchFromClarityApi();

  if (data) {
    const fetchedAt = new Date().toISOString();
    await supabase
      .from("clarity_cache")
      .upsert({ id: 1, payload: data, fetched_at: fetchedAt, error: null });
    return { data, fetchedAt, error: null };
  }

  // Fetch fehlgeschlagen (z. B. Tageslimit) -> alte Daten weiter anzeigen, falls vorhanden.
  if (cached) {
    await supabase.from("clarity_cache").update({ error }).eq("id", 1);
    return { data: cached.payload as ClarityInsights, fetchedAt: cached.fetched_at, error: error ?? null };
  }

  return { data: null, fetchedAt: null, error: error ?? "Unbekannter Fehler." };
}
