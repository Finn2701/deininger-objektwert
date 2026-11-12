import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

// Eine Grotesk für alles (Ulmer Schule): die Breitenachse trägt die Überschriften, das Gewicht den Rest.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-sans",
  display: "swap",
});

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
  themeColor: "#f2f4f5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="de"
      data-scroll-behavior="smooth"
      className={archivo.variable}
    >
      <body className="bg-paper font-sans text-ink antialiased">{children}</body>
    </html>
  );
}
