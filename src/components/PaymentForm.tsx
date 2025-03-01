
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from './ui/button';

interface FormProps {
  bookingData: any;
  onSubmit: (paymentDetails: any) => Promise<void>;
  isProcessing: boolean;
  error: string;
}

export function PaymentForm({ bookingData, onSubmit, isProcessing, error }: FormProps) {
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(bookingData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Payment form content */}
      {error && (
        <div className="text-red-500">{error}</div>
      )}
      <Button type="submit" disabled={isProcessing}>
        {isProcessing ? t.common.processing : t.booking.payment.title}
      </Button>
    </form>
  );
}
