"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { generateExposeDocx } from "@/lib/expose-generate";
import { exposeCategories } from "@/lib/expose-categories";
import type { ProAssessment } from "@/lib/pro-valuation";

function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

const categoryValues = new Set(exposeCategories.map((c) => c.value));

// Der eigentliche Datei-Upload läuft im Browser direkt gegen Supabase Storage
// (siehe components/backend/expose-upload.tsx) — hier wird nach erfolgreichem
// Upload nur noch die kleine Metadaten-Zeile gespeichert, damit die Foto-Bytes
// nie durch die Server-Action-Anfrage selbst müssen (Vercel-Limit). Deshalb
// nehmen diese vier Actions einfache Argumente statt FormData entgegen —
// sie werden direkt aus dem Client-Component aufgerufen, nicht aus <form>.
export async function recordProjectImage(projectId: string, category: string, storagePath: string) {
  if (!projectId || !storagePath || !categoryValues.has(category as never)) return;
  const supabase = await createClient();
  await supabase.from("project_images").insert({ project_id: projectId, category, storage_path: storagePath });
  revalidatePath(`/backend/projekte/${projectId}`);
}

export async function deleteProjectImage(id: string, projectId: string, storagePath: string) {
  if (!id || !projectId) return;
  const supabase = await createClient();
  await supabase.storage.from("project-media").remove([storagePath]);
  await supabase.from("project_images").delete().eq("id", id);
  revalidatePath(`/backend/projekte/${projectId}`);
}

export async function recordProjectDocument(projectId: string, filename: string, storagePath: string) {
  if (!projectId || !storagePath || !filename) return;
  const supabase = await createClient();
  await supabase.from("project_documents").insert({ project_id: projectId, filename, storage_path: storagePath });
  revalidatePath(`/backend/projekte/${projectId}`);
}

export async function deleteProjectDocument(id: string, projectId: string, storagePath: string) {
  if (!id || !projectId) return;
  const supabase = await createClient();
  await supabase.storage.from("project-media").remove([storagePath]);
  await supabase.from("project_documents").delete().eq("id", id);
  revalidatePath(`/backend/projekte/${projectId}`);
}

export async function generateExpose(formData: FormData) {
  const projectId = str(formData, "project_id");
  if (!projectId) return;

  const supabase = await createClient();
  const [{ data: project }, { data: images }, { data: documents }] = await Promise.all([
    supabase.from("projects").select("id, title, address, property_type, assessment").eq("id", projectId).single(),
    supabase.from("project_images").select("id, category, storage_path").eq("project_id", projectId),
    supabase.from("project_documents").select("id, filename, storage_path").eq("project_id", projectId),
  ]);

  if (!project) return;

  if (!images || images.length === 0) {
    await supabase
      .from("projects")
      .update({ expose_error: "Bitte zuerst mindestens ein Foto hochladen." })
      .eq("id", projectId);
    revalidatePath(`/backend/projekte/${projectId}`);
    redirect(`/backend/projekte/${projectId}?saved=1`);
  }

  try {
    const docxBuffer = await generateExposeDocx(
      supabase,
      { ...project, assessment: project.assessment as Partial<ProAssessment> },
      images,
      documents ?? []
    );

    const path = `${projectId}/expose/expose-${Date.now()}.docx`;
    const { error: uploadError } = await supabase.storage.from("project-media").upload(path, docxBuffer, {
      contentType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      upsert: false,
    });
    if (uploadError) throw new Error(uploadError.message);

    await supabase
      .from("projects")
      .update({ expose_docx_path: path, expose_generated_at: new Date().toISOString(), expose_error: null })
      .eq("id", projectId);
  } catch (error) {
    await supabase
      .from("projects")
      .update({ expose_error: error instanceof Error ? error.message : "Unbekannter Fehler bei der Erstellung." })
      .eq("id", projectId);
  }

  revalidatePath(`/backend/projekte/${projectId}`);
  redirect(`/backend/projekte/${projectId}?saved=1`);
}
