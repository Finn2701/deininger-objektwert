"use server";

import { createClient } from "@/lib/supabase/server";

// Vercel serverless functions on this plan cap the request body well under
// this — reject too-large files before the upload just fails opaquely
// mid-request instead of after.
const MAX_FILE_BYTES = 4 * 1024 * 1024;
const ALLOWED_FILE_TYPES = ["application/pdf", "image/jpeg", "image/png", "image/webp", "image/heic"];
const MAX_FILES = 10;

export interface DocumentSubmitResult {
  ok: boolean;
  error?: string;
  skippedFiles?: string[];
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}
function isValidPhone(value: string) {
  return /^[0-9+()/\s-]{6,}$/.test(value.trim());
}

async function verifyTurnstile(token: string | null): Promise<boolean> {
  try {
    const secret = process.env.TURNSTILE_SECRET_KEY;
    if (!secret) return true;
    if (!token) return false;
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return true;
    const result = await response.json();
    return result.success === true;
  } catch {
    return true;
  }
}

export async function submitDocuments(
  formData: FormData,
  turnstileToken: string | null
): Promise<DocumentSubmitResult> {
  const humanVerified = await verifyTurnstile(turnstileToken);
  if (!humanVerified) {
    return { ok: false, error: "Sicherheitsprüfung fehlgeschlagen. Bitte laden Sie die Seite neu und versuchen Sie es erneut." };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const propertyType = String(formData.get("propertyType") ?? "").trim() || null;
  const message = String(formData.get("message") ?? "").trim();

  if (!name) return { ok: false, error: "Bitte geben Sie Ihren Namen an." };
  if (!isValidEmail(email) && !isValidPhone(phone)) {
    return { ok: false, error: "Bitte geben Sie eine gültige E-Mail-Adresse oder Telefonnummer an." };
  }

  const allFiles = formData.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);
  const files = allFiles.slice(0, MAX_FILES);
  const skippedFiles: string[] = [];
  const validFiles = files.filter((file) => {
    const ok = file.size <= MAX_FILE_BYTES && ALLOWED_FILE_TYPES.includes(file.type);
    if (!ok) skippedFiles.push(file.name);
    return ok;
  });

  const supabase = await createClient();

  // Anonymous visitors can only INSERT into leads, never SELECT or UPDATE
  // it back afterwards (admin-only — see supabase/schema.sql), so both
  // `.insert(...).select()` and a follow-up `.update(...)` would fail even
  // though the row itself is written. Generating the id ourselves and
  // uploading the files first means the single insert below already has
  // everything it needs — no read-back, no update, ever required.
  const leadId = crypto.randomUUID();

  const uploadedPaths: string[] = [];
  for (const file of validFiles) {
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const path = `${leadId}/${Date.now()}-${safeName}`;
    const { error: uploadError } = await supabase.storage.from("lead-documents").upload(path, file, {
      contentType: file.type,
      upsert: false,
    });
    if (!uploadError) uploadedPaths.push(path);
  }

  const { error: insertError } = await supabase.from("leads").insert({
    id: leadId,
    property_type: propertyType,
    location: location || null,
    name,
    email: email || null,
    phone: phone || null,
    message: message || null,
    files: uploadedPaths,
    wants_contact: true,
    source: "unterlagen",
    status: "neu",
  });

  if (insertError) {
    return { ok: false, error: "Ihre Anfrage konnte technisch nicht gespeichert werden. Bitte schreiben Sie uns direkt per E-Mail." };
  }

  return { ok: true, skippedFiles: skippedFiles.length > 0 ? skippedFiles : undefined };
}
