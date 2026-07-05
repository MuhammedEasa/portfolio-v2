"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import Arrive from "@/components/Arrive";
import Cipher from "@/components/Cipher";
import Filament from "@/components/Filament";
import InkReveal from "@/components/InkReveal";
import TurnLink from "@/components/TurnLink";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { front, identity, ui, works } from "@/lib/manuscript";
import { useTongue } from "@/lib/tongue";

// The film never blocks the first paint.
const HeroFilm = dynamic(() => import("@/components/HeroFilm"), { ssr: false });

const selected = works.filter((w) => w.year === 2024);

/** The title plate sinks and dims as the next section arrives. */
function useRecede(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tween = gsap.to(el, {
      opacity: 0.25,
      scale: 0.96,
      transformOrigin: "center 80%",
      ease: "none",
      scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 0.5 },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [ref]);
}

export default function TheFrontispiece() {
  const { t } = useTongue();
  const plateRef = useRef<HTMLElement>(null);
  useRecede(plateRef);

  return (
    <div className="relative">
      {/* The title plate — the film plays, the name sits low like a title card */}
      <section
        ref={plateRef}
        className="relative flex h-svh min-h-180 flex-col overflow-hidden"
      >
        {/* paper mottling while the film loads */}
        <div aria-hidden className="ink-bed absolute inset-0" />

        {/* the film */}
        <div aria-hidden className="absolute inset-0 z-0">
          <HeroFilm />
        </div>

        {/* the film blurs into the page from below — no darkening, only blur */}
        <div aria-hidden className="hero-blur pointer-events-none absolute inset-0 z-1" />

        {/* title card, anchored to the foot of the plate */}
        <div
          data-media-text
          className="title-card relative z-10 flex flex-1 flex-col justify-end px-4 pb-10 sm:px-6 md:px-12 md:pb-16"
        >
          <div className="flex flex-col gap-8 md:flex-row md:items-end">
            <div className="flex-1">
              {/* the particulars, where a film would list its credits */}
              <Arrive
                immediate
                delay={0.3}
                className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-2 md:mb-8"
              >
                {[
                  `${t(front.counts[0].value)} ${t(front.counts[0].label)}`,
                  `${t(front.counts[1].value)} ${t(front.counts[1].label)}`,
                  `${t(identity.place)} · ${identity.zone}`,
                ].map((fact) => (
                  <span key={fact} className="flex items-center gap-2.5">
                    <svg viewBox="0 0 8 8" className="h-2 w-2 shrink-0" aria-hidden>
                      <path d="M4 0 L8 4 L4 8 L0 4 Z" fill="var(--rubric)" />
                    </svg>
                    <span className="voice-whisper">{fact}</span>
                  </span>
                ))}
              </Arrive>

              <Arrive as="h1" immediate delay={0.4} blur={20} y={40} className="voice-display mb-4 md:mb-6">
                <span className="block text-[clamp(2.6rem,7.5vw,6.5rem)] tracking-[0.02em] rtl:tracking-normal">
                  {t(identity.first)}{" "}
                  <span className="font-light italic text-vermilion rtl:font-bold rtl:not-italic">
                    {t(identity.last)}
                  </span>
                </span>
              </Arrive>

              <Arrive
                as="p"
                immediate
                delay={0.5}
                className="mb-8 max-w-2xl font-serif text-lg leading-relaxed text-quiet md:mb-12 md:text-xl"
              >
                {t(front.statline)}
              </Arrive>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <Arrive immediate delay={0.6}>
                  <TurnLink
                    href="/work"
                    data-cursor={t(ui.cursor.turn)}
                    className="btn-court btn-court--solid rounded-full"
                  >
                    {t(front.ctaWorks)}
                  </TurnLink>
                </Arrive>
                <Arrive immediate delay={0.7}>
                  <TurnLink
                    href="/correspondence"
                    data-cursor={t(ui.cursor.write)}
                    className="btn-court glass-pill rounded-full text-ink"
                  >
                    {t(front.invite)}
                  </TurnLink>
                </Arrive>
              </div>
            </div>

            {/* the leaves, offered as a pair of reels */}
            <div className="flex gap-3">
              <Arrive immediate delay={0.8}>
                <TurnLink
                  href="/correspondence"
                  aria-label={t(front.invite)}
                  data-cursor={t(ui.cursor.turn)}
                  className="glass-pill flex items-center rounded-full px-5 py-3 text-ink sm:px-6"
                >
                  <svg viewBox="0 0 16 16" className="h-4 w-4 rtl:-scale-x-100" fill="none" aria-hidden>
                    <path d="M10 3 L5 8 L10 13" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                </TurnLink>
              </Arrive>
              <Arrive immediate delay={0.9}>
                <TurnLink
                  href="/work"
                  aria-label={t(front.ctaWorks)}
                  data-cursor={t(ui.cursor.turn)}
                  className="glass-pill flex items-center rounded-full px-5 py-3 text-ink sm:px-6"
                >
                  <svg viewBox="0 0 16 16" className="h-4 w-4 rtl:-scale-x-100" fill="none" aria-hidden>
                    <path d="M6 3 L11 8 L6 13" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                </TurnLink>
              </Arrive>
            </div>
          </div>
        </div>
      </section>

      {/* The story — read at the scroll's pace */}
      <section className="mx-auto max-w-4xl px-6 py-32 md:py-44">
        <Arrive className="mb-14 flex items-center gap-6">
          <span className="voice-whisper">{t(front.storyLabel)}</span>
          <Filament />
          <Cipher className="h-7 w-auto text-quiet" />
        </Arrive>
        <InkReveal
          text={t(front.story[0])}
          className="voice-prose dropcap text-[clamp(1.35rem,2.2vw,1.75rem)]"
        />
        <InkReveal
          text={t(front.story[1])}
          className="voice-prose mt-10 text-[clamp(1.35rem,2.2vw,1.75rem)]"
        />
      </section>

      {/* The present seat */}
      <section className="border-y border-ink/12 bg-veil/70 px-6 py-20 md:py-24">
        <Arrive className="mx-auto max-w-5xl text-center">
          <p className="voice-whisper mb-7">{t(front.presentLabel)}</p>
          <p className="font-serif text-[clamp(1.4rem,3vw,2.4rem)] font-light italic leading-snug text-ink rtl:not-italic rtl:leading-normal">
            {t(front.present)}
          </p>
        </Arrive>
      </section>

      {/* Selected works */}
      <section className="px-6 py-32 md:px-12 md:py-44">
        <Arrive className="mb-16 flex items-center gap-6">
          <span className="voice-whisper">{t(front.selectedLabel)}</span>
          <Filament />
        </Arrive>

        <div>
          {selected.map((w, i) => (
            <Arrive key={w.title.en} delay={i * 0.08}>
              <TurnLink
                href="/work"
                data-cursor={t(ui.cursor.turn)}
                className="group grid grid-cols-[auto_1fr] items-baseline gap-x-6 gap-y-2 border-t border-ink/12 py-10 transition-colors duration-700 last:border-b hover:border-ink/30 md:grid-cols-[3rem_1fr_auto] md:gap-x-10 md:py-12"
              >
                <span className="voice-whisper text-rubric">{w.numeral}</span>
                <h2 className="voice-display text-[clamp(1.9rem,5.5vw,4.5rem)] transition-all duration-700 group-hover:translate-x-3 group-hover:text-vermilion rtl:group-hover:-translate-x-3">
                  {t(w.title)}
                </h2>
                <span className="voice-whisper col-start-2 md:col-start-3 md:text-end">
                  {t(w.kind)}
                  {w.confidential ? ` · ${t(ui.cursor.sealed)}` : ""}
                </span>
              </TurnLink>
            </Arrive>
          ))}
        </div>

        <Arrive className="mt-14 text-end">
          <TurnLink href="/work" data-cursor={t(ui.cursor.turn)} className="link-rubric font-serif text-xl">
            {t(front.allWorks)}
          </TurnLink>
        </Arrive>
      </section>

      {/* Invitation */}
      <section className="px-6 py-24 text-center md:py-32">
        <Arrive>
          <p className="voice-whisper mb-9">{t(front.inviteLine)}</p>
          <TurnLink
            href="/correspondence"
            data-cursor={t(ui.cursor.write)}
            className="group voice-display inline-block text-[clamp(2.6rem,8.5vw,7rem)]"
          >
            <span className="transition-colors duration-700 group-hover:text-vermilion">
              {t(front.invite)}
            </span>
            <span className="text-rubric transition-colors duration-700 group-hover:text-vermilion">
              .
            </span>
          </TurnLink>
        </Arrive>
      </section>
    </div>
  );
}
