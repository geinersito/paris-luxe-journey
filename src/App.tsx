import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import { RequireBookingData } from "./components/RequireBookingData";
import { Layout } from "./components/Layout";
import { BookingProvider } from "@/contexts/BookingContext";

// Lazy load pages for better code splitting
const Home = lazy(() => import("./pages/Home"));
const Excursions = lazy(() => import("./pages/Excursions"));
const BookingPage = lazy(() => import("./pages/booking"));
const BookingDetails = lazy(() => import("./pages/booking/Details"));
const BookingPayment = lazy(() => import("./pages/booking/Payment"));
const BookingConfirmation = lazy(() => import("./pages/booking/Confirmation"));
const DesignPreview = lazy(() => import("./pages/DesignPreview"));
const CDGAirport = lazy(() => import("./pages/airports/CDG"));
const AvoidFakeTaxis = lazy(() => import("./pages/guides/AvoidFakeTaxis"));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

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
        element: (
          <Suspense fallback={<PageLoader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "excursions",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Excursions />
          </Suspense>
        ),
      },
      // Design preview only available in development
      ...(import.meta.env.DEV
        ? [
            {
              path: "design-preview",
              element: (
                <Suspense fallback={<PageLoader />}>
                  <DesignPreview />
                </Suspense>
              ),
            },
          ]
        : []),
      {
        path: "airports/cdg",
        element: (
          <Suspense fallback={<PageLoader />}>
            <CDGAirport />
          </Suspense>
        ),
      },
      {
        path: "guides/avoid-fake-taxis",
        element: (
          <Suspense fallback={<PageLoader />}>
            <AvoidFakeTaxis />
          </Suspense>
        ),
      },
      {
        path: "booking",
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<PageLoader />}>
                <BookingPage />
              </Suspense>
            ),
          },
          {
            path: "details",
            element: (
              <Suspense fallback={<PageLoader />}>
                <RequireBookingData>
                  <BookingDetails />
                </RequireBookingData>
              </Suspense>
            ),
          },
          {
            path: "payment",
            element: (
              <Suspense fallback={<PageLoader />}>
                <RequireBookingData>
                  <BookingPayment />
                </RequireBookingData>
              </Suspense>
            ),
          },
          {
            path: "confirmation",
            element: (
              <Suspense fallback={<PageLoader />}>
                <RequireBookingData>
                  <BookingConfirmation />
                </RequireBookingData>
              </Suspense>
            ),
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
