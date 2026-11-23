import { spawnSync } from "node:child_process";

const mode = process.argv[2];
if (mode !== "build" && mode !== "release")
  throw new Error("Expected build or release mode.");
const env = { ...process.env, SITE_ENV: "production" };
const scripts =
  mode === "build" ? ["build"] : ["check", "build", "test", "audit:check"];
for (const script of scripts) {
  const result = spawnSync("npm", ["run", script], { env, stdio: "inherit" });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}
if (mode === "release") {
  const result = spawnSync(
    process.execPath,
    ["--experimental-strip-types", "scripts/check-release.ts"],
    { env, stdio: "inherit" },
  );
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}
