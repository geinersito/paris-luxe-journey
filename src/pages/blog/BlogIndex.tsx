import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { blogPosts, getFeaturedPost } from '@/data/blog/posts.meta'
import BlogCard from '@/components/blog/BlogCard'
import CategoryFilter from '@/components/blog/CategoryFilter'
import NewsletterCTA from '@/components/blog/NewsletterCTA'
import BlogSidebar from '@/components/blog/BlogSidebar'
import { EventsFeed } from '@/components/events/EventsFeed'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { BlogCategory } from '@/types/blog'

export default function BlogIndex() {
  const { t } = useTranslation()
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const featuredPost = getFeaturedPost()

  // Filter posts based on category and search
  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    const matchesSearch =
      searchQuery === '' ||
      post.title.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    // Exclude featured post from regular list
    return matchesCategory && matchesSearch && post.id !== featuredPost?.id
  })

  return (
    <>
      <Helmet>
        <title>{t('blog.pageTitle') || 'Travel Blog | Paris Luxe Journey'}</title>
        <meta
          name="description"
          content={t('blog.pageDescription') || 'Expert travel tips, guides, and insights for visiting Paris and France. Airport transfers, day trips, luxury travel advice and more.'}
        />
        <meta
          name="keywords"
          content="Paris travel blog, France travel tips, airport transfer guide, day trips from Paris, luxury travel Paris"
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section - Premium Style */}
        <section className="relative section-padding bg-gradient-to-b from-champagne via-cream to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <p className="font-accent italic text-xl md:text-2xl text-primary mb-4">
                Discover Paris
              </p>
              <h1 className="text-4xl md:text-6xl font-display font-bold text-secondary mb-6">
                {t('blog.heroTitle') || 'Travel Blog'}
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                {t('blog.heroSubtitle') ||
                  'Expert tips, guides, and insights for your Paris journey'}
              </p>

              {/* Search Bar - Premium Style */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                <Input
                  type="text"
                  placeholder={t('blog.searchPlaceholder') || 'Search articles...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 border-2 border-primary/20 focus:border-primary/40 rounded-xl bg-white/80 backdrop-blur-sm"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 border-b border-primary/10 bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
        </section>

        {/* Featured Post */}
        {selectedCategory === 'all' && searchQuery === '' && featuredPost && (
          <section className="section-padding-sm bg-gradient-to-b from-white to-champagne/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <p className="font-accent italic text-xl md:text-2xl text-primary mb-4">
                  Featured Story
                </p>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary">
                  {t('blog.featured') || 'Featured Article'}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <BlogCard post={featuredPost} featured />
              </div>
            </div>
          </section>
        )}

        {/* All Posts with Sidebar */}
        <section className="section-padding bg-gradient-to-b from-champagne/30 via-white to-cream">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <p className="font-accent italic text-xl md:text-2xl text-primary mb-4">
                Latest Stories
              </p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary">
                {selectedCategory === 'all'
                  ? t('blog.allArticles') || 'All Articles'
                  : t('blog.categoryArticles') || 'Articles'}
              </h2>
            </div>

            {/* Grid with Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-8">
                {filteredPosts.length === 0 ? (
                  <div className="text-center py-16">
                    <p className="text-muted-foreground text-lg">
                      {t('blog.noArticles') || 'No articles found. Try a different search or category.'}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredPosts.map((post) => (
                      <BlogCard key={post.id} post={post} />
                    ))}
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-4">
                <div className="sticky top-24">
                  <BlogSidebar />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Events Feed - This Month in Paris */}
        <section className="section-padding bg-gradient-to-b from-cream via-champagne/50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <p className="font-accent italic text-xl md:text-2xl text-primary mb-4">
                What's Happening
              </p>
            </div>
            <EventsFeed range="month" variant="full" />
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="section-padding-sm bg-gradient-to-b from-white to-champagne/30">
          <div className="container mx-auto px-4">
            <NewsletterCTA />
          </div>
        </section>
      </div>
    </>
  )
}

