
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface BookingConfirmationProps {
  bookingId: string;
  bookingData: any;
  tourData: any;
}

export function BookingConfirmation({ bookingId, bookingData, tourData }: BookingConfirmationProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t.booking.success.title}</h2>
      <p>{t.booking.success.description}</p>
      {/* Add more booking confirmation details */}
    </div>
  );
}
