import {
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense, useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import { RequireBookingData } from "./components/RequireBookingData";
import { Layout } from "./components/Layout";
import { BookingProvider } from "@/contexts/BookingContext";

/** Client-side redirect from /about, /contact, /fleet to Home anchors */
const HashRedirect = ({ hash }: { hash: string }) => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(`/#${hash}`, { replace: true });
  }, [hash, navigate]);
  return null;
};

// Lazy load pages for better code splitting
const Home = lazy(() => import("./pages/Home"));
const Excursions = lazy(() => import("./pages/Excursions"));
const Events = lazy(() => import("./pages/Events"));
const BlogIndex = lazy(() => import("./pages/blog/BlogIndex"));
const BlogCategory = lazy(() => import("./pages/blog/BlogCategory"));
const BlogPost = lazy(() => import("./pages/blog/BlogPost"));
const BlogNotFound = lazy(() => import("./pages/blog/NotFound"));
const BookingPage = lazy(() => import("./pages/booking"));
const BookingDetails = lazy(() => import("./pages/booking/Details"));
const BookingPayment = lazy(() => import("./pages/booking/Payment"));
const BookingConfirmation = lazy(() => import("./pages/booking/Confirmation"));
const DesignPreview = lazy(() => import("./pages/DesignPreview"));
const CDGAirport = lazy(() => import("./pages/airports/CDG"));
const OrlyAirport = lazy(() => import("./pages/airports/Orly"));
const BeauvaisAirport = lazy(() => import("./pages/airports/Beauvais"));
const HourlyService = lazy(() => import("./pages/Hourly"));
const HourlyQuote = lazy(() => import("./pages/hourly/Quote"));
const AvoidFakeTaxis = lazy(() => import("./pages/guides/AvoidFakeTaxis"));
const FAQPage = lazy(() => import("./pages/FAQPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const NotFoundPage = lazy(() => import("./pages/NotFound"));

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
      {
        path: "events",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Events />
          </Suspense>
        ),
      },
      {
        path: "blog",
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<PageLoader />}>
                <BlogIndex />
              </Suspense>
            ),
          },
          {
            path: "404",
            element: (
              <Suspense fallback={<PageLoader />}>
                <BlogNotFound />
              </Suspense>
            ),
          },
          {
            path: ":category",
            element: (
              <Suspense fallback={<PageLoader />}>
                <BlogCategory />
              </Suspense>
            ),
          },
          {
            path: ":category/:slug",
            element: (
              <Suspense fallback={<PageLoader />}>
                <BlogPost />
              </Suspense>
            ),
          },
        ],
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
        path: "airports/orly",
        element: (
          <Suspense fallback={<PageLoader />}>
            <OrlyAirport />
          </Suspense>
        ),
      },
      {
        path: "airports/beauvais",
        element: (
          <Suspense fallback={<PageLoader />}>
            <BeauvaisAirport />
          </Suspense>
        ),
      },
      {
        path: "hourly",
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<PageLoader />}>
                <HourlyService />
              </Suspense>
            ),
          },
          {
            path: "quote",
            element: (
              <Suspense fallback={<PageLoader />}>
                <HourlyQuote />
              </Suspense>
            ),
          },
        ],
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
        path: "faq",
        element: (
          <Suspense fallback={<PageLoader />}>
            <FAQPage />
          </Suspense>
        ),
      },
      {
        path: "privacy",
        element: (
          <Suspense fallback={<PageLoader />}>
            <PrivacyPage />
          </Suspense>
        ),
      },
      {
        path: "terms",
        element: (
          <Suspense fallback={<PageLoader />}>
            <TermsPage />
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
      // Legacy direct routes → Home anchors (NAV-ABOUT-CONTACT-FLEET-01)
      { path: "about", element: <HashRedirect hash="about" /> },
      { path: "contact", element: <HashRedirect hash="contact" /> },
      { path: "fleet", element: <HashRedirect hash="fleet" /> },
      {
        path: "*",
        element: (
          <Suspense fallback={<PageLoader />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
]);

export default function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <AuthProvider>
            <BookingProvider>
              <RouterProvider router={router} />
            </BookingProvider>
          </AuthProvider>
        </LanguageProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}
