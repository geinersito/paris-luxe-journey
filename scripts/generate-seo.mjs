/**
 * Build-time generator for sitemap.xml and robots.txt
 * Runs after `vite build` and writes to dist/.
 *
 * Usage:
 *   node scripts/generate-seo.mjs
 *
 * Requirements:
 *   - VITE_PUBLIC_SITE_URL must exist in process env or .env* files.
 */

import { existsSync, readFileSync, writeFileSync } from "fs";
import { join, resolve } from "path";

const REQUIRED_SITE_URL_ENV = "VITE_PUBLIC_SITE_URL";
const ROBOTS_NOINDEX_ENV = "VITE_ROBOTS_NOINDEX";
const ENV_FILES_IN_PRECEDENCE = [
  ".env",
  ".env.local",
  ".env.production",
  ".env.production.local",
];

const STATIC_ROUTES = [
  "/",
  "/booking",
  "/events",
  "/blog",
  "/excursions",
  "/airports/cdg",
  "/airports/orly",
  "/airports/beauvais",
  "/hourly",
  "/hourly/quote",
  "/faq",
  "/guides/avoid-fake-taxis",
  "/privacy",
  "/terms",
];

const BLOG_SLUG_EXCLUSIONS = [
  /^example-/i,
  /^sample-/i,
  /^draft-/i,
  /^todo-/i,
  /^placeholder-/i,
  /lorem-ipsum/i,
];

function parseDotEnvFile(filePath) {
  const parsed = {};
  if (!existsSync(filePath)) {
    return parsed;
  }

  const content = readFileSync(filePath, "utf8");
  const lines = content.split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const equalsIndex = trimmed.indexOf("=");
    if (equalsIndex <= 0) {
      continue;
    }

    const key = trimmed.slice(0, equalsIndex).trim();
    let value = trimmed.slice(equalsIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    parsed[key] = value;
  }

  return parsed;
}

function loadBuildEnvFromFiles() {
  const merged = {};
  for (const envFile of ENV_FILES_IN_PRECEDENCE) {
    const envPath = resolve(process.cwd(), envFile);
    Object.assign(merged, parseDotEnvFile(envPath));
  }
  return merged;
}

function normalizeBaseUrl(rawValue) {
  try {
    const parsed = new URL(rawValue);
    return parsed.origin;
  } catch {
    console.error(
      `ERROR: ${REQUIRED_SITE_URL_ENV} must be a valid absolute URL, got "${rawValue}".`,
    );
    process.exit(1);
  }
}

function resolveBaseUrl() {
  const fileEnv = loadBuildEnvFromFiles();
  const rawSiteUrl =
    process.env[REQUIRED_SITE_URL_ENV] ?? fileEnv[REQUIRED_SITE_URL_ENV] ?? "";
  const trimmed = rawSiteUrl.trim();

  const fallback = "http://localhost:8082";

  if (!trimmed) {
    console.warn(
      `⚠️  WARNING: ${REQUIRED_SITE_URL_ENV} not set. Using fallback: ${fallback}`,
    );
    console.warn(
      `   For production builds, set ${REQUIRED_SITE_URL_ENV} in CI or .env.production (e.g. https://eliteparistransfer.com).`,
    );
    return normalizeBaseUrl(fallback);
  }

  // Basic scheme validation to avoid malformed canonicals like "eliteparistransfer.com"
  if (!/^https?:\/\//i.test(trimmed)) {
    console.warn(
      `⚠️  WARNING: ${REQUIRED_SITE_URL_ENV} is invalid (missing http/https): "${trimmed}". Using fallback: ${fallback}`,
    );
    return normalizeBaseUrl(fallback);
  }

  return normalizeBaseUrl(trimmed);
}

function xmlEscape(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function safeIsoDate(value) {
  if (!value) {
    return null;
  }
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }
  return parsed.toISOString().slice(0, 10);
}

function isIndexableBlogSlug(slug) {
  if (!slug) {
    return false;
  }
  return !BLOG_SLUG_EXCLUSIONS.some((pattern) => pattern.test(slug));
}

