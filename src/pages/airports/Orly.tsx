import React from "react";
import { useNavigate } from "react-router-dom";
import { Plane, Clock, Shield, MapPin, CheckCircle, Star, Luggage, User, CreditCard, Bell } from "lucide-react";
import BookingForm from "@/components/BookingForm";
import FleetSection from "@/components/sections/FleetSection";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import type { BookingFormData } from "@/hooks/booking/types";

const ORLY_IMAGE = "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80";

export default function OrlyAirport() {
  const { t } = useTranslation();
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
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
                <Plane className="w-5 h-5 text-primary-200" />
                <span className="text-sm font-medium">Orly Airport</span>
              </div>

              <p className="font-accent italic text-xl md:text-2xl text-primary-200 mb-4">
                Premium Airport Transfer
              </p>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
                Orly Airport Transfer
                <span className="block text-primary-200 mt-2 text-3xl md:text-4xl">Fixed Price from €60</span>
              </h1>

              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Professional chauffeur service from Orly Airport to Paris city center.
                No hidden fees, flight tracking included.
              </p>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                  <CheckCircle className="w-6 h-6 text-primary-200 flex-shrink-0" />
                  <span className="text-sm font-medium">Flight Tracking</span>
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

      {/* Airport Description */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-white">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg border border-primary/10">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-primary mb-6">
              About Paris Orly Airport (ORY)
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="mb-4 leading-relaxed">
                <strong className="text-secondary">Paris Orly Airport (ORY)</strong> is the second-largest airport serving Paris,
                located just 13 kilometers south of the city center. Orly is particularly popular for domestic flights within France,
                European destinations, and flights to North Africa and the French overseas territories.
              </p>
              <p className="mb-4 leading-relaxed">
                The airport operates from <strong className="text-secondary">four terminals</strong> (Orly 1, 2, 3, and 4),
                with terminals 1-3 primarily serving domestic flights and Orly 4 handling international traffic.
                With over 33 million passengers annually, Orly offers a more compact and easier-to-navigate alternative to CDG.
              </p>
              <p className="leading-relaxed">
                Being closer to Paris than CDG, Orly is the ideal choice for quick access to the city center, southern Paris neighborhoods,
                and destinations like Disneyland Paris. Our private transfer service ensures a comfortable 30-45 minute journey to central Paris
                with fixed pricing and no surprises.
              </p>
            </div>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-primary/10">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">13 km</div>
                <div className="text-sm text-muted-foreground">From Paris Center</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">33M+</div>
                <div className="text-sm text-muted-foreground">Passengers/Year</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">4</div>
                <div className="text-sm text-muted-foreground">Terminals</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">30-45min</div>
                <div className="text-sm text-muted-foreground">To Paris Center</div>
              </div>
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
                  <td className="px-6 py-4 text-right font-bold text-secondary">€90</td>
                </tr>
                <tr className="hover:bg-accent/50 transition-colors">
                  <td className="px-6 py-4 font-medium">Orly → Disneyland Paris</td>
                  <td className="px-6 py-4 text-muted-foreground">Van (4-7 pax)</td>
                  <td className="px-6 py-4 text-right font-bold text-secondary">€117</td>
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

      {/* What's Included Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 via-white to-primary/10">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
              What's Included in Every Transfer
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              All-inclusive pricing with no hidden fees. Everything you need for a stress-free journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Meet & Greet */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-primary/10">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <User className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-secondary mb-2">Meet & Greet</h3>
              <p className="text-sm text-muted-foreground">
                Your driver will wait at arrivals with a name sign, ready to assist with your luggage.
              </p>
            </div>

            {/* Flight Tracking */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-primary/10">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Bell className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-secondary mb-2">Flight Tracking</h3>
              <p className="text-sm text-muted-foreground">
                We monitor your flight in real-time and adjust pickup time if there are delays.
              </p>
            </div>

            {/* Luggage Included */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-primary/10">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Luggage className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-secondary mb-2">1 Luggage/Pax</h3>
              <p className="text-sm text-muted-foreground">
                One large suitcase per passenger included. Extra luggage available for small fee.
              </p>
            </div>

            {/* All Taxes & Fees */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-primary/10">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <CreditCard className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-secondary mb-2">All Taxes Included</h3>
              <p className="text-sm text-muted-foreground">
                Fixed price with all taxes, tolls, and fees included. No surprises at the end.
              </p>
            </div>
          </div>

          {/* Additional Benefits */}
          <div className="mt-12 bg-white/80 backdrop-blur-sm p-8 rounded-xl border-2 border-primary/20">
            <h3 className="text-xl font-semibold text-secondary mb-6 text-center">Additional Benefits</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-secondary">Free Cancellation</p>
                  <p className="text-sm text-muted-foreground">Up to 24 hours before pickup</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-secondary">60 Minutes Wait Time</p>
                  <p className="text-sm text-muted-foreground">Free waiting at airport arrivals</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-secondary">24/7 Customer Support</p>
                  <p className="text-sm text-muted-foreground">WhatsApp & phone assistance</p>
                </div>
              </div>
            </div>
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

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
              Orly Airport Transfer FAQ
            </h2>
            <p className="text-lg text-muted-foreground">
              Common questions about our Orly airport service
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Where will my driver meet me at Orly?",
                a: "Your chauffeur will wait at the arrivals hall exit with a name sign. We serve both Orly 1-2-3 and Orly 4 terminals."
              },
              {
                q: "What if my flight is delayed?",
                a: "We track all flights in real-time. Your driver will adjust the pickup time automatically at no extra charge."
              },
              {
                q: "How long does it take from Orly to Paris center?",
                a: "Typically 30-45 minutes depending on traffic and your exact destination in Paris. Orly is closer to the city than CDG."
              },
              {
                q: "Which Orly terminals do you serve?",
                a: "We serve all Orly terminals: Orly 1, 2, 3 (domestic flights) and Orly 4 (international flights). Just provide your terminal number when booking."
              },
              {
                q: "Is the price really fixed?",
                a: "Absolutely. The price you see at booking is the final price. No hidden fees, no meter, no surprises."
              },
              {
                q: "Can I book a transfer to Disneyland from Orly?",
                a: "Yes! We offer direct transfers from Orly to Disneyland Paris. The journey takes approximately 45-60 minutes."
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
              Get Your Fixed Price Now
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


