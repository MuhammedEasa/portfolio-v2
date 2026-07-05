"use client";

import { useEffect, useRef, type ElementType, type ReactNode, type RefObject } from "react";
import { gsap } from "@/lib/gsap";
import { onVestibuleLifted } from "@/lib/vestibule";

type ArriveProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "h1" | "h2" | "h3" | "p" | "span" | "li" | "header" | "footer";
  /** seconds before the element sets out */
  delay?: number;
  /** travel distance in px */
  y?: number;
  /** starting blur in px — depth it arrives from */
  blur?: number;
  duration?: number;
  /** animate on mount instead of waiting for the scroll to reach it */
  immediate?: boolean;
};

/** Entrance: rise into focus from a blurred depth. */
export default function Arrive({
  children,
  className,
  as = "div",
  delay = 0,
  y = 36,
  blur = 14,
  duration = 1.1,
  immediate = false,
}: ArriveProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // GSAP takes over; cancel the CSS reveal failsafe.
    el.style.animation = "none";

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el, { opacity: 1 });
      return;
    }

    const tween = gsap.fromTo(
      el,
      { opacity: 0.001, y, filter: `blur(${blur}px)` },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration,
        delay,
        ease: "power3.out",
        // Immediate entrances hold until the first-load veil lifts,
        // so the arrival happens in view — not hidden behind it.
        paused: immediate,
        onComplete: () => gsap.set(el, { clearProps: "filter,transform" }),
        scrollTrigger: immediate
          ? undefined
          : { trigger: el, start: "top 88%", once: true },
      }
    );

    let unsubscribe = () => {};
    let safety: ReturnType<typeof setTimeout> | undefined;
    if (immediate) {
      const release = () => tween.play();
      unsubscribe = onVestibuleLifted(release);
      safety = setTimeout(release, 3500);
    }

    return () => {
      unsubscribe();
      if (safety) clearTimeout(safety);
      tween.scrollTrigger?.kill();
      tween.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Tag: ElementType = as;
  return (
    <Tag
      // Polymorphic ref: TS demands the intersection of every element's ref
      // type; the runtime value is one plain RefObject. The cast is sound.
      ref={ref as unknown as RefObject<never>}
      className={className}
      data-arrive=""
    >
      {children}
    </Tag>
  );
}
