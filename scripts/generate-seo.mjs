/**
 * Build-time generator for sitemap.xml and robots.txt
 * Runs after `vite build` — writes to dist/
 *
 * Usage: node scripts/generate-seo.mjs
 *
 * Requires VITE_SITE_URL env var (fails if missing in CI).
 */

import { writeFileSync, readFileSync, existsSync } from "fs";
import { join } from "path";

// ── Base URL ────────────────────────────────────────────────────────────────

const SITE_URL =
  process.env.VITE_SITE_URL || process.env.VITE_APP_URL || "";

if (!SITE_URL) {
  // Allow local dev builds without the env var (fallback)
  // In CI this should always be set
  if (process.env.CI) {
    console.error(
      "ERROR: VITE_SITE_URL is required in CI. Set it in your deployment env.",
    );
    process.exit(1);
  }
  // Local fallback
  console.warn(
    "WARN: VITE_SITE_URL not set, using default https://eliteparistransfer.com",
  );
}

const BASE = SITE_URL || "https://eliteparistransfer.com";
const TODAY = new Date().toISOString().split("T")[0];

// ── Static routes ───────────────────────────────────────────────────────────

const STATIC_ROUTES = [
  { path: "/", changefreq: "weekly", priority: 1.0 },
  { path: "/booking", changefreq: "monthly", priority: 0.9 },
  { path: "/events", changefreq: "daily", priority: 0.8 },
  { path: "/blog", changefreq: "daily", priority: 0.8 },
  { path: "/excursions", changefreq: "monthly", priority: 0.7 },
  { path: "/airports/cdg", changefreq: "monthly", priority: 0.7 },
  { path: "/airports/orly", changefreq: "monthly", priority: 0.7 },
  { path: "/airports/beauvais", changefreq: "monthly", priority: 0.7 },
  { path: "/hourly", changefreq: "monthly", priority: 0.6 },
  { path: "/faq", changefreq: "monthly", priority: 0.5 },
  { path: "/guides/avoid-fake-taxis", changefreq: "monthly", priority: 0.6 },
  { path: "/privacy", changefreq: "yearly", priority: 0.2 },
  { path: "/terms", changefreq: "yearly", priority: 0.2 },
];

// ── Blog post extraction ────────────────────────────────────────────────────

function extractBlogPosts() {
  const postsFile = join(
    process.cwd(),
    "src",
    "data",
    "blog",
    "posts.meta.ts",
  );

  if (!existsSync(postsFile)) {
    console.warn("WARN: posts.meta.ts not found, skipping blog posts");
    return [];
  }

  const content = readFileSync(postsFile, "utf-8");
  const posts = [];

  // Match each post object: slug, category, updatedAt
  const slugRegex = /slug:\s*["']([^"']+)["']/g;
  const categoryRegex = /category:\s*["']([^"']+)["']/g;
  const updatedAtRegex = /updatedAt:\s*["']([^"']+)["']/g;

  const slugs = [...content.matchAll(slugRegex)].map((m) => m[1]);
  const categories = [...content.matchAll(categoryRegex)].map((m) => m[1]);
  const updatedAts = [...content.matchAll(updatedAtRegex)].map((m) => m[1]);

  for (let i = 0; i < slugs.length; i++) {
    posts.push({
      slug: slugs[i],
      category: categories[i],
      updatedAt: updatedAts[i] || TODAY,
    });
  }

  return posts;
}

// ── Blog category extraction ────────────────────────────────────────────────

function extractBlogCategories() {
  const catFile = join(
    process.cwd(),
    "src",
    "data",
    "blog",
    "categories.ts",
  );

  if (!existsSync(catFile)) {
    return [];
  }

  const content = readFileSync(catFile, "utf-8");
  const slugRegex = /slug:\s*["']([^"']+)["']/g;
  return [...content.matchAll(slugRegex)].map((m) => m[1]);
}

// ── Generators ──────────────────────────────────────────────────────────────

function generateSitemapXml() {
  const blogPosts = extractBlogPosts();
  const blogCategories = extractBlogCategories();

  const urls = [];

  // Static routes
  for (const route of STATIC_ROUTES) {
    urls.push(
      `  <url>
    <loc>${BASE}${route.path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
    );
  }

  // Blog category pages
  for (const cat of blogCategories) {
    urls.push(
      `  <url>
    <loc>${BASE}/blog/${cat}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`,
    );
  }

  // Blog posts
  for (const post of blogPosts) {
    urls.push(
      `  <url>
    <loc>${BASE}/blog/${post.category}/${post.slug}</loc>
    <lastmod>${post.updatedAt}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`,
    );
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;
}

function generateRobotsTxt() {
  return `User-agent: *
Allow: /

Sitemap: ${BASE}/sitemap.xml

# Private pages
Disallow: /booking/details
Disallow: /booking/payment
Disallow: /booking/confirmation
`;
}

// ── Main ────────────────────────────────────────────────────────────────────

function main() {
  const distDir = join(process.cwd(), "dist");

  if (!existsSync(distDir)) {
    console.error("ERROR: dist/ not found. Run `vite build` first.");
    process.exit(1);
  }

  const sitemap = generateSitemapXml();
  const robots = generateRobotsTxt();

  writeFileSync(join(distDir, "sitemap.xml"), sitemap, "utf-8");
  writeFileSync(join(distDir, "robots.txt"), robots, "utf-8");

  // Count URLs for summary
  const urlCount = (sitemap.match(/<url>/g) || []).length;
  console.log(`sitemap.xml: ${urlCount} URLs written to dist/sitemap.xml`);
  console.log(`robots.txt: written to dist/robots.txt`);
  console.log(`Base URL: ${BASE}`);
}

main();
