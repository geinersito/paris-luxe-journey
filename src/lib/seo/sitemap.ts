import { blogPosts } from '@/data/blog/posts.meta'
import { blogCategories } from '@/data/blog/categories'
import type { Language } from '@/types/blog'

interface SitemapUrl {
  loc: string
  lastmod?: string
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority?: number
  alternates?: Array<{
    hreflang: string
    href: string
  }>
}

const SITE_URL = 'https://parisluxejourney.com'
const LANGUAGES: Language[] = ['en', 'es', 'fr', 'pt']

/**
 * Generate sitemap URLs for all blog posts
 */
function generateBlogPostUrls(): SitemapUrl[] {
  const urls: SitemapUrl[] = []

  blogPosts.forEach((post) => {
    // Generate URL for each language
    LANGUAGES.forEach((lang) => {
      const url: SitemapUrl = {
        loc: `${SITE_URL}/${lang}/blog/${post.category}/${post.slug}`,
        lastmod: post.updatedAt,
        changefreq: 'weekly',
        priority: post.featured ? 0.9 : 0.7,
        alternates: LANGUAGES.map((altLang) => ({
          hreflang: altLang,
          href: `${SITE_URL}/${altLang}/blog/${post.category}/${post.slug}`,
        })),
      }
      urls.push(url)
    })
  })

  return urls
}

/**
 * Generate sitemap URLs for all blog categories
 */
function generateCategoryUrls(): SitemapUrl[] {
  const urls: SitemapUrl[] = []

  blogCategories.forEach((category) => {
    LANGUAGES.forEach((lang) => {
      const url: SitemapUrl = {
        loc: `${SITE_URL}/${lang}/blog/${category.slug}`,
        changefreq: 'weekly',
        priority: 0.8,
        alternates: LANGUAGES.map((altLang) => ({
          hreflang: altLang,
          href: `${SITE_URL}/${altLang}/blog/${category.slug}`,
        })),
      }
      urls.push(url)
    })
  })

  return urls
}

/**
 * Generate sitemap URLs for main blog index
 */
function generateBlogIndexUrls(): SitemapUrl[] {
  return LANGUAGES.map((lang) => ({
    loc: `${SITE_URL}/${lang}/blog`,
    changefreq: 'daily' as const,
    priority: 0.9,
    alternates: LANGUAGES.map((altLang) => ({
      hreflang: altLang,
      href: `${SITE_URL}/${altLang}/blog`,
    })),
  }))
}

/**
 * Generate complete sitemap XML
 */
export function generateSitemapXml(): string {
  const allUrls = [
    ...generateBlogIndexUrls(),
    ...generateCategoryUrls(),
    ...generateBlogPostUrls(),
  ]

  const urlElements = allUrls
    .map((url) => {
      const alternateLinks = url.alternates
        ? url.alternates
            .map(
              (alt) =>
                `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}" />`
            )
            .join('\n')
        : ''

      return `  <url>
    <loc>${url.loc}</loc>${url.lastmod ? `\n    <lastmod>${url.lastmod}</lastmod>` : ''}${url.changefreq ? `\n    <changefreq>${url.changefreq}</changefreq>` : ''}${url.priority ? `\n    <priority>${url.priority}</priority>` : ''}
${alternateLinks}
  </url>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlElements}
</urlset>`
}

/**
 * Generate robots.txt content
 */
export function generateRobotsTxt(): string {
  return `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml

# Disallow admin and private pages
Disallow: /admin/
Disallow: /api/
Disallow: /booking/payment/
Disallow: /booking/confirmation/

# Crawl-delay
Crawl-delay: 1
`
}

/**
 * Save sitemap to public folder (for build process)
 */
export async function saveSitemap(): Promise<void> {
  const xml = generateSitemapXml()
  const robots = generateRobotsTxt()

  // In a real implementation, you would write these to files
  // For now, we'll just log them
  console.log('Sitemap XML generated:', xml.length, 'characters')
  console.log('Robots.txt generated:', robots.length, 'characters')

  // TODO: Implement file writing for build process
  // This would typically be done in a build script or server-side
}

