"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/** Lenis-paced scroll wired into GSAP's ticker and ScrollTrigger. */

const CadenceContext = createContext<{ ascend: () => void }>({ ascend: () => {} });

export const useCadence = () => useContext(CadenceContext);

export default function Cadence({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.92,
      touchMultiplier: 1.35,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Re-measure triggers once webfonts settle.
    let fontsSettled = false;
    document.fonts?.ready.then(() => {
      if (!fontsSettled) {
        fontsSettled = true;
        ScrollTrigger.refresh();
      }
    });

    return () => {
      fontsSettled = true;
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // A turned page opens at its top.
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  const ascend = useCallback(() => {
    lenisRef.current?.scrollTo(0, { duration: 1.6 });
  }, []);

  return <CadenceContext.Provider value={{ ascend }}>{children}</CadenceContext.Provider>;
}
