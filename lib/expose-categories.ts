export const exposeCategories = [
  { value: "frontansicht", label: "Frontansicht / Straßenseite" },
  { value: "wohnzimmer", label: "Wohnzimmer" },
  { value: "kueche", label: "Küche" },
  { value: "bad", label: "Badezimmer" },
  { value: "schlafzimmer", label: "Schlafzimmer" },
  { value: "aussenbereich", label: "Garten / Balkon / Terrasse" },
  { value: "grundriss", label: "Grundriss" },
  { value: "sonstige", label: "Weitere Räume / Details" },
] as const;

export type ExposeCategory = (typeof exposeCategories)[number]["value"];

export const exposeCategoryLabels: Record<string, string> = Object.fromEntries(
  exposeCategories.map((c) => [c.value, c.label])
);
