import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { DestinationHeader } from '@/components/destination/DestinationHeader';
import { DestinationNavigation } from '@/components/destination/DestinationNavigation';
import { DestinationContent } from '@/components/destination/DestinationContent';
import { DestinationSidebar } from '@/components/destination/DestinationSidebar';
import { TourCard } from '@/components/TourCard';

export default function VersaillesPage() {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = React.useState("description");

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  const tours = [
    {
      id: "versailles-tour-1",
      name: "Guided Tour of Versailles Palace",
      duration: "4 hours",
      price: 250,
      includes: ["Entry tickets", "Guided tour", "Transportation"],
    },
    {
      id: "versailles-tour-2",
      name: "Versailles Gardens and Marie Antoinette's Estate",
      duration: "6 hours",
      price: 350,
      includes: ["Entry tickets", "Transportation", "Audio guide"],
    },
    {
      id: "versailles-tour-3",
      name: "Full Day Versailles Experience",
      duration: "8 hours",
      price: 450,
      includes: ["Entry tickets", "Guided tour", "Lunch", "Transportation"],
    },
  ];

  const navigationItems = [
    { id: "description", label: t.versailles.navigation.description },
    { id: "tours", label: t.versailles.navigation.tours },
    { id: "map", label: t.versailles.navigation.map },
    { id: "events", label: t.versailles.navigation.events },
    { id: "faq", label: t.versailles.navigation.faq },
  ];

  const content = {
    description: (
      <div>
        <h3 className="text-2xl font-bold mb-4">{t.versailles.title}</h3>
        <p className="mb-4">{t.versailles.description}</p>
        <h4 className="text-xl font-semibold mb-2">Highlights:</h4>
        <ul className="list-disc list-inside mb-4">
          {t.versailles.highlights.map((highlight, index) => (
            <li key={index}>{highlight}</li>
          ))}
        </ul>
        <h4 className="text-xl font-semibold mb-2">Why Visit:</h4>
        <ul className="list-disc list-inside">
          {t.versailles.whyVisit.map((reason, index) => (
            <li key={index}>{reason}</li>
          ))}
        </ul>
      </div>
    ),
    tours: (
      <div>
        <h3 className="text-2xl font-bold mb-4">{t.versailles.navigation.tours}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tours.map(tour => (
            <TourCard
              key={tour.id}
              title={tour.name}
              description={`${t.versailles.title} - ${tour.duration}`}
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
        <h3 className="text-2xl font-bold mb-4">{t.versailles.navigation.map}</h3>
        <p>Interactive map will be here.</p>
      </div>
    ),
    events: (
      <div>
        <h3 className="text-2xl font-bold mb-4">{t.versailles.navigation.events}</h3>
        <p>Upcoming events at Versailles.</p>
      </div>
    ),
    faq: (
      <div>
        <h3 className="text-2xl font-bold mb-4">{t.versailles.navigation.faq}</h3>
        <p>Frequently Asked Questions about visiting Versailles.</p>
      </div>
    ),
  };

  return (
    <div className="min-h-screen bg-background">
      <DestinationHeader
        title={t.versailles.title}
        image="/images/versailles.jpg"
        distance={t.versailles.distance}
        duration={t.versailles.duration}
        currentPath="/excursions/versailles"
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
