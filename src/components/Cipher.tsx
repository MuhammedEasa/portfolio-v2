/** The E cipher: heavy spine, hairline arms, one rubric lozenge. Does not mirror in RTL. */
export default function Cipher({ className = "h-10 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 48" className={className} aria-hidden fill="none">
      {/* the spine */}
      <path d="M8 2 V46" stroke="currentColor" strokeWidth="4.4" />
      {/* three arms: hairlines against the spine's weight */}
      <path d="M8 3.5 H30.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 24 H24" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 44.5 H30.5" stroke="currentColor" strokeWidth="1.8" />
      {/* tick terminals on the long arms */}
      <path d="M30.5 0 V7" stroke="currentColor" strokeWidth="1.8" />
      <path d="M30.5 41 V48" stroke="currentColor" strokeWidth="1.8" />
      {/* the lozenge, set where the middle arm rests */}
      <path d="M28.6 20.6 L32 24 L28.6 27.4 L25.2 24 Z" fill="var(--rubric)" />
    </svg>
  );
}
