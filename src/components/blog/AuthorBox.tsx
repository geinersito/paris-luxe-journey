import { BlogPostMeta } from '@/types/blog'
import { useTranslation } from 'react-i18next'

interface AuthorBoxProps {
  author: BlogPostMeta['author']
}

export default function AuthorBox({ author }: AuthorBoxProps) {
  const { i18n } = useTranslation()
  const currentLang = i18n.language as 'en' | 'es' | 'fr' | 'pt'

  return (
    <div className="border-t border-b border-border py-6 my-8">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <img
          src={author.avatar}
          alt={author.name}
          className="w-16 h-16 rounded-full object-cover flex-shrink-0"
        />

        {/* Author Info */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-1">
            {author.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-2">
            {author.role[currentLang]}
          </p>
          <p className="text-sm text-foreground/80">
            {author.bio[currentLang]}
          </p>
        </div>
      </div>
    </div>
  )
}

