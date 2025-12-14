import { BlogCategory } from '@/types/blog'
import { blogCategories } from '@/data/blog/categories'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
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

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {/* All Categories Button - Premium Style */}
      <Button
        variant={selectedCategory === 'all' ? 'default' : 'outline'}
        onClick={() => onCategoryChange('all')}
        className={cn(
          'transition-all duration-300 font-semibold',
          selectedCategory === 'all'
            ? 'silk-button shadow-lg'
            : 'button-outline-gold hover:scale-105'
        )}
      >
        {allCategoriesText[currentLang]}
      </Button>

      {/* Category Buttons - Premium Style */}
      {blogCategories.map((category) => {
        const IconComponent = Icons[category.icon as keyof typeof Icons] as any

        return (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? 'default' : 'outline'}
            onClick={() => onCategoryChange(category.id)}
            className={cn(
              'transition-all duration-300 font-semibold',
              selectedCategory === category.id
                ? 'silk-button shadow-lg'
                : 'button-outline-gold hover:scale-105'
            )}
          >
            {IconComponent && <IconComponent className="w-4 h-4 mr-2" />}
            {category.name[currentLang]}
          </Button>
        )
      })}
    </div>
  )
}

