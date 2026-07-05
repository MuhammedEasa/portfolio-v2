"use client";

import { useEffect, useState } from "react";
import { useCadence } from "@/components/Cadence";
import { ui } from "@/lib/manuscript";
import { useTongue } from "@/lib/tongue";

const RING = 2 * Math.PI * 21;

/** Go-to-top: a ring that fills with red ink as the page is read. */
export default function Ascend() {
  const { ascend } = useCadence();
  const { t } = useTongue();
  const [shown, setShown] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setShown(window.scrollY > window.innerHeight * 0.9);
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={ascend}
      aria-label={t(ui.ascend)}
      data-cursor={t(ui.cursor.ascend)}
      className={`fixed bottom-24 z-90 flex h-12 w-12 items-center justify-center rounded-full bg-ground/70 backdrop-blur-sm transition-[opacity,transform] duration-700 ease-out active:scale-90 inset-e-7 ${
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <svg viewBox="0 0 48 48" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden>
        <circle
          cx="24"
          cy="24"
          r="21"
          fill="none"
          stroke="color-mix(in srgb, var(--ink) 22%, transparent)"
          strokeWidth="1"
        />
        <circle
          cx="24"
          cy="24"
          r="21"
          fill="none"
          stroke="var(--rubric)"
          strokeWidth="1.25"
          strokeDasharray={RING}
          strokeDashoffset={RING * (1 - progress)}
          style={{ transition: "stroke-dashoffset 0.2s linear" }}
        />
      </svg>
      <svg viewBox="0 0 16 16" className="h-4 w-4 text-ink transition-colors duration-500" fill="none" aria-hidden>
        <path d="M8 13 V3 M3.5 7.5 L8 3 L12.5 7.5" stroke="currentColor" strokeWidth="1.1" />
      </svg>
    </button>
  );
}
