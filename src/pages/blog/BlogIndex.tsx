import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { blogPosts, getFeaturedPost } from "@/data/blog/posts.meta";
import { getCategoryBySlug } from "@/data/blog/categories";
import BlogCard from "@/components/blog/BlogCard";
import CategoryFilter from "@/components/blog/CategoryFilter";
import NewsletterCTA from "@/components/blog/NewsletterCTA";
import BlogSidebar from "@/components/blog/BlogSidebar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Calendar, Clock, ArrowRight } from "lucide-react";
import { formatDate, getReadTimeText } from "@/lib/blog-utils";
import { BlogCategory, Language } from "@/types/blog";
import { getSiteOrigin } from "@/lib/seo/site";

export default function BlogIndex() {
  const { t, i18n } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<
    BlogCategory | "all"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");

  const featuredPost = getFeaturedPost();
  const featuredCategory = featuredPost
    ? getCategoryBySlug(featuredPost.category)
    : null;

  const siteOrigin = getSiteOrigin();
  const canonicalUrl = `${siteOrigin}/blog`;
  const lang = (i18n.language || "en") as Language;
  const pageTitle = t("blog.pageTitle") || "Travel Blog | Paris Luxe Journey";
  const pageDescription =
    t("blog.pageDescription") ||
    "Expert travel tips, guides, and insights for visiting Paris and France. Airport transfers, day trips, luxury travel advice and more.";

  const collectionJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: pageTitle,
      description: pageDescription,
      url: canonicalUrl,
      inLanguage: lang,
      isPartOf: {
        "@type": "WebSite",
        name: "Paris Luxe Journey",
        url: siteOrigin,
      },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: blogPosts.slice(0, 10).map((post, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${siteOrigin}/blog/${post.category}/${post.slug}`,
          name: post.title[lang] || post.title.en,
        })),
      },
    }),
    [pageTitle, pageDescription, canonicalUrl, lang, siteOrigin],
  );

  // Filter posts based on category and search
  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      post.title.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    // Exclude featured post from regular list
    return matchesCategory && matchesSearch && post.id !== featuredPost?.id;
  });

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content="Paris travel blog, France travel tips, airport transfer guide, day trips from Paris, luxury travel Paris"
        />

        {/* Canonical */}
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={`${siteOrigin}/og-image.jpg`} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={`${siteOrigin}/og-image.jpg`} />

        {/* JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(collectionJsonLd)}
        </script>
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
                {t("blog.heroTitle") || "Travel Blog"}
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                {t("blog.heroSubtitle") ||
                  "Expert tips, guides, and insights for your Paris journey"}
              </p>

              {/* Search Bar - Premium Style */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                <Input
                  type="text"
                  placeholder={
                    t("blog.searchPlaceholder") || "Search articles..."
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 border-2 border-primary/20 focus:border-primary/40 rounded-xl bg-white/80 backdrop-blur-sm"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-6 border-b border-primary/10 bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
        </section>

        {/* Featured Post */}
        {selectedCategory === "all" && searchQuery === "" && featuredPost && (
          <section className="section-padding-sm bg-gradient-to-b from-white to-champagne/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-8">
                <p className="font-accent italic text-xl md:text-2xl text-primary mb-4">
                  Featured Story
                </p>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary">
                  {t("blog.featured") || "Featured Article"}
                </h2>
              </div>
              <div className="max-w-5xl mx-auto">
                <Link
                  to={`/blog/${featuredPost.category}/${featuredPost.slug}`}
                  className="group block"
                >
                  <article className="overflow-hidden rounded-2xl border-2 border-primary/20 bg-white shadow-sm hover:border-primary/40 hover:shadow-luxury-hover transition-all duration-500">
                    <div className="grid grid-cols-12">
                      <div className="col-span-12 lg:col-span-5">
                        <div className="relative h-full min-h-[250px] md:min-h-[300px] overflow-hidden">
                          <img
                            src={featuredPost.image.url}
                            alt={featuredPost.image.alt[lang]}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-gradient-to-r from-primary to-primary/80 text-white border-0 shadow-lg">
                              {featuredCategory?.name[lang] ||
                                featuredPost.category}
                            </Badge>
                          </div>
                          {featuredPost.featured && (
                            <div className="absolute top-4 right-4">
                              <Badge className="bg-secondary/90 backdrop-blur-sm text-white border-0 shadow-lg">
                                ⭐ Featured
                              </Badge>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="col-span-12 lg:col-span-7 p-6 md:p-8 flex flex-col justify-between gap-6">
                        <div>
                          <h3 className="text-2xl md:text-3xl font-display font-bold text-secondary group-hover:text-primary transition-colors duration-300">
                            {featuredPost.title[lang]}
                          </h3>
                          <p className="mt-4 text-base md:text-lg text-gray-600 leading-relaxed">
                            {featuredPost.description[lang]}
                          </p>

                          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-gold-subtle rounded-lg">
                              <Calendar className="w-4 h-4 text-primary" />
                              <span className="text-gray-700 font-medium">
                                {formatDate(featuredPost.publishedAt, lang)}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-gold-subtle rounded-lg">
                              <Clock className="w-4 h-4 text-primary" />
                              <span className="text-gray-700 font-medium">
                                {getReadTimeText(
                                  featuredPost.readingTime,
                                  lang,
                                )}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-3 pt-5 border-t border-primary/10">
                            <div className="relative">
                              <img
                                src={featuredPost.author.avatar}
                                alt={featuredPost.author.name}
                                className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
                              />
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full border-2 border-white" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-secondary">
                                {featuredPost.author.name}
                              </p>
                              <p className="text-xs text-gray-600 font-medium">
                                {featuredPost.author.role[lang]}
                              </p>
                            </div>
                          </div>

                          <div className="mt-4 flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all duration-300">
                            <span className="font-display">
                              {t("blog.readMore") || "Read More"}
                            </span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* All Posts with Sidebar */}
        <section className="py-8 md:py-10 bg-gradient-to-b from-champagne/30 via-white to-cream">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <p className="font-accent italic text-xl md:text-2xl text-primary mb-4">
                Latest Stories
              </p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary">
                {selectedCategory === "all"
                  ? t("blog.allArticles") || "All Articles"
                  : t("blog.categoryArticles") || "Articles"}
              </h2>
            </div>

            {/* Grid with Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
              {/* Main Content */}
              <div className="lg:col-span-8">
                {filteredPosts.length === 0 ? (
                  <div className="text-center py-16">
                    <p className="text-muted-foreground text-lg">
                      {t("blog.noArticles") ||
                        "No articles found. Try a different search or category."}
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

        {/* Newsletter CTA */}
        <section className="section-padding-sm bg-gradient-to-b from-white to-champagne/30">
          <div className="container mx-auto px-4">
            <NewsletterCTA />
          </div>
        </section>
      </div>
    </>
  );
}
