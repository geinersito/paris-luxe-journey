import { Language } from '@/types/blog'

// Dynamic imports using Vite's import.meta.glob for code-splitting
// This ensures we don't load all 40 article files at once
const modules = import.meta.glob<{ default: () => JSX.Element }>('./**/*.tsx')

/**
 * Load an article dynamically based on slug and language
 * @param slug - The article slug (e.g., 'cdg-to-paris-transport-options')
 * @param lang - The language code ('en', 'es', 'fr', 'pt')
 * @returns Promise that resolves to the article component
 */
export async function loadArticle(slug: string, lang: Language): Promise<() => JSX.Element> {
  const key = `./${slug}/${lang}.tsx`
  
  const loader = modules[key]
  
  if (!loader) {
    throw new Error(`Article not found: ${slug} (${lang})`)
  }
  
  const module = await loader()
  return module.default
}

/**
 * Check if an article exists for a given slug and language
 * @param slug - The article slug
 * @param lang - The language code
 * @returns boolean indicating if the article exists
 */
export function articleExists(slug: string, lang: Language): boolean {
  const key = `./${slug}/${lang}.tsx`
  return key in modules
}

/**
 * Get all available article slugs
 * @returns Array of unique article slugs
 */
export function getAllArticleSlugs(): string[] {
  const slugs = new Set<string>()
  
  Object.keys(modules).forEach(key => {
    // Extract slug from path like './cdg-to-paris-transport-options/en.tsx'
    const match = key.match(/\.\/([^/]+)\//)
    if (match) {
      slugs.add(match[1])
    }
  })
  
  return Array.from(slugs)
}

