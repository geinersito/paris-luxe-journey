import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { excursions } from "@/data/excursions";
import { versaillesGuideContent } from "@/data/excursions/versailles-guide";
import { champagneGuideContent } from "@/data/excursions/champagne-guide";
import { loireGuideContent } from "@/data/excursions/loire-guide";
import type { Language } from "@/types/i18n";

const FEATURED_IDS = ["versailles-palace", "champagne", "loire-valley"];

export default function HomeExcursionsSection() {
  const { t, language } = useLanguage();
  const lang = language as Language;

  const guideLocale: Record<string, { title: string; intro: string }> = {
    "versailles-palace": versaillesGuideContent[lang],
    champagne: champagneGuideContent[lang],
    "loire-valley": loireGuideContent[lang],
  };

  const featured = FEATURED_IDS.map((id) =>
    excursions.find((e) => e.id === id),
  ).filter(Boolean) as (typeof excursions)[number][];

  return (
    <section className="bg-ref-bg py-16 md:py-24 border-b border-ref-ink/8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section header */}
        <div className="mb-12 md:mb-16">
          <p className="font-ui text-xs font-semibold uppercase tracking-[0.3em] text-ref-ink/40 mb-4">
            Île-de-France
          </p>
          <h2 className="font-editorial font-light text-3xl md:text-4xl text-ref-ink">
            {t.home.excursions.title}
          </h2>
        </div>

        {/* Alternating editorial blocks */}
        <div>
          {featured.map((excursion, index) => (
            <div
              key={excursion.id}
              className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center py-12 md:py-16 border-t border-ref-ink/8 first:border-t-0"
            >
              {/* Image */}
              <div
                className={`lg:col-span-7 aspect-[4/3] overflow-hidden bg-white ${
                  index % 2 !== 0 ? "lg:order-2" : ""
                }`}
              >
                <img
                  src={excursion.image}
                  alt={excursion.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
              {/* Text */}
              <div
                className={`lg:col-span-5 ${index % 2 !== 0 ? "lg:order-1" : ""}`}
              >
                <div className="flex items-center gap-2 font-ui text-xs text-ref-ink/40 mb-5">
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  <span>{excursion.duration}</span>
                </div>
                <h3 className="font-editorial font-light text-2xl md:text-3xl text-ref-ink mb-4">
                  {guideLocale[excursion.id]?.title ?? excursion.title}
                </h3>
                <p className="font-ui text-sm text-ref-ink/60 leading-relaxed mb-6">
                  {guideLocale[excursion.id]?.intro ?? excursion.description}
                </p>
                <div className="flex items-center gap-6">
                  <span className="font-ui font-semibold text-ref-ink text-sm">
                    {t.home.excursions.from} €{excursion.price}
                  </span>
                  <Link
                    to={excursion.link}
                    className="inline-flex items-center gap-2 font-ui text-sm font-semibold text-ref-navy border-b border-ref-navy/40 pb-0.5 hover:border-ref-navy transition-colors"
                  >
                    {t.excursions.viewDetails} →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* See all */}
        <div className="mt-8 pt-8 border-t border-ref-ink/8">
          <Link
            to="/excursions"
            className="inline-flex items-center gap-2 font-ui text-sm font-semibold text-ref-navy border-b border-ref-navy/40 pb-0.5 hover:border-ref-navy transition-colors"
          >
            {t.home.excursions.seeAll} →
          </Link>
        </div>
      </div>
    </section>
  );
}
