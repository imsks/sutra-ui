// esbuild strips module-level "use client" directives when bundling, so we
// re-add it to the main entry after the build. The main entry is treated as a
// client boundary; the icons entry stays server-safe (pure re-exports).
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const dist = resolve(dirname(fileURLToPath(import.meta.url)), "../dist");
const directive = '"use client";\n';
const targets = ["index.js", "index.cjs"];

for (const file of targets) {
  const path = resolve(dist, file);
  const source = readFileSync(path, "utf8");
  if (source.startsWith('"use client"')) continue;
  writeFileSync(path, directive + source, "utf8");
}
