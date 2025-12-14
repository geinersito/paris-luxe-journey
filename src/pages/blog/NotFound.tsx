import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Home, Search, ArrowLeft } from 'lucide-react'
import { blogPosts } from '@/data/blog/posts.meta'
import BlogCard from '@/components/blog/BlogCard'

export default function BlogNotFound() {
  const { t } = useTranslation()

  // Get 3 random popular posts to suggest
  const suggestedPosts = blogPosts
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)

  return (
    <>
      <Helmet>
        <title>{t('blog.notFound.title') || '404 - Page Not Found | Blog'}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* 404 Hero */}
        <section className="relative bg-gradient-to-br from-primary/10 via-background to-background py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              {/* 404 Number */}
              <div className="text-9xl md:text-[12rem] font-bold text-primary/20 leading-none mb-4">
                404
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                {t('blog.notFound.heading') || 'Article Not Found'}
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                {t('blog.notFound.description') || 
                  "Sorry, we couldn't find the article you're looking for. It may have been moved or deleted."}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link to="/blog">
                    <Home className="w-5 h-5 mr-2" />
                    {t('blog.notFound.backToBlog') || 'Back to Blog'}
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    {t('blog.notFound.backToHome') || 'Back to Home'}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Suggested Articles */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Search className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {t('blog.notFound.suggestedTitle') || 'You Might Be Interested In'}
              </h2>
              <p className="text-muted-foreground">
                {t('blog.notFound.suggestedDescription') || 'Check out these popular articles instead'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {suggestedPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>

        {/* Help Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {t('blog.notFound.helpTitle') || 'Need Help?'}
              </h3>
              <p className="text-muted-foreground mb-6">
                {t('blog.notFound.helpDescription') || 
                  'If you believe this is an error or need assistance, please contact our support team.'}
              </p>
              <Button asChild variant="outline">
                <Link to="/contact">
                  {t('blog.notFound.contactUs') || 'Contact Us'}
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

