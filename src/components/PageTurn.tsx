"use client";

import { motion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Cipher from "@/components/Cipher";
import { leaves } from "@/lib/manuscript";
import { useTongue } from "@/lib/tongue";

/** Route transitions as a turning leaf; travel direction follows the binding. */

type TurnContext = { turn: (href: string) => void };

const Ctx = createContext<TurnContext>({ turn: () => {} });

export function usePageTurn() {
  return useContext(Ctx);
}

const LEAF = [0.76, 0, 0.24, 1] as const;

export default function PageTurnProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { dir, t } = useTongue();
  const [covering, setCovering] = useState(false);
  const [destination, setDestination] = useState("");
  const pending = useRef<string | null>(null);

  // +1: leaf enters from the right (LTR books). -1: from the left (RTL).
  const sign = dir === "rtl" ? -1 : 1;

  const turn = useCallback(
    (href: string) => {
      if (pending.current || href === pathname) return;
      pending.current = href;
      const leaf = leaves.find((p) => p.href === href);
      setDestination(leaf ? t(leaf.title) : "");
      setCovering(true);
    },
    [pathname, t]
  );

  useEffect(() => {
    if (pending.current && pathname === pending.current) {
      pending.current = null;
      // Let the new page paint beneath the leaf before it passes on.
      const id = window.setTimeout(() => setCovering(false), 90);
      return () => window.clearTimeout(id);
    }
  }, [pathname]);

  return (
    <Ctx.Provider value={{ turn }}>
      {children}

      <div aria-hidden className="pointer-events-none fixed inset-0 z-110 overflow-hidden">
        {/* The under-sheet — a darker leaf trailing a beat behind */}
        <motion.div
          className="absolute inset-0 bg-veil"
          initial={false}
          animate={covering ? "cover" : "reveal"}
          variants={{
            cover: {
              x: [`${104 * sign}%`, "0%"],
              transition: { duration: 0.62, ease: LEAF, delay: 0.06 },
            },
            reveal: {
              x: `${-104 * sign}%`,
              transition: { duration: 0.7, ease: LEAF },
            },
          }}
        />

        {/* The leaf itself */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-panel"
          initial={false}
          animate={covering ? "cover" : "reveal"}
          variants={{
            cover: {
              x: [`${102 * sign}%`, "0%"],
              skewX: [-2.5 * sign, 0],
              transition: { duration: 0.62, ease: LEAF },
            },
            reveal: {
              x: `${-102 * sign}%`,
              skewX: -2.5 * sign,
              transition: { duration: 0.7, ease: LEAF, delay: 0.05 },
            },
          }}
          onAnimationComplete={(definition) => {
            if (definition === "cover" && pending.current) {
              router.push(pending.current);
            }
          }}
        >
          {/* leading edge + falling shadow */}
          <div
            className="absolute inset-y-0 w-px"
            style={{
              [dir === "rtl" ? "right" : "left"]: 0,
              background:
                "linear-gradient(to bottom, transparent, var(--rubric) 30%, var(--rubric) 70%, transparent)",
            }}
          />
          <div
            className="absolute inset-y-0 w-24"
            style={{
              [dir === "rtl" ? "right" : "left"]: 0,
              background: `linear-gradient(to ${dir === "rtl" ? "left" : "right"}, rgba(0,0,0,0.45), transparent)`,
            }}
          />

          {/* destination plate */}
          <motion.div
            className="flex flex-col items-center gap-5"
            initial={false}
            animate={covering ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.4, delay: covering ? 0.32 : 0 }}
          >
            <Cipher className="h-10 w-auto text-quiet" />
            <p className="voice-display text-2xl text-ink md:text-3xl">{destination}</p>
            <span className="block h-px w-16 bg-rubric" />
          </motion.div>
        </motion.div>
      </div>
    </Ctx.Provider>
  );
}
