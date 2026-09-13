import type { ReactNode } from "react";
import { Reveal } from "./reveal";

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={align === "center" ? "text-center" : ""}>
      <p className="text-xs font-medium tracking-[0.2em] text-accent uppercase">{eyebrow}</p>
      <h2
        className={`mt-4 font-display text-3xl leading-[1.15] font-medium text-ink md:text-4xl ${
          align === "center" ? "mx-auto max-w-2xl" : "max-w-xl"
        }`}
      >
        {title}
      </h2>
      {lede ? (
        <p
          className={`mt-5 text-balance text-ink-soft/90 md:text-lg ${
            align === "center" ? "mx-auto max-w-xl" : "max-w-lg"
          }`}
        >
          {lede}
        </p>
      ) : null}
    </Reveal>
  );
}
