"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { identity } from "@/lib/manuscript";
import { useTongue } from "@/lib/tongue";
import { markVestibuleLifted } from "@/lib/vestibule";

const LEAF = [0.76, 0, 0.24, 1] as const;
const STROKES = [
  "M8 2 V46",
  "M8 3.5 H30.5",
  "M8 24 H24",
  "M8 44.5 H30.5",
  "M30.5 0 V7",
  "M30.5 41 V48",
];

/** First-load veil: the cipher draws itself, then the leaf passes. */
export default function Vestibule() {
  const { dir, t } = useTongue();
  const [lifted, setLifted] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = setTimeout(() => setLifted(true), reduced ? 250 : 1450);
    return () => clearTimeout(id);
  }, []);

  // Exits over the spine, like the page turn.
  const exitX = dir === "rtl" ? "102%" : "-102%";

  return (
    <AnimatePresence onExitComplete={markVestibuleLifted}>
      {!lifted && (
        <motion.div
          aria-hidden
          className="fixed inset-0 z-125 flex flex-col items-center justify-center gap-8 bg-ground"
          exit={{ x: exitX, skewX: dir === "rtl" ? 2.5 : -2.5 }}
          transition={{ duration: 0.75, ease: LEAF }}
        >
          <svg viewBox="0 0 40 48" className="h-16 w-auto text-ink" fill="none">
            {STROKES.map((d, i) => (
              <motion.path
                key={d}
                d={d}
                stroke="currentColor"
                strokeWidth={i === 0 ? 4.4 : 1.8}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.12 * i, ease: "easeInOut" }}
              />
            ))}
            <motion.path
              d="M28.6 20.6 L32 24 L28.6 27.4 L25.2 24 Z"
              fill="var(--rubric)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.85 }}
            />
          </svg>
          <motion.p
            className="voice-whisper"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
          >
            {t(identity.first)} {t(identity.last)}
          </motion.p>
          <motion.span
            className="block h-px w-24 bg-rubric"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.7, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
