import { writeFileSync } from 'fs'
import { join } from 'path'
import { generateSitemapXml, generateRobotsTxt } from '../src/lib/seo/sitemap'

/**
 * Build script to generate sitemap.xml and robots.txt
 * Run with: tsx scripts/generate-sitemap.ts
 */
function main() {
  try {
    console.log('🚀 Generating sitemap and robots.txt...')

    // Generate sitemap.xml
    const sitemapXml = generateSitemapXml()
    const sitemapPath = join(process.cwd(), 'public', 'sitemap.xml')
    writeFileSync(sitemapPath, sitemapXml, 'utf-8')
    console.log('✅ Sitemap generated:', sitemapPath)

    // Generate robots.txt
    const robotsTxt = generateRobotsTxt()
    const robotsPath = join(process.cwd(), 'public', 'robots.txt')
    writeFileSync(robotsPath, robotsTxt, 'utf-8')
    console.log('✅ Robots.txt generated:', robotsPath)

    console.log('🎉 Done!')
  } catch (error) {
    console.error('❌ Error generating sitemap:', error)
    process.exit(1)
  }
}

main()

