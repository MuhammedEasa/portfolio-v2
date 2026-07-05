"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

/** Theme provider: night (default) and day, via data-theme on <html>. */
export type Hall = "night" | "day";

const ThemeContext = createContext<{ hall: Hall; toggleHall: () => void }>({
  hall: "night",
  toggleHall: () => {},
});

export const useHall = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [hall, setHall] = useState<Hall>("night");

  // Adopt what the pre-hydration script set.
  useEffect(() => {
    if (document.documentElement.getAttribute("data-theme") === "day") {
      setHall("day");
    }
  }, []);

  const toggleHall = useCallback(() => {
    setHall((prev) => {
      const next = prev === "night" ? "day" : "night";
      if (next === "day") {
        document.documentElement.setAttribute("data-theme", "day");
      } else {
        document.documentElement.removeAttribute("data-theme");
      }
      try {
        localStorage.setItem("easa-hall", next);
      } catch {}
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ hall, toggleHall }}>{children}</ThemeContext.Provider>
  );
}
