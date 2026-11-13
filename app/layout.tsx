import type { Metadata, Viewport } from "next";
import { Gabarito, Hanken_Grotesk } from "next/font/google";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

// Überschriften in Gabarito, Fließtext in Hanken Grotesk
const gabarito = Gabarito({ subsets: ["latin"], variable: "--font-gabarito", display: "swap" });
const hanken = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-hanken", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} – ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} – ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} – ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  authors: [{ name: siteConfig.operator.name, url: `${siteConfig.url}/ueber-uns` }],
  creator: siteConfig.operator.name,
  publisher: siteConfig.name,
  category: "Immobilien",
  formatDetection: { telephone: false, email: false, address: false },
  // Regionale Zuordnung für Suchmaschinen: Sitz Heidenheim an der Brenz, Baden-Württemberg
  other: {
    "geo.region": "DE-BW",
    "geo.placename": siteConfig.region,
    "geo.position": "48.6766;10.1546",
    ICBM: "48.6766, 10.1546",
  },
};

export const viewport: Viewport = {
  themeColor: "#0c3c47",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="de"
      data-scroll-behavior="smooth"
      className={`${gabarito.variable} ${hanken.variable}`}
    >
      <body className="bg-paper font-sans text-ink antialiased">{children}</body>
    </html>
  );
}
