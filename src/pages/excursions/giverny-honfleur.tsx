import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { DestinationHeader } from "@/components/destination/DestinationHeader";
import { DestinationNavigation } from "@/components/destination/DestinationNavigation";
import { DestinationContent } from "@/components/destination/DestinationContent";
import { DestinationSidebar } from "@/components/destination/DestinationSidebar";
import { TourCard } from "@/components/TourCard";
import { excursions } from "@/data/excursions";

export default function GivernyHonfleurPage() {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = React.useState("description");
  const [selectedTour, setSelectedTour] = React.useState<string | null>(null);

  const givernyData = t.giverny;
  const excursionData = excursions.find((e) => e.id === "giverny-honfleur");

  const navigationItems = [
    { id: "description", label: t.giverny.navigation.description },
    { id: "tours", label: t.giverny.navigation.tours },
    { id: "map", label: t.giverny.navigation.map },
    { id: "events", label: t.giverny.navigation.events },
    { id: "faq", label: t.giverny.navigation.faq },
  ];

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  const content = {
    description: (
      <div>
        <h3 className="text-2xl font-bold mb-4">{givernyData.title}</h3>
        <p className="mb-4">{givernyData.description}</p>
        <h4 className="text-xl font-semibold mb-2">Highlights:</h4>
        <ul className="list-disc list-inside mb-4">
          {givernyData.highlights.map((highlight, index) => (
            <li key={index}>{highlight}</li>
          ))}
        </ul>
        <div className="mt-6">
          <h4 className="text-xl font-semibold mb-2">Why Visit:</h4>
          <ul className="list-disc list-inside mb-4">
            {givernyData.whyVisit.map((reason, index) => (
              <li key={index}>{reason}</li>
            ))}
          </ul>
        </div>
      </div>
    ),
    tours: (
      <div>
        <h3 className="text-2xl font-bold mb-4">
          {t.giverny.navigation.tours}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {excursionData?.tours.map((tour) => (
            <TourCard
              key={tour.id}
              title={tour.name}
              description={`${t.giverny.title} - ${tour.duration}`}
              duration={tour.duration}
              price={tour.price}
              includes={tour.includes}
            />
          ))}
        </div>
      </div>
    ),
    map: (
      <div>
        <h3 className="text-2xl font-bold mb-4">{t.giverny.navigation.map}</h3>
        <p>Interactive map will be here.</p>
      </div>
    ),
    events: (
      <div>
        <h3 className="text-2xl font-bold mb-4">
          {t.giverny.navigation.events}
        </h3>
        <p>Upcoming events in Giverny and Honfleur.</p>
      </div>
    ),
    faq: (
      <div>
        <h3 className="text-2xl font-bold mb-4">{t.giverny.navigation.faq}</h3>
        <div className="space-y-4">
          <div>
            <h5 className="font-semibold mb-2">
              What is included in the tour?
            </h5>
            <p className="text-gray-600">
              All tours include private luxury transport, entry to Monet's House
              and Gardens, professional art historian guide, and gourmet lunch.
              Specific inclusions vary by tour package.
            </p>
          </div>
          <div>
            <h5 className="font-semibold mb-2">How long is the tour?</h5>
            <p className="text-gray-600">
              Tours range from 10 to 12 hours depending on the package selected
              and traffic conditions.
            </p>
          </div>
          <div>
            <h5 className="font-semibold mb-2">
              When is the best time to visit Giverny?
            </h5>
            <p className="text-gray-600">
              The gardens are most beautiful from April to October, with peak
              blooms in May and June. Monet's famous water lilies bloom from
              mid-June to September.
            </p>
          </div>
          <div>
            <h5 className="font-semibold mb-2">Is photography allowed?</h5>
            <p className="text-gray-600">
              Photography is allowed in the gardens but not inside Monet's
              house. Professional tripods require advance permission.
            </p>
          </div>
          <div>
            <h5 className="font-semibold mb-2">
              What is the cancellation policy?
            </h5>
            <p className="text-gray-600">
              Free cancellation up to 24 hours before the tour. Cancellations
              within 24 hours are subject to a fee.
            </p>
          </div>
        </div>
      </div>
    ),
  };

  return (
    <div className="min-h-screen bg-background">
      <DestinationHeader
        title={t.giverny.title}
        image="/images/giverny.jpg"
        distance={t.giverny.distance}
        duration={t.giverny.duration}
        currentPath="/excursions/giverny-honfleur"
      />

      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-3">
          <DestinationSidebar tours={content.tours}>
            <DestinationNavigation
              items={navigationItems}
              activeSection={activeSection}
              onSectionChange={handleSectionChange}
            />
          </DestinationSidebar>
        </div>

        <div className="col-span-12 lg:col-span-9">
          <DestinationContent activeSection={activeSection} content={content} />
        </div>
      </div>
    </div>
  );
}
