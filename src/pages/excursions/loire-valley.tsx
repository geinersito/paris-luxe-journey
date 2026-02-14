import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { DestinationHeader } from "@/components/destination/DestinationHeader";
import { DestinationNavigation } from "@/components/destination/DestinationNavigation";
import { DestinationContent } from "@/components/destination/DestinationContent";
import { DestinationSidebar } from "@/components/destination/DestinationSidebar";
import { TourCard } from "@/components/TourCard";
import { excursions } from "@/data/excursions";

export default function LoireValleyPage() {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = React.useState("description");
  const [selectedTour, setSelectedTour] = React.useState<string | null>(null);

  const loireData = t.loire;
  const excursionData = excursions.find((e) => e.id === "loire-valley");

  const navigationItems = [
    { id: "description", label: t.loire.navigation.description },
    { id: "tours", label: t.loire.navigation.tours },
    { id: "map", label: t.loire.navigation.map },
    { id: "events", label: t.loire.navigation.events },
    { id: "faq", label: t.loire.navigation.faq },
  ];

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  const content = {
    description: (
      <div>
        <h3 className="text-2xl font-bold mb-4">{loireData.title}</h3>
        <p className="mb-4">{loireData.description}</p>
        <h4 className="text-xl font-semibold mb-2">Highlights:</h4>
        <ul className="list-disc list-inside mb-4">
          {loireData.highlights.map((highlight, index) => (
            <li key={index}>{highlight}</li>
          ))}
        </ul>
        <div className="mt-6">
          <h4 className="text-xl font-semibold mb-2">Why Visit:</h4>
          <ul className="list-disc list-inside mb-4">
            {loireData.whyVisit.map((reason, index) => (
              <li key={index}>{reason}</li>
            ))}
          </ul>
        </div>
      </div>
    ),
    tours: (
      <div>
        <h3 className="text-2xl font-bold mb-4">{t.loire.navigation.tours}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {excursionData?.tours.map((tour) => (
            <TourCard
              key={tour.id}
              title={tour.name}
              description={`${t.loire.title} - ${tour.duration}`}
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
        <h3 className="text-2xl font-bold mb-4">{t.loire.navigation.map}</h3>
        <p>Interactive map will be here.</p>
      </div>
    ),
    events: (
      <div>
        <h3 className="text-2xl font-bold mb-4">{t.loire.navigation.events}</h3>
        <p>Upcoming events in Loire Valley.</p>
      </div>
    ),
    faq: (
      <div>
        <h3 className="text-2xl font-bold mb-4">{t.loire.navigation.faq}</h3>
        <div className="space-y-4">
          <div>
            <h5 className="font-semibold mb-2">
              What is included in the tour?
            </h5>
            <p className="text-gray-600">
              All tours include private luxury transport, entry tickets to
              castles, professional guide, and gourmet lunch. Specific
              inclusions vary by tour package.
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
            <h5 className="font-semibold mb-2">Which castles will we visit?</h5>
            <p className="text-gray-600">
              The classic tour includes Château de Chambord and Château de
              Chenonceau, two of the most iconic Loire Valley castles.
            </p>
          </div>
          <div>
            <h5 className="font-semibold mb-2">
              Can we customize the itinerary?
            </h5>
            <p className="text-gray-600">
              Yes, we offer fully customizable private tours. Contact us to
              discuss your preferences.
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
        title={t.loire.title}
        image="/images/loire-valley.jpg"
        distance={t.loire.distance}
        duration={t.loire.duration}
        currentPath="/excursions/loire-valley"
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
