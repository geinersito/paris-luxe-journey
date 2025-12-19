import type { BlogPostMeta, Language } from "@/types/blog";
import { getCategoryBySlug } from "@/data/blog/categories";

interface JsonLdArticle {
  "@context": string;
  "@type": string;
  headline: string;
  description: string;
  image: string | string[];
  datePublished: string;
  dateModified: string;
  author: {
    "@type": string;
    name: string;
    url?: string;
  };
  publisher: {
    "@type": string;
    name: string;
    logo: {
      "@type": string;
      url: string;
    };
  };
  mainEntityOfPage: {
    "@type": string;
    "@id": string;
  };
  articleSection?: string;
  keywords?: string;
  inLanguage: string;
}

interface JsonLdBreadcrumb {
  "@context": string;
  "@type": string;
  itemListElement: Array<{
    "@type": string;
    position: number;
    name: string;
    item?: string;
  }>;
}

interface JsonLdWebsite {
  "@context": string;
  "@type": string;
  name: string;
  url: string;
  description: string;
  potentialAction: {
    "@type": string;
    target: {
      "@type": string;
      urlTemplate: string;
    };
    "query-input": string;
  };
}

/**
 * Generate JSON-LD structured data for a blog article
 */
export function generateArticleJsonLd(
  post: BlogPostMeta,
  lang: Language,
  url: string,
): JsonLdArticle {
  const category = getCategoryBySlug(post.category);

  // Handle keywords - BlogPostMeta.seo.keywords is always string[]
  const keywords: string = post.seo.keywords ? post.seo.keywords.join(', ') : ''

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title[lang],
    description: post.description[lang],
    image: post.image.url,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: "Paris Luxe Journey",
      logo: {
        "@type": "ImageObject",
        url: "https://parisluxejourney.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    articleSection: category?.name[lang],
    keywords,
    inLanguage: lang,
  };
}

/**
 * Generate JSON-LD breadcrumb structured data
 */
export function generateBreadcrumbJsonLd(
  items: Array<{ name: string; url?: string }>,
): JsonLdBreadcrumb {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.url && { item: item.url }),
    })),
  };
}

/**
 * Generate JSON-LD website structured data with search action
 */
export function generateWebsiteJsonLd(): JsonLdWebsite {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Paris Luxe Journey",
    url: "https://parisluxejourney.com",
    description: "Premium airport transfer and travel services in Paris",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          "https://parisluxejourney.com/blog?search={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Convert JSON-LD object to script tag string
 */
export function jsonLdToScriptTag(jsonLd: object): string {
  return JSON.stringify(jsonLd);
}
