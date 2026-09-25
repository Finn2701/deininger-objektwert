import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Service-role client for trusted, non-user-facing server contexts only
 * (e.g. the publish-scheduled cron route) -- bypasses RLS entirely, unlike
 * the cookie-based client in ./server.ts. Never expose this to anything
 * reachable from a browser request without its own authorization check.
 */
export function createServiceClient() {
  return createSupabaseClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
}
