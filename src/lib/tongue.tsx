"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { Bi, Lang } from "@/lib/manuscript";

/** Language provider: en/ar; flips dir and re-measures the scroll. */
type TongueValue = {
  lang: Lang;
  dir: "ltr" | "rtl";
  t: (bi: Bi) => string;
  toggleTongue: () => void;
};

const TongueContext = createContext<TongueValue>({
  lang: "en",
  dir: "ltr",
  t: (bi) => bi.en,
  toggleTongue: () => {},
});

export const useTongue = () => useContext(TongueContext);

export function TongueProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  // Adopt what the pre-hydration script decided. Deliberate one-shot adoption:
  // the server must render English so hydration matches, then state catches
  // up to the lang the inline script already set.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (document.documentElement.lang === "ar") setLang("ar");
  }, []);

  const toggleTongue = useCallback(() => {
    setLang((prev) => {
      const next: Lang = prev === "en" ? "ar" : "en";
      document.documentElement.lang = next;
      document.documentElement.dir = next === "ar" ? "rtl" : "ltr";
      try {
        localStorage.setItem("easa-tongue", next);
      } catch {}
      // Direction changes layout; let ScrollTrigger re-measure.
      requestAnimationFrame(() => window.dispatchEvent(new Event("resize")));
      return next;
    });
  }, []);

  const dir = lang === "ar" ? "rtl" : "ltr";
  const t = useCallback((bi: Bi) => bi[lang], [lang]);

  return (
    <TongueContext.Provider value={{ lang, dir, t, toggleTongue }}>
      {children}
    </TongueContext.Provider>
  );
}
