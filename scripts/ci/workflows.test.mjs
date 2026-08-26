import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");

function readWorkflow(name) {
  return readFileSync(join(root, ".github/workflows", name), "utf8");
}

describe("ci.yml", () => {
  const ci = readWorkflow("ci.yml");

  it("runs the quality gate on pull requests to production", () => {
    assert.match(ci, /^name: CI$/m);
    assert.match(ci, /pull_request:/);
    assert.match(ci, /branches:\s*\[main, production\]/);
    assert.match(ci, /pnpm build/);
    assert.match(ci, /pnpm test/);
    assert.match(ci, /pnpm lint/);
    assert.match(ci, /pnpm typecheck/);
  });

  it("does not publish packages", () => {
    assert.doesNotMatch(ci, /changeset publish|pnpm release|changesets\/action/);
  });
});

describe("changesets config", () => {
  it("treats production as the release base branch", () => {
    const config = readFileSync(join(root, ".changeset/config.json"), "utf8");
    assert.match(config, /"baseBranch":\s*"production"/);
  });
});

describe("release.yml", () => {
  const release = readWorkflow("release.yml");

  it("publishes to npm on push to production", () => {
    assert.match(release, /^name: Release$/m);
    assert.match(release, /push:/);
    assert.match(release, /branches:\s*\[production\]/);
    assert.match(release, /uses:\s*changesets\/action@v1/);
    assert.match(release, /publish:\s*pnpm release/);
    assert.match(release, /NPM_TOKEN/);
    assert.match(release, /id-token:\s*write/);
    assert.match(release, /NPM_CONFIG_PROVENANCE/);
  });

  it("runs the quality gate before publishing", () => {
    const gate = release.indexOf("pnpm build && pnpm test && pnpm lint && pnpm typecheck");
    const publish = release.indexOf("changesets/action@v1");
    assert.ok(gate !== -1, "expected the quality gate in release.yml");
    assert.ok(publish !== -1, "expected changesets/action in release.yml");
    assert.ok(gate < publish, "quality gate must run before changesets/action");
  });
});
