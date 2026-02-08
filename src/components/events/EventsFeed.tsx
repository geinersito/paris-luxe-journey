import { useTranslation } from "react-i18next";
import type {
  Event,
  EventsFeedProps,
  Language,
  EventCategory,
} from "@/types/events";
import eventsFeedData from "@/data/events/events-feed.json";
import {
  Calendar,
  MapPin,
  ExternalLink,
  Star,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function EventsFeed({
  range,
  variant = "full",
  showHeader = true,
}: EventsFeedProps) {
  const { t, i18n } = useTranslation();
  const language = i18n.language as Language;

  const events: Event[] = (
    range === "week" ? eventsFeedData.thisWeek : eventsFeedData.thisMonth
  ).map((event) => ({
    ...event,
    category: event.category as EventCategory,
  }));
  const generatedAt = new Date(eventsFeedData.generatedAt);
  const now = new Date();
  const daysSinceUpdate = Math.floor(
    (now.getTime() - generatedAt.getTime()) / (1000 * 60 * 60 * 24),
  );

  // Format date according to language
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };

    const localeMap = {
      en: "en-US",
      es: "es-ES",
      fr: "fr-FR",
      pt: "pt-PT",
    };

    return date.toLocaleDateString(localeMap[language], options);
  };

  if (!events || events.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">{t("events.noEvents")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Header - Premium Style */}
      {showHeader && (
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary mb-2">
            {range === "week" ? t("events.thisWeek") : t("events.thisMonth")}
          </h2>
          {daysSinceUpdate > 14 && (
            <p className="text-sm text-gray-600 mt-2">
              {t("events.updatedOn")} {generatedAt.toLocaleDateString()}
            </p>
          )}
        </div>
      )}

      {/* Events Grid */}
      <div
        className={`grid gap-8 ${variant === "full" ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2"}`}
      >
        {events.map((event) => (
          <div
            key={event.id}
            className="overflow-hidden bg-white rounded-2xl border border-primary/20 hover:border-primary/30 transition-colors duration-200"
            style={{
              boxShadow:
                "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
              WebkitFontSmoothing: "antialiased",
            }}
          >
            {/* Event Image */}
            {event.imageUrl && (
              <div className="relative h-56 overflow-hidden bg-gray-100">
                <img
                  src={event.imageUrl}
                  alt={event.title[language]}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width="600"
                  height="400"
                  onError={(e) => {
                    // Fallback to placeholder if image fails to load
                    e.currentTarget.src = "/images/placeholder-event.jpg";
                  }}
                />

                {event.isFeatured && (
                  <Badge className="absolute top-4 right-4 bg-gradient-to-r from-primary to-primary/80 text-white border-0 shadow-lg">
                    <Star className="w-3 h-3 mr-1 fill-current" />
                    {t("events.featured")}
                  </Badge>
                )}
              </div>
            )}

            <div className="p-6">
              <h3 className="text-xl font-display font-bold text-secondary line-clamp-2 mb-4">
                {event.title[language]}
              </h3>

              {/* Date and Time - Premium Style */}
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-gold-subtle rounded-lg w-fit mb-3">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="text-sm text-gray-700 font-medium">
                  {formatDate(event.startAt)}
                </span>
              </div>

              {/* Venue and District */}
              {(event.venueName || event.district) && (
                <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="font-medium">
                    {event.venueName?.[language] || ""}
                    {event.venueName && event.district && " • "}
                    {event.district || ""}
                  </span>
                </div>
              )}
            </div>

            <div className="px-6 pb-6 space-y-4">
              <p className="line-clamp-3 text-gray-600 leading-relaxed text-sm">
                {event.description[language]}
              </p>

              {/* Category Badge - Gold Style with High Contrast */}
              {event.category && (
                <Badge
                  className="bg-gradient-to-r from-primary/20 to-primary/15 border border-primary/30 capitalize font-semibold"
                  style={{ color: "#1F2D42" }}
                >
                  {event.category}
                </Badge>
              )}

              {/* Action Buttons - Contextual CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button asChild className="flex-1 silk-button">
                  <a
                    href={`https://wa.me/33668251102?text=${encodeURIComponent(
                      `Hi, I'm interested in a ride to: ${event.title[language]}${event.venueName?.[language] ? ` at ${event.venueName[language]}` : ""}${event.startAt ? ` on ${formatDate(event.startAt)}` : ""}. Can you help me with a quote?`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    {t("events.getQuote") || "Get a Quote"}
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="flex-1 button-outline-gold"
                >
                  <a
                    href={event.eventUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    {t("events.officialDetails")}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>
              <p className="text-xs text-primary/70 text-center">
                {t("events.whatsappMicrocopy") || "We reply fast on WhatsApp"}
              </p>

              {/* Source */}
              <p className="text-xs text-gray-500 text-center pt-2 border-t border-primary/10">
                {t("events.source")}:{" "}
                <span className="font-medium text-gray-700">
                  {event.sourceName}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
