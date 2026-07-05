"use client";

import Arrive from "@/components/Arrive";
import Filament from "@/components/Filament";
import FolioHead from "@/components/FolioHead";
import { clientele, leaves, practiceFolio, services, stages, terms } from "@/lib/manuscript";
import { useTongue } from "@/lib/tongue";

export default function ThePractice() {
  const { t } = useTongue();

  return (
    <>
      <FolioHead
        folio={t(practiceFolio.folio)}
        title={t(leaves[2].title)}
        argument={t(practiceFolio.argument)}
      />

      {/* The six disciplines */}
      <section className="px-6 pb-32 md:px-12">
        <div className="grid md:grid-cols-2">
          {services.map((s, i) => (
            <Arrive
              key={s.title.en}
              delay={(i % 2) * 0.1}
              className={`border-t border-ink/10 px-0 py-14 md:px-12 md:py-16 ${
                i % 2 === 0 ? "md:border-e md:ps-0" : "md:pe-0"
              } ${i === services.length - 1 ? "border-b" : ""} ${
                i === services.length - 2 ? "md:border-b" : ""
              }`}
            >
              <p className="voice-whisper mb-6 text-rubric">{s.numeral}</p>
              <h2 className="voice-display mb-6 text-3xl md:text-4xl">{t(s.title)}</h2>
              <p className="voice-prose mb-8 text-base leading-relaxed md:text-lg">
                {t(s.account)}
              </p>
              <ul className="space-y-2.5">
                {s.deliverables.map((d) => (
                  <li key={d.en} className="voice-whisper flex items-baseline gap-3">
                    <span aria-hidden className="text-rubric">
                      —
                    </span>
                    {t(d)}
                  </li>
                ))}
              </ul>
            </Arrive>
          ))}
        </div>
      </section>

      {/* The manner of working */}
      <section className="border-y border-ink/10 bg-veil/60 px-6 py-28 md:px-12 md:py-36">
        <Arrive className="mb-20 text-center">
          <p className="voice-whisper mb-6">{t(practiceFolio.mannerLabel)}</p>
          <h2 className="voice-display text-[clamp(2.2rem,6vw,4.5rem)]">
            {t(practiceFolio.mannerTitle)}
          </h2>
        </Arrive>

        <div className="mx-auto max-w-3xl">
          {stages.map((st, i) => (
            <Arrive
              key={st.title.en}
              delay={i * 0.06}
              className="relative grid grid-cols-[3.5rem_1fr] gap-x-6 pb-16 last:pb-0 md:gap-x-10"
            >
              {/* the descending thread */}
              {i < stages.length - 1 && (
                <span
                  aria-hidden
                  className="absolute start-7 top-16 h-[calc(100%-4.5rem)] w-px bg-ink/25 ltr:-translate-x-1/2 rtl:translate-x-1/2"
                />
              )}
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-ink/30 font-serif text-xl text-rubric">
                {st.numeral}
              </span>
              <div className="pt-2">
                <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
                  <h3 className="voice-display text-3xl md:text-4xl">{t(st.title)}</h3>
                  <span className="voice-whisper text-rubric">{t(st.when)}</span>
                </div>
                <p className="voice-prose mt-4 max-w-[52ch] text-base md:text-lg">
                  {t(st.account)}
                </p>
              </div>
            </Arrive>
          ))}
        </div>
      </section>

      {/* Terms */}
      <section className="mx-auto max-w-4xl px-6 py-28 md:py-36">
        {terms.map((term, i) => (
          <Arrive
            key={term.en}
            as="p"
            delay={i * 0.1}
            className="mb-12 text-center font-serif text-[clamp(1.35rem,2.6vw,2rem)] font-light italic leading-snug text-ink last:mb-0 rtl:not-italic rtl:leading-normal"
          >
            “{t(term)}”
          </Arrive>
        ))}
      </section>

      {/* Whom the practice serves */}
      <section className="px-6 pb-12 md:px-12">
        <Arrive className="mb-12 flex items-center gap-6">
          <span className="voice-whisper">{t(practiceFolio.serveLabel)}</span>
          <Filament />
        </Arrive>
        <div>
          {clientele.map((c, i) => (
            <Arrive
              key={c.who.en}
              delay={i * 0.05}
              className="flex flex-col justify-between gap-2 border-t border-ink/10 py-8 last:border-b md:flex-row md:items-baseline"
            >
              <h3 className="voice-display text-2xl md:text-3xl">{t(c.who)}</h3>
              <p className="voice-whisper">{t(c.what)}</p>
            </Arrive>
          ))}
        </div>
      </section>
    </>
  );
}
