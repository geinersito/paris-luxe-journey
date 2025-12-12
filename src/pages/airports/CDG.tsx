import React from "react";
import { useNavigate } from "react-router-dom";
import { Plane, Clock, Shield, MapPin, CheckCircle, Star } from "lucide-react";
import BookingForm from "@/components/BookingForm";
import FleetSection from "@/components/sections/FleetSection";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import type { BookingFormData } from "@/hooks/booking/types";

const CDG_IMAGE = "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80";

export default function CDGAirport() {
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
          src={CDG_IMAGE}
          alt="Paris CDG Airport Transfer"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-black/70 to-primary-dark/90" />
        
        <div className="container relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-secondary/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Plane className="w-5 h-5 text-secondary" />
                <span className="text-sm font-medium">Charles de Gaulle Airport</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
                CDG Airport Transfer
                <span className="block text-secondary mt-2">Fixed Price from €70</span>
              </h1>
              
              <p className="text-xl text-gray-100 mb-8 leading-relaxed">
                Professional chauffeur service from Charles de Gaulle Airport to Paris city center. 
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
                tourId="cdg-transfer"
                tourName="CDG Airport Transfer"
                basePrice={0}
                onSubmit={handleBookingSubmit}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us for CDG */}
      <section className="py-20 bg-background">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
              Why Choose Paris Elite for CDG Transfers?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We specialize in airport transfers with over 10 years of experience serving CDG passengers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Plane className="w-8 h-8" />,
                title: "All Terminals Covered",
                description: "We serve all CDG terminals: T1, T2A, T2B, T2C, T2D, T2E, T2F, T2G, and T3"
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
              CDG Airport Transfer Prices
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
                  <td className="px-6 py-4 font-medium">CDG → Paris Center</td>
                  <td className="px-6 py-4 text-muted-foreground">Sedan (1-3 pax)</td>
                  <td className="px-6 py-4 text-right font-bold text-secondary">from €65</td>
                </tr>
                <tr className="hover:bg-accent/50 transition-colors">
                  <td className="px-6 py-4 font-medium">CDG → Paris Center</td>
                  <td className="px-6 py-4 text-muted-foreground">Van (4-7 pax)</td>
                  <td className="px-6 py-4 text-right font-bold text-secondary">from €95</td>
                </tr>
                <tr className="hover:bg-accent/50 transition-colors">
                  <td className="px-6 py-4 font-medium">CDG → Disneyland Paris</td>
                  <td className="px-6 py-4 text-muted-foreground">Sedan (1-3 pax)</td>
                  <td className="px-6 py-4 text-right font-bold text-secondary">from €85</td>
                </tr>
                <tr className="hover:bg-accent/50 transition-colors">
                  <td className="px-6 py-4 font-medium">CDG → Disneyland Paris</td>
                  <td className="px-6 py-4 text-muted-foreground">Van (4-7 pax)</td>
                  <td className="px-6 py-4 text-right font-bold text-secondary">from €115</td>
                </tr>
                <tr className="hover:bg-accent/50 transition-colors">
                  <td className="px-6 py-4 font-medium">CDG → Versailles</td>
                  <td className="px-6 py-4 text-muted-foreground">Sedan (1-3 pax)</td>
                  <td className="px-6 py-4 text-right font-bold text-secondary">from €95</td>
                </tr>
                <tr className="hover:bg-accent/50 transition-colors">
                  <td className="px-6 py-4 font-medium">CDG → Versailles</td>
                  <td className="px-6 py-4 text-muted-foreground">Van (4-7 pax)</td>
                  <td className="px-6 py-4 text-right font-bold text-secondary">from €125</td>
                </tr>
              </tbody>
            </table>

            <div className="bg-accent/30 px-6 py-4 text-sm text-muted-foreground">
              <p className="mb-2">✓ Prices include: Meet & Greet, Flight Tracking, Waiting Time, All Taxes</p>
              <p>✓ Round trip discount: Book return transfer and save 10%</p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Button
              size="lg"
              className="text-lg px-8"
              onClick={() => {
                const bookingSection = document.querySelector('section');
                bookingSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Book Your CDG Transfer Now
            </Button>
          </div>
        </div>
      </section>

      {/* Fleet Section */}
      <FleetSection />

      {/* Safety First: Avoid Fake Taxis */}
      <section className="py-20 bg-amber-50 dark:bg-amber-900/10">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className="text-sm font-medium text-amber-700">Safety Guide</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
              Avoid Fake Taxi Scams at CDG
            </h2>
            <p className="text-lg text-muted-foreground">
              Thousands of tourists fall victim to fake taxi scams at Charles de Gaulle every year. Here's how to stay safe.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border-2 border-red-200 dark:border-red-800">
              <h3 className="text-xl font-semibold text-red-600 mb-4 flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Red Flags
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">❌</span>
                  <span>Driver approaches you inside the terminal</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">❌</span>
                  <span>No taxi meter or official license displayed</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">❌</span>
                  <span>Car has no "TAXI PARISIEN" roof sign</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">❌</span>
                  <span>Driver insists on cash only</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border-2 border-green-200 dark:border-green-800">
              <h3 className="text-xl font-semibold text-green-600 mb-4 flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Safe Alternative
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✅</span>
                  <span>Fixed price confirmed before you travel</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✅</span>
                  <span>Professional, vetted chauffeurs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✅</span>
                  <span>Flight tracking & meet & greet service</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✅</span>
                  <span>24/7 customer support</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <p className="text-lg text-muted-foreground mb-6">
              Want to learn more about how to protect yourself from taxi scams at Paris airports?
            </p>
            <a
              href="/guides/avoid-fake-taxis"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold text-lg underline"
            >
              Read our complete safety guide
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section - CDG Specific */}
      <section className="py-20 bg-background">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
              CDG Airport Transfer FAQ
            </h2>
            <p className="text-lg text-muted-foreground">
              Common questions about our Charles de Gaulle airport service
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Where will my driver meet me at CDG?",
                a: "Your chauffeur will wait at the arrivals hall exit with a name sign. We'll send you their contact details and photo before your arrival."
              },
              {
                q: "What if my flight is delayed?",
                a: "We track all flights in real-time. Your driver will adjust the pickup time automatically at no extra charge."
              },
              {
                q: "How long does it take from CDG to Paris center?",
                a: "Typically 45-60 minutes depending on traffic and your exact destination in Paris. We monitor traffic in real-time to choose the fastest route."
              },
              {
                q: "Can I book a transfer for a group?",
                a: "Yes! We have luxury vans that accommodate up to 7 passengers with luggage. Perfect for families or business groups."
              },
              {
                q: "Is the price really fixed?",
                a: "Absolutely. The price you see at booking is the final price. No hidden fees, no meter, no surprises."
              },
              {
                q: "What about luggage?",
                a: "Standard luggage is included. If you have extra-large items or more than 2 bags per person, please mention it during booking."
              }
            ].map((faq, index) => (
              <details key={index} className="bg-card border border-border rounded-lg p-6 group">
                <summary className="font-semibold text-lg cursor-pointer list-none flex items-center justify-between">
                  <span>{faq.q}</span>
                  <span className="text-secondary group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-muted-foreground leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Ready for Your CDG Transfer?
          </h2>
          <p className="text-xl mb-8 text-gray-100">
            Book now and enjoy a stress-free arrival in Paris
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8"
              onClick={() => {
                const bookingSection = document.querySelector('section');
                bookingSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Book Online Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 bg-white text-primary hover:bg-gray-100"
              onClick={() => window.open('https://wa.me/33123456789', '_blank')}
            >
              WhatsApp Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

