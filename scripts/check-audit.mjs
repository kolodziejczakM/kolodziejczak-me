import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import astroConfig from "../astro.config.mjs";
import { evaluateAudit, picomatchException } from "./lib/audit-policy.ts";

try {
  const audit = spawnSync(
    "npm",
    ["audit", "--omit=dev", "--audit-level=moderate", "--json"],
    {
      encoding: "utf8",
      timeout: 120_000,
      maxBuffer: 10 * 1024 * 1024,
    },
  );
  // Preserve the unfiltered report, including the accepted advisory and its parents.
  if (audit.stdout) console.log(audit.stdout);
  if (audit.stderr) console.error(audit.stderr);
  if (audit.error) throw audit.error;
  if (audit.signal || ![0, 1].includes(audit.status))
    throw new Error(
      `npm audit did not complete (exit=${audit.status}, signal=${audit.signal}).`,
    );

  const result = evaluateAudit(
    JSON.parse(audit.stdout),
    JSON.parse(
      await readFile(new URL("../package-lock.json", import.meta.url), "utf8"),
    ),
    {
      now: new Date(),
      staticOutput: astroConfig.output === "static",
      hasAdapter: Boolean(astroConfig.adapter),
    },
  );
  for (const id of result.accepted) {
    const message = `Temporary risk acceptance: ${id}, picomatch 2.3.2/4.0.7; expires after ${picomatchException.expiresOn} UTC. The package remains vulnerable. See docs/dependency-audit.md.`;
    console.warn(
      process.env.GITHUB_ACTIONS === "true"
        ? `::warning title=Temporary security exception::${message}`
        : message,
    );
  }
  if (result.blocked.length)
    throw new Error(`Unaccepted audit findings:\n${result.blocked.join("\n")}`);
  console.log(
    `Audit passed policy: no unaccepted moderate/high/critical findings; ${result.accepted.length} temporary exception(s).`,
  );
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
