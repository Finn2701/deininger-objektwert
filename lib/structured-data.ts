import { siteConfig } from "./site-config";
import { cityPages } from "./city-pages";
import type { FaqItem } from "@/components/sections/faq-section";

/**
 * "ProfessionalService" (ein LocalBusiness-Untertyp), bewusst nicht "RealEstateAgent": Die Website
 * bietet eine Online-Ersteinschätzung und Beratung, und die Gewerbeanmeldung für die Maklertätigkeit
 * ist noch nicht abgeschlossen. Sobald sie durch ist, kann der Typ auf RealEstateAgent wechseln.
 * areaServed nennt die Orte mit eigener Ortsseite, das stärkt die lokale Zuordnung.
 */
export function realEstateAgentJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteConfig.url}/#business`,
    serviceType: "Kostenlose Online-Immobilienbewertung",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon.png`,
    image: `${siteConfig.url}/opengraph-image`,
    email: siteConfig.email,
    priceRange: "Kostenlose Ersteinschätzung",
    knowsAbout: ["Immobilienbewertung", "Verkehrswert", "Bodenrichtwert", "Erbimmobilien", "Immobilienverkauf"],
    provider: personJsonLd(),
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.operator.street,
      addressLocality: "Heidenheim an der Brenz",
      postalCode: "89522",
      addressRegion: "Baden-Württemberg",
      addressCountry: "DE",
    },
    areaServed: [
      ...cityPages.map((city) => ({ "@type": "City", name: city.name })),
      { "@type": "Country", name: "Deutschland" },
    ],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: "de-DE",
    publisher: { "@id": `${siteConfig.url}/#business` },
  };
}

export function faqJsonLd(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function articleJsonLd(article: {
  title: string;
  meta_description: string;
  slug: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.meta_description,
    url: `${siteConfig.url}/ratgeber/${article.slug}`,
    datePublished: article.published_at ?? article.created_at,
    dateModified: article.updated_at,
    author: personJsonLd(),
  };
}

/**
 * Standalone Person entity for the site operator, given a URL back to
 * /ueber-uns -- this is the E-E-A-T signal search engines and AI answer
 * engines look for: a named, identifiable author with a page establishing
 * their expertise, not just a bare name string repeated in every article's
 * JSON-LD. Reused as articleJsonLd's `author` so every article points at
 * the same entity instead of a disconnected name.
 */
export function personJsonLd() {
  return {
    "@type": "Person",
    name: siteConfig.operator.name,
    url: `${siteConfig.url}/ueber-uns`,
    jobTitle: "Immobilienbewertung & Beratung",
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}

/** Orts-Landingpage: gleicher Service wie oben, aber mit konkretem Einzugsgebiet (City) statt ganz Deutschland. */
export function cityServiceJsonLd(cityName: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Kostenlose Online-Immobilienbewertung",
    name: `Immobilienbewertung ${cityName}`,
    url: `${siteConfig.url}${path}`,
    provider: personJsonLd(),
    areaServed: { "@type": "City", name: cityName },
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  };
}

export function webPageJsonLd(page: { name: string; description: string; path: string; dateModified: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.name,
    description: page.description,
    url: `${siteConfig.url}${page.path}`,
    dateModified: page.dateModified,
    inLanguage: "de-DE",
    isPartOf: { "@type": "WebSite", name: siteConfig.name, url: siteConfig.url },
    author: personJsonLd(),
  };
}

/** Kostenlose Online-Rechner-Seiten (Kaufnebenkosten, Grunderwerbsteuer): WebApplication mit Bundesland-Abdeckung. */
export function webApplicationJsonLd(app: { name: string; description: string; path: string; dateModified: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: app.name,
    description: app.description,
    url: `${siteConfig.url}${app.path}`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Alle (Browser)",
    inLanguage: "de-DE",
    dateModified: app.dateModified,
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    provider: personJsonLd(),
    areaServed: { "@type": "Country", name: "Deutschland" },
  };
}
