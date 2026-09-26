import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Seite nicht gefunden",
  robots: { index: false, follow: true },
};

const links = [
  { href: "/immobilienbewertung", label: "Immobilie kostenlos bewerten", text: "Wertspanne für Haus oder Wohnung in wenigen Minuten." },
  { href: "/kaufnebenkosten-rechner", label: "Kaufnebenkosten-Rechner", text: "Grunderwerbsteuer, Notar und Makler für alle Bundesländer." },
  { href: "/ratgeber", label: "Ratgeber", text: "Erbe, Scheidung, Steuern und Verkauf verständlich erklärt." },
  { href: "/immobilie-verkaufen", label: "Immobilie verkaufen", text: "Ablauf, Unterlagen und diskrete Vermarktung." },
];

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="py-24 md:py-32">
          <Container className="max-w-3xl">
            <p className="text-xs font-medium tracking-[0.2em] text-accent uppercase">Fehler 404</p>
            <h1 className="mt-3 font-display text-3xl leading-[1.15] font-medium text-ink md:text-4xl">
              Diese Seite gibt es nicht (mehr)
            </h1>
            <p className="mt-5 text-lg text-ink-soft/90">
              Der Link ist veraltet oder enthält einen Tippfehler. Hier finden Sie weiter:
            </p>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block h-full rounded-2xl border border-line p-5 transition-colors hover:border-ink"
                  >
                    <span className="font-display text-lg font-medium text-ink">{link.label}</span>
                    <span className="mt-1 block text-sm text-ink-soft/90">{link.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
