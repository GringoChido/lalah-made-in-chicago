import { spawn } from "node:child_process";
import { resolve } from "node:path";
const child = spawn(process.execPath, [resolve("node_modules/vinext/dist/cli.js"), "dev"], {
  env: { ...process.env, LALAH_STATIC_EXPORT: "true" }, stdio: "inherit",
});
child.on("error", error => { console.error(error.message); process.exitCode = 1; });
child.on("exit", code => { process.exitCode = code ?? 0; });
for (const signal of ["SIGINT", "SIGTERM"]) process.on(signal, () => child.kill(signal));
