import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { DestinationHeader } from "@/components/destination/DestinationHeader";
import { DestinationNavigation } from "@/components/destination/DestinationNavigation";
import { DestinationContent } from "@/components/destination/DestinationContent";
import { DestinationSidebar } from "@/components/destination/DestinationSidebar";
import { TourCard } from "@/components/TourCard";
import { excursions } from "@/data/excursions";

export default function ChampagnePage() {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = React.useState("description");
  const [selectedTour, setSelectedTour] = React.useState<string | null>(null);

  const champagneData = t.champagne;
  const excursionData = excursions.find((e) => e.id === "champagne");

  const navigationItems = [
    { id: "description", label: t.champagne.navigation.description },
    { id: "tours", label: t.champagne.navigation.tours },
    { id: "map", label: t.champagne.navigation.map },
    { id: "events", label: t.champagne.navigation.events },
    { id: "faq", label: t.champagne.navigation.faq },
  ];

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  const content = {
    description: (
      <div>
        <h3 className="text-2xl font-bold mb-4">{champagneData.title}</h3>
        <p className="mb-4">{champagneData.description}</p>
        <h4 className="text-xl font-semibold mb-2">Highlights:</h4>
        <ul className="list-disc list-inside mb-4">
          {champagneData.highlights.map((highlight, index) => (
            <li key={index}>{highlight}</li>
          ))}
        </ul>
        <div className="mt-6">
          <h4 className="text-xl font-semibold mb-2">Why Visit:</h4>
          <ul className="list-disc list-inside mb-4">
            {champagneData.whyVisit.map((reason, index) => (
              <li key={index}>{reason}</li>
            ))}
          </ul>
        </div>
      </div>
    ),
    tours: (
      <div>
        <h3 className="text-2xl font-bold mb-4">
          {t.champagne.navigation.tours}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {excursionData?.tours.map((tour) => (
            <TourCard
              key={tour.id}
              title={tour.name}
              description={`${t.champagne.title} - ${tour.duration}`}
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
        <h3 className="text-2xl font-bold mb-4">
          {t.champagne.navigation.map}
        </h3>
        <p>Interactive map will be here.</p>
      </div>
    ),
    events: (
      <div>
        <h3 className="text-2xl font-bold mb-4">
          {t.champagne.navigation.events}
        </h3>
        <p>Upcoming events in Champagne region.</p>
      </div>
    ),
    faq: (
      <div>
        <h3 className="text-2xl font-bold mb-4">
          {t.champagne.navigation.faq}
        </h3>
        <div className="space-y-4">
          <div>
            <h5 className="font-semibold mb-2">
              What is included in the tour?
            </h5>
            <p className="text-gray-600">
              All tours include private luxury transport, champagne house
              visits, premium tastings, professional guide, and gourmet lunch.
              Specific inclusions vary by tour package.
            </p>
          </div>
          <div>
            <h5 className="font-semibold mb-2">How long is the tour?</h5>
            <p className="text-gray-600">
              Tours range from 8 to 10 hours depending on the package selected
              and traffic conditions.
            </p>
          </div>
          <div>
            <h5 className="font-semibold mb-2">
              Which champagne houses will we visit?
            </h5>
            <p className="text-gray-600">
              Visits typically include prestigious houses like Moët & Chandon,
              Veuve Clicquot, or Dom Pérignon, depending on availability and
              your preferences.
            </p>
          </div>
          <div>
            <h5 className="font-semibold mb-2">
              Do I need to book champagne house visits in advance?
            </h5>
            <p className="text-gray-600">
              We handle all reservations for you. Please book your tour at least
              48 hours in advance to secure champagne house visits.
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
        title={t.champagne.title}
        image="/images/champagne.jpg"
        distance={t.champagne.distance}
        duration={t.champagne.duration}
        currentPath="/excursions/champagne"
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
