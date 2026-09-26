export const siteConfig = {
  name: "Deininger Objektwert",
  tagline: "Kostenlose Online-Immobilienbewertung – deutschlandweit",
  description:
    "Deininger Objektwert bietet eine kostenlose, unverbindliche Online-Ersteinschätzung des Immobilienwerts – deutschlandweit nutzbar, mit besonderer Marktkenntnis in Heidenheim an der Brenz und Umgebung.",
  // Kanonische Domain ist die www-Variante (Entscheidung 2026-09-26): jede kanonische URL, Sitemap-
  // Eintrag und JSON-LD-ID entsteht aus diesem einen Wert. next.config.ts leitet die Domain ohne www
  // dauerhaft hierher um. E-Mail-Adressen bleiben @deininger-objektwert.de.
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
