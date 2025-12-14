import { useState, useEffect } from 'react'
import { TableOfContentsItem } from '@/types/blog'
import { List } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TableOfContentsProps {
  items?: TableOfContentsItem[]
}

export default function TableOfContents({ items: propItems }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')
  const [items, setItems] = useState<TableOfContentsItem[]>(propItems || [])

  // Auto-generate TOC from DOM if items not provided
  useEffect(() => {
    if (propItems && propItems.length > 0) {
      setItems(propItems)
      return
    }

    // Generate TOC from headings in the document
    const headings = document.querySelectorAll('article h2, article h3, main h2, main h3')
    const generatedItems: TableOfContentsItem[] = []

    headings.forEach((heading) => {
      const id = heading.id || heading.textContent
        ?.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') || ''

      if (!heading.id && id) {
        heading.id = id
      }

      if (id) {
        generatedItems.push({
          id,
          title: heading.textContent || '',
          level: parseInt(heading.tagName.substring(1)),
        })
      }
    })

    setItems(generatedItems)
  }, [propItems])

  useEffect(() => {
    if (items.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-100px 0px -80% 0px' }
    )

    // Observe all headings
    items.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [items])

  const handleClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  // Don't render if no items
  if (!items || items.length === 0) return null

  return (
    <div className="border rounded-lg p-6 bg-card glass-card">
      <div className="flex items-center gap-2 mb-4">
        <List className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-foreground">Table of Contents</h3>
      </div>

      <nav>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleClick(item.id)}
                className={cn(
                  'text-left text-sm transition-colors hover:text-primary w-full',
                  item.level === 3 && 'pl-4',
                  activeId === item.id
                    ? 'text-primary font-medium'
                    : 'text-muted-foreground'
                )}
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

