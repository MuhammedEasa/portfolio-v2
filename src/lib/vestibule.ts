/** Shared signal: entrance animations hold until the first-load veil lifts. */

let lifted = false;
const listeners = new Set<() => void>();

export function markVestibuleLifted() {
  lifted = true;
  listeners.forEach((fn) => fn());
  listeners.clear();
}

/** Runs fn when the veil has lifted (immediately if it already has). */
export function onVestibuleLifted(fn: () => void): () => void {
  if (lifted) {
    fn();
    return () => {};
  }
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}
