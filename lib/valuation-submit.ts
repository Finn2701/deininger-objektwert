"use server";

import type { ValuationFormData } from "@/components/valuation-form/types";
import { estimateValue, type ValuationEstimate } from "@/lib/valuation-estimate";
import { createClient } from "@/lib/supabase/server";

async function verifyTurnstile(token: string | null): Promise<boolean> {
  try {
    const secret = process.env.TURNSTILE_SECRET_KEY;
    if (!secret) return true; // Turnstile not configured yet — don't block submissions.
    if (!token) return false;

    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return true; // Cloudflare hiccup shouldn't block a real visitor.
    const result = await response.json();
    return result.success === true;
  } catch {
    // Never let a captcha-service blip stop someone from getting their estimate.
    return true;
  }
}

/**
 * Showing the visitor their estimate and saving the lead are two different
 * concerns with two different failure tolerances: a save hiccup (expired
 * captcha token, a transient DB error, ...) must never cost the visitor the
 * number they came for. So this always computes and returns an estimate —
 * `estimateValue` already degrades gracefully on its own (see its docstring)
 * — and treats the Supabase insert as best-effort, reporting success via
 * `saved` instead of throwing and discarding the estimate with it.
 */
export async function submitValuationRequest(
  data: ValuationFormData,
  turnstileToken: string | null
): Promise<{ estimate: ValuationEstimate | null; saved: boolean }> {
  let estimate: ValuationEstimate | null = null;
  try {
    estimate = await estimateValue(data);
  } catch {
    estimate = null;
  }

  const humanVerified = await verifyTurnstile(turnstileToken);
  if (!humanVerified) {
    return { estimate, saved: false };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("leads").insert({
      property_type: data.propertyType,
      location: data.location || null,
      living_area: data.livingArea || null,
      plot_area: data.plotArea || null,
      year_built: data.yearBuilt,
      condition: data.condition,
      features: data.features,
      energy_class: data.energyClass,
      floor_level: data.floorLevel,
      has_elevator: data.hasElevator,
      moisture_issues: data.moistureIssues,
      wants_contact: data.contactConsent,
      name: data.contactConsent ? data.name || null : null,
      email: data.contactConsent ? data.email || null : null,
      phone: data.contactConsent ? data.phone || null : null,
      contact_days: data.contactConsent ? data.contactDays : [],
      contact_time: data.contactConsent ? data.contactTime || null : null,
      contact_notes: data.contactConsent ? data.contactNotes || null : null,
      estimate_low: estimate?.low ?? null,
      estimate_high: estimate?.high ?? null,
      estimate_headline: estimate?.headline ?? null,
      estimate_precision: estimate?.precision ?? null,
    });

    return { estimate, saved: !error };
  } catch {
    return { estimate, saved: false };
  }
}
