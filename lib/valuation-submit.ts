"use server";

import type { ValuationFormData } from "@/components/valuation-form/types";
import type { ValuationEstimate } from "@/lib/valuation-estimate";
import { createClient } from "@/lib/supabase/server";

async function verifyTurnstile(token: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // Turnstile not configured yet — don't block submissions.
  if (!token) return false;

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token }),
  });
  const result = await response.json();
  return result.success === true;
}

/**
 * Persists every completed run to Supabase (server-side, so the write can't
 * be forged by editing client JS) — regardless of whether the visitor wants
 * to be contacted, so the site owner can see all usage via /backend, not
 * just opted-in leads. `wants_contact` distinguishes the two. A failure
 * THROWS so the UI can show a real error state rather than telling the
 * visitor "danke" for a submission that was never saved.
 */
export async function submitValuationRequest(
  data: ValuationFormData,
  estimate: ValuationEstimate | null,
  turnstileToken: string | null
): Promise<{ ok: true }> {
  const humanVerified = await verifyTurnstile(turnstileToken);
  if (!humanVerified) {
    throw new Error("captcha-failed");
  }

  const supabase = await createClient();

  const { error } = await supabase.from("leads").insert({
    property_type: data.propertyType,
    location: data.location || null,
    living_area: data.livingArea || null,
    plot_area: data.plotArea || null,
    year_built: data.yearBuilt,
    condition: data.condition,
    bathrooms: data.bathrooms,
    has_separate_unit: data.hasSeparateUnit,
    wants_contact: data.contactConsent,
    name: data.contactConsent ? data.name || null : null,
    email: data.contactConsent ? data.email || null : null,
    phone: data.contactConsent ? data.phone || null : null,
    estimate_low: estimate?.low ?? null,
    estimate_high: estimate?.high ?? null,
    estimate_headline: estimate?.headline ?? null,
  });

  if (error) throw error;

  return { ok: true };
}
