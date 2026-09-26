import { createPublicClient } from "@/lib/supabase/public";

export async function getContentOverrides(
  keys: string[]
): Promise<Record<string, string>> {
  if (keys.length === 0) return {};

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("site_content")
      .select("key, value")
      .in("key", keys);

    if (error || !data) return {};

    return Object.fromEntries(data.map((row) => [row.key, row.value]));
  } catch {
    return {};
  }
}

export function withOverrides<T extends Record<string, string>>(
  defaults: T,
  overrides: Record<string, string>
): T {
  const result = { ...defaults };
  for (const key of Object.keys(defaults)) {
    if (overrides[key]) {
      result[key as keyof T] = overrides[key] as T[keyof T];
    }
  }
  return result;
}
