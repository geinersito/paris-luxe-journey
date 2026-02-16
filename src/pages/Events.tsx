import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { EventsFeed } from "@/components/events/EventsFeed";
import TrustSignals from "@/components/TrustSignals";
import { Sparkles, MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  buildGenericWhatsAppUrl,
  buildGenericEmailUrl,
} from "@/lib/eventsPrefill";
import { getSiteOrigin } from "@/lib/seo/site";
import { formatParisDate } from "@/lib/datetime/paris";
import eventsFeedData from "@/data/events/events-feed.json";

type EventsSectionId = "events-week" | "events-month";

export default function Events() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const language = i18n.language;
  const [activeSection, setActiveSection] =
    useState<EventsSectionId>("events-week");

  const siteOrigin = getSiteOrigin();
  const canonicalUrl = `${siteOrigin}/events`;
  const pageTitle =
    t("events.pageTitle") || "Events in Paris | Paris Luxe Journey";
  const pageDescription =
    t("events.pageDescription") ||
    "Discover the best events, concerts, exhibitions and activities happening in Paris this week and month. Book your luxury transfer to any event.";
  const lastUpdatedLabel = `${t("events.updatedOn")} ${formatParisDate(eventsFeedData.generatedAt)}`;

  useEffect(() => {
    const sectionIds: EventsSectionId[] = ["events-week", "events-month"];
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const topEntry = visibleEntries[0];
        if (!topEntry) return;

        setActiveSection(topEntry.target.id as EventsSectionId);
      },
      {
        root: null,
        threshold: [0.25, 0.4, 0.55],
        rootMargin: "-20% 0px -50% 0px",
      },
    );

    for (const sectionId of sectionIds) {
      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: EventsSectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const sectionButtons: Array<{ id: EventsSectionId; label: string }> = [
    { id: "events-week", label: t("events.thisWeek") || "This Week in Paris" },
    {
      id: "events-month",
      label: t("events.thisMonth") || "This Month in Paris",
    },
  ];

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageTitle,
    description: pageDescription,
    url: canonicalUrl,
    inLanguage: language,
    isPartOf: {
      "@type": "WebSite",
      name: "Paris Luxe Journey",
      url: siteOrigin,
    },
  };

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
        <meta property="og:image" content={`${siteOrigin}/og-image.jpg`} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={`${siteOrigin}/og-image.jpg`} />

        {/* JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(webPageJsonLd)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative pt-12 pb-8 md:pt-16 md:pb-10 lg:pt-20 lg:pb-12 bg-gradient-to-b from-champagne via-cream to-white">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="text-center max-w-4xl mx-auto mb-8 md:mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  {t("events.liveUpdates") || "Live Updates"}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-secondary mb-6">
                {t("events.heroTitle") || "Events in Paris"}
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                {t("events.heroSubtitle") ||
                  "Discover the best concerts, exhibitions, shows and cultural events happening in Paris. Book your luxury transfer to arrive in style."}
              </p>
              <p className="text-sm text-muted-foreground/90">
                {lastUpdatedLabel} ·{" "}
                {t("events.sourcesVerified") || "Official sources verified"}
              </p>
            </div>
          </div>
        </section>

        {/* Events Listing + Quick Navigation */}
        <section className="py-8 md:py-10 bg-gradient-to-b from-white via-champagne/30 to-cream">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)] gap-5 md:gap-6">
              <aside className="w-full">
                <div className="bg-white rounded-lg p-6 shadow-sm lg:sticky lg:top-24">
                  <h3 className="text-lg font-semibold mb-4">
                    {t("events.liveUpdates") || "Live Updates"}
                  </h3>

                  <div className="space-y-2">
                    {sectionButtons.map((section) => (
                      <button
                        key={section.id}
                        type="button"
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                          activeSection === section.id
                            ? "bg-primary text-white font-semibold shadow-md"
                            : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {section.label}
                      </button>
                    ))}
                  </div>
                </div>
              </aside>

              <div className="space-y-10 md:space-y-12">
                <article id="events-week" className="scroll-mt-24">
                  <div className="text-center mb-8 md:mb-10">
                    <p className="font-accent italic text-xl md:text-2xl text-primary mb-4">
                      {t("events.comingSoon") || "Coming Soon"}
                    </p>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary">
                      {t("events.thisWeek") || "This Week in Paris"}
                    </h2>
                  </div>

                  {/* Contextual CTAs */}
                  <div className="flex flex-col items-center gap-3 mb-6 sm:flex-row sm:justify-center">
                    <Button size="sm" className="silk-button" asChild>
                      <a
                        href={buildGenericWhatsAppUrl(language)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        {t("events.bookTransfer") || "Reservar transfer"}
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => navigate("/blog")}
                    >
                      {t("events.readGuides") || "Guías relacionadas"} →
                    </Button>
                  </div>

                  <EventsFeed range="week" variant="full" showHeader={false} />
                </article>

                <article id="events-month" className="scroll-mt-24">
                  <div className="text-center mb-8 md:mb-10">
                    <p className="font-accent italic text-xl md:text-2xl text-primary mb-4">
                      {t("events.planAhead") || "Plan Ahead"}
                    </p>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary">
                      {t("events.thisMonth") || "This Month in Paris"}
                    </h2>
                  </div>
                  <EventsFeed range="month" variant="full" showHeader={false} />
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Signals */}
        <section className="py-4 md:py-6 bg-white">
          <div className="container mx-auto px-4">
            <TrustSignals />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-10 md:py-12 bg-gradient-to-b from-white to-champagne/30">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary mb-4">
                {t("events.ctaTitle") || "Need a Ride to Your Event?"}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {t("events.ctaDescription") ||
                  "Tell us your event and we'll confirm availability, vehicle options and a fixed price."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="silk-button" asChild>
                  <a
                    href={buildGenericWhatsAppUrl(language)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    {t("events.ctaWhatsApp") || "Get a Quote on WhatsApp"}
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="button-outline-gold"
                  asChild
                >
                  <a href={buildGenericEmailUrl(language)}>
                    <Mail className="w-5 h-5 mr-2" />
                    {t("events.ctaEmail") || "Email Us"}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
