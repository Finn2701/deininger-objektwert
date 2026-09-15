import { siteConfig } from "./site-config";
import type { FaqItem } from "@/components/sections/faq-section";

/**
 * "Service", not "RealEstateAgent": the §34c Maklererlaubnis is still being
 * applied for and the Gewerbe isn't registered yet, so structured data
 * shouldn't claim a licensed real-estate-agent business any more than the
 * page copy does. Revisit once that's official — RealEstateAgent/LocalBusiness
 * would be the more specific, SEO-favorable type at that point.
 */
export function realEstateAgentJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Kostenlose Online-Immobilienbewertung",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    provider: {
      "@type": "Person",
      name: siteConfig.operator.name,
      jobTitle: "Immobilienbewertung & Beratung",
      email: siteConfig.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.operator.street,
        addressLocality: "Heidenheim an der Brenz",
        postalCode: "89522",
        addressCountry: "DE",
      },
    },
    areaServed: {
      "@type": "Country",
      name: "Deutschland",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
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
  created_at: string;
  updated_at: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.meta_description,
    url: `${siteConfig.url}/ratgeber/${article.slug}`,
    datePublished: article.created_at,
    dateModified: article.updated_at,
    author: {
      "@type": "Person",
      name: siteConfig.operator.name,
    },
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
