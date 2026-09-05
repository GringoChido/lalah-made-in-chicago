import { spawnSync } from "node:child_process";
import { copyFileSync, existsSync, readFileSync } from "node:fs";
import { resolve, join } from "node:path";

const root = process.cwd();
const result = spawnSync(process.execPath, [resolve("node_modules/vinext/dist/cli.js"), "build"], {
  cwd: root, env: { ...process.env, LALAH_STATIC_EXPORT: "true" }, stdio: "inherit",
});
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);
const output = resolve("dist/client");
// Vinext currently exports a plain-text 404; Netlify serves this branded fallback.
copyFileSync(resolve("scripts/netlify-404.html"), join(output, "404.html"));
const pages = ["index.html", "contact/index.html", "socials/index.html", "bio/index.html", "music/index.html", "videos/index.html", "tour/index.html", "merch/index.html", "404.html"];
for (const page of pages) {
  const path = join(output, page);
  if (!existsSync(path)) throw new Error(`Missing static page: ${page}`);
  const html = readFileSync(path, "utf8");
  if (!html.includes("Lalah") || !html.includes("<main")) throw new Error(`Incomplete static page: ${page}`);
}
for (const asset of ["images/landing.webp", "images/bio.webp", "images/tour.webp", "fonts/magic-vintage.ttf"]) {
  if (!existsSync(join(output, asset))) throw new Error(`Missing static asset: ${asset}`);
}
console.log(`Verified ${pages.length} static pages and required artwork/font. Netlify publish directory: dist/client`);
