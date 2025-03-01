
import React from 'react';

export interface DestinationHeaderProps {
  title: string;
  image: string;
  distance: string;
  duration: string;
  currentPath: string;
}

export function DestinationHeader({ title, image, distance, duration, currentPath }: DestinationHeaderProps) {
  return (
    <header className="relative h-[60vh] min-h-[400px] w-full">
      <div className="absolute inset-0">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-display mb-4">{title}</h1>
          <div className="flex items-center justify-center gap-4 text-sm">
            <span>{distance}</span>
            <span>•</span>
            <span>{duration}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
