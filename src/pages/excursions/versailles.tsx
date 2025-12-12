import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { DestinationHeader } from '@/components/destination/DestinationHeader';
import { DestinationNavigation } from '@/components/destination/DestinationNavigation';
import { DestinationContent } from '@/components/destination/DestinationContent';
import { DestinationSidebar } from '@/components/destination/DestinationSidebar';
import { TourCard } from '@/components/TourCard';
import { excursions } from '@/data/excursions';

export default function VersaillesPage() {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = React.useState("description");
  const [selectedTour, setSelectedTour] = React.useState<string | null>(null);

  // Get versailles data from translations
  const versaillesData = t.versailles;

  // Navigation items
  const navigationItems = [
    { id: 'description', label: t.versailles.navigation.description },
    { id: 'tours', label: t.versailles.navigation.tours },
    { id: 'map', label: t.versailles.navigation.map },
    { id: 'events', label: t.versailles.navigation.events },
    { id: 'faq', label: t.versailles.navigation.faq },
  ];

  // Handle section change
  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  // Enhanced tours data with more details
  const tours = [
    {
      id: "versailles-tour-1",
      name: "Guided Tour of Versailles Palace",
      duration: "4 hours",
      price: 250,
      maxParticipants: 8,
      startTimes: ["09:00", "13:00"],
      includes: ["Entry tickets", "Guided tour", "Transportation", "Skip-the-line access"],
      highlights: ["Hall of Mirrors", "Royal Apartments", "Gardens access"],
    },
  ];

  const content = {
    description: (
      <div>
        <h3 className="text-2xl font-bold mb-4">{versaillesData.title}</h3>
        <p className="mb-4">{versaillesData.description}</p>
        <h4 className="text-xl font-semibold mb-2">Highlights:</h4>
        <ul className="list-disc list-inside mb-4">
          {versaillesData.highlights.map((highlight, index) => (
            <li key={index}>{highlight}</li>
          ))}
        </ul>
        <div className="mt-6">
          <h4 className="text-xl font-semibold mb-2">Why Visit:</h4>
          <ul className="list-disc list-inside mb-4">
            {versaillesData.whyVisit.map((reason, index) => (
              <li key={index}>{reason}</li>
            ))}
          </ul>
        </div>
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
