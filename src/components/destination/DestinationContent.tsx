
import React from 'react';

export interface DestinationContentProps {
  activeSection: string;
  content: {
    description: React.ReactElement;
    tours: React.ReactElement;
    map: React.ReactElement;
    events: React.ReactElement;
    faq: React.ReactElement;
  };
}

export function DestinationContent({ activeSection, content }: DestinationContentProps) {
  return (
    <div className="py-8">
      {activeSection === 'description' && content.description}
      {activeSection === 'tours' && content.tours}
      {activeSection === 'map' && content.map}
      {activeSection === 'events' && content.events}
      {activeSection === 'faq' && content.faq}
    </div>
  );
}
