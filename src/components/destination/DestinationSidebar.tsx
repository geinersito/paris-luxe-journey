
import React from 'react';

export interface DestinationSidebarProps {
  children: React.ReactElement;
  tours: React.ReactElement;
}

export function DestinationSidebar({ children, tours }: DestinationSidebarProps) {
  return (
    <aside className="space-y-8">
      {children}
      <div className="sticky top-24">
        {tours}
      </div>
    </aside>
  );
}
