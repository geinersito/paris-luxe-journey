import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { blogPosts, getFeaturedPost } from "@/data/blog/posts.meta";
import BlogCard from "@/components/blog/BlogCard";
import CategoryFilter from "@/components/blog/CategoryFilter";
import NewsletterCTA from "@/components/blog/NewsletterCTA";
import BlogSidebar from "@/components/blog/BlogSidebar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { BlogCategory, Language } from "@/types/blog";
import { getSiteOrigin } from "@/lib/seo/site";

export default function BlogIndex() {
  const { t, i18n } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<
    BlogCategory | "all"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");

  const featuredPost = getFeaturedPost();

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
        <section className="relative py-12 md:py-16 bg-gradient-to-b from-champagne via-cream to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <p className="font-accent italic text-xl md:text-2xl text-primary mb-4">
                Discover Paris
              </p>
              <h1 className="text-4xl md:text-6xl font-display font-bold text-secondary mb-6">
                {t("blog.heroTitle") || "Travel Blog"}
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-6 leading-relaxed">
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
        <section className="py-6 md:py-7 border-b border-primary/10 bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
        </section>

        {/* Featured Post */}
        {selectedCategory === "all" && searchQuery === "" && featuredPost && (
          <section className="py-10 md:py-12 bg-gradient-to-b from-white to-champagne/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-8 md:mb-10">
                <p className="font-accent italic text-xl md:text-2xl text-primary mb-4">
                  Featured Story
                </p>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary">
                  {t("blog.featured") || "Featured Article"}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <BlogCard post={featuredPost} featured />
              </div>
            </div>
          </section>
        )}

        {/* All Posts with Sidebar */}
        <section className="py-12 md:py-14 bg-gradient-to-b from-champagne/30 via-white to-cream">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-10">
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-8">
                {filteredPosts.length === 0 ? (
                  <div className="text-center py-12">
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
        <section className="py-12 md:py-14 bg-gradient-to-b from-white to-champagne/30">
          <div className="container mx-auto px-4">
            <NewsletterCTA />
          </div>
        </section>
      </div>
    </>
  );
}
