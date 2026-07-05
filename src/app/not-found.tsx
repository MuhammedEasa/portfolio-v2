"use client";

import Arrive from "@/components/Arrive";
import Cipher from "@/components/Cipher";
import TurnLink from "@/components/TurnLink";
import { missingLeaf, ui } from "@/lib/manuscript";
import { useTongue } from "@/lib/tongue";

/** The missing leaf: a 404 set in the book's own voice. */
export default function NotFound() {
  const { t } = useTongue();

  return (
    <div className="flex min-h-svh flex-col items-center justify-center px-6 text-center">
      <Arrive immediate delay={0.1}>
        <Cipher className="mx-auto h-12 w-auto text-quiet" />
      </Arrive>
      <Arrive immediate delay={0.25}>
        <p className="voice-whisper mt-10 text-rubric">{t(missingLeaf.mark)}</p>
      </Arrive>
      <Arrive as="h1" immediate delay={0.4} className="voice-display mt-6 text-[clamp(2.2rem,6vw,4.5rem)]">
        {t(missingLeaf.title)}
      </Arrive>
      <Arrive as="p" immediate delay={0.55} className="voice-prose mt-8 max-w-[44ch] text-lg">
        {t(missingLeaf.body)}
      </Arrive>
      <Arrive immediate delay={0.7} className="mt-12">
        <TurnLink href="/" data-cursor={t(ui.cursor.open)} className="link-rubric font-serif text-xl">
          {t(missingLeaf.home)}
        </TurnLink>
      </Arrive>
    </div>
  );
}
