"use client";

import { usePathname } from "next/navigation";
import Arrive from "@/components/Arrive";
import TurnLink from "@/components/TurnLink";
import { identity, nextLeaf, ui } from "@/lib/manuscript";
import { useTongue } from "@/lib/tongue";

/** Page footer: offers the next leaf. */
export default function Colophon() {
  const pathname = usePathname();
  const { t } = useTongue();
  const next = nextLeaf(pathname);

  return (
    <footer className="relative px-6 pb-12 pt-28 md:px-12 md:pt-40">
      <div className="rule-ink mb-20 md:mb-28" />

      <Arrive className="flex flex-col items-center text-center">
        <p className="voice-whisper mb-8">{t(ui.pageTurns)}</p>
        <TurnLink
          href={next.href}
          data-cursor={t(ui.cursor.turn)}
          className="group voice-display text-[clamp(2.6rem,9vw,7.5rem)]"
        >
          <span className="transition-colors duration-700 group-hover:text-vermilion">
            {t(next.title)}
          </span>
          <span
            aria-hidden
            className="ms-5 inline-block align-baseline text-rubric transition-transform duration-700 group-hover:translate-x-3 rtl:-scale-x-100 rtl:group-hover:-translate-x-3"
          >
            →
          </span>
        </TurnLink>
      </Arrive>

      <div className="mt-24 flex flex-col items-center justify-between gap-6 md:mt-32 md:flex-row md:items-end">
        <div className="flex flex-col items-center gap-3 md:items-start">
          <a href={`mailto:${identity.email}`} className="link-rubric font-serif text-lg" dir="ltr">
            {identity.email}
          </a>
          <a
            href={identity.github}
            target="_blank"
            rel="noreferrer"
            data-cursor={t(ui.cursor.visit)}
            className="voice-whisper transition-colors duration-500 hover:text-vermilion"
            dir="ltr"
          >
            {identity.githubLabel}
          </a>
        </div>
        <p className="voice-whisper text-center">
          {t(identity.place)} · {identity.zone}
        </p>
        <p className="voice-whisper">{t(identity.copyright)}</p>
      </div>
    </footer>
  );
}
