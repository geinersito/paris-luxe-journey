import React from "react";
import BookingForm from "../BookingForm";
import { CompactBookingForm } from "../booking/CompactBookingForm";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { TrustBadge } from "@/components/ui/trust-badge";
import { Luggage, Shield, Clock } from "lucide-react";
import type { BookingFormData } from "@/hooks/booking/types";

// Optimized image URLs with different sizes for responsive loading
const HERO_IMAGE_BASE =
  "https://images.unsplash.com/photo-1502602898657-3e91760cbb34";
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
  const [prefilledData, setPrefilledData] = React.useState<{
    pickup: string;
    dropoff: string;
    passengers: string;
  } | null>(null);

  // Parallax effect
  React.useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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
      { rootMargin: "50px" },
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
          fetchPriority="high"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            isImageLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{
            objectPosition: "center 15%",
            transform: `scaleX(-1) translateY(${scrollY * 0.5}px)`,
            willChange: "transform",
          }}
          onLoad={() => setIsImageLoaded(true)}
        />
      </div>

      {/* Premium Cinematic Overlay with Multi-Stop Gradient */}
      <div className="absolute inset-0 overlay-cinematic z-10" />

      {/* Subtle Gold Accent Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 z-10" />

      <div className="container relative z-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center">
          {/* Main Content - Centered with Staggered Animations */}
          <div
            className={`max-w-5xl w-full transition-all duration-1000 ${
              isImageLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {/* Subtitle elegante con animación */}
            <p
              className="font-accent italic text-xl md:text-2xl text-primary-200 mb-4 tracking-wide animate-fadeInDown"
              style={{ animationDelay: "0.2s", animationFillMode: "both" }}
            >
              Paris Elite Services
            </p>

            {/* Título principal con text-shadow dorado premium */}
            <h1
              className="text-4xl md:text-5xl lg:text-7xl font-display font-bold mb-6 leading-tight text-white text-shadow-gold animate-fadeInUp"
              style={{
                animationDelay: "0.4s",
                animationFillMode: "both",
                textShadow:
                  "0 2px 20px hsl(45 93% 47% / 0.4), 0 4px 40px hsl(45 93% 47% / 0.2)",
              }}
            >
              {t.hero.title}
            </h1>

            {/* Subtítulo con mejor contraste */}
            <p
              className="mt-4 text-lg md:text-xl text-white/95 font-sans max-w-3xl mx-auto leading-relaxed mb-10 animate-fadeInUp"
              style={{
                animationDelay: "0.6s",
                animationFillMode: "both",
                textShadow: "0 2px 10px rgba(0,0,0,0.5)",
              }}
            >
              {t.hero.subtitle}
            </p>

            {/* Compact Booking Form con animación */}
            <div
              className="mt-8 mb-6 animate-scaleIn"
              style={{ animationDelay: "0.8s", animationFillMode: "both" }}
            >
              <CompactBookingForm
                onOpenFullForm={(data) => {
                  setPrefilledData(data);
                  setShowBookingModal(true);
                }}
              />
            </div>

            {/* Trust Badges - Equipaje incluido */}
            <div
              className="mt-8 flex flex-wrap justify-center gap-4 md:gap-6 animate-fadeInUp"
              style={{ animationDelay: "1s", animationFillMode: "both" }}
            >
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20">
                <Luggage className="w-5 h-5 text-primary-200" />
                <span className="text-white/95 text-sm font-medium">
                  {t.hero.luggageIncluded}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20">
                <Shield className="w-5 h-5 text-primary-200" />
                <span className="text-white/95 text-sm font-medium">
                  {t.hero.licensedInsured}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20">
                <Clock className="w-5 h-5 text-primary-200" />
                <span className="text-white/95 text-sm font-medium">
                  {t.hero.freeCancellation24h}
                </span>
              </div>
            </div>

            {/* Secondary CTA mejorado */}
            <div
              className="mt-6 animate-fadeInUp"
              style={{ animationDelay: "1.2s", animationFillMode: "both" }}
            >
              <button
                onClick={() =>
                  document
                    .getElementById("fleet")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group text-white/90 hover:text-white font-semibold text-sm transition-all duration-300 underline underline-offset-4 hover:underline-offset-8 focus-luxury"
                aria-label="Explore our fleet"
              >
                {t.hero.viewFleet} →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal - FUERA del contenedor para z-index correcto */}
      {showBookingModal && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in-0 duration-300"
          onClick={() => setShowBookingModal(false)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-white rounded-3xl shadow-2xl border border-gray-200 animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header fijo con botón de cerrar */}
            <div className="px-6 md:px-8 py-5 flex items-center justify-between border-b border-gray-200 flex-shrink-0 bg-gradient-to-r from-primary/5 to-transparent rounded-t-3xl">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-primary">
                {t.booking.title || "Réservez Votre Transfert"}
              </h2>
              <button
                onClick={() => setShowBookingModal(false)}
                className="text-gray-500 hover:text-gray-700 transition-all duration-200 p-2 hover:bg-gray-100 rounded-full hover:scale-110"
                aria-label="Close"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Contenido scrollable con scrollbar estilizado */}
            <div className="overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
              <div className="p-6 md:p-8 bg-white">
                <BookingForm
                  key={prefilledData ? JSON.stringify(prefilledData) : "empty"}
                  tourId="default"
                  tourName="Standard Transfer"
                  basePrice={0}
                  compact={true}
                  initialData={prefilledData || undefined}
                  onSubmit={async (data) => {
                    await handleBookingSubmit(data);
                    setShowBookingModal(false);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

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
