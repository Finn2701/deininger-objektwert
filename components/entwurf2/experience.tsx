"use client";

import dynamic from "next/dynamic";
import { useRef, type ReactNode } from "react";
import { useScroll } from "framer-motion";

const HouseScene = dynamic(() => import("./house-scene"), { ssr: false });

/** Klebende 3D-Bühne hinter dem Text: der Scroll-Fortschritt des ganzen Blocks steuert das Modell. */
export function Experience({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <div ref={ref} className="relative">
      <div className="sticky top-0 z-0 h-svh w-full overflow-hidden">
        <HouseScene progress={scrollYProgress} />
      </div>
      <div className="relative z-10 -mt-[100svh]">{children}</div>
    </div>
  );
}
