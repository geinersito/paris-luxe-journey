import { CheckCircle, Languages } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const SIGNALS: Record<string, string[]> = {
  es: [
    "Meet & Greet incluido",
    "Seguimiento de vuelo",
    "Espera gratuita en aeropuerto",
    "Cancelación flexible",
  ],
  fr: [
    "Meet & Greet inclus",
    "Suivi de vol en temps réel",
    "Attente gratuite à l'aéroport",
    "Annulation flexible",
  ],
  en: [
    "Meet & Greet included",
    "Real-time flight tracking",
    "Free airport wait",
    "Flexible cancellation",
  ],
  pt: [
    "Meet & Greet incluído",
    "Monitorização de voo",
    "Espera gratuita no aeroporto",
    "Cancelação flexível",
  ],
};

const LANG_LABEL = "Español · English · Français · Português";

export default function HeroTrustBar() {
  const { language } = useLanguage();
  const signals = SIGNALS[language] ?? SIGNALS.en;

  return (
    <div className="bg-white border-b border-primary/10 py-3">
      <div className="container mx-auto px-4 max-w-7xl">
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {signals.map((label) => (
            <li
              key={label}
              className="flex items-center gap-1.5 text-sm text-secondary/80"
            >
              <CheckCircle
                className="h-3.5 w-3.5 text-primary shrink-0"
                aria-hidden="true"
              />
              {label}
            </li>
          ))}
          <li className="flex items-center gap-1.5 text-sm text-secondary/80">
            <Languages
              className="h-3.5 w-3.5 text-primary shrink-0"
              aria-hidden="true"
            />
            {LANG_LABEL}
          </li>
        </ul>
      </div>
    </div>
  );
}
