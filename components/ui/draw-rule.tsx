"use client";

import { motion } from "framer-motion";

/** Haarlinie, die sich beim Einblenden von links nach rechts zeichnet. */
export function DrawRule() {
  return (
    <motion.span
      aria-hidden
      className="block h-px origin-left bg-ink"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}
