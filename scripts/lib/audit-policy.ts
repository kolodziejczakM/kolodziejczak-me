/** Accepted on 2026-11-18 for a static site built only from trusted repository content.
 * This is risk acceptance, not a fix. Revisit when picomatch publishes a patch.
 */
export const picomatchException = {
  id: "GHSA-fc5q-39xc-vjpf",
  url: "https://github.com/advisories/GHSA-fc5q-39xc-vjpf",
  package: "picomatch",
  range: "<=4.0.7",
  severity: "high",
  versions: ["2.3.2", "4.0.7"],
  expiresOn: "2026-11-25", // Inclusive, UTC. After this date CI blocks again.
} as const;

const severities = ["info", "low", "moderate", "high", "critical"] as const;
type Severity = (typeof severities)[number];
interface Advisory {
  name: string;
  url: string;
  severity: Severity;
  range: string;
}
interface Vulnerability {
  name: string;
  severity: Severity;
  via: (string | Advisory)[];
  nodes: string[];
}
const record = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === "object" && !Array.isArray(value);
const severity = (value: unknown): value is Severity =>
  severities.some((item) => item === value);
const blocking = (value: Severity): boolean =>
  value !== "info" && value !== "low";

/** Evaluate npm's actual graph; never allowlist parent packages by name. */
export function evaluateAudit(
  report: unknown,
  lockfile: unknown,
  options: { now: Date; staticOutput: boolean; hasAdapter: boolean },
): { accepted: string[]; blocked: string[] } {
  if (
    !record(report) ||
    report.error ||
    report.auditReportVersion !== 2 ||
    !record(report.vulnerabilities) ||
    !record(report.metadata) ||
    !record(report.metadata.vulnerabilities) ||
    !record(lockfile) ||
    !record(lockfile.packages) ||
    !Number.isFinite(options.now.valueOf())
  )
    throw new Error(
      "Missing or unsupported npm audit report/lockfile. Audit cannot be accepted.",
    );

  const entries = new Map<string, Vulnerability>();
  const counts = Object.fromEntries(severities.map((level) => [level, 0]));
  for (const [key, value] of Object.entries(report.vulnerabilities)) {
    if (
      !record(value) ||
      value.name !== key ||
      !severity(value.severity) ||
      !Array.isArray(value.via) ||
      !value.via.length ||
      !Array.isArray(value.nodes) ||
      !value.nodes.length ||
      !value.nodes.every((node) => typeof node === "string")
    )
      throw new Error(`Unsupported vulnerability entry: ${key}`);
    const via: (string | Advisory)[] = [];
    for (const item of value.via) {
      if (typeof item === "string") via.push(item);
      else if (
        record(item) &&
        typeof item.name === "string" &&
        typeof item.url === "string" &&
        severity(item.severity) &&
        typeof item.range === "string"
      )
        via.push({
          name: item.name,
          url: item.url,
          severity: item.severity,
          range: item.range,
        });
      else throw new Error(`Unsupported advisory in ${key}`);
    }
    counts[value.severity]++;
    entries.set(key, {
      name: key,
      severity: value.severity,
      nodes: value.nodes,
      via,
    });
  }
  for (const level of severities) {
    if (report.metadata.vulnerabilities[level] !== counts[level])
      throw new Error(
        `Incomplete audit report: ${level} count does not match entries.`,
      );
  }
  if (report.metadata.vulnerabilities.total !== entries.size)
    throw new Error(
      "Incomplete audit report: total count does not match entries.",
    );
  const packages = lockfile.packages;

  const accepted = new Set<string>();
  const blocked = new Set<string>();
  function inspect(name: string, ancestors = new Set<string>()) {
    const entry = entries.get(name);
    if (!entry || ancestors.has(name)) {
      blocked.add(`Unresolved or cyclic audit dependency: ${name}`);
      return;
    }
    if (entry.severity === "critical")
      blocked.add(`${name}: critical audit finding requires review.`);
    const next = new Set(ancestors).add(name);
    for (const item of entry.via) {
      if (typeof item === "string") {
        inspect(item, next);
        continue;
      }
      if (!blocking(item.severity)) {
        // A more severe wrapper without a matching advisory requires review.
        if (blocking(entry.severity))
          blocked.add(`Severity mismatch in ${name}: ${item.url}`);
        continue;
      }
      const exception = picomatchException;
      const knownVersions = entry.nodes.every((node) => {
        const installed = packages[node];
        return (
          record(installed) &&
          exception.versions.some((version) => version === installed.version)
        );
      });
      if (
        entry.name === exception.package &&
        item.name === exception.package &&
        item.url === exception.url &&
        item.range === exception.range &&
        entry.severity === exception.severity &&
        item.severity === exception.severity &&
        knownVersions &&
        options.staticOutput &&
        !options.hasAdapter &&
        options.now.toISOString().slice(0, 10) <= exception.expiresOn
      )
        accepted.add(exception.id);
      else blocked.add(`${name}: ${item.url} (${item.severity})`);
    }
  }
  for (const entry of entries.values()) inspect(entry.name);
  return { accepted: [...accepted], blocked: [...blocked] };
}
