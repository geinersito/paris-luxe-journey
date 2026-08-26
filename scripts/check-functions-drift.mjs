#!/usr/bin/env node
// check:functions-drift — compares live Supabase Edge Functions against
// supabase/functions/DEPLOY_MANIFEST.json. Read-only: never deploys or
// deletes anything. Exits non-zero on any drift so it can gate CI.
//
// This is a DETECTOR, not a preventer. It cannot stop someone with a valid
// Supabase access token from running `supabase functions deploy <slug>`
// directly. See docs/ops/DEPLOY_GOVERNANCE.md for what actually prevents
// that (process/credential controls, not this script).

import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");

function readProjectRef() {
  const configPath = path.join(repoRoot, "supabase", "config.toml");
  const config = readFileSync(configPath, "utf8");
  const match = config.match(/project_id\s*=\s*"([^"]+)"/);
  if (!match) {
    throw new Error(`Could not find project_id in ${configPath}`);
  }
  return match[1];
}

function readManifest() {
  const manifestPath = path.join(repoRoot, "supabase", "functions", "DEPLOY_MANIFEST.json");
  return JSON.parse(readFileSync(manifestPath, "utf8"));
}

// This is a SHARED Supabase project across two repos (paris-luxe-journey +
// paris-dispatcher). This script only checks out one of them, so a live
// function that belongs to the *other* repo will always look like "no
// manifest entry" unless we account for it. We can't read the sibling repo
// from CI, so instead: any live function that already has a matching folder
// under supabase/functions/ in *this* repo is "ours" and must be either in
// the manifest or explicitly excused; anything else is reported separately
// as unrecognized-not-ours rather than lumped in with real undocumented
// deploys, which would otherwise drown the signal in cross-repo noise (this
// happened on the first real run of this script — see DEPLOY_GOVERNANCE.md).
function readLocalFunctionFolders() {
  const functionsDir = path.join(repoRoot, "supabase", "functions");
  return readdirSync(functionsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("_"))
    .map((entry) => entry.name);
}

function listLiveFunctions(projectRef) {
  const raw = execFileSync(
    "supabase",
    ["functions", "list", "--project-ref", projectRef, "-o", "json"],
    { encoding: "utf8" },
  );
  // `-o json` returns a bare array of function objects (not `{functions: [...]}`,
  // which is what the command's own default --output-format json wraps it in —
  // don't conflate the two if you ever touch this).
  const parsed = JSON.parse(raw);
  return parsed.map((f) => f.slug).sort();
}

function main() {
  const projectRef = readProjectRef();
  const manifest = readManifest();
  const manifestSlugs = Object.keys(manifest.functions);
  const activeSlugs = manifestSlugs.filter(
    (slug) => manifest.functions[slug].status === "active",
  );
  const knownUnreconciled = Object.keys(manifest.known_unreconciled ?? {});
  const localFolders = readLocalFunctionFolders();
  const recognized = new Set([...manifestSlugs, ...knownUnreconciled, ...localFolders]);

  let live;
  try {
    live = listLiveFunctions(projectRef);
  } catch (err) {
    console.error("Could not list live functions (Supabase CLI not authenticated locally?).");
    console.error(String(err?.message ?? err));
    process.exit(2);
  }

  // "Ours" = has a folder in this repo but isn't accounted for in the manifest —
  // this is the real "undocumented deploy" signal.
  const undocumentedInThisRepo = live.filter(
    (slug) => localFolders.includes(slug) && !manifestSlugs.includes(slug),
  );
  // Live, not ours (no local folder), not in the manifest, not excused — most
  // likely belongs to the sibling repo (paris-dispatcher) or hasn't been
  // triaged into known_unreconciled yet. Reported, not treated as a failure.
  const unrecognizedElsewhere = live.filter(
    (slug) => !recognized.has(slug) && !localFolders.includes(slug),
  );
  const manifestActiveNotLive = activeSlugs.filter((slug) => !live.includes(slug));
  const liveButLegacyPreserved = live.filter(
    (slug) => manifest.functions[slug]?.status === "legacy-preserved-no-deploy",
  );

  let drift = false;

  if (undocumentedInThisRepo.length > 0) {
    drift = true;
    console.error("DRIFT: live functions with a folder in THIS repo but no manifest entry (undocumented deploy):");
    for (const slug of undocumentedInThisRepo) console.error(`  - ${slug}`);
  }

  if (unrecognizedElsewhere.length > 0) {
    console.warn("INFO: live functions not in this repo's tree or manifest — likely owned by the sibling repo (paris-dispatcher), not a failure here:");
    for (const slug of unrecognizedElsewhere) console.warn(`  - ${slug}`);
  }

  if (manifestActiveNotLive.length > 0) {
    drift = true;
    console.error("DRIFT: manifest says 'active' but function is not live (deploy missing or removed out-of-band):");
    for (const slug of manifestActiveNotLive) console.error(`  - ${slug}`);
  }

  if (liveButLegacyPreserved.length > 0) {
    // Not necessarily new drift (v312 has been live+legacy since before this
    // script existed) — surfaced as a loud reminder, not a hard failure by
    // itself, since retiring it is a deliberate separate step.
    console.warn("REMINDER: functions marked legacy-preserved-no-deploy are still live:");
    for (const slug of liveButLegacyPreserved) console.warn(`  - ${slug} (see its ARCHIVED.md for the retirement checklist)`);
  }

  if (knownUnreconciled.length > 0) {
    const stillLive = knownUnreconciled.filter((slug) => live.includes(slug));
    if (stillLive.length > 0) {
      console.warn("REMINDER: known_unreconciled functions still live, not yet audited:");
      for (const slug of stillLive) console.warn(`  - ${slug}`);
    }
  }

  if (!drift) {
    console.log("No drift: every live function is either in the manifest or explicitly listed as known_unreconciled.");
  }

  process.exit(drift ? 1 : 0);
}

main();
