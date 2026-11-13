"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site-config";

// Seiten, auf denen der Abschlussbalken stören würde (Formular, Kontakt, Rechtstexte)
const HIDDEN = ["/immobilienbewertung", "/kontakt", "/unterlagen-einreichen", "/impressum", "/datenschutz", "/agb", "/widerruf"];

/** Abschlussbalken mit der wichtigsten Handlung: die kostenlose Ersteinschätzung. */
export function ConversionBand() {
  const path = usePathname();
  if (HIDDEN.some((p) => path === p || path.startsWith(`${p}/`))) return null;

  return (
    <section className="bg-[#0c3c47] text-[#f6f3ec]">
      <div className="mx-auto grid w-full max-w-[84rem] gap-8 px-5 py-14 sm:px-8 md:grid-cols-12 md:items-end md:py-20 lg:px-12">
        <div className="md:col-span-8">
          <h2 className="font-display text-3xl leading-[1.05] font-extrabold text-balance md:text-5xl">
            Wie viel ist Ihre Immobilie wert?
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#cfe0e3] md:text-lg">
            In wenigen Minuten zu einer ersten, unverbindlichen Einschätzung — kostenlos, ohne Verpflichtung.
          </p>
        </div>
        <div className="flex flex-col gap-3 md:col-span-4 md:items-end">
          <Link href="/immobilienbewertung" className="btn-primary">
            Jetzt kostenlos bewerten lassen
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden>
              <path d="M0 6h16M11 1l5 5-5 5" stroke="currentColor" strokeWidth="2" />
            </svg>
          </Link>
          <a href={`mailto:${siteConfig.email}`} className="text-sm font-semibold text-[#a9c4c9] underline decoration-[#ffd23f] decoration-2 underline-offset-4 hover:text-white">
            Oder schreiben Sie direkt: {siteConfig.email}
          </a>
        </div>
      </div>
    </section>
  );
}
