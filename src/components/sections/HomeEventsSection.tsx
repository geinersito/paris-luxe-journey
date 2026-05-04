import { Link } from "react-router-dom";
import { Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import eventsFeedData from "@/data/events/events-feed.json";
import type { Event, EventCategory, Language } from "@/types/events";

export default function HomeEventsSection() {
  const { t, language } = useLanguage();

  const now = new Date();
  const graceMs = 7 * 24 * 60 * 60 * 1000;

  const seenIds = new Set<string>();
  const events = [...eventsFeedData.thisWeek, ...eventsFeedData.thisMonth]
    .map((e) => ({ ...e, category: e.category as EventCategory }))
    .filter((e) => {
      if (seenIds.has(e.id)) return false;
      seenIds.add(e.id);
      const end = new Date(e.endAt ?? e.startAt);
      return end.getTime() >= now.getTime() - graceMs;
    })
    .sort(
      (a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime(),
    )
    .slice(0, 3) as (Event & { category: EventCategory })[];

  const localeMap: Record<Language, string> = {
    en: "en-US",
    es: "es-ES",
    fr: "fr-FR",
    pt: "pt-PT",
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString(localeMap[language], {
      month: "short",
      day: "numeric",
    });

  const formatDateRange = (startAt: string, endAt?: string) => {
    const start = formatDate(startAt);
    if (!endAt || endAt.slice(0, 10) === startAt.slice(0, 10)) return start;
    return `${start} – ${formatDate(endAt)}`;
  };

  return (
    <section className="section-padding bg-gradient-to-b from-white to-champagne/30">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-10">
          <p className="font-accent italic text-xl text-primary mb-2">
            Paris 2026
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary">
            {t.home.events.title}
          </h2>
        </div>

        {events.length > 0 ? (
          <>
            <div className="grid md:grid-cols-3 gap-6">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-2xl border border-primary/20 overflow-hidden shadow-sm hover:shadow-luxury hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative h-44 overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
                    {event.imageUrl && (
                      <img
                        src={event.imageUrl}
                        alt={event.title[language]}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    )}
                  </div>

                  <div className="p-5">
                    <h3 className="font-display font-bold text-secondary text-lg line-clamp-2 mb-3">
                      {event.title[language]}
                    </h3>

                    <div className="flex items-center gap-1.5 mb-2 text-sm text-gray-600">
                      <Calendar className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                      <span>{formatDateRange(event.startAt, event.endAt)}</span>
                    </div>

                    {(event.venueName || event.district) && (
                      <div className="flex items-center gap-1.5 mb-4 text-sm text-gray-600">
                        <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        <span className="line-clamp-1">
                          {event.venueName?.[language] || event.district}
                        </span>
                      </div>
                    )}

                    <Button asChild className="w-full silk-button text-sm">
                      <Link
                        to="/booking"
                        className="flex items-center justify-center gap-2"
                      >
                        <span>{t.hero.ctaPrimary}</span>
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                to="/events"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-200"
              >
                {t.home.events.seeAll}
              </Link>
            </div>
          </>
        ) : (
          <div className="max-w-2xl mx-auto rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/5 to-transparent p-8 text-center">
            <p className="text-gray-700 mb-5">{t.home.events.fallback}</p>
            <Button asChild className="silk-button">
              <Link to="/events">{t.home.events.seeAll}</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
