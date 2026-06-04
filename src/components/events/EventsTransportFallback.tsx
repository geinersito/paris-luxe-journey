import { useTranslation } from "react-i18next";
import {
  Crown,
  Palette,
  Music,
  Trophy,
  Briefcase,
  MessageCircle,
  Mail,
} from "lucide-react";
import type { Language } from "@/types/events";
import {
  buildGenericWhatsAppUrl,
  buildGenericEmailUrl,
} from "@/lib/eventsPrefill";

const FALLBACK_CATEGORIES = [
  {
    titleKey: "events.fallbackCatFashion",
    descKey: "events.fallbackCatFashionDesc",
    Icon: Crown,
  },
  {
    titleKey: "events.fallbackCatExhibitions",
    descKey: "events.fallbackCatExhibitionsDesc",
    Icon: Palette,
  },
  {
    titleKey: "events.fallbackCatConcerts",
    descKey: "events.fallbackCatConcertsDesc",
    Icon: Music,
  },
  {
    titleKey: "events.fallbackCatSports",
    descKey: "events.fallbackCatSportsDesc",
    Icon: Trophy,
  },
  {
    titleKey: "events.fallbackCatBusiness",
    descKey: "events.fallbackCatBusinessDesc",
    Icon: Briefcase,
  },
] as const;

export function EventsTransportFallback() {
  const { t, i18n } = useTranslation();
  const language = i18n.language as Language;

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-editorial font-light text-ref-ink mb-4">
          {t("events.fallbackTitle")}
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          {t("events.fallbackSubtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FALLBACK_CATEGORIES.map(({ titleKey, descKey, Icon }) => (
          <div
            key={titleKey}
            className="bg-white border border-ref-ink/8 p-6 hover:border-ref-navy/20 transition-colors duration-200"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-ref-navy/8 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-ref-navy" />
              </div>
              <h3 className="font-editorial font-light text-ref-ink">
                {t(titleKey)}
              </h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              {t(descKey)}
            </p>
          </div>
        ))}
      </div>

      <div className="text-center space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={buildGenericWhatsAppUrl(language)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 font-ui font-semibold text-sm px-6 py-3 bg-ref-navy text-white hover:bg-ref-ink transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            {t("events.fallbackCta")}
          </a>
          <a
            href={buildGenericEmailUrl(language)}
            className="inline-flex items-center justify-center gap-2 font-ui font-semibold text-sm px-6 py-3 border border-ref-ink/20 text-ref-ink hover:bg-ref-ink/5 transition-colors"
          >
            <Mail className="w-5 h-5" />
            {t("events.fallbackCtaAlt")}
          </a>
        </div>
        <p className="text-sm text-muted-foreground">
          {t("events.fallbackDisclaimer")}
        </p>
      </div>
    </div>
  );
}
