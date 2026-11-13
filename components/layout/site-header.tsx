"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { primaryNav } from "@/lib/site-config";
import { Container } from "../ui/container";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0c3c47] text-[#f6f3ec]">
      <Container className="flex h-16 items-stretch justify-between md:h-[4.5rem]">
        <Link href="/" className="flex items-center gap-3" aria-label="Deininger Objektwert, zur Startseite">
          <Image
            src="/images/brand/mark.png"
            alt=""
            width={512}
            height={512}
            priority
            sizes="40px"
            className="h-8 w-auto brightness-0 invert md:h-9"
          />
          <span className="flex flex-col leading-none">
            <span className="font-display text-base font-black tracking-[0.02em] text-[#f6f3ec] uppercase md:text-lg">
              Deininger
            </span>
            <span className="mt-1 text-[10px] font-medium tracking-[0.3em] text-[#a9c4c9] uppercase md:text-[11px]">
              Objektwert
            </span>
          </span>
        </Link>

        <nav className="hidden items-stretch gap-1 lg:flex" aria-label="Hauptnavigation">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center rounded-full px-4 text-sm font-semibold text-[#cfe0e3] transition-colors hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/immobilienbewertung" className="btn-primary hidden !py-2.5 md:inline-flex">
            Immobilienwert einschätzen
          </Link>
          <Link href="/immobilienbewertung" className="btn-primary hidden !px-4 !py-2 !text-xs sm:inline-flex md:hidden">
            Bewertung
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 text-white lg:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
              {menuOpen ? (
                <path d="M3 3L15 15M15 3L3 15" stroke="currentColor" strokeWidth="1.5" />
              ) : (
                <>
                  <line x1="2" y1="5" x2="16" y2="5" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="2" y1="9" x2="16" y2="9" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="2" y1="13" x2="16" y2="13" stroke="currentColor" strokeWidth="1.5" />
                </>
              )}
            </svg>
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {menuOpen ? (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            aria-label="Mobile Navigation"
            className="overflow-hidden border-t border-white/15 bg-[#0c3c47] lg:hidden"
          >
            <Container className="flex flex-col py-2">
              {primaryNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-white/10 py-4 text-lg font-bold text-[#f6f3ec] last:border-b-0"
                >
                  {item.label}
                </Link>
              ))}
            </Container>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
