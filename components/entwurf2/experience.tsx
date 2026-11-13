"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useScroll } from "framer-motion";

const HouseScene = dynamic(() => import("./house-scene"), { ssr: false });

/** Klebende 3D-Bühne hinter dem Text: der Scroll-Fortschritt des ganzen Blocks steuert das Modell. */
export function Experience({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  // Die 3D-Szene lädt erst, wenn der Browser Luft hat: Text und Buttons erscheinen sofort, die Ladezeit bleibt kurz
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setReady(true), { timeout: 1500 });
      return () => (window as Window & { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback?.(id);
    }
    const t = setTimeout(() => setReady(true), 800);
    return () => clearTimeout(t);
  }, []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <div ref={ref} className="relative">
      <div className="sticky top-0 z-0 h-svh w-full overflow-hidden">
        {ready ? <HouseScene progress={scrollYProgress} /> : null}
      </div>
      <div className="relative z-10 -mt-[100svh]">{children}</div>
    </div>
  );
}
