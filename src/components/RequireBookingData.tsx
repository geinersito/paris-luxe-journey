import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface RequireBookingDataProps {
  children: React.ReactNode;
}

export function RequireBookingData({ children }: RequireBookingDataProps) {
  const location = useLocation();
  const bookingData = location.state?.bookingData;

  if (!bookingData) {
    return <Navigate to="/booking" replace />;
  }

  return <>{children}</>;
}
