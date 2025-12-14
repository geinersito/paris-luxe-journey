import { TableOfContentsItem } from '@/types/blog'

/**
 * Calculate reading time based on word count
 * Average reading speed: 200 words per minute
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.trim().split(/\s+/).length
  const readingTime = Math.ceil(wordCount / wordsPerMinute)
  return readingTime
}

/**
 * Generate table of contents from markdown content
 */
export function generateTableOfContents(content: string): TableOfContentsItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  const headings: TableOfContentsItem[] = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length // Number of # characters
    const title = match[2].trim()
    const id = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    headings.push({
      id,
      title,
      level,
    })
  }

  return headings
}

/**
 * Format date for display
 */
export function formatDate(dateString: string, locale: string = 'en'): string {
  const date = new Date(dateString)
  
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  return date.toLocaleDateString(locale, options)
}

/**
 * Get relative time (e.g., "2 days ago")
 */
export function getRelativeTime(dateString: string, locale: string = 'en'): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  }

  for (const [unit, seconds] of Object.entries(intervals)) {
    const interval = Math.floor(diffInSeconds / seconds)
    if (interval >= 1) {
      return new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).format(
        -interval,
        unit as Intl.RelativeTimeFormatUnit
      )
    }
  }

  return 'just now'
}

/**
 * Truncate text to specified length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

/**
 * Extract first paragraph from markdown content
 */
export function extractFirstParagraph(content: string): string {
  // Remove headings
  const withoutHeadings = content.replace(/^#{1,6}\s+.+$/gm, '')
  
  // Get first non-empty paragraph
  const paragraphs = withoutHeadings.split('\n\n').filter(p => p.trim().length > 0)
  
  return paragraphs[0]?.trim() || ''
}

/**
 * Generate slug from title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

/**
 * Get estimated read time text
 */
export function getReadTimeText(minutes: number, locale: string = 'en'): string {
  const texts = {
    en: `${minutes} min read`,
    fr: `${minutes} min de lecture`,
    es: `${minutes} min de lectura`,
    pt: `${minutes} min de leitura`,
  }
  
  return texts[locale as keyof typeof texts] || texts.en
}

/**
 * Parse markdown to HTML (basic implementation)
 * For production, consider using a library like marked or remark
 */
export function parseMarkdownToHTML(markdown: string): string {
  let html = markdown

  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>')
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>')
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>')

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')

  // Italic
  html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>')

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>')

  // Line breaks
  html = html.replace(/\n\n/g, '</p><p>')
  html = '<p>' + html + '</p>'

  return html
}

