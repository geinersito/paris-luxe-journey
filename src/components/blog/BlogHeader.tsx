import { BlogPostMeta } from "@/types/blog";
import { formatDate, getReadTimeText } from "@/lib/blog-utils";
import { getCategoryBySlug } from "@/data/blog/categories";
import { Clock, Calendar, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { toast } from "@/hooks/use-toast";

interface BlogHeaderProps {
  post: BlogPostMeta;
}

export default function BlogHeader({ post }: BlogHeaderProps) {
  const { i18n } = useTranslation();
  const currentLang = i18n.language as "en" | "fr" | "es" | "pt";

  const category = getCategoryBySlug(post.category);

  const handleShare = async () => {
    const shareData = {
      title: post.title[currentLang],
      text: post.description[currentLang],
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link copied!",
          description: "The article link has been copied to your clipboard.",
        });
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <div className="relative">
      {/* Cover Image */}
      <div className="relative w-full aspect-[16/9] max-h-[420px] md:max-h-[500px] overflow-hidden rounded-2xl">
        <img
          src={post.image.url}
          alt={post.image.alt[currentLang]}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-8 md:pb-10">
            <div className="max-w-4xl">
              {/* Category Badge */}
              <Badge
                variant="secondary"
                className="mb-4 bg-white/90 backdrop-blur-sm"
              >
                {category?.name[currentLang] || post.category}
              </Badge>

              {/* Title */}
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                {post.title[currentLang]}
              </h1>

              {/* Excerpt */}
              <p className="text-lg md:text-xl text-white/90 mb-6 drop-shadow-md">
                {post.description[currentLang]}
              </p>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-white/80">
                {/* Author */}
                <div className="flex items-center gap-3">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white/50"
                  />
                  <div>
                    <p className="font-medium text-white">{post.author.name}</p>
                    <p className="text-sm text-white/70">
                      {post.author.role[currentLang]}
                    </p>
                  </div>
                </div>

                <div className="h-8 w-px bg-white/30" />

                {/* Date */}
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(post.publishedAt, currentLang)}</span>
                </div>

                {/* Reading Time */}
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{getReadTimeText(post.readingTime, currentLang)}</span>
                </div>

                {/* Share Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleShare}
                  className="ml-auto text-white hover:bg-white/20"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-4xl flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                #{tag.toLowerCase().replace(/\s+/g, "")}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
