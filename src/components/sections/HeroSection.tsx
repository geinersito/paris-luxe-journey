import React from "react";
import BookingForm from "../BookingForm";
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
  const imageRef = React.useRef<HTMLImageElement>(null);

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
      {/* Optimized background image with responsive srcset */}
      <img
        ref={imageRef}
        src={HERO_IMAGE_MEDIUM}
        srcSet={`${HERO_IMAGE_SMALL} 640w, ${HERO_IMAGE_MEDIUM} 1280w, ${HERO_IMAGE_LARGE} 1920w`}
        sizes="100vw"
        alt="Paris Elite Services - Luxury Transportation"
        loading="eager"
        decoding="async"
        className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000 ${
          isImageLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{
          objectPosition: "center 15%",
          transform: "scaleX(-1)",
        }}
        onLoad={() => setIsImageLoaded(true)}
      />

      <div
        className={`absolute inset-0 bg-gradient-to-br from-primary/70 via-black/60 to-primary-dark/80 z-10 transition-opacity duration-1000 ${
          isImageLoaded ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="container relative z-20 flex flex-col lg:flex-row items-center justify-between gap-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div
          className={`text-white max-w-xl text-center lg:text-left w-full lg:w-1/2 transition-opacity duration-1000 ${
            isImageLoaded
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          {/* Overlay oscuro detrás del texto para mejor legibilidad */}
          <div className="bg-black/60 backdrop-blur-md px-8 py-10 rounded-lg max-w-2xl mx-auto lg:mx-0 shadow-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 leading-tight text-white drop-shadow-2xl">
              {t.hero.title}
            </h1>
            <p className="mt-4 text-lg text-gray-100 font-sans">
              {t.hero.subtitle}
            </p>

            {/* Garantías con checkmarks - usando componente reutilizable TrustBadge */}
            <div className="mt-3 flex items-center justify-center lg:justify-start gap-4 flex-wrap">
              <TrustBadge
                icon={
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                }
                text="Fixed price"
              />
              <TrustBadge
                icon={
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                }
                text="No hidden fees"
              />
              <TrustBadge
                icon={
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                }
                text="1 luggage/pax included"
              />
              <TrustBadge
                icon={
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                }
                text="Free cancellation 24h"
              />
            </div>
          </div>
        </div>

        <div
          className={`w-full lg:w-1/2 max-w-lg mx-auto transition-opacity duration-1000 ${
            isImageLoaded
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <BookingForm
            tourId="default"
            tourName="Standard Transfer"
            basePrice={0} // Usar 0 para permitir que el cálculo dinámico funcione
            onSubmit={handleBookingSubmit}
          />
        </div>
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
