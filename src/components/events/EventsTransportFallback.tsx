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
import { Button } from "@/components/ui/button";
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
        <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary mb-4">
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
            className="bg-white rounded-2xl border border-primary/20 p-6 hover:border-primary/30 transition-colors duration-200"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-display font-bold text-secondary">
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
          <Button size="lg" className="silk-button" asChild>
            <a
              href={buildGenericWhatsAppUrl(language)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              {t("events.fallbackCta")}
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
              {t("events.fallbackCtaAlt")}
            </a>
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          {t("events.fallbackDisclaimer")}
        </p>
      </div>
    </div>
  );
}
