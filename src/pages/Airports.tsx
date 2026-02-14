import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Clock3, MapPin, PlaneTakeoff } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatParisDate } from "@/lib/datetime/paris";
import {
  AIRPORT_TERMINAL_GUIDE,
  TERMINAL_GUIDE_LAST_UPDATED_ISO,
  type AirportCode,
} from "@/data/airports/terminals";
import type { Language } from "@/types/i18n";

const SUPPORTED_LANGUAGES: Language[] = ["en", "fr", "es", "pt"];

const isSupportedLanguage = (value?: string): value is Language => {
  return SUPPORTED_LANGUAGES.includes(value as Language);
};

const Airports = () => {
  const { t, language, setLanguage } = useLanguage();
  const { lang } = useParams<{ lang?: string }>();
  const [selectedAirport, setSelectedAirport] = useState<AirportCode>("CDG");

  useEffect(() => {
    if (isSupportedLanguage(lang) && lang !== language) {
      setLanguage(lang);
    }
  }, [lang, language, setLanguage]);

  const selectedGuide = useMemo(() => {
    return (
      AIRPORT_TERMINAL_GUIDE.find(
        (guide) => guide.airport === selectedAirport,
      ) ?? AIRPORT_TERMINAL_GUIDE[0]
    );
  }, [selectedAirport]);

  const airportLabels: Record<AirportCode, string> = {
    CDG: t.airports.terminalGuide.airports.cdg,
    ORY: t.airports.terminalGuide.airports.ory,
    BVA: t.airports.terminalGuide.airports.bva,
  };

  const resolveTerminalToken = (token: string) => {
    const [terminalId, field] = token.split(".");
    if (!terminalId || !field) {
      return token;
    }

    const terminalText = t.airports.terminalGuide.terminals[terminalId];
    if (!terminalText) {
      return token;
    }

    if (field === "name") {
      return terminalText.name;
    }
    if (field === "airlinesHint") {
      return terminalText.airlinesHint ?? "";
    }
    if (field === "meetPoint") {
      return terminalText.meetPoint;
    }
    if (field === "transferTimeHint") {
      return terminalText.transferTimeHint ?? "";
    }

    return terminalText.tips[field] ?? token;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream via-white to-champagne/20">
      <section className="section-padding">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-secondary mb-3">
              {t.airports.terminalGuide.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.airports.terminalGuide.subtitle}
            </p>
            <p className="text-sm text-muted-foreground mt-3">
              {t.airports.terminalGuide.lastUpdated}{" "}
              {formatParisDate(TERMINAL_GUIDE_LAST_UPDATED_ISO)}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {(Object.keys(airportLabels) as AirportCode[]).map(
              (airportCode) => {
                const isActive = selectedAirport === airportCode;
                return (
                  <button
                    key={airportCode}
                    type="button"
                    onClick={() => setSelectedAirport(airportCode)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
                      isActive
                        ? "bg-primary text-white border-primary"
                        : "bg-white text-secondary border-primary/20 hover:border-primary/40"
                    }`}
                  >
                    <PlaneTakeoff className="w-4 h-4" />
                    <span className="text-sm font-semibold">
                      {airportLabels[airportCode]}
                    </span>
                  </button>
                );
              },
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-5">
            {selectedGuide.terminals.map((terminal) => (
              <Card
                key={`${selectedGuide.airport}-${terminal.code}`}
                className="p-5 border border-primary/15 bg-white/90 shadow-sm"
              >
                <div className="mb-4">
                  <h2 className="text-xl font-display font-semibold text-secondary">
                    {terminal.code} · {resolveTerminalToken(terminal.name)}
                  </h2>
                  {terminal.airlinesHint && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {resolveTerminalToken(terminal.airlinesHint)}
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-primary mt-0.5" />
                    <div className="text-sm">
                      <p className="font-semibold text-secondary">
                        {t.airports.terminalGuide.meetPoint}
                      </p>
                      <p className="text-muted-foreground">
                        {resolveTerminalToken(terminal.meetPoint)}
                      </p>
                    </div>
                  </div>

                  {terminal.transferTimeHint && (
                    <div className="flex items-start gap-2">
                      <Clock3 className="w-4 h-4 text-primary mt-0.5" />
                      <div className="text-sm">
                        <p className="font-semibold text-secondary">
                          {t.airports.terminalGuide.transferTimeHint}
                        </p>
                        <p className="text-muted-foreground">
                          {resolveTerminalToken(terminal.transferTimeHint)}
                        </p>
                      </div>
                    </div>
                  )}

                  <div>
                    <p className="font-semibold text-secondary text-sm mb-1">
                      {t.airports.terminalGuide.tips}
                    </p>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      {terminal.pickupNotes.map((noteToken) => (
                        <li key={`${terminal.code}-${noteToken}`}>
                          {resolveTerminalToken(noteToken)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <p className="text-sm text-muted-foreground mt-8">
            {t.airports.terminalGuide.disclaimer}
          </p>
        </div>
      </section>
    </div>
  );
};

export default Airports;
