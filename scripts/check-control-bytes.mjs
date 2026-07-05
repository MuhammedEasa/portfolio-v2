import { execFileSync } from "node:child_process";

/**
 * Pre-commit guard: refuse any staged text file containing control bytes
 * other than tab (9), LF (10), CR (13). DEL (127) is also refused.
 * Such bytes render invisibly in editors and diffs — a file can look
 * correct on screen while containing something else entirely.
 */

const TEXT_EXTENSIONS = new Set([
  ".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs",
  ".css", ".md", ".json", ".html", ".svg",
  ".txt", ".yml", ".yaml", ".toml", ".env",
]);

const ext = (name) => {
  const i = name.lastIndexOf(".");
  return i === -1 ? "" : name.slice(i).toLowerCase();
};

const staged = execFileSync("git", ["diff", "--cached", "--name-only", "--diff-filter=ACM"], {
  encoding: "utf8",
})
  .split("\n")
  .map((s) => s.trim())
  .filter((s) => s.length > 0 && TEXT_EXTENSIONS.has(ext(s)));

const offenders = [];
for (const file of staged) {
  // Scan the staged blob, not the working tree — they can differ.
  const bytes = execFileSync("git", ["show", ":" + file], { maxBuffer: 64 * 1024 * 1024 });
  for (let i = 0; i < bytes.length; i++) {
    const v = bytes[i];
    if ((v < 32 && v !== 9 && v !== 10 && v !== 13) || v === 127) {
      offenders.push({ file, offset: i, byte: v });
    }
  }
}

if (offenders.length > 0) {
  console.error("COMMIT BLOCKED: hidden control bytes in staged files.");
  console.error("These bytes are invisible in editors and text diffs.");
  for (const { file, offset, byte } of offenders.slice(0, 20)) {
    console.error("  " + file + " @ byte offset " + offset + " (decimal " + byte + ")");
  }
  if (offenders.length > 20) console.error("  ... and " + (offenders.length - 20) + " more");
  process.exit(1);
}

console.log("control-byte scan: " + staged.length + " staged text file(s) clean");
