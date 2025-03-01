
import React from 'react';

export interface DestinationNavigationProps {
  items: Array<{ id: string; label: string }>;
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

export function DestinationNavigation({ items, activeSection, onSectionChange }: DestinationNavigationProps) {
  return (
    <nav className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex overflow-x-auto">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`px-4 py-3 text-sm whitespace-nowrap border-b-2 transition-colors ${
                activeSection === item.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-primary'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
