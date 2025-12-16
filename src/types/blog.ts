// Blog post types and interfaces

export type Language = "en" | "es" | "fr" | "pt";

export type BlogCategory = "transport" | "guides" | "tips" | "culture";

export interface LocalizedString {
  en: string;
  es: string;
  fr: string;
  pt: string;
}

export interface BlogAuthor {
  name: string;
  role: LocalizedString;
  avatar: string;
  bio: LocalizedString;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: LocalizedString;
  description: LocalizedString;
  category: BlogCategory;
  author: BlogAuthor;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  featured: boolean;
  image: {
    url: string;
    alt: LocalizedString;
  };
  tags: string[];
  content: LocalizedString;
  seo: {
    metaTitle: LocalizedString;
    metaDescription: LocalizedString;
    keywords: string[];
  };
}

export interface BlogPostMeta {
  id: string;
  slug: string;
  title: LocalizedString;
  description: LocalizedString;
  category: BlogCategory;
  author: {
    name: string;
    role: LocalizedString;
    bio: LocalizedString;
    avatar: string;
  };
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  featured: boolean;
  image: {
    url: string;
    alt: LocalizedString;
  };
  tags: string[];
  seo: {
    metaTitle: LocalizedString;
    metaDescription: LocalizedString;
    keywords: string[];
  };
}

export interface CategoryMeta {
  id: BlogCategory;
  slug: string;
  name: LocalizedString;
  description: LocalizedString;
  icon: string; // Lucide icon name
  seo: {
    metaTitle: LocalizedString;
    metaDescription: LocalizedString;
  };
}

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
  children?: TableOfContentsItem[];
}

export interface BlogFilters {
  category?: BlogCategory;
  tag?: string;
  search?: string;
}

export interface BlogPagination {
  currentPage: number;
  totalPages: number;
  postsPerPage: number;
  totalPosts: number;
}
