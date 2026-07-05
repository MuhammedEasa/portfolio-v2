import Arrive from "@/components/Arrive";
import Drift from "@/components/Drift";
import Filament from "@/components/Filament";

/** Inner-page opening plate: folio mark, title, argument. */
export default function FolioHead({
  folio,
  title,
  argument,
}: {
  folio: string;
  title: string;
  argument: string;
}) {
  return (
    <header className="overflow-hidden px-6 pb-24 pt-36 md:px-12 md:pb-32 md:pt-48">
      <Arrive immediate delay={0.15} className="mb-10 flex items-center gap-6">
        <span className="voice-whisper text-rubric">{folio}</span>
        <Filament />
      </Arrive>
      <Drift speed={0.14}>
        <Arrive as="h1" immediate delay={0.3} blur={22} y={50} duration={1.4}>
          <span className="voice-display block text-[clamp(2.8rem,11vw,9.5rem)]">{title}</span>
        </Arrive>
      </Drift>
      <Drift speed={0.05}>
        <Arrive
          as="p"
          immediate
          delay={0.6}
          className="mt-10 max-w-[52ch] font-serif text-xl font-light leading-relaxed text-quiet md:ms-[28%] md:text-2xl"
        >
          {argument}
        </Arrive>
      </Drift>
    </header>
  );
}
