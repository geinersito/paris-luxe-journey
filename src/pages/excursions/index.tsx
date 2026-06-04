import { useLanguage } from "@/contexts/LanguageContext";
import { ExcursionCard } from "@/components/excursions/ExcursionCard";
import { excursions } from "@/data/excursions";

export default function ExcursionsPage() {
  const { t } = useLanguage();

  const getLocalizedData = (id: string) => {
    switch (id) {
      case "versailles-palace":
        return {
          title: t.versailles.title,
          description: t.versailles.description,
          duration: t.versailles.duration,
        };
      case "loire-valley":
        return {
          title: t.loire.title,
          description: t.loire.description,
          duration: t.loire.duration,
        };
      case "champagne":
        return {
          title: t.champagne.title,
          description: t.champagne.description,
          duration: t.champagne.duration,
        };
      case "giverny-honfleur":
        return {
          title: t.giverny.title,
          description: t.giverny.description,
          duration: t.giverny.duration,
        };
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-editorial font-light text-ref-ink mb-3">
              {t.services.dayTrips.title}
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t.services.dayTrips.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {excursions.map((excursion) => {
              const loc = getLocalizedData(excursion.id);
              return (
                <ExcursionCard
                  key={excursion.id}
                  id={excursion.id}
                  title={loc?.title ?? excursion.title}
                  description={loc?.description ?? excursion.description}
                  image={excursion.image}
                  duration={loc?.duration ?? excursion.duration}
                  price={excursion.price}
                  link={excursion.link}
                />
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
