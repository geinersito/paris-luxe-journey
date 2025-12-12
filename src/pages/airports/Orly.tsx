import React from "react";
import { useNavigate } from "react-router-dom";
import { Plane, Clock, Shield, MapPin, CheckCircle, Star } from "lucide-react";
import BookingForm from "@/components/BookingForm";
import FleetSection from "@/components/sections/FleetSection";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import type { BookingFormData } from "@/hooks/booking/types";

const ORLY_IMAGE = "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80";

export default function OrlyAirport() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleBookingSubmit = async (
    bookingDetails: Partial<BookingFormData> & {
      basePrice?: number;
      luggageSurcharge?: number;
      tripType?: "one_way" | "round_trip";
    },
  ) => {
    try {
      const basePrice = bookingDetails.basePrice || 0;
      const luggageSurcharge = bookingDetails.luggageSurcharge || 0;
      const estimatedPrice =
        (bookingDetails.tripType === "round_trip" ? basePrice * 2 : basePrice) +
        luggageSurcharge;

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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center py-24 overflow-hidden">
        <img
          src={ORLY_IMAGE}
          alt="Paris Orly Airport Transfer"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-black/70 to-primary-dark/90" />
        
        <div className="container relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-secondary/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Plane className="w-5 h-5 text-secondary" />
                <span className="text-sm font-medium">Orly Airport</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
                Orly Airport Transfer
                <span className="block text-secondary mt-2">Fixed Price from €60</span>
              </h1>
              
              <p className="text-xl text-gray-100 mb-8 leading-relaxed">
                Professional chauffeur service from Orly Airport to Paris city center. 
                No hidden fees, flight tracking included.
              </p>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 bg-black/30 backdrop-blur-sm p-4 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0" />
                  <span className="text-sm">Flight Tracking</span>
                </div>
                <div className="flex items-center gap-3 bg-black/30 backdrop-blur-sm p-4 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0" />
                  <span className="text-sm">Meet & Greet</span>
                </div>
                <div className="flex items-center gap-3 bg-black/30 backdrop-blur-sm p-4 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0" />
                  <span className="text-sm">1 Luggage/Pax Included</span>
                </div>
                <div className="flex items-center gap-3 bg-black/30 backdrop-blur-sm p-4 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0" />
                  <span className="text-sm">24/7 Available</span>
                </div>
              </div>
            </div>

            {/* Right: Booking Form */}
            <div className="bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-2xl">
              <BookingForm
                tourId="orly-transfer"
                tourName="Orly Airport Transfer"
                basePrice={0}
                onSubmit={handleBookingSubmit}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us for Orly */}
      <section className="py-20 bg-background">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
              Why Choose Paris Elite for Orly Transfers?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We specialize in airport transfers with over 10 years of experience serving Orly passengers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Plane className="w-8 h-8" />,
                title: "All Terminals Covered",
                description: "We serve all Orly terminals: Orly 1, 2, 3, and 4"
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: "Flight Tracking",
                description: "We monitor your flight in real-time. No extra charge for delays or early arrivals"
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Meet & Greet Service",
                description: "Your chauffeur will wait at arrivals hall with a name sign"
              },
              {
                icon: <MapPin className="w-8 h-8" />,
                title: "Direct Routes",
                description: "Fastest routes to Paris center, Disneyland, or any destination"
              },
              {
                icon: <Star className="w-8 h-8" />,
                title: "Premium Vehicles",
                description: "Mercedes E-Class, S-Class, and luxury vans for groups"
              },
              {
                icon: <CheckCircle className="w-8 h-8" />,
                title: "Fixed Pricing",
                description: "Price confirmed at booking. No surprises, no meter running"
              }
            ].map((benefit, index) => (
              <div key={index} className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
                <div className="text-secondary mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="py-20 bg-pearl dark:bg-gray-800">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary dark:text-primary-foreground mb-4">
              Orly Airport Transfer Prices
            </h2>
            <p className="text-lg text-muted-foreground">
              Transparent fixed pricing - Book now and pay later
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Route</th>
                  <th className="px-6 py-4 text-left font-semibold">Vehicle</th>
                  <th className="px-6 py-4 text-right font-semibold">Price (One Way)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr className="hover:bg-accent/50 transition-colors">
                  <td className="px-6 py-4 font-medium">Orly → Paris Center</td>
                  <td className="px-6 py-4 text-muted-foreground">Sedan (1-3 pax)</td>
                  <td className="px-6 py-4 text-right font-bold text-secondary">€60</td>
                </tr>
                <tr className="hover:bg-accent/50 transition-colors">
                  <td className="px-6 py-4 font-medium">Orly → Paris Center</td>
                  <td className="px-6 py-4 text-muted-foreground">Van (4-7 pax)</td>
                  <td className="px-6 py-4 text-right font-bold text-secondary">€78</td>
                </tr>
                <tr className="hover:bg-accent/50 transition-colors">
                  <td className="px-6 py-4 font-medium">Orly → Disneyland Paris</td>
                  <td className="px-6 py-4 text-muted-foreground">Sedan (1-3 pax)</td>
                  <td className="px-6 py-4 text-right font-bold text-secondary">€85</td>
                </tr>
                <tr className="hover:bg-accent/50 transition-colors">
                  <td className="px-6 py-4 font-medium">Orly → Disneyland Paris</td>
                  <td className="px-6 py-4 text-muted-foreground">Van (4-7 pax)</td>
                  <td className="px-6 py-4 text-right font-bold text-secondary">€110</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 p-6 bg-secondary/10 rounded-lg border border-secondary/20">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Note:</strong> Prices include 1 large suitcase + 1 small bag per passenger.
              Extra large suitcases: €15 per piece. For groups of 8+ passengers, contact us via WhatsApp.
            </p>
          </div>
        </div>
      </section>

      {/* Fleet Section */}
      <FleetSection />

      {/* Safety Alert - Avoid Fake Taxis */}
      <section className="py-16 bg-amber-50 dark:bg-amber-900/20">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg border-l-4 border-amber-500">
            <div className="flex items-start gap-4">
              <Shield className="w-8 h-8 text-amber-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-display font-bold text-primary mb-3">
                  Avoid Fake Taxi Scams at Orly Airport
                </h3>
                <p className="text-muted-foreground mb-4">
                  Fake taxi drivers target tourists at Orly Airport. They quote low prices but charge 3-4x more later.
                  Book a licensed VTC transfer with fixed price to avoid scams.
                </p>
                <Button
                  variant="outline"
                  className="border-amber-500 text-amber-700 hover:bg-amber-50"
                  onClick={() => navigate('/guides/avoid-fake-taxis')}
                >
                  Read Our Safety Guide →
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Ready to Book Your Orly Transfer?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Fixed prices, professional service, and no hidden fees. Book now and travel with peace of mind.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-primary font-semibold"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Book Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 hover:bg-white/20 text-white border-white/30"
              onClick={() => window.open('https://wa.me/33668251102', '_blank')}
            >
              WhatsApp Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}


