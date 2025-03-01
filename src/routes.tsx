import React from 'react';
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Index from "./pages/Index";
import BookingDetails from "./pages/booking/Details";
import BookingPayment from "./pages/booking/Payment";
import BookingConfirmation from "./pages/booking/Confirmation";
import BookingPage from "./pages/booking";
import TestPayment from "./pages/TestPayment";
import Excursions from "./pages/Excursions";
import { RequireBookingData } from "./components/RequireBookingData";

function AppRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/excursions" element={<Excursions />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route 
          path="/booking/details" 
          element={
            <RequireBookingData>
              <BookingDetails />
            </RequireBookingData>
          } 
        />
        <Route 
          path="/booking/payment" 
          element={
            <RequireBookingData>
              <BookingPayment />
            </RequireBookingData>
          } 
        />
        <Route 
          path="/booking/confirmation" 
          element={
            <RequireBookingData>
              <BookingConfirmation />
            </RequireBookingData>
          } 
        />
        <Route path="/test-payment" element={<TestPayment />} />
      </Routes>
    </Layout>
  );
}

export default AppRoutes;