function extractBlogPosts() {
  const postsPath = join(process.cwd(), "src", "data", "blog", "posts.meta.ts");
  if (!existsSync(postsPath)) {
    return [];
  }

  const content = readFileSync(postsPath, "utf8");
  const postRegex =
    /\{\s*id:\s*"[^"]+"[\s\S]*?slug:\s*"([^"]+)"[\s\S]*?category:\s*"([^"]+)"[\s\S]*?publishedAt:\s*"([^"]+)"(?:[\s\S]*?updatedAt:\s*"([^"]+)")?[\s\S]*?\n  },/g;

  const posts = [];
  let match;

  while ((match = postRegex.exec(content)) !== null) {
    const slug = match[1];
    const category = match[2];
    const publishedAt = match[3];
    const updatedAt = match[4];

    if (!isIndexableBlogSlug(slug)) {
      continue;
    }

    posts.push({
      slug,
      category,
      lastmod: safeIsoDate(updatedAt) ?? safeIsoDate(publishedAt),
    });
  }

  return posts;
}

function extractBlogCategories() {
  const categoriesPath = join(
    process.cwd(),
    "src",
    "data",
    "blog",
    "categories.ts",
  );
  if (!existsSync(categoriesPath)) {
    return [];
  }

  const content = readFileSync(categoriesPath, "utf8");
  const slugRegex = /slug:\s*["']([^"']+)["']/g;
  return [...content.matchAll(slugRegex)].map((match) => match[1]);
}

function dedupeUrlEntries(entries) {
  const seen = new Set();
  return entries.filter((entry) => {
    if (seen.has(entry.loc)) {
      return false;
    }
    seen.add(entry.loc);
    return true;
  });
}

function buildSitemapEntries(baseUrl) {
  const staticEntries = STATIC_ROUTES.map((path) => ({
    loc: `${baseUrl}${path}`,
  }));

  const categoryEntries = extractBlogCategories().map((categorySlug) => ({
    loc: `${baseUrl}/blog/${encodeURIComponent(categorySlug)}`,
  }));

  const postEntries = extractBlogPosts().map((post) => ({
    loc: `${baseUrl}/blog/${encodeURIComponent(post.category)}/${encodeURIComponent(post.slug)}`,
    lastmod: post.lastmod,
  }));

  return dedupeUrlEntries([...staticEntries, ...categoryEntries, ...postEntries]);
}

function buildSitemapXml(entries) {
  const urlBlocks = entries.map((entry) => {
    const lines = ["  <url>", `    <loc>${xmlEscape(entry.loc)}</loc>`];
    if (entry.lastmod) {
      lines.push(`    <lastmod>${entry.lastmod}</lastmod>`);
    }
    lines.push("  </url>");
    return lines.join("\n");
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlBlocks.join("\n")}
</urlset>
`;
}

function buildRobotsTxt(baseUrl) {
  if (process.env[ROBOTS_NOINDEX_ENV] === "1") {
    return `User-agent: *
Disallow: /
`;
  }

  return `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`;
}

function main() {
  const distDir = join(process.cwd(), "dist");
  if (!existsSync(distDir)) {
    console.error("ERROR: dist/ not found. Run `vite build` first.");
    process.exit(1);
  }

  const baseUrl = resolveBaseUrl();
  const sitemapEntries = buildSitemapEntries(baseUrl);
  const sitemapXml = buildSitemapXml(sitemapEntries);
  const robotsTxt = buildRobotsTxt(baseUrl);

  writeFileSync(join(distDir, "sitemap.xml"), sitemapXml, "utf8");
  writeFileSync(join(distDir, "robots.txt"), robotsTxt, "utf8");

  console.log(
    `sitemap.xml: ${sitemapEntries.length} URLs written to dist/sitemap.xml`,
  );
  console.log("robots.txt: written to dist/robots.txt");
  console.log(`Base URL: ${baseUrl}`);
}

main();
