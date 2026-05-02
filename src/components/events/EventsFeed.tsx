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
import { buildEventWhatsAppUrl } from "@/lib/eventsPrefill";
import {
  formatParisDateWithLocale,
  formatParisDate,
} from "@/lib/datetime/paris";

export function EventsFeed({
  range,
  variant = "full",
  showHeader = true,
  excludeIds = [],
}: EventsFeedProps & { excludeIds?: string[] }) {
  const { t, i18n } = useTranslation();
  const language = i18n.language as Language;

  const now = new Date();
  const archiveGracePeriodMs = 7 * 24 * 60 * 60 * 1000;
  const events: Event[] = (
    range === "week" ? eventsFeedData.thisWeek : eventsFeedData.thisMonth
  )
    .map((event) => ({
      ...event,
      category: event.category as EventCategory,
    }))
    .filter((event) => {
      const eventEnd = new Date(event.endAt ?? event.startAt);
      return eventEnd.getTime() >= now.getTime() - archiveGracePeriodMs;
    })
    .sort(
      (a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime(),
    )
    .filter((event) => !excludeIds.includes(event.id));
  const generatedAt = new Date(eventsFeedData.generatedAt);
  const daysSinceUpdate = Math.max(
    0,
    Math.floor((now.getTime() - generatedAt.getTime()) / (1000 * 60 * 60 * 24)),
  );
  const isSingleFeatured = variant === "full" && events.length === 1;

  // Format date according to language
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };

    const localeMap = {
      en: "en-GB",
      es: "es-ES",
      fr: "fr-FR",
      pt: "pt-PT",
    };

    return formatParisDateWithLocale(dateString, localeMap[language], options);
  };

  if (!events || events.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">{t("events.noEvents")}</p>
      </div>
    );
  }

  const renderSourceLink = (event: Event, alignClassName = "text-center") => (
    <p
      className={`text-xs text-muted-foreground/80 pt-2 border-t border-primary/10 ${alignClassName}`}
    >
      <a
        href={event.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 hover:text-primary transition-colors"
      >
        <span className="text-primary font-semibold">✓</span>
        <span className="font-medium">{event.sourceName}</span>
        <ExternalLink className="w-3 h-3 opacity-60" />
      </a>
    </p>
  );

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
              {t("events.updatedOn")} {formatParisDate(generatedAt)}
            </p>
          )}
        </div>
      )}

      {isSingleFeatured ? (
        <div className="glass-card-premium overflow-hidden border-2 border-primary/20 shadow-luxury hover:shadow-luxury-hover transition-all duration-500">
          {events.map((event) => (
            <div
              key={event.id}
              className="grid overflow-hidden lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.25fr)]"
            >
              {event.imageUrl && (
                <div className="relative min-h-[260px] overflow-hidden bg-gray-100 lg:min-h-full">
                  <img
                    src={event.imageUrl}
                    alt={event.title[language]}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    width="900"
                    height="700"
                    onError={(e) => {
                      e.currentTarget.src =
                        "/images/library/events/event-placeholder-800x600.jpg";
                    }}
                  />

                  {event.isFeatured && (
                    <Badge className="absolute left-5 top-5 bg-gradient-to-r from-primary to-primary/80 text-white border-0 shadow-lg">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      {t("events.featured")}
                    </Badge>
                  )}
                </div>
              )}

              <div className="flex flex-col justify-between gap-6 p-6 md:p-8 lg:p-10">
                <div className="space-y-5">
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-gold-subtle rounded-lg">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="text-sm text-gray-700 font-medium">
                        {formatDate(event.startAt)}
                      </span>
                    </div>

                    {(event.venueName || event.district) && (
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-primary/10 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="font-medium">
                          {event.venueName?.[language] || ""}
                          {event.venueName && event.district && " • "}
                          {event.district || ""}
                        </span>
                      </div>
                    )}

                    {event.category && (
                      <Badge className="bg-primary/90 text-white capitalize font-semibold border-0 px-3 py-1.5">
                        {event.category}
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-secondary leading-tight">
                      {event.title[language]}
                    </h3>
                    <p className="text-base text-gray-600 leading-relaxed">
                      {event.description[language]}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-5 border-t border-primary/10 pt-5 md:flex-row md:items-end md:justify-between">
                  <div className="space-y-3">
                    <p className="text-xs text-primary/70">
                      {t("events.whatsappMicrocopy", {
                        defaultValue: "We reply fast on WhatsApp",
                      })}
                    </p>
                    {renderSourceLink(event, "text-left")}
                  </div>

                  <div className="flex w-full flex-col gap-3 md:w-auto md:min-w-[220px]">
                    <Button asChild className="w-full silk-button">
                      <a
                        href={buildEventWhatsAppUrl(
                          event,
                          language,
                          formatDate,
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 text-sm"
                      >
                        <MessageCircle className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">
                          {t("events.getQuote", {
                            defaultValue: "Get a Quote",
                          })}
                        </span>
                      </a>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full button-outline-gold"
                    >
                      <a
                        href={event.eventUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 text-sm"
                      >
                        <span className="truncate">
                          {t("events.officialDetails", {
                            defaultValue: "Official Details",
                          })}
                        </span>
                        <ExternalLink className="w-4 h-4 flex-shrink-0" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className={`grid gap-8 ${
            variant === "full"
              ? "md:grid-cols-2 lg:grid-cols-3"
              : "md:grid-cols-2"
          }`}
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
                      e.currentTarget.src =
                        "/images/library/events/event-placeholder-800x600.jpg";
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

                {/* Category Badge - High Contrast */}
                {event.category && (
                  <Badge className="bg-primary/90 text-white capitalize font-semibold border-0">
                    {event.category}
                  </Badge>
                )}

                {/* Action Buttons - Contextual CTAs */}
                <div className="flex flex-col gap-3 pt-2">
                  <Button asChild className="w-full silk-button">
                    <a
                      href={buildEventWhatsAppUrl(event, language, formatDate)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 text-sm"
                    >
                      <MessageCircle className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">
                        {t("events.getQuote", { defaultValue: "Get a Quote" })}
                      </span>
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full button-outline-gold"
                  >
                    <a
                      href={event.eventUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 text-sm"
                    >
                      <span className="truncate">
                        {t("events.officialDetails", {
                          defaultValue: "Official Details",
                        })}
                      </span>
                      <ExternalLink className="w-4 h-4 flex-shrink-0" />
                    </a>
                  </Button>
                </div>
                <p className="text-xs text-primary/70 text-center">
                  {t("events.whatsappMicrocopy", {
                    defaultValue: "We reply fast on WhatsApp",
                  })}
                </p>

                {/* Source — premium verified attribution */}
                {renderSourceLink(event)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
