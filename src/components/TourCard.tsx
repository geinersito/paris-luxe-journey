
import React from 'react';
import { Button } from './ui/button';

interface TourCardProps {
  title: string;
  description: string;
  duration: string;
  price: number;
  includes: string[];
  onBook?: () => void;
}

export function TourCard({ title, description, duration, price, includes, onBook }: TourCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-display text-primary dark:text-primary-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-muted-foreground">{duration}</span>
        <span className="text-lg font-semibold">€{price}</span>
      </div>
      <div className="space-y-2 mb-4">
        {includes.map((item, index) => (
          <div key={index} className="flex items-center text-sm text-muted-foreground">
            <span className="mr-2">•</span>
            {item}
          </div>
        ))}
      </div>
      {onBook && (
        <Button onClick={onBook} className="w-full">
          Book Now
        </Button>
      )}
    </div>
  );
}
