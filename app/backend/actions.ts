"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function login(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(`/backend/login?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/backend");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/backend/login");
}

export async function saveContent(formData: FormData) {
  const supabase = await createClient();
  const entries = Array.from(formData.entries()) as [string, string][];

  const rows = entries
    .filter(([key]) => key.startsWith("content."))
    .map(([key, value]) => ({
      key: key.replace("content.", ""),
      value,
      updated_at: new Date().toISOString(),
    }));

  for (const row of rows) {
    if (row.value.trim() === "") {
      await supabase.from("site_content").delete().eq("key", row.key);
    } else {
      await supabase.from("site_content").upsert(row);
    }
  }

  revalidatePath("/", "layout");
  redirect("/backend/inhalte?saved=1");
}

export async function saveFaqItem(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id") ?? "");
  const question = String(formData.get("question") ?? "").trim();
  const answer = String(formData.get("answer") ?? "").trim();
  const sortOrder = Number(formData.get("sort_order") ?? 0);

  if (!question || !answer) {
    redirect("/backend/faq?error=Frage%20und%20Antwort%20d%C3%BCrfen%20nicht%20leer%20sein");
  }

  if (id) {
    await supabase
      .from("faq_items")
      .update({ question, answer, sort_order: sortOrder, updated_at: new Date().toISOString() })
      .eq("id", id);
  } else {
    await supabase.from("faq_items").insert({ question, answer, sort_order: sortOrder });
  }

  revalidatePath("/faq");
  redirect("/backend/faq?saved=1");
}

export async function deleteFaqItem(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id") ?? "");
  await supabase.from("faq_items").delete().eq("id", id);
  revalidatePath("/faq");
  redirect("/backend/faq?saved=1");
}

export async function updateLeadStatus(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "neu");
  await supabase.from("leads").update({ status }).eq("id", id);
  revalidatePath("/backend");
  redirect("/backend?saved=1");
}

export async function deleteLead(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id") ?? "");
  await supabase.from("leads").delete().eq("id", id);
  revalidatePath("/backend");
  redirect("/backend?deleted=1");
}
