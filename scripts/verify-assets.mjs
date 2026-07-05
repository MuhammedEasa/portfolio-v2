import { statSync } from "node:fs";

/**
 * Prebuild gate: the build refuses to ship if a required static asset is
 * missing or truncated. Git integrity guarantees a clone contains what was
 * committed — nothing guarantees what was committed is intact. A committed
 * deletion or a corrupted file would otherwise ship green with a black hero.
 */

const REQUIRED = [
  { path: "public/hero-film.mp4", minBytes: 1_000_000 },
  { path: "public/hero-poster.webp", minBytes: 10_000 },
];

let failed = false;
for (const { path, minBytes } of REQUIRED) {
  let size = -1;
  try {
    size = statSync(path).size;
  } catch {
    // missing entirely
  }
  if (size < minBytes) {
    console.error(
      `BUILD BLOCKED: ${path} is ${size < 0 ? "missing" : `${size} bytes (minimum ${minBytes})`}.`
    );
    failed = true;
  }
}

if (failed) process.exit(1);
console.log(`asset gate: ${REQUIRED.length} required assets present and intact`);
