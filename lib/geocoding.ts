/**
 * Resolves a free-text location ("89522 Heidenheim", "Berlin-Mitte", ...) to a
 * German state/city so the valuation can apply a region-appropriate price
 * level instead of always assuming Heidenheim. Uses OpenStreetMap's free
 * Nominatim geocoder — one request per form submission, well within its fair
 * -use limits (max 1 req/s, descriptive User-Agent, no bulk use). This is
 * live geocoding of the address the visitor typed, not a scrape of a listing
 * portal.
 *
 * Never throws: geocoding failure just falls back to the Heidenheim baseline
 * in valuation-estimate.ts, since a missing region factor shouldn't block an
 * estimate the visitor is actively waiting for.
 */
export type SettlementTier = "city" | "town" | "village" | null;

export interface ResolvedLocation {
  display: string;
  state: string | null;
  county: string | null;
  city: string | null;
  /**
   * Which Nominatim address field actually matched (city/town/village), so
   * callers can apply an urban/rural gradient for the many German places
   * that aren't in the hand-curated city list below but still shouldn't all
   * be priced as if they were the state's biggest city.
   */
  settlementTier: SettlementTier;
}

export async function resolveLocation(location: string): Promise<ResolvedLocation | null> {
  const query = location.trim();
  if (!query) return null;

  try {
    const url = new URL("https://nominatim.openstreetmap.org/search");
    url.searchParams.set("q", query);
    url.searchParams.set("countrycodes", "de");
    url.searchParams.set("format", "jsonv2");
    url.searchParams.set("addressdetails", "1");
    url.searchParams.set("limit", "1");

    const response = await fetch(url, {
      headers: {
        "User-Agent": "DeiningerObjektwert-Bewertungsrechner/1.0 (kontakt@deininger-objektwert.de)",
        "Accept-Language": "de",
      },
      signal: AbortSignal.timeout(4500),
    });

    if (!response.ok) return null;

    const results = (await response.json()) as Array<{
      display_name?: string;
      address?: Record<string, string>;
    }>;
    const first = results[0];
    if (!first?.address) return null;

    const address = first.address;
    const settlementTier: SettlementTier = address.city
      ? "city"
      : address.town ?? address.municipality
        ? "town"
        : address.village
          ? "village"
          : null;

    return {
      display: first.display_name ?? query,
      state: address.state ?? null,
      county: address.county ?? address.district ?? null,
      city: address.city ?? address.town ?? address.municipality ?? address.village ?? null,
      settlementTier,
    };
  } catch {
    return null;
  }
}
