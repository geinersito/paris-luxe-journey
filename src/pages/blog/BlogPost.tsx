import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { getPostBySlug } from "@/data/blog/posts.meta";
import { loadArticle, articleExists } from "@/data/blog/articles";
import { getCategoryBySlug } from "@/data/blog/categories";
import { isValidCategory } from "@/data/blog/categories";
import {
  generateArticleJsonLd,
  generateBreadcrumbJsonLd,
} from "@/lib/seo/json-ld";
import { getSiteOrigin } from "@/lib/seo/site";
import JsonLd from "@/components/seo/JsonLd";
import BlogHeader from "@/components/blog/BlogHeader";
import BlogContent from "@/components/blog/BlogContent";
import TableOfContents from "@/components/blog/TableOfContents";
import RelatedPosts from "@/components/blog/RelatedPosts";
import AuthorBox from "@/components/blog/AuthorBox";
import ShareButtons from "@/components/blog/ShareButtons";
import Breadcrumb from "@/components/blog/Breadcrumb";
import InlineBookingCTA from "@/components/blog/InlineBookingCTA";
import FinalCTA from "@/components/blog/FinalCTA";
import { Skeleton } from "@/components/ui/skeleton";
import type { BlogPostMeta } from "@/types/blog";

export default function BlogPost() {
  const { category, slug } = useParams<{ category: string; slug: string }>();
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language as "en" | "es" | "fr" | "pt";

  const [post, setPost] = useState<BlogPostMeta | null>(null);
  const [ArticleComponent, setArticleComponent] =
    useState<React.ComponentType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadPost() {
      if (!category || !slug) {
        setError(true);
        setLoading(false);
        return;
      }

      // Validate category
      if (!isValidCategory(category)) {
        navigate("/blog/404", { replace: true });
        return;
      }

      // Get post metadata
      const postMeta = getPostBySlug(slug);
      if (!postMeta) {
        navigate("/blog/404", { replace: true });
        return;
      }

      // Verify category matches
      if (postMeta.category !== category) {
        navigate(`/blog/${postMeta.category}/${slug}`, { replace: true });
        return;
      }

      setPost(postMeta);

      // Load article content
      try {
        const exists = await articleExists(slug, currentLang);
        if (!exists) {
          // Fallback to English if translation doesn't exist
          const existsEn = await articleExists(slug, "en");
          if (!existsEn) {
            setError(true);
            setLoading(false);
            return;
          }
          const component = await loadArticle(slug, "en");
          setArticleComponent(() => component);
        } else {
          const component = await loadArticle(slug, currentLang);
          setArticleComponent(() => component);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error loading article:", err);
        setError(true);
        setLoading(false);
      }
    }

    loadPost();
  }, [category, slug, currentLang, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <Skeleton className="h-96 w-full mb-8" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (error || !post || !ArticleComponent) {
    navigate("/blog/404", { replace: true });
    return null;
  }

  const categoryMeta = getCategoryBySlug(category!);
  const siteOrigin = getSiteOrigin();
  const currentUrl = `${siteOrigin}/blog/${category}/${slug}`;

  const breadcrumbItems = [
    { label: t("blog.title") || "Blog", href: "/blog" },
    {
      label: categoryMeta?.name[currentLang] || category!,
      href: `/blog/${category}`,
    },
    { label: post.title[currentLang] },
  ];

  // Generate JSON-LD structured data
  const articleJsonLd = generateArticleJsonLd(post, currentLang, currentUrl);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: siteOrigin },
    { name: t("blog.title") || "Blog", url: `${siteOrigin}/blog` },
    {
      name: categoryMeta?.name[currentLang] || category!,
      url: `${siteOrigin}/blog/${category}`,
    },
    { name: post.title[currentLang] },
  ]);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <Helmet>
        <title>{post.seo.metaTitle[currentLang]}</title>
        <meta
          name="description"
          content={post.seo.metaDescription[currentLang]}
        />
        <meta name="keywords" content={post.seo.keywords.join(", ")} />

        {/* Open Graph */}
        <meta property="og:title" content={post.seo.metaTitle[currentLang]} />
        <meta
          property="og:description"
          content={post.seo.metaDescription[currentLang]}
        />
        <meta property="og:image" content={post.image.url} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.publishedAt} />
        <meta property="article:modified_time" content={post.updatedAt} />
        <meta property="article:author" content={post.author.name} />
        <meta
          property="article:section"
          content={categoryMeta?.name[currentLang]}
        />
        {post.tags.map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.seo.metaTitle[currentLang]} />
        <meta
          name="twitter:description"
          content={post.seo.metaDescription[currentLang]}
        />
        <meta name="twitter:image" content={post.image.url} />

        {/* Canonical URL */}
        <link rel="canonical" href={currentUrl} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbItems} />

          {/* Blog Header */}
          <BlogHeader post={post} />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
            {/* Table of Contents - Desktop */}
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-24">
                <TableOfContents />
              </div>
            </aside>

            {/* Article Content */}
            <main className="lg:col-span-9">
              <BlogContent>
                <ArticleComponent />
              </BlogContent>

              {/* Inline Booking CTA */}
              <InlineBookingCTA />

              {/* Author Box */}
              <AuthorBox author={post.author} />

              {/* Share Buttons */}
              <ShareButtons title={post.title[currentLang]} />

              {/* Final CTA */}
              <FinalCTA />

              {/* Related Posts */}
              <RelatedPosts currentPostId={post.id} category={post.category} />
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
