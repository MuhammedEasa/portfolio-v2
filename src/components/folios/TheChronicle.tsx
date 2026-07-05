"use client";

import Arrive from "@/components/Arrive";
import Filament from "@/components/Filament";
import FolioHead from "@/components/FolioHead";
import {
  annals,
  arabize,
  chronicleFolio,
  finance,
  instruments,
  intelligence,
  leaves,
  tenets,
  tongues,
} from "@/lib/manuscript";
import { useTongue } from "@/lib/tongue";

export default function TheChronicle() {
  const { lang, t } = useTongue();
  const year = (y: number) => (lang === "ar" ? arabize(y) : String(y));

  return (
    <>
      <FolioHead
        folio={t(chronicleFolio.folio)}
        title={t(leaves[3].title)}
        argument={t(chronicleFolio.argument)}
      />

      {/* The years */}
      <section className="px-6 pb-32 md:px-12">
        <Arrive className="mb-14 flex items-center gap-6">
          <span className="voice-whisper">{t(chronicleFolio.annalsLabel)}</span>
          <Filament />
        </Arrive>

        {annals.map((entry) => (
          <article
            key={entry.year}
            className="grid gap-x-12 gap-y-4 border-t border-ink/10 py-16 last:border-b md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:py-20"
          >
            <Arrive>
              <p className="voice-display text-[clamp(2.6rem,6vw,5rem)] text-rubric">
                {year(entry.year)}
              </p>
            </Arrive>
            <Arrive delay={0.12}>
              <h2 className="voice-display mb-5 text-3xl italic md:text-4xl rtl:not-italic">
                {t(entry.title)}
              </h2>
              <p className="voice-prose max-w-[58ch] text-base md:text-lg">
                {t(entry.account)}
              </p>
            </Arrive>
          </article>
        ))}
      </section>

      {/* The instruments */}
      <section className="border-y border-ink/10 bg-veil/60 px-6 py-28 md:px-12 md:py-36">
        <Arrive className="mb-16 text-center">
          <p className="voice-whisper mb-6">{t(chronicleFolio.instrumentsLabel)}</p>
          <h2 className="voice-display text-[clamp(2.2rem,6vw,4.5rem)]">
            {t(chronicleFolio.instrumentsTitle)}
          </h2>
        </Arrive>
        <div className="grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {instruments.map((g, i) => (
            <Arrive key={g.title.en} delay={(i % 3) * 0.08}>
              <h3 className="voice-whisper mb-6 text-rubric">{t(g.title)}</h3>
              <ul className="space-y-2">
                {g.items.map((item) => (
                  <li key={item} className="font-serif text-lg font-light text-ink/85" dir="ltr">
                    <span className="block rtl:text-end">{item}</span>
                  </li>
                ))}
              </ul>
            </Arrive>
          ))}
        </div>
      </section>

      {/* On intelligence */}
      <section className="mx-auto max-w-5xl px-6 py-28 md:py-36">
        <Arrive className="mb-12 flex items-center gap-6">
          <span className="voice-whisper">{t(chronicleFolio.aiLabel)}</span>
          <Filament />
        </Arrive>
        <Arrive as="p" className="voice-prose dropcap mb-16 text-[clamp(1.25rem,2vw,1.6rem)]">
          {t(intelligence.intro)}
        </Arrive>
        <div>
          {intelligence.capabilities.map((c, i) => (
            <Arrive
              key={c.name.en}
              delay={i * 0.05}
              className="flex flex-col gap-1 border-t border-ink/10 py-6 last:border-b md:flex-row md:items-baseline md:justify-between md:gap-10"
            >
              <h3 className="font-serif text-2xl font-medium text-ink">{t(c.name)}</h3>
              <p className="voice-whisper md:text-end">{t(c.use)}</p>
            </Arrive>
          ))}
        </div>
      </section>

      {/* On finance */}
      <section className="border-y border-ink/10 bg-veil/60 px-6 py-28 md:px-12 md:py-36">
        <div className="mx-auto max-w-5xl">
          <Arrive className="mb-12 flex items-center gap-6">
            <span className="voice-whisper">{t(chronicleFolio.financeLabel)}</span>
            <Filament />
          </Arrive>
          <Arrive as="p" className="voice-prose mb-16 text-[clamp(1.25rem,2vw,1.6rem)]">
            {t(finance.intro)}
          </Arrive>
          <ul className="grid gap-x-16 gap-y-5 md:grid-cols-2">
            {finance.areas.map((area, i) => (
              <Arrive as="li" key={area.en} delay={(i % 2) * 0.06} className="flex items-baseline gap-4">
                <span aria-hidden className="text-rubric">
                  —
                </span>
                <span className="font-serif text-lg font-light text-ink/85">{t(area)}</span>
              </Arrive>
            ))}
          </ul>
        </div>
      </section>

      {/* The tenets */}
      <section className="px-6 py-28 md:px-12 md:py-36">
        <Arrive className="mb-16 text-center">
          <p className="voice-whisper mb-6">{t(chronicleFolio.tenetsLabel)}</p>
          <h2 className="voice-display text-[clamp(2.2rem,6vw,4.5rem)]">
            {t(chronicleFolio.tenetsTitle)}
          </h2>
        </Arrive>
        <div className="grid gap-px overflow-hidden border border-ink/10 bg-ink/12 md:grid-cols-2">
          {tenets.map((tenet, i) => (
            <Arrive key={tenet.title.en} delay={(i % 2) * 0.08} className="bg-ground p-10 md:p-14">
              <p className="voice-whisper mb-6 text-rubric">{tenet.numeral}</p>
              <h3 className="voice-display mb-5 text-2xl md:text-3xl">{t(tenet.title)}</h3>
              <p className="voice-prose text-base md:text-lg">{t(tenet.account)}</p>
            </Arrive>
          ))}
        </div>
      </section>

      {/* The tongues */}
      <section className="px-6 pb-12 md:px-12">
        <Arrive className="mb-12 flex items-center gap-6">
          <span className="voice-whisper">{t(chronicleFolio.tonguesLabel)}</span>
          <Filament />
        </Arrive>
        <div className="flex flex-wrap gap-x-14 gap-y-8">
          {tongues.map((tongue, i) => (
            <Arrive key={tongue.name.en} delay={i * 0.04}>
              <p className="font-serif text-2xl font-medium text-ink">{t(tongue.name)}</p>
              <p className="voice-whisper mt-2">{t(tongue.level)}</p>
            </Arrive>
          ))}
        </div>
      </section>
    </>
  );
}
