import React from 'react';
import { LucideIcon } from "lucide-react";
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  price: string;
  className?: string;
}

export default function ServiceCard({ 
  title, 
  description, 
  icon: Icon, 
  price,
  className 
}: ServiceCardProps) {
  return (
    <div className={cn(
      "group relative overflow-hidden rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-primary/10",
      className
    )}>
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <Icon className="h-7 w-7 text-primary" />
        </div>
        
        <h3 className="text-xl font-display text-primary dark:text-primary-foreground mb-4 text-center group-hover:text-primary/90 transition-colors">
          {title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed mb-4">
          {description}
        </p>

        <div className="mt-auto">
          <span className="text-primary font-semibold">
            {price}
          </span>
        </div>
      </div>
    </div>
  );
}