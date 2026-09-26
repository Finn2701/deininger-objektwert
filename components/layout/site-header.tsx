"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { primaryNav, siteConfig } from "@/lib/site-config";
import { Container } from "../ui/container";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="flex items-center gap-2.5" aria-label={siteConfig.name}>
          <Image
            src="/images/brand/mark.png"
            alt=""
            width={512}
            height={512}
            priority
            sizes="40px"
            className="h-9 w-auto md:h-10"
          />
          <span className="flex flex-col leading-none">
            <span className="font-display text-sm font-semibold tracking-[0.08em] text-ink uppercase md:text-base">
              Deininger
            </span>
            <span className="text-[10px] font-medium tracking-[0.28em] text-ink-soft uppercase md:text-[11px]">
              Objektwert
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Hauptnavigation">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-ink-soft transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/immobilienbewertung"
          className="hidden rounded-full border border-ink px-5 py-2 text-sm text-ink transition-colors hover:bg-ink hover:text-paper md:inline-flex"
        >
          Immobilienwert einschätzen
        </Link>

        <div className="flex items-center gap-3 lg:hidden">
          <Link
            href="/immobilienbewertung"
            className="rounded-full border border-ink px-4 py-1.5 text-xs text-ink"
          >
            Bewertung
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/30 text-ink"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
              {menuOpen ? (
                <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              ) : (
                <>
                  <line x1="2" y1="5" x2="16" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="2" y1="9" x2="16" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="2" y1="13" x2="16" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
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
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            aria-label="Mobile Navigation"
            className="overflow-hidden border-t border-line bg-paper lg:hidden"
          >
            <Container className="flex flex-col py-4">
              {primaryNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-line py-3 text-sm text-ink-soft last:border-b-0 hover:text-ink"
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
