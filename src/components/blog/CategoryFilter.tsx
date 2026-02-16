import { BlogCategory } from '@/types/blog'
import { blogCategories } from '@/data/blog/categories'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import * as Icons from 'lucide-react'

interface CategoryFilterProps {
  selectedCategory: BlogCategory | 'all'
  onCategoryChange: (category: BlogCategory | 'all') => void
  variant?: 'chips' | 'sidebar'
}

export default function CategoryFilter({
  selectedCategory,
  onCategoryChange,
  variant = 'chips',
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
    <div className={cn(
      "flex",
      variant === "sidebar"
        ? "flex-col items-stretch gap-2"
        : "flex-wrap justify-center gap-3"
    )}>
      {/* All Categories Button - Premium Style */}
      <Button
        variant={selectedCategory === 'all' ? 'default' : 'outline'}
        onClick={() => onCategoryChange('all')}
        className={cn(
          'transition-all duration-300 font-semibold',
          variant === "sidebar" 
            ? "w-full flex justify-start text-left rounded-xl px-3 py-2" 
            : "",
          variant === "sidebar" && selectedCategory === 'all'
            ? 'bg-primary/10 border-primary/30 hover:bg-primary/15 text-foreground'
            : variant === "sidebar"
            ? 'bg-white border-black/10 hover:bg-black/5 text-foreground/80 hover:text-foreground'
            : selectedCategory === 'all'
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
              variant === "sidebar" 
                ? "w-full flex justify-start text-left rounded-xl px-3 py-2" 
                : "",
              variant === "sidebar" && selectedCategory === category.id
                ? 'bg-primary/10 border-primary/30 hover:bg-primary/15 text-foreground'
                : variant === "sidebar"
                ? 'bg-white border-black/10 hover:bg-black/5 text-foreground/80 hover:text-foreground'
                : selectedCategory === category.id
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

