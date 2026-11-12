import type { ReactNode } from "react";
import { DrawRule } from "./draw-rule";
import { Reveal } from "./reveal";

/**
 * Raster der Ulmer Schule: die Beschriftung steht in der linken Randspalte unter einer Linie,
 * Überschrift und Einleitung laufen daneben. Das `align`-Prop bleibt für bestehende Aufrufer erhalten.
 */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  size = "md",
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  size?: "md" | "xl";
}) {
  return (
    <Reveal className="grid gap-6 md:grid-cols-12 md:gap-8">
      <div className="order-last self-start md:order-none md:col-span-3">
        <DrawRule />
        <p className="pt-3 text-sm font-medium text-ink">{eyebrow}</p>
      </div>
      <div className="md:col-span-9">
        <h2 className={`font-display text-3xl leading-[1.05] font-semibold text-balance text-ink ${
            size === "xl" ? "max-w-5xl md:text-7xl lg:text-8xl" : "max-w-3xl md:text-5xl"
          }`}>
          {title}
        </h2>
        {lede ? <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">{lede}</p> : null}
      </div>
    </Reveal>
  );
}
