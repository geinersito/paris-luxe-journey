import React from 'react';
import BookingForm from "../BookingForm";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

const HERO_IMAGE_URL = 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80';

export default function HeroSection() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isImageLoaded, setIsImageLoaded] = React.useState(false);
  
  React.useEffect(() => {
    const img = new Image();
    img.src = HERO_IMAGE_URL;
    img.onload = () => setIsImageLoaded(true);
  }, []);

  const handleBookingSubmit = async (bookingDetails: any) => {
    try {
      // Calcular precio final en base al precio dinámico de Supabase
      const basePrice = bookingDetails.basePrice || 0;
      const luggageSurcharge = bookingDetails.luggageSurcharge || 0;
      
      console.log('HeroSection - Datos de reserva:', bookingDetails);
      console.log('HeroSection - Precio base calculado:', basePrice);
      
      // Calcular el precio estimado: duplicado si es ida y vuelta + recargo por equipaje
      const estimatedPrice = (bookingDetails.tripType === 'round_trip' ? basePrice * 2 : basePrice) + luggageSurcharge;
      
      console.log('HeroSection - Precio estimado final:', estimatedPrice);
      
      navigate("/booking/details", {
        state: {
          bookingData: bookingDetails,
          estimatedPrice: estimatedPrice
        }
      });
    } catch (error) {
      console.error('Error al procesar la reserva:', error);
    }
  };
  
  return (
    <section className="min-h-screen relative flex items-center justify-center py-24 lg:py-32 overflow-hidden">
      <div 
        className={`absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
          isImageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundImage: `url('${HERO_IMAGE_URL}')`,
          backgroundPosition: "center 15%",
          transform: "scaleX(-1)"
        }}
      />
      
      <div
        className={`absolute inset-0 bg-gradient-to-br from-primary/70 via-black/60 to-primary-dark/80 z-10 transition-opacity duration-1000 ${
          isImageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
      
      <div className="container relative z-20 flex flex-col lg:flex-row items-center justify-between gap-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div
          className={`text-white max-w-xl text-center lg:text-left w-full lg:w-1/2 transition-opacity duration-1000 ${
            isImageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
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

            {/* Garantías con checkmarks */}
            <div className="mt-3 text-sm font-medium text-gray-200 flex items-center justify-center lg:justify-start gap-4 flex-wrap">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-border/20">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Fixed price
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-border/20">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                No hidden fees
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-border/20">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Free cancellation 24h
              </span>
            </div>
          </div>
        </div>
        
        <div 
          className={`w-full lg:w-1/2 max-w-lg mx-auto transition-opacity duration-1000 ${
            isImageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
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
            style={{opacity: '0.9'}}
          />
        </svg>
      </div>
    </section>
  );
}
