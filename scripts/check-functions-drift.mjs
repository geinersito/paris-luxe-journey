#!/usr/bin/env node
// check:functions-drift — compares live Supabase Edge Functions against
// supabase/functions/DEPLOY_MANIFEST.json. Read-only: never deploys or
// deletes anything. Exits non-zero on any drift so it can gate CI.
//
// Principle (per review on PR #252): an unclassified live function is
// treated as DRIFT until proven otherwise — never silently excused as
// "probably belongs to someone else". Every live slug must land in exactly
// one of: functions (ours, governed), owned_by_sibling_repo (verified, not
// ours), known_out_of_scope_local (ours, deliberately not yet audited),
// known_unreconciled (unaccounted for anywhere — this one still FAILS).
// Anything landing in none of those is undocumented and fails loudly.
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

// Keys prefixed with "_" (e.g. "_note") are documentation, not function slugs.
function realKeys(obj) {
  return Object.keys(obj ?? {}).filter((k) => !k.startsWith("_"));
}

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

  const manifestSlugs = realKeys(manifest.functions);
  const activeSlugs = manifestSlugs.filter(
    (slug) => manifest.functions[slug].status === "active",
  );
  const blockedActive = manifestSlugs.filter(
    (slug) => manifest.functions[slug].status === "active" && manifest.functions[slug].deploy_allowed === false,
  );
  const siblingRepoSlugs = realKeys(manifest.owned_by_sibling_repo);
  const outOfScopeLocalSlugs = realKeys(manifest.known_out_of_scope_local);
  const unreconciledSlugs = realKeys(manifest.known_unreconciled);
  const localFolders = readLocalFunctionFolders();

  let live;
  try {
    live = listLiveFunctions(projectRef);
  } catch (err) {
    console.error("Could not list live functions (Supabase CLI not authenticated locally?).");
    console.error(String(err?.message ?? err));
    process.exit(2);
  }

  let drift = false;

  // 1. Ours (has a local folder) but not in the manifest AND not explicitly excused as
  //    known-out-of-scope — real undocumented deploy.
  const undocumentedInThisRepo = live.filter(
    (slug) =>
      localFolders.includes(slug) &&
      !manifestSlugs.includes(slug) &&
      !outOfScopeLocalSlugs.includes(slug),
  );
  if (undocumentedInThisRepo.length > 0) {
    drift = true;
    console.error("FAIL: live functions with a folder in THIS repo but no manifest entry (undocumented deploy):");
    for (const slug of undocumentedInThisRepo) console.error(`  - ${slug}`);
  }

  // 2. Manifest says active but it's not actually live — deploy missing or removed out-of-band.
  const manifestActiveNotLive = activeSlugs.filter((slug) => !live.includes(slug));
  if (manifestActiveNotLive.length > 0) {
    drift = true;
    console.error("FAIL: manifest says 'active' but function is not live:");
    for (const slug of manifestActiveNotLive) console.error(`  - ${slug}`);
  }

  // 3. known_unreconciled — genuinely unaccounted for anywhere. FAILS by design
  //    (unlike known_out_of_scope_local, which is deliberately excused).
  const stillUnreconciled = unreconciledSlugs.filter((slug) => live.includes(slug));
  if (stillUnreconciled.length > 0) {
    drift = true;
    console.error("FAIL: known_unreconciled functions still live — unaccounted for in any repo, not yet audited:");
    for (const slug of stillUnreconciled) console.error(`  - ${slug}`);
  }

  // 4. Truly unclassified — not in ANY bucket, not a local folder. The default is
  //    failure, not a guess about who owns it.
  const classified = new Set([
    ...manifestSlugs,
    ...siblingRepoSlugs,
    ...outOfScopeLocalSlugs,
    ...unreconciledSlugs,
    ...localFolders,
  ]);
  const totallyUnclassified = live.filter((slug) => !classified.has(slug));
  if (totallyUnclassified.length > 0) {
    drift = true;
    console.error("FAIL: live functions not in ANY manifest bucket — completely undocumented, investigate now:");
    for (const slug of totallyUnclassified) console.error(`  - ${slug}`);
  }

  // --- Non-failing, informational sections ---

  const liveButLegacyPreserved = live.filter(
    (slug) => manifest.functions[slug]?.status === "legacy-preserved-no-deploy",
  );
  if (liveButLegacyPreserved.length > 0) {
    console.warn("REMINDER: functions marked legacy-preserved-no-deploy are still live (expected until retirement is actually executed):");
    for (const slug of liveButLegacyPreserved) console.warn(`  - ${slug} (see its ARCHIVED.md for the retirement checklist)`);
  }

  const liveBlocked = blockedActive.filter((slug) => live.includes(slug));
  if (liveBlocked.length > 0) {
    console.warn("BLOCKED (documented, not new drift — status=active does NOT mean deploy_allowed):");
    for (const slug of liveBlocked) {
      console.warn(`  - ${slug}: ${manifest.functions[slug].blocking_reason ?? "see manifest notes"}`);
    }
  }

  const liveSiblingRepo = siblingRepoSlugs.filter((slug) => live.includes(slug));
  if (liveSiblingRepo.length > 0) {
    console.log(`INFO: ${liveSiblingRepo.length} live functions confirmed owned by the sibling repo (paris-dispatcher) — not this repo's concern.`);
  }

  const liveOutOfScope = outOfScopeLocalSlugs.filter((slug) => live.includes(slug));
  if (liveOutOfScope.length > 0) {
    console.log(`INFO: ${liveOutOfScope.length} live functions are in this repo's git but deliberately out of this manifest's audited scope (see known_out_of_scope_local notes).`);
  }

  if (!drift) {
    console.log("No drift: every live function is explicitly classified (governed, sibling-repo, deliberately out of scope, or already known-and-tracked).");
  }

  process.exit(drift ? 1 : 0);
}

main();
