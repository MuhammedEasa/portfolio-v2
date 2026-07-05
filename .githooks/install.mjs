import { execFileSync } from "node:child_process";

// Point git at the versioned hooks directory. Swallow failure: deployment
// builds (e.g. Vercel) install packages without a .git checkout, and the
// hook is meaningless there anyway.
try {
  execFileSync("git", ["config", "core.hooksPath", ".githooks"], { stdio: "ignore" });
} catch {
  // not a git checkout — nothing to install
}
