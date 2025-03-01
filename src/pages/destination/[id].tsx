
import React from 'react';
import { useParams } from 'react-router-dom';
import { DestinationHeader } from '@/components/destination/DestinationHeader';
import { DestinationNavigation } from '@/components/destination/DestinationNavigation';
import { DestinationContent } from '@/components/destination/DestinationContent';
import { TourCard } from '@/components/TourCard';

export default function DestinationPage() {
  const { id } = useParams();
  const [activeSection, setActiveSection] = React.useState('description');
  
  const navigationItems = [
    { id: 'description', label: 'Description' },
    { id: 'tours', label: 'Tours' },
    { id: 'map', label: 'Map' },
    { id: 'events', label: 'Events' },
    { id: 'faq', label: 'FAQ' }
  ];

  const destinationData = {
    title: 'Destination Title',
    image: '/images/destination.jpg',
    distance: '30km from Paris',
    duration: '1 day',
    currentPath: `/destination/${id}`
  };

  const tours = [
    {
      id: '1',
      title: 'Tour Name',
      description: 'Tour Description',
      duration: '4 hours',
      price: 99,
      includes: ['Item 1', 'Item 2']
    }
  ];

  const renderTours = () => (
    <div className="grid gap-6">
      {tours.map(tour => (
        <TourCard
          key={tour.id}
          title={tour.title}
          description={tour.description}
          duration={tour.duration}
          price={tour.price}
          includes={tour.includes}
        />
      ))}
    </div>
  );

  return (
    <div>
      <DestinationHeader {...destinationData} />
      
      <DestinationNavigation
        items={navigationItems}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      <DestinationContent
        activeSection={activeSection}
        content={{
          description: <div>Description content</div>,
          tours: renderTours(),
          map: <div>Map content</div>,
          events: <div>Events content</div>,
          faq: <div>FAQ content</div>
        }}
      />
    </div>
  );
}
