import { Link } from "react-router-dom";
import { BlogPostMeta } from "@/types/blog";
import { formatDate, getReadTimeText } from "@/lib/blog-utils";
import { getCategoryBySlug } from "@/data/blog/categories";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
  const { i18n } = useTranslation();
  const currentLang = i18n.language as "en" | "fr" | "es" | "pt";

  const category = getCategoryBySlug(post.category);

  return (
    <Card
      className={`group overflow-hidden glass-card-premium hover:shadow-luxury-hover transition-all duration-500 border-2 border-primary/20 hover:border-primary/40 hover:-translate-y-2 ${
        featured ? "md:col-span-2 md:row-span-2" : ""
      }`}
    >
      <Link to={`/blog/${post.category}/${post.slug}`} className="block">
        {/* Cover Image */}
        <div
          className={`relative overflow-hidden ${
            featured
              ? "aspect-[16/9] max-h-[320px] lg:max-h-[360px]"
              : "aspect-video"
          }`}
        >
          <img
            src={post.image.url}
            alt={post.image.alt[currentLang]}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Category Badge - Gold Style */}
          <div className="absolute top-4 left-4">
            <Badge className="bg-gradient-to-r from-primary to-primary/80 text-white border-0 shadow-lg">
              {category?.name[currentLang] || post.category}
            </Badge>
          </div>
          {/* Featured Badge */}
          {post.featured && (
            <div className="absolute top-4 right-4">
              <Badge className="bg-secondary/90 backdrop-blur-sm text-white border-0 shadow-lg">
                ⭐ Featured
              </Badge>
            </div>
          )}
        </div>

        <CardHeader className="relative">
          <h3
            className={`font-display font-bold text-secondary group-hover:text-primary transition-colors duration-300 ${
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

          {/* Meta Information - Premium Style */}
          <div className="flex flex-wrap items-center gap-4 mt-6 text-sm">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-gold-subtle rounded-lg">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-gray-700 font-medium">
                {formatDate(post.publishedAt, currentLang)}
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-gold-subtle rounded-lg">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-gray-700 font-medium">
                {getReadTimeText(post.readingTime, currentLang)}
              </span>
            </div>
          </div>

          {/* Author - Premium Style */}
          <div className="flex items-center gap-3 mt-6 pt-6 border-t border-primary/10">
            <div className="relative">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full border-2 border-white" />
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
          <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-4 transition-all duration-300">
            <span className="font-display">Read More</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
}
