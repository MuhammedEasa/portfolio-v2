"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useHall } from "@/lib/theme";

/** Words darken from quiet to ink at the reader's scroll pace; never below AA contrast. */
export default function InkReveal({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { hall } = useHall();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const style = getComputedStyle(document.documentElement);
    const quiet = style.getPropertyValue("--quiet").trim();
    const ink = style.getPropertyValue("--ink").trim();

    const words = el.querySelectorAll<HTMLSpanElement>("span[data-word]");
    const tween = gsap.fromTo(
      words,
      { color: quiet },
      {
        color: ink,
        ease: "none",
        stagger: 0.8,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "bottom 45%",
          scrub: 0.4,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.set(words, { clearProps: "color" });
    };
  }, [text, hall]);

  return (
    <p ref={ref} className={className}>
      {text.split(/\s+/).map((word, i) => (
        <span key={`${word}-${i}`} data-word className="text-quiet">
          {word}{" "}
        </span>
      ))}
    </p>
  );
}
