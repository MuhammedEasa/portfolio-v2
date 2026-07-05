"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

const subscribePointer = (onChange: () => void) => {
  const coarse = window.matchMedia("(pointer: coarse)");
  coarse.addEventListener("change", onChange);
  return () => coarse.removeEventListener("change", onChange);
};

/** Custom cursor: inked dot + trailing ring; elements speak via [data-cursor]. */
export default function Quill() {
  // Fine pointers only; the server renders nothing and hydration corrects it.
  const enabled = useSyncExternalStore(
    subscribePointer,
    () => !window.matchMedia("(pointer: coarse)").matches,
    () => false
  );
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const label = labelRef.current!;

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let rx = tx;
    let ry = ty;
    let ringScale = 1;
    let targetScale = 1;
    let visible = false;
    let pressed = false;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
        rx = tx;
        ry = ty;
      }

      const t = e.target as Element | null;
      const spoken = t?.closest?.("[data-cursor]")?.getAttribute("data-cursor") ?? "";
      const interactive =
        !!spoken ||
        !!t?.closest?.("a, button, [role='button'], input, textarea, select, label");

      if (spoken) {
        label.textContent = spoken;
        label.style.opacity = "1";
        dot.style.opacity = "0";
        targetScale = 3.1;
        ring.style.borderColor = "color-mix(in srgb, var(--rubric) 70%, transparent)";
        ring.style.background = "color-mix(in srgb, var(--ground) 60%, transparent)";
      } else if (interactive) {
        label.style.opacity = "0";
        dot.style.opacity = "1";
        targetScale = 1.9;
        ring.style.borderColor = "color-mix(in srgb, var(--ink) 75%, transparent)";
        ring.style.background = "transparent";
      } else {
        label.style.opacity = "0";
        dot.style.opacity = "1";
        targetScale = 1;
        ring.style.borderColor = "color-mix(in srgb, var(--ink) 40%, transparent)";
        ring.style.background = "transparent";
      }
    };

    const onDown = () => {
      pressed = true;
    };
    const onUp = () => {
      pressed = false;
    };
    const onLeave = () => {
      visible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
      label.style.opacity = "0";
    };

    const tick = () => {
      // The ring arrives a breath after the hand.
      rx += (tx - rx) * 0.14;
      ry += (ty - ry) * 0.14;
      ringScale += ((pressed ? targetScale * 0.82 : targetScale) - ringScale) * 0.16;
      dot.style.transform = `translate3d(${tx}px, ${ty}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${ringScale})`;
      label.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-140">
      <div
        ref={ringRef}
        className="absolute left-0 top-0 h-9 w-9 rounded-full border opacity-0 transition-[border-color,background] duration-300 will-change-transform"
        style={{ borderColor: "color-mix(in srgb, var(--ink) 40%, transparent)" }}
      />
      <span
        ref={labelRef}
        className="absolute left-0 top-0 indent-[0.32em] font-sans text-[9px] font-light uppercase tracking-[0.32em] text-vermilion opacity-0 transition-opacity duration-300 will-change-transform rtl:indent-0 rtl:text-[11px] rtl:font-normal rtl:tracking-normal"
      />
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-1 w-1 rounded-full bg-vermilion opacity-0 will-change-transform"
      />
    </div>
  );
}
