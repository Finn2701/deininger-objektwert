export const siteConfig = {
  name: "Deininger Objektwert",
  tagline: "Kostenlose Online-Immobilienbewertung – deutschlandweit",
  description:
    "Deininger Objektwert bietet eine kostenlose, unverbindliche Online-Ersteinschätzung des Immobilienwerts – deutschlandweit nutzbar, mit besonderer Marktkenntnis in Heidenheim an der Brenz und Umgebung.",
  // Apex domain, NOT www: verified live (2026-09-21) that Vercel serves a
  // TLS certificate for www.deininger-objektwert.de that doesn't cover that
  // hostname (SEC_E_WRONG_PRINCIPAL / cert altnames only list the apex) --
  // every canonical URL, sitemap entry, and JSON-LD identifier in this repo
  // is built from this one value, so pointing it at the domain that actually
  // has a valid certificate matters for every page, not just this one.
  // Revert to the www form only once www is properly configured in Vercel's
  // domain settings with its own valid certificate.
  url: "https://deininger-objektwert.de",
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
