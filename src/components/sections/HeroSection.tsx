import React from "react";
import BookingForm from "../BookingForm";
import { CompactBookingForm } from "../booking/CompactBookingForm";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { TrustBadge } from "@/components/ui/trust-badge";
import type { BookingFormData } from "@/hooks/booking/types";

// Optimized image URLs with different sizes for responsive loading
const HERO_IMAGE_BASE = "https://images.unsplash.com/photo-1502602898657-3e91760cbb34";
const HERO_IMAGE_SMALL = `${HERO_IMAGE_BASE}?auto=format&fit=crop&q=80&w=640`;
const HERO_IMAGE_MEDIUM = `${HERO_IMAGE_BASE}?auto=format&fit=crop&q=80&w=1280`;
const HERO_IMAGE_LARGE = `${HERO_IMAGE_BASE}?auto=format&fit=crop&q=80&w=1920`;

export default function HeroSection() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isImageLoaded, setIsImageLoaded] = React.useState(false);
  const [showBookingModal, setShowBookingModal] = React.useState(false);
  const [scrollY, setScrollY] = React.useState(0);
  const imageRef = React.useRef<HTMLImageElement>(null);

  // Parallax effect
  React.useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Use Intersection Observer for lazy loading
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsImageLoaded(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '50px' }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleBookingSubmit = async (
    bookingDetails: Partial<BookingFormData> & {
      basePrice?: number;
      luggageSurcharge?: number;
      tripType?: "one_way" | "round_trip";
    },
  ) => {
    try {
      // Calcular precio final en base al precio dinámico de Supabase
      const basePrice = bookingDetails.basePrice || 0;
      const luggageSurcharge = bookingDetails.luggageSurcharge || 0;

      console.log("HeroSection - Datos de reserva:", bookingDetails);
      console.log("HeroSection - Precio base calculado:", basePrice);

      // Calcular el precio estimado: duplicado si es ida y vuelta + recargo por equipaje
      const estimatedPrice =
        (bookingDetails.tripType === "round_trip" ? basePrice * 2 : basePrice) +
        luggageSurcharge;

      console.log("HeroSection - Precio estimado final:", estimatedPrice);

      navigate("/booking/details", {
        state: {
          bookingData: bookingDetails,
          estimatedPrice: estimatedPrice,
        },
      });
    } catch (error) {
      console.error("Error al procesar la reserva:", error);
    }
  };

  return (
    <section
      id="booking"
      className="min-h-screen relative flex items-center justify-center py-24 lg:py-32 overflow-hidden"
    >
      {/* Optimized background image with responsive srcset and parallax */}
      <div className="absolute inset-0 z-0">
        <img
          ref={imageRef}
          src={HERO_IMAGE_MEDIUM}
          srcSet={`${HERO_IMAGE_SMALL} 640w, ${HERO_IMAGE_MEDIUM} 1280w, ${HERO_IMAGE_LARGE} 1920w`}
          sizes="100vw"
          alt="Paris Elite Services - Luxury Transportation"
          loading="eager"
          decoding="async"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            isImageLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{
            objectPosition: "center 15%",
            transform: `scaleX(-1) translateY(${scrollY * 0.5}px)`,
          }}
          onLoad={() => setIsImageLoaded(true)}
        />
      </div>

      {/* Improved gradient overlay */}
      <div className="overlay-dark z-10" />

      <div className="container relative z-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center">
          {/* Main Content - Centered */}
          <div
            className={`max-w-5xl w-full transition-all duration-1000 ${
              isImageLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {/* Subtitle elegante */}
            <p className="font-accent italic text-xl md:text-2xl text-primary-100 mb-4">
              Paris Elite Services
            </p>

            {/* Título principal con mejor jerarquía */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 leading-tight text-white drop-shadow-2xl">
              {t.hero.title}
            </h1>

            {/* Subtítulo */}
            <p className="mt-4 text-lg md:text-xl text-gray-100 font-sans max-w-3xl mx-auto leading-relaxed mb-8">
              {t.hero.subtitle}
            </p>

            {/* Compact Booking Form */}
            <div className="mt-8 mb-6">
              <CompactBookingForm onOpenFullForm={() => setShowBookingModal(true)} />
            </div>

            {/* Secondary CTA */}
            <div className="mt-6">
              <button
                onClick={() => document.getElementById('fleet')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-white/90 hover:text-white font-semibold text-sm transition-colors underline underline-offset-4"
              >
                View Our Premium Fleet →
              </button>
            </div>
          </div>
        </div>

        {/* Booking Modal */}
        {showBookingModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="glass-card-premium max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
              <button
                onClick={() => setShowBookingModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h2 className="text-2xl font-display font-bold text-primary mb-6">Book Your Transfer</h2>
              <BookingForm
                tourId="default"
                tourName="Standard Transfer"
                basePrice={0}
                onSubmit={async (data) => {
                  await handleBookingSubmit(data);
                  setShowBookingModal(false);
                }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20">
        <svg
          className="relative block w-full h-[10px]"
          viewBox="0 0 1200 30"
          preserveAspectRatio="none"
        >
          <path
            d="M0,20 C300,0 600,30 1200,15 L1200,30 L0,30 Z"
            fill="white"
            style={{ opacity: "0.9" }}
          />
        </svg>
      </div>
    </section>
  );
}
