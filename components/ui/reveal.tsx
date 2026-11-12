"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** Ruhiger Einstieg: kurzer Versatz, exponentielles Ausgleiten, Bei reduzierter Bewegung setzt globals.css den Endzustand. */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      data-reveal
      className={className}
    >
      {children}
    </motion.div>
  );
}
