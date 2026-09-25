"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { computeProEstimate, emptyAssessment, type ProAssessment } from "@/lib/pro-valuation";
import type { ConditionLevel, FeatureId, YearBuiltBucket } from "@/lib/valuation-benchmarks";

function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function opt(formData: FormData, key: string): string | null {
  const value = str(formData, key);
  return value === "" ? null : value;
}

// --- Kunden ---------------------------------------------------------------

export async function saveCustomer(formData: FormData) {
  const id = str(formData, "id");
  const supabase = await createClient();

  const row = {
    name: str(formData, "name"),
    email: opt(formData, "email"),
    phone: opt(formData, "phone"),
    address: opt(formData, "address"),
    notes: opt(formData, "notes"),
  };

  if (!row.name) {
    redirect(
      `/backend/kunden${id ? `/${id}` : "/neu"}?error=${encodeURIComponent("Name ist erforderlich")}`
    );
  }

  if (id) {
    await supabase.from("customers").update(row).eq("id", id);
    revalidatePath(`/backend/kunden/${id}`);
    redirect(`/backend/kunden/${id}?saved=1`);
  } else {
    const { data, error } = await supabase.from("customers").insert(row).select("id").single();
    if (error || !data) {
      redirect(`/backend/kunden/neu?error=${encodeURIComponent(error?.message ?? "Speichern fehlgeschlagen")}`);
    }
    revalidatePath("/backend/kunden");
    redirect(`/backend/kunden/${data.id}?saved=1`);
  }
}

export async function deleteCustomer(formData: FormData) {
  const id = str(formData, "id");
  const supabase = await createClient();
  await supabase.from("customers").delete().eq("id", id);
  revalidatePath("/backend/kunden");
  redirect("/backend/kunden?deleted=1");
}

// --- Projekte ---------------------------------------------------------------

