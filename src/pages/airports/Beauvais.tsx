import React from "react";
import { useNavigate } from "react-router-dom";
import { Plane, Clock, Shield, MapPin, CheckCircle, Star, Luggage, User, CreditCard, Bell } from "lucide-react";
import BookingForm from "@/components/BookingForm";
import FleetSection from "@/components/sections/FleetSection";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import type { BookingFormData } from "@/hooks/booking/types";

const BEAUVAIS_IMAGE = "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80";

export default function BeauvaisAirport() {
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
          src={BEAUVAIS_IMAGE}
          alt="Paris Beauvais Airport Transfer"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-black/70 to-primary-dark/90" />
        
        <div className="container relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
                <Plane className="w-5 h-5 text-primary-200" />
                <span className="text-sm font-medium">Beauvais-Tillé Airport</span>
              </div>

              <p className="font-accent italic text-xl md:text-2xl text-primary-200 mb-4">
                Premium Airport Transfer
              </p>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
                Beauvais Airport Transfer
                <span className="block text-primary-200 mt-2 text-3xl md:text-4xl">Fixed Price from €130</span>
              </h1>

              <p className="text-xl text-gray-100 mb-8 leading-relaxed">
                Reliable chauffeur service from Beauvais-Tillé Airport to Paris city center. 
                85km direct transfer with no hidden fees.
              </p>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 bg-black/30 backdrop-blur-sm p-4 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-primary-200 flex-shrink-0" />
                  <span className="text-sm">Flight Tracking</span>
                </div>
                <div className="flex items-center gap-3 bg-black/30 backdrop-blur-sm p-4 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-primary-200 flex-shrink-0" />
                  <span className="text-sm">Meet & Greet</span>
                </div>
                <div className="flex items-center gap-3 bg-black/30 backdrop-blur-sm p-4 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-primary-200 flex-shrink-0" />
                  <span className="text-sm">1 Luggage/Pax Included</span>
                </div>
                <div className="flex items-center gap-3 bg-black/30 backdrop-blur-sm p-4 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-primary-200 flex-shrink-0" />
                  <span className="text-sm">24/7 Available</span>
                </div>
              </div>
            </div>

            {/* Right: Booking Form */}
            <div className="bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-2xl">
              <BookingForm
                tourId="beauvais-transfer"
                tourName="Beauvais Airport Transfer"
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
              About Paris Beauvais Airport (BVA)
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="mb-4 leading-relaxed">
                <strong className="text-secondary">Paris Beauvais-Tillé Airport (BVA)</strong> is located 85 kilometers north of Paris,
                primarily serving low-cost carriers like Ryanair and Wizzair. Despite its distance from the city, Beauvais is a popular choice
                for budget-conscious travelers flying to and from destinations across Europe and North Africa.
              </p>
              <p className="mb-4 leading-relaxed">
                While officially named "Paris-Beauvais," the airport is actually closer to the town of Beauvais than to Paris itself.
                The official shuttle bus service takes <strong className="text-secondary">90+ minutes</strong> with multiple stops and costs €17 per person.
                Many travelers find this inconvenient, especially with luggage or after a long flight.
              </p>
              <p className="leading-relaxed">
                Our private transfer service offers a <strong className="text-secondary">direct, door-to-door solution</strong> in just 60-75 minutes,
                taking you straight to your Paris hotel or any destination in the region. With fixed pricing from €130 for up to 3 passengers,
                it's the most comfortable and time-efficient way to reach Paris from Beauvais.
              </p>
            </div>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-primary/10">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">85 km</div>
                <div className="text-sm text-muted-foreground">From Paris Center</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">60-75min</div>
                <div className="text-sm text-muted-foreground">Direct Transfer</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">€130</div>
                <div className="text-sm text-muted-foreground">Fixed Price (1-3 pax)</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">vs €17</div>
                <div className="text-sm text-muted-foreground">Shuttle Bus (90+ min)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us for Beauvais */}
      <section className="py-20 bg-background">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
              Why Choose Paris Elite for Beauvais Transfers?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Beauvais is 85km from Paris. Skip the bus and travel in comfort with our direct transfer service
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Clock className="w-8 h-8" />,
                title: "Faster Than Bus",
                description: "Direct transfer in 60-75 minutes vs 90+ minutes by shuttle bus"
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Door-to-Door Service",
                description: "No waiting for buses or metro connections. We take you directly to your hotel"
              },
              {
                icon: <Luggage className="w-8 h-8" />,
                title: "Luggage Included",
                description: "1 large suitcase + 1 cabin bag per passenger included in price"
              },
              {
                icon: <MapPin className="w-8 h-8" />,
                title: "All Paris Destinations",
                description: "Any address in Paris, Disneyland, or other airports"
              },
              {
                icon: <Star className="w-8 h-8" />,
                title: "Premium Comfort",
                description: "Mercedes E-Class sedans and V-Class vans for groups"
              },
              {
                icon: <CheckCircle className="w-8 h-8" />,
                title: "Fixed Pricing",
                description: "€130 for 1-3 passengers, €150 for 4-7. No surprises"
              }
            ].map((benefit, index) => (
              <div key={index} className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
                <div className="text-primary mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-secondary">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
              Beauvais Transfer Pricing
            </h2>
            <p className="text-lg text-muted-foreground">
              All-inclusive fixed prices. No hidden fees, no surprises.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-primary/20">
            <table className="w-full">
              <thead className="bg-primary/10">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-secondary">Route</th>
                  <th className="px-6 py-4 text-left font-semibold text-secondary">Vehicle Type</th>
                  <th className="px-6 py-4 text-right font-semibold text-secondary">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr className="hover:bg-accent/50 transition-colors">
                  <td className="px-6 py-4 font-medium">Beauvais → Paris Center</td>
                  <td className="px-6 py-4 text-muted-foreground">Sedan (1-3 pax)</td>
                  <td className="px-6 py-4 text-right font-bold text-secondary">€130</td>
                </tr>
                <tr className="hover:bg-accent/50 transition-colors">
                  <td className="px-6 py-4 font-medium">Beauvais → Paris Center</td>
                  <td className="px-6 py-4 text-muted-foreground">Van (4-7 pax)</td>
                  <td className="px-6 py-4 text-right font-bold text-secondary">€150</td>
                </tr>
              </tbody>
            </table>

            <div className="bg-accent/30 px-6 py-4 text-sm text-muted-foreground">
              <p className="mb-2">✓ Prices include: Meet & Greet, Flight Tracking, Waiting Time, All Taxes & Tolls</p>
              <p>✓ Round trip discount: Book return transfer and save 10%</p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Button
              size="lg"
              className="silk-button text-lg px-10 py-6"
              onClick={() => {
                const bookingSection = document.querySelector('section');
                bookingSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              See Your Price & Book Now
            </Button>
          </div>

          <div className="mt-8 p-6 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong className="text-amber-900 dark:text-amber-100">💡 Pro Tip:</strong> Beauvais is 85km from Paris (vs 25km for CDG).
              The official shuttle bus costs €17 and takes 90+ minutes with multiple stops. Our direct transfer saves you time and hassle for just €130.
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary/90 to-primary-dark text-white">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Ready to Book Your Beauvais Transfer?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Skip the shuttle bus. Travel in comfort with our direct transfer service from Beauvais to Paris.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 text-lg px-10 py-6 rounded-xl font-semibold transition-all duration-300"
              onClick={() => {
                const bookingSection = document.querySelector('section');
                bookingSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Get Fixed Price - From €130
            </Button>
            <Button
              size="lg"
              className="bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 hover:border-white/50 text-lg px-10 py-6 rounded-xl font-semibold backdrop-blur-sm transition-all duration-300"
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


