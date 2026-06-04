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
  categoryFilter,
}: EventsFeedProps) {
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

  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );
  const upcomingEvents = events.filter(
    (e) => new Date(e.endAt ?? e.startAt) >= startOfToday,
  );
  const pastEvents = events.filter(
    (e) => new Date(e.endAt ?? e.startAt) < startOfToday,
  );
  const applyCategory = (arr: Event[]) =>
    !categoryFilter || categoryFilter === "all"
      ? arr
      : arr.filter((e) => e.category === categoryFilter);
  const displayEvents = applyCategory(upcomingEvents);
  const displayPastEvents = applyCategory(pastEvents);

  const generatedAt = new Date(eventsFeedData.generatedAt);
  const daysSinceUpdate = Math.max(
    0,
    Math.floor((now.getTime() - generatedAt.getTime()) / (1000 * 60 * 60 * 24)),
  );
  const isSingleFeatured = variant === "full" && displayEvents.length === 1;

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

  if (!displayEvents || displayEvents.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">{t("events.noEvents")}</p>
      </div>
    );
  }

  const renderSourceLink = (event: Event, alignClassName = "text-center") => (
    <p
      className={`text-xs text-muted-foreground/80 pt-2 border-t border-ref-ink/10 ${alignClassName}`}
    >
      <a
        href={event.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 hover:text-ref-navy transition-colors"
      >
        <span className="text-ref-navy font-semibold">✓</span>
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
          <h2 className="font-editorial font-light text-3xl md:text-4xl text-ref-ink mb-2">
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
        <div className="border border-ref-ink/8 overflow-hidden bg-white">
          {displayEvents.map((event) => (
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
                    <span className="absolute left-5 top-5 inline-flex items-center gap-1 bg-ref-navy text-white text-xs font-semibold px-2.5 py-1 shadow-lg">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      {t("events.featured")}
                    </span>
                  )}
                </div>
              )}

              <div className="flex flex-col justify-between gap-6 p-6 md:p-8 lg:p-10">
                <div className="space-y-5">
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-ref-ink/5">
                      <Calendar className="w-4 h-4 text-ref-navy" />
                      <span className="text-sm text-gray-700 font-medium">
                        {formatDate(event.startAt)}
                      </span>
                    </div>

                    {(event.venueName || event.district) && (
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-ref-ink/8 text-sm text-ref-ink/60">
                        <MapPin className="w-4 h-4 text-ref-navy flex-shrink-0" />
                        <span className="font-medium">
                          {event.venueName?.[language] || ""}
                          {event.venueName && event.district && " • "}
                          {event.district || ""}
                        </span>
                      </div>
                    )}

                    {event.category && (
                      <span className="inline-flex items-center bg-ref-navy text-white capitalize font-semibold text-xs px-3 py-1.5">
                        {t(`events.categories.${event.category}`, {
                          defaultValue: event.category,
                        })}
                      </span>
                    )}
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-editorial font-light text-2xl md:text-3xl text-ref-ink leading-tight">
                      {event.title[language]}
                    </h3>
                    <p className="text-base text-gray-600 leading-relaxed">
                      {event.description[language]}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-5 border-t border-ref-ink/8 pt-5 md:flex-row md:items-end md:justify-between">
                  <div className="space-y-3">
                    <p className="text-xs text-ref-ink/50">
                      {t("events.whatsappMicrocopy", {
                        defaultValue: "We reply fast on WhatsApp",
                      })}
                    </p>
                    {renderSourceLink(event, "text-left")}
                  </div>

                  <div className="flex w-full flex-col gap-3 md:w-auto md:min-w-[220px]">
                    <a
                      href={buildEventWhatsAppUrl(event, language, formatDate)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 font-ui font-semibold text-sm px-4 py-3 bg-ref-navy text-white hover:bg-ref-ink transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">
                        {t("events.getQuote", { defaultValue: "Get a Quote" })}
                      </span>
                    </a>
                    <a
                      href={event.eventUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 font-ui text-sm px-4 py-3 border border-ref-ink/20 text-ref-ink/70 hover:text-ref-ink hover:bg-ref-ink/5 transition-colors"
                    >
                      <span className="truncate">
                        {t("events.officialDetails", { defaultValue: "Official Details" })}
                      </span>
                      <ExternalLink className="w-4 h-4 flex-shrink-0" />
                    </a>
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
          {displayEvents.map((event) => (
            <div
              key={event.id}
              className="overflow-hidden bg-white border border-ref-ink/8 hover:border-ref-navy/20 transition-colors duration-200"
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
                    <span className="absolute top-4 right-4 inline-flex items-center gap-1 bg-ref-navy text-white text-xs font-semibold px-2.5 py-1 shadow-lg">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      {t("events.featured")}
                    </span>
                  )}
                </div>
              )}

              <div className="p-6">
                <h3 className="font-editorial font-light text-xl text-ref-ink line-clamp-2 mb-4">
                  {event.title[language]}
                </h3>

                {/* Date and Time - Premium Style */}
                <div className="flex items-center gap-2 px-3 py-1.5 bg-ref-ink/5 w-fit mb-3">
                  <Calendar className="w-4 h-4 text-ref-navy" />
                  <span className="text-sm text-gray-700 font-medium">
                    {formatDate(event.startAt)}
                  </span>
                </div>

                {/* Venue and District */}
                {(event.venueName || event.district) && (
                  <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-ref-navy flex-shrink-0" />
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
                  <span className="inline-flex items-center bg-ref-navy text-white capitalize font-semibold text-xs px-2.5 py-1">
                    {t(`events.categories.${event.category}`, {
                      defaultValue: event.category,
                    })}
                  </span>
                )}

                {/* Action Buttons - Contextual CTAs */}
                <div className="flex flex-col gap-3 pt-2">
                  <a
                    href={buildEventWhatsAppUrl(event, language, formatDate)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 font-ui font-semibold text-sm px-4 py-3 bg-ref-navy text-white hover:bg-ref-ink transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">
                      {t("events.getQuote", { defaultValue: "Get a Quote" })}
                    </span>
                  </a>
                  <a
                    href={event.eventUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 font-ui text-sm px-4 py-3 border border-ref-ink/20 text-ref-ink/70 hover:text-ref-ink hover:bg-ref-ink/5 transition-colors"
                  >
                    <span className="truncate">
                      {t("events.officialDetails", { defaultValue: "Official Details" })}
                    </span>
                    <ExternalLink className="w-4 h-4 flex-shrink-0" />
                  </a>
                </div>
                <p className="text-xs text-ref-ink/50 text-center">
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

      {/* Past events — collapsed by default */}
      {displayPastEvents.length > 0 && (
        <details className="group">
          <summary className="cursor-pointer list-none flex items-center gap-2 font-ui text-sm font-medium text-ref-ink/50 hover:text-ref-ink transition-colors duration-200 select-none py-2">
            <span className="w-4 h-4 border border-current rounded-full flex items-center justify-center text-xs group-open:rotate-90 transition-transform duration-200">
              ›
            </span>
            {t("events.recentlyEnded", { defaultValue: "Recently Ended" })} (
            {displayPastEvents.length})
          </summary>
          <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3 opacity-60">
            {displayPastEvents.map((event) => (
              <div
                key={event.id}
                className="overflow-hidden bg-white rounded-2xl border border-gray-200"
              >
                <div className="p-5">
                  <h4 className="text-base font-semibold text-secondary line-clamp-2 mb-2">
                    {event.title[language]}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{formatDate(event.startAt)}</span>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {event.description[language]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </details>
      )}
    </div>
  );
}