export async function createProject(formData: FormData) {
  const title = str(formData, "title");
  if (!title) {
    redirect(`/backend/projekte/neu?error=${encodeURIComponent("Titel ist erforderlich")}`);
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .insert({
      title,
      address: opt(formData, "address"),
      property_type: opt(formData, "property_type"),
      customer_id: opt(formData, "customer_id"),
      assessment: emptyAssessment,
    })
    .select("id")
    .single();

  if (error || !data) {
    redirect(`/backend/projekte/neu?error=${encodeURIComponent(error?.message ?? "Speichern fehlgeschlagen")}`);
  }

  revalidatePath("/backend/projekte");
  redirect(`/backend/projekte/${data.id}?saved=1`);
}

/**
 * The one-click path from "Kontakt gewünscht" on a lead to an actual case:
 * creates a customer from the lead's contact details and a project
 * pre-filled with whatever the visitor already told us, so the agent lands
 * straight on the pro assessment form to fill in the rest from the site
 * visit / phone call instead of retyping what's already known.
 */
export async function createCustomerAndProjectFromLead(formData: FormData) {
  const leadId = str(formData, "lead_id");
  if (!leadId) return;

  const supabase = await createClient();
  const { data: lead } = await supabase.from("leads").select("*").eq("id", leadId).single();
  if (!lead) return;

  const { data: customer, error: customerError } = await supabase
    .from("customers")
    .insert({
      name: lead.name || "Unbenannt",
      email: lead.email,
      phone: lead.phone,
      address: lead.location,
      lead_id: lead.id,
    })
    .select("id")
    .single();

  if (customerError || !customer) {
    redirect(`/backend?error=${encodeURIComponent(customerError?.message ?? "Kunde konnte nicht angelegt werden")}`);
  }

  const assessment: ProAssessment = {
    ...emptyAssessment,
    propertyType: (lead.property_type as ProAssessment["propertyType"]) ?? null,
    address: lead.location ?? "",
    yearBuilt: (lead.year_built as YearBuiltBucket) ?? null,
    condition: (lead.condition as ConditionLevel) ?? null,
    livingArea: lead.living_area ?? "",
    plotArea: lead.plot_area ?? "",
    features: (lead.features as FeatureId[]) ?? [],
  };
  const estimate = await computeProEstimate(assessment);

  const { data: project, error: projectError } = await supabase
    .from("projects")
    .insert({
      title: `${lead.property_type ?? "Objekt"} · ${lead.location ?? "Ort unbekannt"}`,
      address: lead.location,
      property_type: lead.property_type,
      customer_id: customer.id,
      assessment,
      estimate_low: estimate?.low ?? null,
      estimate_high: estimate?.high ?? null,
      estimate_headline: estimate?.headline ?? null,
      confidence: estimate?.confidence ?? null,
    })
    .select("id")
    .single();

  if (projectError || !project) {
    redirect(`/backend/kunden/${customer.id}?error=${encodeURIComponent(projectError?.message ?? "Projekt konnte nicht angelegt werden")}`);
  }

  revalidatePath("/backend/kunden");
  revalidatePath("/backend/projekte");
  redirect(`/backend/projekte/${project.id}?saved=1`);
}

export async function deleteProject(formData: FormData) {
  const id = str(formData, "id");
  const supabase = await createClient();
  await supabase.from("projects").delete().eq("id", id);
  revalidatePath("/backend/projekte");
  redirect("/backend/projekte?deleted=1");
}

const featureIds: FeatureId[] = [
  "zweites-bad",
  "neue-kueche",
  "aussenbereich",
  "keller",
  "stellplatz",
  "einliegerwohnung",
];

function pickOrNull<T extends string>(formData: FormData, key: string, allowed: readonly T[]): T | null {
  const value = str(formData, key);
  return (allowed as readonly string[]).includes(value) ? (value as T) : null;
}

export async function saveProjectAssessment(formData: FormData) {
  const id = str(formData, "id");
  if (!id) return;

  const propertyType = pickOrNull(formData, "propertyType", [
    "haus",
    "wohnung",
    "grundstueck",
    "mehrfamilienhaus",
  ] as const);

  const yearBuilt = pickOrNull(formData, "yearBuilt", [
    "vor-1950",
    "1950-1970",
    "1970-1990",
    "1990-2010",
    "nach-2010",
    "unbekannt",
  ] as const) as YearBuiltBucket | null;

  const condition = pickOrNull(formData, "condition", [
    "unsaniert",
    "teilsaniert",
    "modernisiert",
  ] as const) as ConditionLevel | null;

  const assessment: ProAssessment = {
    propertyType,
    address: str(formData, "address"),
    yearBuilt,
    condition,
    microLocation: pickOrNull(formData, "microLocation", ["sehr-gut", "gut", "mittel", "einfach"] as const),
    noise: pickOrNull(formData, "noise", ["keine", "gering", "erheblich"] as const),
    publicTransport: pickOrNull(formData, "publicTransport", ["sehr-gut", "gut", "mittel", "einfach"] as const),
    amenities: pickOrNull(formData, "amenities", ["sehr-gut", "gut", "mittel", "einfach"] as const),
    yearBuiltExact: str(formData, "yearBuiltExact"),
    livingArea: str(formData, "livingArea"),
    plotArea: str(formData, "plotArea"),
    rooms: str(formData, "rooms"),
    bathrooms: str(formData, "bathrooms"),
    floors: str(formData, "floors"),
    roof: pickOrNull(formData, "roof", ["neu-saniert", "gepflegt", "renovierungsbeduerftig"] as const),
    facade: pickOrNull(formData, "facade", ["modernisiert", "teilweise", "unsaniert"] as const),
    windows: pickOrNull(formData, "windows", ["mehrfachverglast", "teilweise", "einfachverglast"] as const),
    heating: pickOrNull(formData, "heating", [
      "waermepumpe",
      "gas-oel-neu",
      "gas-oel-alt",
      "fernwaerme",
    ] as const),
    electrics: pickOrNull(formData, "electrics", ["erneuert", "teilweise", "original"] as const),
    basement: pickOrNull(formData, "basement", [
      "trocken-ausgebaut",
      "trocken",
      "feucht",
      "kein-keller",
    ] as const),
    energyClass: str(formData, "energyClass"),
    energyValue: str(formData, "energyValue"),
    floorLevel: pickOrNull(formData, "floorLevel", ["erdgeschoss", "mittlere-etage", "oberste-etage"] as const),
    hasElevator: pickOrNull(formData, "hasElevator", ["ja", "nein"] as const),
    odorImpression: pickOrNull(formData, "odorImpression", [
      "unauffaellig",
      "leicht-auffaellig",
      "deutlich-auffaellig",
    ] as const),
    features: formData.getAll("features").map(String).filter((f): f is FeatureId => featureIds.includes(f as FeatureId)),
    heritageProtection: pickOrNull(formData, "heritageProtection", ["ja", "nein"] as const),
    leaseholdLand: pickOrNull(formData, "leaseholdLand", ["ja", "nein"] as const),
    rented: pickOrNull(formData, "rented", ["ja", "nein"] as const),
    rentedIncome: str(formData, "rentedIncome"),
    renovationBacklog: pickOrNull(formData, "renovationBacklog", ["keiner", "gering", "erheblich"] as const),
    knownLandValue: str(formData, "knownLandValue"),
    marketNotes: str(formData, "marketNotes"),
  };

  const estimate = await computeProEstimate(assessment);

  const supabase = await createClient();
  await supabase
    .from("projects")
    .update({
      title: str(formData, "title") || undefined,
      address: assessment.address || null,
      property_type: propertyType,
      status: str(formData, "status") || undefined,
      customer_id: opt(formData, "customer_id"),
      assessment,
      estimate_low: estimate?.low ?? null,
      estimate_high: estimate?.high ?? null,
      estimate_headline: estimate?.headline ?? null,
      confidence: estimate?.confidence ?? null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  revalidatePath(`/backend/projekte/${id}`);
  redirect(`/backend/projekte/${id}?saved=1`);
}

// --- Notizen ---------------------------------------------------------------

export async function addProjectNote(formData: FormData) {
  const projectId = str(formData, "project_id");
  const content = str(formData, "content");
  if (!projectId || !content) return;

  const supabase = await createClient();
  await supabase.from("project_notes").insert({ project_id: projectId, content });
  revalidatePath(`/backend/projekte/${projectId}`);
  redirect(`/backend/projekte/${projectId}?saved=1`);
}

export async function deleteProjectNote(formData: FormData) {
  const id = str(formData, "id");
  const projectId = str(formData, "project_id");
  const supabase = await createClient();
  await supabase.from("project_notes").delete().eq("id", id);
  revalidatePath(`/backend/projekte/${projectId}`);
  redirect(`/backend/projekte/${projectId}?saved=1`);
}
