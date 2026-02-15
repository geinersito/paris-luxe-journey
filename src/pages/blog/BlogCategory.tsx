import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { getCategoryBySlug, isValidCategory } from "@/data/blog/categories";
import { getPostsByCategory } from "@/data/blog/posts.meta";
import { getSiteOrigin } from "@/lib/seo/site";
import BlogCard from "@/components/blog/BlogCard";
import Breadcrumb from "@/components/blog/Breadcrumb";
import NewsletterCTA from "@/components/blog/NewsletterCTA";
import BlogSidebar from "@/components/blog/BlogSidebar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import * as Icons from "lucide-react";

export default function BlogCategory() {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language as "en" | "es" | "fr" | "pt";
  const [searchQuery, setSearchQuery] = useState("");

  // Validate category
  if (!category || !isValidCategory(category)) {
    navigate("/blog/404", { replace: true });
    return null;
  }

  const categoryMeta = getCategoryBySlug(category)!;
  const allPosts = getPostsByCategory(category);

  // Filter posts by search query
  const filteredPosts = allPosts.filter((post) => {
    if (searchQuery === "") return true;
    const query = searchQuery.toLowerCase();
    return (
      post.title[currentLang].toLowerCase().includes(query) ||
      post.description[currentLang].toLowerCase().includes(query) ||
      post.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = Icons[categoryMeta.icon as keyof typeof Icons] as any;

  const breadcrumbItems = [
    { label: t("blog.title") || "Blog", href: "/blog" },
    { label: categoryMeta.name[currentLang] },
  ];

  const siteOrigin = getSiteOrigin();
  const canonicalUrl = `${siteOrigin}/blog/${category}`;

  return (
    <>
      <Helmet>
        <title>{categoryMeta.seo.metaTitle[currentLang]}</title>
        <meta
          name="description"
          content={categoryMeta.seo.metaDescription[currentLang]}
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content={categoryMeta.seo.metaTitle[currentLang]}
        />
        <meta
          property="og:description"
          content={categoryMeta.seo.metaDescription[currentLang]}
        />
        <meta property="og:type" content="website" />

        {/* Canonical URL */}
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 via-background to-background py-12 md:py-16">
          <div className="container mx-auto px-4">
            {/* Breadcrumb */}
            <Breadcrumb items={breadcrumbItems} />

            <div className="max-w-3xl mx-auto text-center mt-6">
              {/* Category Icon */}
              {IconComponent && (
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                  <IconComponent className="w-8 h-8 text-primary" />
                </div>
              )}

              {/* Category Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-5">
                {categoryMeta.name[currentLang]}
              </h1>

              {/* Category Description */}
              <p className="text-lg md:text-xl text-muted-foreground mb-6">
                {categoryMeta.description[currentLang]}
              </p>

              {/* Search Bar */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={
                    t("blog.searchInCategory") ||
                    `Search in ${categoryMeta.name[currentLang]}...`
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Post Count */}
              <p className="text-sm text-muted-foreground mt-4">
                {filteredPosts.length}{" "}
                {filteredPosts.length === 1
                  ? t("blog.article") || "article"
                  : t("blog.articles") || "articles"}
              </p>
            </div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="py-12 md:py-14">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8">
                {filteredPosts.length === 0 ? (
                  <div className="text-center py-16">
                    <p className="text-muted-foreground text-lg">
                      {t("blog.noArticlesFound") ||
                        "No articles found. Try a different search term."}
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

              <div className="lg:col-span-4">
                <div className="sticky top-24">
                  <BlogSidebar />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <NewsletterCTA />
          </div>
        </section>
      </div>
    </>
  );
}
