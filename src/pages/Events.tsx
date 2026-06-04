import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { EventsFeed } from "@/components/events/EventsFeed";
import { EventsTransportFallback } from "@/components/events/EventsTransportFallback";
import TrustSignals from "@/components/TrustSignals";
import {
  Sparkles,
  MessageCircle,
  Mail,
  Car,
  BadgeCheck,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import {
  buildGenericWhatsAppUrl,
  buildGenericEmailUrl,
} from "@/lib/eventsPrefill";
import { getSiteOrigin } from "@/lib/seo/site";
import { formatParisDate } from "@/lib/datetime/paris";
import eventsFeedData from "@/data/events/events-feed.json";
import type { Event, EventCategory } from "@/types/events";

function isFeedStale(): boolean {
  const now = new Date();
  const graceMs = 7 * 24 * 60 * 60 * 1000;
  const allEvents = [
    ...eventsFeedData.thisWeek,
    ...eventsFeedData.thisMonth,
  ].map((e) => ({ ...e, category: e.category as EventCategory }));
  return allEvents.every((e) => {
    const end = new Date(e.endAt ?? e.startAt);
    return end.getTime() < now.getTime() - graceMs;
  });
}

export default function Events() {
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  const feedIsStale = useMemo(() => isFeedStale(), []);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const weekThreshold = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d;
  }, []);

  const allWeekEventIds = useMemo(
    () => eventsFeedData.thisWeek.map((e) => e.id),
    [],
  );

  const weekQualifiedIds = useMemo(
    () =>
      eventsFeedData.thisWeek
        .filter((e) => new Date(e.startAt) <= weekThreshold)
        .map((e) => e.id),
    [weekThreshold],
  );

  const weekExcludeIds = useMemo(
    () => allWeekEventIds.filter((id) => !weekQualifiedIds.includes(id)),
    [allWeekEventIds, weekQualifiedIds],
  );

  const hasWeekEvents = weekQualifiedIds.length > 0;

  const siteOrigin = getSiteOrigin();
  const canonicalUrl = `${siteOrigin}/events`;
  const pageTitle =
    t("events.pageTitle") || "Events in Paris | Paris Elite Services";
  const pageDescription =
    t("events.pageDescription") ||
    "Discover the best events, concerts, exhibitions and activities happening in Paris this week and month. Book your luxury transfer to any event.";
  const lastUpdatedLabel = `${t("events.updatedOn")} ${formatParisDate(eventsFeedData.generatedAt)}`;

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageTitle,
    description: pageDescription,
    url: canonicalUrl,
    inLanguage: language,
    isPartOf: {
      "@type": "WebSite",
      name: "Paris Elite Services",
      url: siteOrigin,
    },
  };

  const uniqueEvents = useMemo(() => {
    const seen = new Set<string>();
    return [...eventsFeedData.thisWeek, ...eventsFeedData.thisMonth]
      .filter((e) => {
        if (seen.has(e.id)) return false;
        seen.add(e.id);
        return true;
      })
      .map((e) => ({ ...e, category: e.category as EventCategory }));
  }, []);

  const activeCategories = useMemo(() => {
    const cats = new Set(
      uniqueEvents
        .map((e) => e.category)
        .filter((c): c is EventCategory => !!c),
    );
    return ["all", ...cats];
  }, [uniqueEvents]);

  const eventsListJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: pageTitle,
      itemListElement: uniqueEvents.map((event, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Event",
          name: event.title.en,
          description: event.description.en.substring(0, 300),
          startDate: event.startAt,
          ...(event.endAt && { endDate: event.endAt }),
          eventStatus: "https://schema.org/EventScheduled",
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          url: event.eventUrl,
          ...(event.venueName || event.address
            ? {
                location: {
                  "@type": "Place",
                  name: event.venueName?.en ?? "",
                  ...(event.address && { address: event.address }),
                },
              }
            : {}),
          organizer: {
            "@type": "Organization",
            name: event.sourceName,
            url: event.sourceUrl,
          },
        },
      })),
    }),
    [uniqueEvents, pageTitle],
  );

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content="Paris events, concerts Paris, exhibitions Paris, Paris activities, events this week Paris, events this month Paris"
        />

        {/* Canonical */}
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={`${siteOrigin}/og-image.png`} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={`${siteOrigin}/og-image.png`} />

        {/* JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(webPageJsonLd)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(eventsListJsonLd)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section — wider banner treatment to reduce boxed/card feeling */}
        <section className="relative min-h-[380px] md:min-h-[420px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/images/library/excursions/hero/excursions-hero-paris-eiffel-1920x1080.jpg"
              alt="Events in Paris"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/45" />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 text-center">
            <div className="mx-auto max-w-5xl px-2 md:px-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 backdrop-blur-sm rounded-full mb-5">
                {feedIsStale ? (
                  <Car className="w-4 h-4 text-white" />
                ) : (
                  <Sparkles className="w-4 h-4 text-white" />
                )}
                <span className="text-sm font-medium text-white">
                  {feedIsStale
                    ? t("events.stalePill") || "Event Transport"
                    : t("events.liveUpdates") || "Live Updates"}
                </span>
              </div>

              <h1 className="font-editorial font-light text-4xl md:text-5xl lg:text-5xl text-white mb-4 leading-tight drop-shadow-2xl">
                {t("events.heroTitle") || "Events in Paris"}
              </h1>

              <p className="text-base md:text-lg text-white/95 mb-5 max-w-4xl mx-auto leading-relaxed">
                {feedIsStale
                  ? t("events.fallbackSubtitle") ||
                    "Plan luxury transport for any event in Paris — fashion shows, exhibitions, concerts, sports fixtures, and business conferences."
                  : t("events.heroSubtitle") ||
                    "Discover the best concerts, exhibitions, shows and cultural events happening in Paris. Book your luxury transfer to arrive in style."}
              </p>

              {/* Trust chips — keep strong horizontal rhythm before CTAs */}
              <div className="flex flex-wrap justify-center gap-2.5 mb-5">
                <div className="rounded-full border border-black/10 bg-white/90 px-5 py-2.5 shadow-sm backdrop-blur-sm flex items-center gap-2">
                  <BadgeCheck className="w-4 h-4 text-neutral-800" />
                  <span className="text-neutral-900 text-sm md:text-base font-semibold">
                    {t("events.chipChauffeur", {
                      defaultValue: "Licensed Chauffeur",
                    })}
                  </span>
                </div>
                <div className="rounded-full border border-black/10 bg-white/90 px-5 py-2.5 shadow-sm backdrop-blur-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-neutral-800" />
                  <span className="text-neutral-900 text-sm md:text-base font-semibold">
                    {t("events.chipVerified", {
                      defaultValue: "Official Sources Verified",
                    })}
                  </span>
                </div>
                <div className="rounded-full border border-black/10 bg-white/90 px-5 py-2.5 shadow-sm backdrop-blur-sm flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-neutral-800" />
                  <span className="text-neutral-900 text-sm md:text-base font-semibold">
                    {t("events.chipWhatsapp", {
                      defaultValue: "WhatsApp Support",
                    })}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
                <a
                  href={buildGenericWhatsAppUrl(language)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 font-ui font-semibold text-sm px-6 py-3 bg-white text-ref-navy hover:bg-ref-bg transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  {t("events.bookTransfer") || "Get a Ride Quote"}
                </a>
                <Link
                  to="/blog"
                  className="inline-flex items-center justify-center gap-2 font-ui font-semibold text-sm px-6 py-3 border border-white/40 text-white hover:bg-white/10 transition-colors"
                >
                  {t("events.readGuides") || "Read Travel Guides"}
                </Link>
              </div>

              {!feedIsStale && (
                <p className="mt-4 text-xs text-white/70">
                  {lastUpdatedLabel} ·{" "}
                  {t("events.sourcesVerified") || "Official sources verified"}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Editorial Intro */}
        {!feedIsStale && (
          <section className="py-5 bg-white border-b border-ref-ink/8">
            <div className="container mx-auto px-4">
              <p className="max-w-3xl mx-auto text-center text-base text-muted-foreground leading-relaxed">
                {t("events.editorialIntro") ||
                  "Each month, we curate major Paris events for travellers who want to plan their visit with confidence — from international sport and fashion to city-wide cultural moments. Every listing includes official details and a direct chauffeur quote request, so you can organise your arrival without friction."}
              </p>
            </div>
          </section>
        )}

        {/* Trust Signals — before listing, matching /excursions page rhythm */}
        {!feedIsStale && (
          <div className="py-6 md:py-8 bg-white">
            <div className="container mx-auto px-4">
              <TrustSignals />
            </div>
          </div>
        )}

        {/* Events Listing — full-width, no sidebar */}
        <section className="pt-6 pb-8 md:pt-8 md:pb-10 bg-ref-bg">
          <div className="container mx-auto px-4">
            {feedIsStale ? (
              <EventsTransportFallback />
            ) : (
              <>
                {/* Category filter pills */}
                <div className="flex flex-wrap gap-2 justify-center mb-8">
                  {activeCategories.map((cat) => (
                    <button
                      key={cat}
                      role="tab"
                      aria-selected={activeCategory === cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        activeCategory === cat
                          ? "bg-ref-navy text-white"
                          : "bg-white border border-ref-ink/15 text-ref-ink/70 hover:border-ref-navy/40 hover:text-ref-ink"
                      }`}
                    >
                      {cat === "all"
                        ? t("events.categories.all", { defaultValue: "All" })
                        : t(`events.categories.${cat}`, { defaultValue: cat })}
                    </button>
                  ))}
                </div>

                <div className="space-y-10 md:space-y-12">
                  <article id="events-week" className="scroll-mt-24">
                    <div className="text-center mb-4 md:mb-6">
                      <h2 className="font-editorial font-light text-3xl md:text-4xl text-ref-ink">
                        {t("events.thisWeek") || "This Week in Paris"}
                      </h2>
                    </div>
                    {hasWeekEvents ? (
                      <EventsFeed
                        range="week"
                        variant="full"
                        showHeader={false}
                        excludeIds={weekExcludeIds}
                        categoryFilter={activeCategory}
                      />
                    ) : (
                      <p className="text-center text-muted-foreground py-8 italic text-base">
                        No major events this week — see this month&apos;s
                        calendar below.
                      </p>
                    )}
                  </article>

                  <article id="events-month" className="scroll-mt-24">
                    <div className="text-center mb-4 md:mb-6">
                      <h2 className="font-editorial font-light text-3xl md:text-4xl text-ref-ink">
                        {t("events.thisMonth") || "This Month in Paris"}
                      </h2>
                    </div>
                    <EventsFeed
                      range="month"
                      variant="full"
                      showHeader={false}
                      excludeIds={weekQualifiedIds}
                      categoryFilter={activeCategory}
                    />
                  </article>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Trust Signals for stale/fallback state */}
        {feedIsStale && (
          <div className="py-6 md:py-8 bg-white">
            <div className="container mx-auto px-4">
              <TrustSignals />
            </div>
          </div>
        )}

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-ref-navy">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="font-editorial font-light text-3xl md:text-4xl text-white mb-4">
              {t("events.ctaTitle") || "Need a Ride to Your Event?"}
            </h2>
            <p className="font-ui text-sm text-white/60 mb-8 max-w-2xl mx-auto leading-relaxed">
              {t("events.ctaDescription") ||
                "Tell us your event and we'll confirm availability, vehicle options and a fixed price."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={buildGenericWhatsAppUrl(language)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 font-ui font-semibold text-sm px-6 py-3 bg-white text-ref-navy hover:bg-ref-bg transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                {t("events.ctaWhatsApp") || "Get a Quote on WhatsApp"}
              </a>
              <a
                href={buildGenericEmailUrl(language)}
                className="inline-flex items-center justify-center gap-2 font-ui font-semibold text-sm px-6 py-3 border border-white/30 text-white hover:bg-white/10 transition-colors"
              >
                <Mail className="w-4 h-4" />
                {t("events.ctaEmail") || "Email Us"}
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
