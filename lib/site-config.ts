export const siteConfig = {
  name: "Deininger Objektwert",
  tagline: "Kostenlose Online-Immobilienbewertung",
  description:
    "Deininger Objektwert bietet eine kostenlose, unverbindliche Ersteinschätzung des Immobilienwerts für Heidenheim und Umgebung – basierend auf Lage, Substanz, Zustand und aktuellen Marktdaten.",
  url: "https://www.deininger-objektwert.de",
  email: "kontakt@deininger-objektwert.de",
  locale: "de_DE",
  region: "Heidenheim an der Brenz",
  operator: {
    name: "Finn Deininger",
    street: "Paradiesstraße 27",
    zipCity: "89522 Heidenheim an der Brenz",
    country: "Deutschland",
  },
} as const;

export const primaryNav = [
  { href: "/immobilienbewertung", label: "Immobilienbewertung" },
  { href: "/immobilie-verkaufen", label: "Immobilie verkaufen" },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/faq", label: "FAQ" },
  { href: "/kontakt", label: "Kontakt" },
] as const;
