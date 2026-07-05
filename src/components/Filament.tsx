"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/** Hairline rule that draws itself on approach; origin follows dir. */
export default function Filament({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tween = gsap.fromTo(
      el,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.5,
        ease: "power3.inOut",
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <span
      ref={ref}
      aria-hidden
      className={`block h-px flex-1 origin-left bg-ink/30 rtl:origin-right ${className}`}
    />
  );
}
