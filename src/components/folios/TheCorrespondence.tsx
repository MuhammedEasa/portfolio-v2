"use client";

import Arrive from "@/components/Arrive";
import Filament from "@/components/Filament";
import FolioHead from "@/components/FolioHead";
import Letter from "@/components/Letter";
import { identity, leaves, letterFolio, ui } from "@/lib/manuscript";
import { useTongue } from "@/lib/tongue";

export default function TheCorrespondence() {
  const { t } = useTongue();

  return (
    <>
      <FolioHead
        folio={t(letterFolio.folio)}
        title={t(leaves[4].title)}
        argument={t(letterFolio.argument)}
      />

      <section className="grid gap-x-24 gap-y-20 px-6 pb-16 md:px-12 lg:grid-cols-[2fr_3fr]">
        {/* The particulars */}
        <div>
          <Arrive className="mb-12 flex items-center gap-6">
            <span className="voice-whisper">{t(letterFolio.particularsLabel)}</span>
            <Filament />
          </Arrive>

          <dl>
            {letterFolio.particulars.map((p, i) => (
              <Arrive
                key={p.term.en}
                delay={i * 0.06}
                className="flex items-baseline justify-between gap-6 border-t border-ink/10 py-6 last:border-b"
              >
                <dt className="voice-whisper text-rubric">{t(p.term)}</dt>
                <dd className="font-serif text-lg font-light text-ink md:text-xl">
                  {t(p.detail)}
                </dd>
              </Arrive>
            ))}
          </dl>

          <Arrive delay={0.3} className="mt-14 flex flex-col gap-4 rtl:items-start">
            <a
              href={`mailto:${identity.email}`}
              className="link-rubric w-fit font-serif text-2xl md:text-3xl"
              dir="ltr"
            >
              {identity.email}
            </a>
            <a
              href={identity.github}
              target="_blank"
              rel="noreferrer"
              data-cursor={t(ui.cursor.visit)}
              className="voice-whisper w-fit transition-colors duration-500 hover:text-vermilion"
              dir="ltr"
            >
              {identity.githubLabel} ↗
            </a>
            <a
              href={identity.whatsappHref}
              target="_blank"
              rel="noreferrer"
              data-cursor={t(ui.cursor.chat)}
              className="voice-whisper w-fit transition-colors duration-500 hover:text-vermilion"
              dir="ltr"
            >
              WhatsApp · {identity.whatsapp} ↗
            </a>
          </Arrive>
        </div>

        {/* The letter */}
        <div>
          <Arrive className="mb-12 flex items-center gap-6">
            <span className="voice-whisper">{t(letterFolio.sendLabel)}</span>
            <Filament />
          </Arrive>
          <Arrive delay={0.1}>
            <Letter />
          </Arrive>
        </div>
      </section>
    </>
  );
}
