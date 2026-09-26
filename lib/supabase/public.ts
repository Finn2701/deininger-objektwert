import { createClient } from "@supabase/supabase-js";

/**
 * Cookie-freier Anon-Client für öffentliche Lesezugriffe (Ratgeber, Seitentexte, FAQ).
 * Anders als der Cookie-Client in ./server.ts macht er die Seite nicht dynamisch: Ohne cookies()
 * kann Next.js die Seite vorrendern und über das CDN ausliefern (schneller Erstaufruf, bessere Core
 * Web Vitals). Änderungen kommen per revalidatePath (Backend) bzw. spätestens nach `revalidate`.
 */
export function createPublicClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
