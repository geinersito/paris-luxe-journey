import { BlogPostMeta, BlogCategory } from '@/types/blog'
import { getPostsByCategory, blogPosts } from '@/data/blog/posts.meta'
import BlogCard from './BlogCard'
import { useTranslation } from 'react-i18next'

interface RelatedPostsProps {
  currentPostId: string
  category: BlogCategory
  maxPosts?: number
}

export default function RelatedPosts({ currentPostId, category, maxPosts = 3 }: RelatedPostsProps) {
  const { t } = useTranslation()

  // Get posts from same category, excluding current post
  const categoryPosts = getPostsByCategory(category)
    .filter((post) => post.id !== currentPostId)
    .slice(0, maxPosts)

  // If not enough posts in category, fill with other posts
  const relatedPosts = categoryPosts.length < maxPosts
    ? [
        ...categoryPosts,
        ...blogPosts
          .filter((post) => post.id !== currentPostId && post.category !== category)
          .slice(0, maxPosts - categoryPosts.length),
      ]
    : categoryPosts

  if (relatedPosts.length === 0) return null

  return (
    <section className="py-16 mt-16 border-t">
      <h2 className="text-3xl font-bold text-foreground mb-8">
        {t('blog.relatedArticles') || 'Related Articles'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  )
}

