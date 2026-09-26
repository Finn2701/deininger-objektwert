import Link from "next/link";
import { primaryNav, siteConfig } from "@/lib/site-config";
import { cityPagePath, cityPages } from "@/lib/city-pages";
import { Container } from "../ui/container";

const KREIS_ORDER = ["Landkreis Heidenheim", "Ostalbkreis", "Alb-Donau-Kreis", "Landkreis Göppingen", "Stadtkreis Ulm", "Landkreis Neu-Ulm"];

const regionGroups = KREIS_ORDER.map((kreis) => ({
  kreis,
  cities: cityPages.filter((city) => city.kreis === kreis).sort((a, b) => a.name.localeCompare(b.name, "de")),
})).filter((group) => group.cities.length > 0);

const linkClass = "text-sm text-ink-soft transition-colors hover:text-ink";
const headingClass = "text-xs font-medium tracking-[0.16em] text-ink-soft/70 uppercase";

const toolLinks = [
  { href: "/immobilienpreise-ostwuerttemberg", label: "Immobilienpreise Region" },
  { href: "/kaufnebenkosten-rechner", label: "Kaufnebenkosten-Rechner" },
  { href: "/grunderwerbsteuer-rechner", label: "Grunderwerbsteuer-Rechner" },
  { href: "/erbschaftsteuer-rechner", label: "Erbschaftsteuer-Rechner" },
  { href: "/verkaufskosten-rechner", label: "Verkaufskosten-Rechner" },
  { href: "/spekulationssteuer-rechner", label: "Spekulationssteuer-Rechner" },
  { href: "/bodenrichtwerte-bundeslaender", label: "Bodenrichtwert abrufen" },
  { href: "/wie-wir-rechnen", label: "So rechnen wir" },
  { href: "/ratgeber", label: "Ratgeber" },
];

const legalLinks = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
  { href: "/agb", label: "AGB" },
  { href: "/widerruf", label: "Widerrufsbelehrung" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-paper">
      <Container className="py-14 md:py-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[1.4fr_1fr_1.1fr_1.3fr] lg:gap-x-12">
          <div className="col-span-2 lg:col-span-1">
            <p className="font-display text-sm font-medium tracking-[0.14em] text-ink uppercase">
              {siteConfig.name}
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-soft/90">{siteConfig.description}</p>
          </div>

          <nav aria-label="Navigation">
            <p className={headingClass}>Navigation</p>
            <ul className="mt-4 space-y-2.5">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/unterlagen-einreichen" className={linkClass}>
                  Unterlagen einreichen
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Rechner und Wissen">
            <p className={headingClass}>Rechner und Wissen</p>
            <ul className="mt-4 space-y-2.5">
              {toolLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 lg:col-span-1">
            <p className={headingClass}>Kontakt</p>
            <ul className="mt-4 space-y-2.5 text-sm text-ink-soft">
              <li>
                <a href={`mailto:${siteConfig.email}`} className="break-words transition-colors hover:text-ink">
                  {siteConfig.email}
                </a>
              </li>
              <li>{siteConfig.region}</li>
            </ul>
          </div>
        </div>

        <nav aria-label="Immobilienbewertung in der Region" className="mt-12 border-t border-line pt-10">
          <p className={headingClass}>Immobilienbewertung in der Region</p>
          <div className="mt-6 space-y-5">
            {regionGroups.map((group) => (
              <div key={group.kreis} className="grid gap-x-8 gap-y-2 md:grid-cols-[11rem_1fr]">
                <p className="text-sm text-ink/80">{group.kreis}</p>
                <ul className="flex flex-wrap gap-x-5 gap-y-2">
                  {group.cities.map((city) => (
                    <li key={city.slug}>
                      <Link href={cityPagePath(city)} className={linkClass}>
                        {city.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </nav>
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-col gap-4 py-6 text-xs text-ink-soft/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Alle Rechte vorbehalten.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legalLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
