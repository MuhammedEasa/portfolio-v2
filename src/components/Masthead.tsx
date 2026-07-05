"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Cipher from "@/components/Cipher";
import TurnLink from "@/components/TurnLink";
import { identity, leaves, ui } from "@/lib/manuscript";
import { useHall, type Hall } from "@/lib/theme";
import { useTongue } from "@/lib/tongue";

const inner = leaves.filter((p) => p.href !== "/" && p.href !== "/correspondence");
const correspondence = leaves[leaves.length - 1];

/** Hairline sun and crescent, engraved rather than borrowed. */
function HallGlyph({ hall }: { hall: Hall }) {
  return hall === "night" ? (
    <svg viewBox="0 0 24 24" className="h-4.25 w-4.25" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.1" />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i * Math.PI) / 4;
        return (
          <path
            key={i}
            d={`M${12 + Math.cos(a) * 6.5} ${12 + Math.sin(a) * 6.5} L${12 + Math.cos(a) * 9} ${12 + Math.sin(a) * 9}`}
            stroke="currentColor"
            strokeWidth="1.1"
          />
        );
      })}
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" className="h-4.25 w-4.25" fill="none" aria-hidden>
      <path
        d="M16.5 4.5 A8.5 8.5 0 1 0 19.5 16 A7 7 0 0 1 16.5 4.5 Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
    </svg>
  );
}

/** Floating pill navbar; hides on descent, returns on ascent. */
export default function Masthead() {
  const pathname = usePathname();
  const { hall, toggleHall } = useHall();
  const { lang, t, toggleTongue } = useTongue();
  const [settled, setSettled] = useState(false); // past the first plate
  const [hidden, setHidden] = useState(false); // reader is descending
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  // A turned page closes the menu — state adjusted during render, not in an effect.
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setSettled(y > 48);
      if (y > lastY.current + 8 && y > 160) setHidden(true);
      else if (y < lastY.current - 8 || y < 160) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const pill = `rounded-full border transition-[background-color,border-color,box-shadow] duration-700 ${
    settled
      ? "border-ink/20 bg-panel/85 shadow-[0_8px_30px_rgba(0,0,0,0.18)] backdrop-blur-md"
      : "border-ink/15 bg-panel/40 backdrop-blur-sm"
  }`;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-80 px-4 pt-4 transition-transform duration-700 ease-leaf md:px-8 md:pt-5 ${
          hidden && !open ? "translate-y-[-130%]" : "translate-y-0"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          {/* the cipher, sealed in its own roundel */}
          <TurnLink
            href="/"
            aria-label={t(leaves[0].title)}
            data-cursor={pathname === "/" ? undefined : t(ui.cursor.open)}
            className={`flex h-12 w-12 shrink-0 items-center justify-center text-ink hover:text-vermilion active:scale-90 ${pill}`}
          >
            <Cipher className="h-6 w-auto" />
          </TurnLink>

          {/* the leaves */}
          <div className={`hidden items-center p-1.5 md:flex ${pill}`}>
            {inner.map((p) => (
              <TurnLink
                key={p.href}
                href={p.href}
                className={`voice-whisper rounded-full px-5 py-2.5 transition-colors duration-500 hover:text-vermilion ${
                  pathname === p.href ? "bg-rubric/10 text-vermilion" : ""
                }`}
              >
                {t(p.title)}
              </TurnLink>
            ))}
          </div>

          {/* the invitation and the two small levers */}
          <div className="flex items-center gap-3">
            <div className={`hidden items-center p-1.5 md:flex ${pill}`}>
              <button
                onClick={toggleTongue}
                aria-label={lang === "en" ? ui.toArabic : ui.toEnglish}
                className="flex h-9 w-9 items-center justify-center rounded-full font-serif text-[15px] text-quiet transition-[color,transform] duration-500 hover:text-vermilion active:scale-90"
              >
                {lang === "en" ? "ع" : "En"}
              </button>
              <button
                onClick={toggleHall}
                aria-label={t(hall === "night" ? ui.toDay : ui.toNight)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-quiet transition-[color,transform] duration-500 hover:text-vermilion active:scale-90"
              >
                <HallGlyph hall={hall} />
              </button>
            </div>

            <TurnLink
              href={correspondence.href}
              data-cursor={t(ui.cursor.write)}
              className={`voice-whisper hidden rounded-full px-7 py-3.75 text-seal-text! transition-[background-color,transform] duration-500 active:scale-95 md:block ${
                pathname === correspondence.href ? "bg-seal-hover" : "bg-seal hover:bg-seal-hover"
              }`}
            >
              {t(correspondence.title)}
            </TurnLink>

            {/* small screens: levers + the hand that opens the book */}
            <div className={`flex items-center p-1.5 md:hidden ${pill}`}>
              <button
                onClick={toggleTongue}
                aria-label={lang === "en" ? ui.toArabic : ui.toEnglish}
                className="flex h-9 w-9 items-center justify-center rounded-full font-serif text-[15px] text-quiet"
              >
                {lang === "en" ? "ع" : "En"}
              </button>
              <button
                onClick={toggleHall}
                aria-label={t(hall === "night" ? ui.toDay : ui.toNight)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-quiet"
              >
                <HallGlyph hall={hall} />
              </button>
              <button
                aria-label={t(open ? ui.menuClose : ui.menuOpen)}
                onClick={() => setOpen((v) => !v)}
                className="relative z-101 flex h-9 w-10 flex-col items-center justify-center gap-1.75"
              >
                <span
                  className={`block h-px w-6 bg-ink transition-all duration-500 ${
                    open ? "translate-y-1 rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-px bg-rubric transition-all duration-500 ${
                    open ? "w-6 -translate-y-1 -rotate-45" : "w-4"
                  }`}
                />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Fullscreen folio menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-100 flex flex-col justify-between bg-ground/99 px-8 pb-10 pt-28 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <nav className="flex flex-col">
              {leaves.map((p, i) => (
                <motion.div
                  key={p.href}
                  className="border-b border-ink/12 py-5 first:border-t"
                  initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.6, delay: 0.08 * i + 0.1, ease: "easeOut" }}
                >
                  <TurnLink
                    href={p.href}
                    className={`voice-display flex items-baseline gap-5 text-[clamp(2.1rem,9.5vw,3rem)] ${
                      pathname === p.href ? "text-vermilion" : ""
                    }`}
                  >
                    <span className="voice-whisper text-rubric">
                      {["i", "ii", "iii", "iv", "v"][i]}
                    </span>
                    {t(p.title)}
                  </TurnLink>
                </motion.div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex items-end justify-between gap-4"
            >
              <a href={`mailto:${identity.email}`} className="voice-whisper text-rubric" dir="ltr">
                {identity.email}
              </a>
              <span className="voice-whisper">{t(identity.place)}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
