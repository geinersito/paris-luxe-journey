import React from 'react'
import { BlogCategory } from '@/types/blog'
import { blogCategories } from '@/data/blog/categories'
import { useTranslation } from 'react-i18next'
import * as Icons from 'lucide-react'

interface CategoryFilterProps {
  selectedCategory: BlogCategory | 'all'
  onCategoryChange: (category: BlogCategory | 'all') => void
}

export default function CategoryFilter({
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  const { i18n } = useTranslation()
  const currentLang = i18n.language as 'en' | 'fr' | 'es' | 'pt'

  const allCategoriesText = {
    en: 'All Articles',
    fr: 'Tous les Articles',
    es: 'Todos los Artículos',
    pt: 'Todos os Artigos',
  }

  const activeClass = 'inline-flex items-center gap-1.5 font-ui font-semibold text-sm px-4 py-2 bg-ref-navy text-white transition-colors'
  const inactiveClass = 'inline-flex items-center gap-1.5 font-ui font-semibold text-sm px-4 py-2 border border-ref-ink/20 text-ref-ink bg-white hover:border-ref-navy/30 transition-colors'

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <button
        type="button"
        onClick={() => onCategoryChange('all')}
        className={selectedCategory === 'all' ? activeClass : inactiveClass}
      >
        {allCategoriesText[currentLang]}
      </button>

      {blogCategories.map((category) => {
        const IconComponent = Icons[category.icon as keyof typeof Icons] as React.ElementType
        const isActive = selectedCategory === category.id

        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onCategoryChange(category.id)}
            className={isActive ? activeClass : inactiveClass}
          >
            {IconComponent && <IconComponent className="w-4 h-4" />}
            {category.name[currentLang]}
          </button>
        )
      })}
    </div>
  )
}
