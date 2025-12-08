import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import Excursions from "./pages/Excursions";
import BookingPage from "./pages/booking";
import BookingDetails from "./pages/booking/Details";
import BookingPayment from "./pages/booking/Payment";
import BookingConfirmation from "./pages/booking/Confirmation";
import DesignPreview from "./pages/DesignPreview";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import { RequireBookingData } from "./components/RequireBookingData";
import { Layout } from "./components/Layout";
import { BookingProvider } from '@/contexts/BookingContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "excursions",
        element: <Excursions />,
      },
      {
        path: "design-preview",
        element: <DesignPreview />,
      },
      {
        path: "booking",
        children: [
          {
            index: true,
            element: <BookingPage />,
          },
          // Look for the route configuration for /booking/details
          // It should be wrapped with RequireBookingData
          {
            path: "details",
            element: <RequireBookingData><BookingDetails /></RequireBookingData>,
          },
          {
            path: "payment",
            element: <RequireBookingData><BookingPayment /></RequireBookingData>,
          },
          {
            path: "confirmation",
            element: <RequireBookingData><BookingConfirmation /></RequireBookingData>,
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>
          <BookingProvider>
            <RouterProvider router={router} />
          </BookingProvider>
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}
