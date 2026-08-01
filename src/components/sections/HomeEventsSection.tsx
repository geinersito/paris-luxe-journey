import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import eventsFeedData from "@/data/events/events-feed.json";
import type { Event, EventCategory, Language } from "@/types/events";
import { getEligibleEvents } from "@/lib/events/classify";

export default function HomeEventsSection() {
  const { t, language } = useLanguage();

  const now = new Date();

  const pool: Event[] = [
    ...eventsFeedData.thisWeek,
    ...eventsFeedData.thisMonth,
  ].map((e) => ({ ...e, category: e.category as EventCategory }));

  // Ended events must disappear from Home immediately — no grace period here,
  // unlike the "Recently Ended" collapsed section on /events.
  const events = getEligibleEvents(pool, now).slice(0, 3) as (Event & {
    category: EventCategory;
  })[];

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

  const [featured, ...rest] = events;

  return (
    <section className="bg-white py-16 md:py-24 border-b border-ref-ink/8">
      <div className="container mx-auto px-4 max-w-7xl">
        {featured ? (
          <>
            {/* Featured event — editorial 60/40 */}
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-12 md:mb-16">
              {/* Image — 7/12 */}
              <div className="lg:col-span-7 aspect-[4/3] lg:aspect-[16/10] overflow-hidden bg-ref-bg">
                {featured.imageUrl && (
                  <img
                    src={featured.imageUrl}
                    alt={featured.title[language]}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                )}
              </div>
              {/* Text — 5/12 */}
              <div className="lg:col-span-5">
                <p className="font-ui text-xs font-semibold uppercase tracking-[0.3em] text-ref-ink/40 mb-4">
                  Paris 2026
                </p>
                <h2 className="font-editorial font-light text-3xl md:text-4xl text-ref-ink mb-4">
                  {t.home.events.title}
                </h2>
                <h3 className="font-ui font-semibold text-ref-ink text-lg mb-2">
                  {featured.title[language]}
                </h3>
                <div className="flex items-center gap-2 font-ui text-sm text-ref-ink/50 mb-6">
                  <Calendar className="w-3.5 h-3.5 text-ref-navy shrink-0" />
                  <span>
                    {formatDateRange(featured.startAt, featured.endAt)}
                  </span>
                </div>
                <Link
                  to="/booking"
                  className="inline-flex items-center gap-2 font-ui font-semibold text-sm px-5 py-2.5 bg-ref-navy text-white hover:bg-ref-ink transition-colors"
                >
                  {t.hero.ctaPrimary}
                </Link>
              </div>
            </div>

            {/* Editorial list — remaining events */}
            {rest.length > 0 && (
              <div className="divide-y divide-ref-ink/8 mb-10">
                {rest.map((event, i) => (
                  <div key={event.id} className="flex items-center gap-6 py-5">
                    <span className="font-editorial text-3xl font-light text-ref-ink/15 leading-none shrink-0 w-8">
                      {String(i + 2).padStart(2, "0")}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-ui font-medium text-ref-ink text-sm truncate">
                        {event.title[language]}
                      </h3>
                      <p className="font-ui text-xs text-ref-ink/40 mt-0.5">
                        {formatDateRange(event.startAt, event.endAt)}
                      </p>
                    </div>
                    <Link
                      to="/booking"
                      className="font-ui text-xs font-semibold text-ref-navy border-b border-ref-navy/30 hover:border-ref-navy transition-colors shrink-0"
                    >
                      {t.hero.ctaPrimary} →
                    </Link>
                  </div>
                ))}
              </div>
            )}

            <Link
              to="/events"
              className="inline-flex items-center gap-2 font-ui text-sm font-semibold text-ref-navy border-b border-ref-navy/40 pb-0.5 hover:border-ref-navy transition-colors"
            >
              {t.home.events.seeAll} →
            </Link>
          </>
        ) : (
          /* Fallback — no upcoming events */
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <p className="font-ui text-xs font-semibold uppercase tracking-[0.3em] text-ref-ink/40 mb-4">
                Paris 2026
              </p>
              <h2 className="font-editorial font-light text-3xl md:text-4xl text-ref-ink mb-4">
                {t.home.events.title}
              </h2>
              <p className="font-ui text-sm text-ref-ink/60 leading-relaxed mb-6">
                {t.home.events.fallback}
              </p>
              <Link
                to="/events"
                className="inline-flex items-center gap-2 font-ui text-sm font-semibold text-ref-navy border-b border-ref-navy/40 pb-0.5 hover:border-ref-navy transition-colors"
              >
                {t.home.events.seeAll} →
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
