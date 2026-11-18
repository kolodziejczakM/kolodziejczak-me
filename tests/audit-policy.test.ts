import test from "node:test";
import assert from "node:assert/strict";
import {
  evaluateAudit,
  picomatchException,
} from "../scripts/lib/audit-policy.ts";

const options = {
  now: new Date("2026-11-18T12:00:00Z"),
  staticOutput: true,
  hasAdapter: false,
};
const lock = {
  packages: {
    "node_modules/picomatch": { version: "4.0.7" },
    "node_modules/anymatch/node_modules/picomatch": { version: "2.3.2" },
  },
};
const advisory = {
  name: "picomatch",
  url: picomatchException.url,
  range: "<=4.0.7",
  severity: "high",
};
const findings = () => ({
  picomatch: {
    name: "picomatch",
    severity: "high",
    nodes: Object.keys(lock.packages),
    via: [{ ...advisory }],
  },
  vite: {
    name: "vite",
    severity: "high",
    nodes: ["node_modules/vite"],
    via: ["picomatch"],
  },
  astro: {
    name: "astro",
    severity: "high",
    nodes: ["node_modules/astro"],
    via: ["picomatch", "vite"],
  },
});
function report(
  vulnerabilities: Record<string, { severity: string }> = findings(),
) {
  const counts: Record<string, number> = {
    info: 0,
    low: 0,
    moderate: 0,
    high: 0,
    critical: 0,
    total: 0,
  };
  for (const finding of Object.values(vulnerabilities)) {
    counts[finding.severity]++;
    counts.total++;
  }
  return {
    auditReportVersion: 2,
    vulnerabilities,
    metadata: { vulnerabilities: counts },
  };
}

test("the one accepted advisory also explains affected ancestor packages", () => {
  const decision = evaluateAudit(report(), lock, options);
  assert.deepEqual(decision, {
    accepted: [picomatchException.id],
    blocked: [],
  });
  assert.deepEqual(evaluateAudit(report({}), lock, options), {
    accepted: [],
    blocked: [],
  });
});

test("another advisory in the same package still blocks, even alongside the accepted one", () => {
  const graph = findings();
  graph.picomatch.via.push({
    ...advisory,
    url: "https://github.com/advisories/GHSA-other-issue-here",
  });
  assert.ok(
    evaluateAudit(report(graph), lock, options).blocked.some((item) =>
      item.includes("GHSA-other-issue-here"),
    ),
  );
});

test("an unrelated moderate vulnerability cannot be hidden by the known high finding", () => {
  const graph = {
    ...findings(),
    other: {
      name: "other",
      severity: "moderate",
      nodes: ["node_modules/other"],
      via: [
        {
          name: "other",
          severity: "moderate",
          range: "*",
          url: "https://github.com/advisories/GHSA-other-issue-here",
        },
      ],
    },
  };
  assert.ok(
    evaluateAudit(report(graph), lock, options).blocked.some((item) =>
      item.startsWith("other:"),
    ),
  );
});

test("info and low findings preserve the original moderate blocking threshold", () => {
  const graph = Object.fromEntries(
    ["info", "low"].map((level) => [
      level,
      {
        name: level,
        severity: level,
        nodes: [`node_modules/${level}`],
        via: [
          {
            name: level,
            severity: level,
            range: "*",
            url: `https://github.com/advisories/${level}`,
          },
        ],
      },
    ]),
  );
  assert.deepEqual(evaluateAudit(report(graph), lock, options), {
    accepted: [],
    blocked: [],
  });
});

test("critical severity in an ancestor also blocks even if its only listed cause is the known advisory", () => {
  const graph = findings();
  graph.astro.severity = "critical";
  assert.ok(
    evaluateAudit(report(graph), lock, options).blocked.some((item) =>
      item.includes("astro"),
    ),
  );
});

test("the exception expires after the documented UTC date", () => {
  assert.deepEqual(
    evaluateAudit(report(), lock, {
      ...options,
      now: new Date("2026-11-25T23:59:59Z"),
    }).blocked,
    [],
  );
  assert.ok(
    evaluateAudit(report(), lock, {
      ...options,
      now: new Date("2026-11-26T00:00:00Z"),
    }).blocked.length,
  );
});

test("server output or an adapter invalidates the static-site risk acceptance", () => {
  assert.ok(
    evaluateAudit(report(), lock, { ...options, staticOutput: false }).blocked
      .length,
  );
  assert.ok(
    evaluateAudit(report(), lock, { ...options, hasAdapter: true }).blocked
      .length,
  );
});

test("changed versions, missing lock entries or a broader affected range require a new review", () => {
  assert.ok(evaluateAudit(report(), { packages: {} }, options).blocked.length);
  const changed = structuredClone(lock);
  changed.packages["node_modules/picomatch"].version = "4.0.8";
  assert.ok(evaluateAudit(report(), changed, options).blocked.length);
  const graph = findings();
  graph.picomatch.via[0].range = "<=4.0.8";
  assert.ok(evaluateAudit(report(graph), lock, options).blocked.length);
});

test("a matching advisory identifier on another host is not accepted", () => {
  const graph = findings();
  graph.picomatch.via[0].url = `https://example.com/${picomatchException.id}`;
  assert.ok(evaluateAudit(report(graph), lock, options).blocked.length);
});

test("the same advisory URL cannot exempt another package", () => {
  const graph = findings();
  graph.picomatch.via[0].name = "another-package";
  assert.ok(evaluateAudit(report(graph), lock, options).blocked.length);
});

test("missing references and cycles fail closed", () => {
  const missing = findings();
  missing.astro.via = ["absent"];
  assert.ok(
    evaluateAudit(report(missing), lock, options).blocked.some((item) =>
      item.includes("absent"),
    ),
  );
  const cyclic = findings();
  cyclic.astro.via = ["astro"];
  assert.ok(
    evaluateAudit(report(cyclic), lock, options).blocked.some((item) =>
      item.includes("cyclic"),
    ),
  );
});

test("registry errors, incomplete reports and unsupported formats cannot pass as a clean audit", () => {
  for (const invalid of [
    undefined,
    {},
    { ...report(), error: { code: "E503" } },
    { ...report(), auditReportVersion: 3 },
    { ...report(), vulnerabilities: {} },
  ]) {
    assert.throws(() => evaluateAudit(invalid, lock, options));
  }
  assert.throws(() =>
    evaluateAudit(report(), lock, { ...options, now: new Date("invalid") }),
  );
});
