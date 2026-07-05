"use client";

import Arrive from "@/components/Arrive";
import FolioHead from "@/components/FolioHead";
import { arabize, leaves, ui, works, worksFolio } from "@/lib/manuscript";
import { useTongue } from "@/lib/tongue";

export default function TheWorks() {
  const { lang, t } = useTongue();
  const year = (y: number) => (lang === "ar" ? arabize(y) : String(y));

  return (
    <>
      <FolioHead
        folio={t(worksFolio.folio)}
        title={t(leaves[1].title)}
        argument={t(worksFolio.argument)}
      />

      <section className="px-6 pb-16 md:px-12">
        {works.map((w, i) => {
          const offset = i % 2 === 1;
          return (
            <article
              key={w.title.en}
              className="border-t border-ink/10 py-20 last:border-b md:py-28"
            >
              <div className={offset ? "md:ms-[22%]" : "md:me-[22%]"}>
                <Arrive className="mb-8 flex items-baseline justify-between gap-4">
                  <span className="voice-whisper text-rubric">
                    {t(worksFolio.entry)} {w.numeral}
                  </span>
                  <span className="voice-whisper">
                    {year(w.year)} · {t(w.kind)}
                  </span>
                </Arrive>

                <Arrive delay={0.08}>
                  {w.url ? (
                    <a
                      href={w.url}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor={t(ui.cursor.visit)}
                      className="group inline-block"
                    >
                      <h2 className="voice-display text-[clamp(2.2rem,7vw,6rem)] transition-all duration-700 group-hover:text-vermilion">
                        {t(w.title)}
                      </h2>
                      <span className="voice-whisper mt-3 block text-rubric transition-colors duration-500 group-hover:text-vermilion" dir="ltr">
                        {w.urlLabel} ↗
                      </span>
                    </a>
                  ) : (
                    <div data-cursor={t(w.confidential ? ui.cursor.sealed : ui.cursor.study)}>
                      <h2 className="voice-display text-[clamp(2.2rem,7vw,6rem)]">
                        {t(w.title)}
                      </h2>
                      <span className="voice-whisper mt-3 block text-rubric">
                        {t(w.confidential ? worksFolio.sealedNote : worksFolio.studyNote)}
                      </span>
                    </div>
                  )}
                </Arrive>

                <Arrive
                  as="p"
                  delay={0.16}
                  className="voice-prose mt-9 max-w-[58ch] text-lg md:text-xl"
                >
                  {t(w.account)}
                </Arrive>

                <Arrive delay={0.22} className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-2">
                  {w.stack.map((s, j) => (
                    <span key={s} className="voice-whisper" dir="ltr">
                      {s}
                      {j < w.stack.length - 1 && (
                        <span aria-hidden className="ms-4 text-ink/40">
                          ·
                        </span>
                      )}
                    </span>
                  ))}
                </Arrive>
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
}
