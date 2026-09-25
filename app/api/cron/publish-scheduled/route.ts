import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createServiceClient } from "@/lib/supabase/service";

/**
 * Called daily by Vercel Cron (see vercel.json) to publish any Ratgeber
 * draft whose scheduled_publish_at has arrived -- Finn's explicit choice
 * (2026-09-25) to auto-publish on a schedule without a manual review click,
 * trading the last human look for a steady, hands-off publishing cadence.
 *
 * Auth: Vercel signs cron requests with `Authorization: Bearer
 * ${CRON_SECRET}` when that env var is set on the project -- this route
 * only does anything for a request carrying the matching header, so it
 * can't be triggered by an arbitrary public request to force an early
 * publish.
 */
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServiceClient();
  const now = new Date().toISOString();

  const { data: due, error: selectError } = await supabase
    .from("articles")
    .select("id, slug")
    .eq("published", false)
    .not("scheduled_publish_at", "is", null)
    .lte("scheduled_publish_at", now);

  if (selectError) {
    return NextResponse.json({ error: selectError.message }, { status: 500 });
  }

  const published: string[] = [];
  for (const article of due ?? []) {
    const { error: updateError } = await supabase
      .from("articles")
      .update({ published: true, published_at: now, updated_at: now })
      .eq("id", article.id);
    if (!updateError) {
      published.push(article.slug);
      revalidatePath(`/ratgeber/${article.slug}`);
    }
  }

  if (published.length > 0) {
    revalidatePath("/ratgeber");
    revalidatePath("/backend/ratgeber");
  }

  return NextResponse.json({ checkedAt: now, published });
}
