import { Link } from "react-router-dom";
import { BlogPostMeta } from "@/types/blog";
import { formatDate, getReadTimeText } from "@/lib/blog-utils";
import { getCategoryBySlug } from "@/data/blog/categories";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useTranslation } from "react-i18next";

interface BlogCardProps {
  post: BlogPostMeta;
  featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language as "en" | "fr" | "es" | "pt";

  const category = getCategoryBySlug(post.category);

  return (
    <Card
      className={`group overflow-hidden border border-ref-ink/8 bg-white hover:border-ref-navy/20 transition-colors duration-300 ${
        featured ? "md:col-span-2 md:row-span-2" : ""
      }`}
    >
      <Link to={`/blog/${post.category}/${post.slug}`} className="block">
        {/* Cover Image */}
        <div className="relative overflow-hidden aspect-video">
          <img
            src={post.image.url}
            alt={post.image.alt[currentLang]}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center bg-ref-navy text-white text-xs font-semibold px-2.5 py-1 shadow-sm">
              {category?.name[currentLang] || post.category}
            </span>
          </div>
          {/* Featured Badge */}
          {post.featured && (
            <div className="absolute top-4 right-4">
              <span className="inline-flex items-center bg-ref-ink/80 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 shadow-sm">
                ⭐ Featured
              </span>
            </div>
          )}
        </div>

        <CardHeader className="relative">
          <h3
            className={`font-editorial font-light text-ref-ink group-hover:text-ref-navy transition-colors duration-300 ${
              featured ? "text-2xl md:text-3xl" : "text-xl"
            }`}
          >
            {post.title[currentLang]}
          </h3>
        </CardHeader>

        <CardContent>
          <p
            className={`text-gray-600 leading-relaxed ${
              featured ? "text-base md:text-lg" : "text-sm"
            }`}
          >
            {post.description[currentLang]}
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 mt-6 text-sm">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-ref-ink/5">
              <Calendar className="w-4 h-4 text-ref-navy" />
              <span className="text-gray-700 font-medium">
                {formatDate(post.publishedAt, currentLang)}
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-ref-ink/5">
              <Clock className="w-4 h-4 text-ref-navy" />
              <span className="text-gray-700 font-medium">
                {getReadTimeText(post.readingTime, currentLang)}
              </span>
            </div>
          </div>

          {/* Author */}
          <div className="flex items-center gap-3 mt-6 pt-6 border-t border-ref-ink/10">
            <div className="relative">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-ref-ink/10"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-ref-navy rounded-full border-2 border-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-secondary">
                {post.author.name}
              </p>
              <p className="text-xs text-gray-600 font-medium">
                {post.author.role[currentLang]}
              </p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-0">
          <div className="flex items-center gap-2 text-ref-navy font-semibold group-hover:gap-4 transition-all duration-300">
            <span className="font-editorial font-light">{t("blog.readMore")}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
}
