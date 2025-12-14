import { useEffect, useRef, ReactNode } from 'react'

interface BlogContentProps {
  content?: string
  children?: ReactNode
}

export default function BlogContent({ content, children }: BlogContentProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current) return

    // Add IDs to headings for table of contents navigation
    const headings = contentRef.current.querySelectorAll('h2, h3')
    headings.forEach((heading) => {
      const id = heading.textContent
        ?.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')

      if (id) {
        heading.id = id
      }
    })
  }, [content, children])

  // Convert markdown to HTML (basic implementation)
  const renderMarkdown = (markdown: string) => {
    let html = markdown

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-8 mb-4 text-foreground">$1</h3>')
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-10 mb-6 text-foreground">$1</h2>')
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-12 mb-8 text-foreground">$1</h1>')

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/gim, '<strong class="font-semibold text-foreground">$1</strong>')

    // Italic
    html = html.replace(/\*(.*?)\*/gim, '<em class="italic">$1</em>')

    // Links
    html = html.replace(
      /\[([^\]]+)\]\(([^)]+)\)/gim,
      '<a href="$2" class="text-primary hover:underline font-medium" target="_blank" rel="noopener noreferrer">$1</a>'
    )

    // Lists - Unordered
    html = html.replace(/^\- (.+)$/gim, '<li class="ml-6 mb-2">$1</li>')
    html = html.replace(/(<li.*<\/li>)/s, '<ul class="list-disc space-y-2 my-4">$1</ul>')

    // Paragraphs
    const lines = html.split('\n')
    const processedLines = lines.map(line => {
      // Don't wrap headings, lists, or empty lines
      if (line.match(/^<(h[1-6]|ul|li|strong)/i) || line.trim() === '') {
        return line
      }
      // Wrap regular text in paragraphs
      if (line.trim() && !line.match(/^<\//)) {
        return `<p class="mb-4 text-muted-foreground leading-relaxed">${line}</p>`
      }
      return line
    })

    return processedLines.join('\n')
  }

  // If children are provided, render them directly
  if (children) {
    return (
      <div
        ref={contentRef}
        className="prose prose-lg max-w-none
          prose-headings:text-foreground
          prose-p:text-muted-foreground
          prose-a:text-primary
          prose-strong:text-foreground
          prose-ul:text-muted-foreground
          prose-ol:text-muted-foreground
          prose-li:text-muted-foreground
          prose-blockquote:border-primary
          prose-blockquote:text-muted-foreground
          prose-code:text-primary
          prose-pre:bg-muted
          dark:prose-invert"
      >
        {children}
      </div>
    )
  }

  // Otherwise, render markdown content
  return (
    <div
      ref={contentRef}
      className="prose prose-lg max-w-none
        prose-headings:text-foreground
        prose-p:text-muted-foreground
        prose-a:text-primary
        prose-strong:text-foreground
        prose-ul:text-muted-foreground
        prose-ol:text-muted-foreground
        prose-li:text-muted-foreground
        prose-blockquote:border-primary
        prose-blockquote:text-muted-foreground
        prose-code:text-primary
        prose-pre:bg-muted
        dark:prose-invert"
      dangerouslySetInnerHTML={{ __html: renderMarkdown(content || '') }}
    />
  )
}

