import Link from "next/link";
import { primaryNav, siteConfig } from "@/lib/site-config";
import { cityPagePath, cityPages } from "@/lib/city-pages";
import { Container } from "../ui/container";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-paper">
      <Container className="grid gap-12 py-16 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <p className="font-display text-sm font-medium tracking-[0.14em] text-ink uppercase">
            {siteConfig.name}
          </p>
          <p className="mt-4 max-w-xs text-sm text-ink-soft/90">{siteConfig.description}</p>
        </div>

        <div>
          <p className="text-xs font-medium tracking-[0.16em] text-ink-soft/70 uppercase">
            Navigation
          </p>
          <ul className="mt-4 space-y-2">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-ink-soft hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/unterlagen-einreichen" className="text-sm text-ink-soft hover:text-ink">
                Unterlagen einreichen
              </Link>
            </li>
            <li>
              <Link href="/ratgeber" className="text-sm text-ink-soft hover:text-ink">
                Ratgeber
              </Link>
            </li>
            <li>
              <Link href="/wie-wir-rechnen" className="text-sm text-ink-soft hover:text-ink">
                So rechnen wir
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-medium tracking-[0.16em] text-ink-soft/70 uppercase">
            Immobilienbewertung in der Region
          </p>
          <ul className="mt-4 space-y-2">
            {cityPages.map((city) => (
              <li key={city.slug}>
                <Link href={cityPagePath(city)} className="text-sm text-ink-soft hover:text-ink">
                  {city.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-medium tracking-[0.16em] text-ink-soft/70 uppercase">
            Kontakt
          </p>
          <ul className="mt-4 space-y-2 text-sm text-ink-soft">
            <li>
              <a href={`mailto:${siteConfig.email}`} className="hover:text-ink">
                {siteConfig.email}
              </a>
            </li>
            <li>{siteConfig.region}</li>
          </ul>
        </div>
      </Container>

      <Container className="flex flex-col gap-2 border-t border-line py-6 text-xs text-ink-soft/70 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} {siteConfig.name}. Alle Rechte vorbehalten.</p>
        <div className="flex gap-4">
          <Link href="/impressum" className="hover:text-ink">
            Impressum
          </Link>
          <Link href="/datenschutz" className="hover:text-ink">
            Datenschutz
          </Link>
          <Link href="/agb" className="hover:text-ink">
            AGB
          </Link>
          <Link href="/widerruf" className="hover:text-ink">
            Widerrufsbelehrung
          </Link>
        </div>
      </Container>
    </footer>
  );
}
