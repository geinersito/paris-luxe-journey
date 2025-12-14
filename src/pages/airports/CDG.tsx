import React from "react";
import { useNavigate } from "react-router-dom";
import { Plane, Clock, Shield, MapPin, CheckCircle, Star, Luggage, User, CreditCard, Bell } from "lucide-react";
import BookingForm from "@/components/BookingForm";
import FleetSection from "@/components/sections/FleetSection";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import type { BookingFormData } from "@/hooks/booking/types";

const CDG_IMAGE = "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80";

export default function CDGAirport() {
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
                <span className="text-sm font-medium">{t("airports.cdg.badge")}</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
                {t("airports.cdg.title")}
                <span className="block text-secondary mt-2">{t("airports.cdg.subtitle")}</span>
              </h1>

              <p className="text-xl text-gray-100 mb-8 leading-relaxed">
                {t("airports.cdg.description")}
              </p>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 bg-black/30 backdrop-blur-sm p-4 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0" />
                  <span className="text-sm">{t("airports.cdg.trustBadges.flightTracking")}</span>
                </div>
                <div className="flex items-center gap-3 bg-black/30 backdrop-blur-sm p-4 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0" />
                  <span className="text-sm">{t("airports.cdg.trustBadges.meetGreet")}</span>
                </div>
                <div className="flex items-center gap-3 bg-black/30 backdrop-blur-sm p-4 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0" />
                  <span className="text-sm">{t("airports.cdg.trustBadges.luggageIncluded")}</span>
                </div>
                <div className="flex items-center gap-3 bg-black/30 backdrop-blur-sm p-4 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0" />
                  <span className="text-sm">{t("airports.cdg.trustBadges.available247")}</span>
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

      {/* Airport Description */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-white">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg border border-primary/10">
            <div className="flex items-start justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-primary">
                {t("airports.cdg.about.title")}
              </h2>
              <div className="hidden md:block ml-4 flex-shrink-0">
                <div className="bg-gradient-to-br from-amber-400 to-amber-600 text-white px-4 py-2 rounded-lg shadow-lg text-center">
                  <div className="text-xs font-semibold uppercase tracking-wide">{t("airports.cdg.about.skytraxBadge.year")}</div>
                  <div className="text-sm font-bold">{t("airports.cdg.about.skytraxBadge.title")}</div>
                  <div className="text-xs opacity-90">{t("airports.cdg.about.skytraxBadge.subtitle")}</div>
                </div>
              </div>
            </div>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="mb-4 leading-relaxed">
                {t("airports.cdg.about.paragraph1")}
              </p>
              <p className="mb-4 leading-relaxed">
                {t("airports.cdg.about.paragraph2")}
              </p>
              <p className="leading-relaxed">
                {t("airports.cdg.about.paragraph3")}
              </p>
            </div>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4 pt-6 border-t border-primary/10">
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-600">#1</div>
                <div className="text-xs text-muted-foreground">{t("airports.cdg.about.stats.bestInEurope")}</div>
                <div className="text-xs text-amber-600 font-semibold">{t("airports.cdg.about.skytraxBadge.year")}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">25 km</div>
                <div className="text-sm text-muted-foreground">{t("airports.cdg.about.stats.fromParis")}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">76M+</div>
                <div className="text-sm text-muted-foreground">{t("airports.cdg.about.stats.passengers")}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">3</div>
                <div className="text-sm text-muted-foreground">{t("airports.cdg.about.stats.terminals")}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">320+</div>
                <div className="text-sm text-muted-foreground">{t("airports.cdg.about.stats.destinations")}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us for CDG */}
      <section className="py-20 bg-background">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
              {t("airports.cdg.whyChoose.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("airports.cdg.whyChoose.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Plane className="w-8 h-8" />,
                title: t("airports.cdg.whyChoose.benefits.allTerminals.title"),
                description: t("airports.cdg.whyChoose.benefits.allTerminals.description")
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: t("airports.cdg.whyChoose.benefits.flightTracking.title"),
                description: t("airports.cdg.whyChoose.benefits.flightTracking.description")
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: t("airports.cdg.whyChoose.benefits.meetGreet.title"),
                description: t("airports.cdg.whyChoose.benefits.meetGreet.description")
              },
              {
                icon: <MapPin className="w-8 h-8" />,
                title: t("airports.cdg.whyChoose.benefits.directRoutes.title"),
                description: t("airports.cdg.whyChoose.benefits.directRoutes.description")
              },
              {
                icon: <Star className="w-8 h-8" />,
                title: t("airports.cdg.whyChoose.benefits.premiumVehicles.title"),
                description: t("airports.cdg.whyChoose.benefits.premiumVehicles.description")
              },
              {
                icon: <CheckCircle className="w-8 h-8" />,
                title: t("airports.cdg.whyChoose.benefits.fixedPricing.title"),
                description: t("airports.cdg.whyChoose.benefits.fixedPricing.description")
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
              {t("airports.cdg.pricing.title")}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t("airports.cdg.pricing.subtitle")}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">{t("airports.cdg.pricing.table.route")}</th>
                  <th className="px-6 py-4 text-left font-semibold">{t("airports.cdg.pricing.table.vehicle")}</th>
                  <th className="px-6 py-4 text-right font-semibold">{t("airports.cdg.pricing.table.price")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr className="hover:bg-accent/50 transition-colors">
                  <td className="px-6 py-4 font-medium">{t("airports.cdg.pricing.table.cdgParis")}</td>
                  <td className="px-6 py-4 text-muted-foreground">{t("airports.cdg.pricing.table.sedan")}</td>
                  <td className="px-6 py-4 text-right font-bold text-secondary">€70</td>
                </tr>
                <tr className="hover:bg-accent/50 transition-colors">
                  <td className="px-6 py-4 font-medium">{t("airports.cdg.pricing.table.cdgParis")}</td>
                  <td className="px-6 py-4 text-muted-foreground">{t("airports.cdg.pricing.table.van")}</td>
                  <td className="px-6 py-4 text-right font-bold text-secondary">€90</td>
                </tr>
                <tr className="hover:bg-accent/50 transition-colors">
                  <td className="px-6 py-4 font-medium">{t("airports.cdg.pricing.table.cdgDisney")}</td>
                  <td className="px-6 py-4 text-muted-foreground">{t("airports.cdg.pricing.table.sedan")}</td>
                  <td className="px-6 py-4 text-right font-bold text-secondary">€95</td>
                </tr>
                <tr className="hover:bg-accent/50 transition-colors">
                  <td className="px-6 py-4 font-medium">{t("airports.cdg.pricing.table.cdgDisney")}</td>
                  <td className="px-6 py-4 text-muted-foreground">{t("airports.cdg.pricing.table.van")}</td>
                  <td className="px-6 py-4 text-right font-bold text-secondary">€120</td>
                </tr>
                <tr className="hover:bg-accent/50 transition-colors">
                  <td className="px-6 py-4 font-medium">{t("airports.cdg.pricing.table.cdgVersailles")}</td>
                  <td className="px-6 py-4 text-muted-foreground">{t("airports.cdg.pricing.table.sedan")}</td>
                  <td className="px-6 py-4 text-right font-bold text-secondary">€80</td>
                </tr>
                <tr className="hover:bg-accent/50 transition-colors">
                  <td className="px-6 py-4 font-medium">{t("airports.cdg.pricing.table.cdgVersailles")}</td>
                  <td className="px-6 py-4 text-muted-foreground">{t("airports.cdg.pricing.table.van")}</td>
                  <td className="px-6 py-4 text-right font-bold text-secondary">€104</td>
                </tr>
              </tbody>
            </table>

            <div className="bg-accent/30 px-6 py-4 text-sm text-muted-foreground">
              <p className="mb-2">✓ {t("airports.cdg.pricing.note")}</p>
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
              {t("airports.cdg.pricing.bookNow")}
            </Button>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 via-white to-primary/10">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
              {t("airports.cdg.whatsIncluded.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("airports.cdg.whatsIncluded.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Meet & Greet */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-primary/10">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <User className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-secondary mb-2">{t("airports.cdg.whatsIncluded.meetGreet.title")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("airports.cdg.whatsIncluded.meetGreet.description")}
              </p>
            </div>

            {/* Flight Tracking */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-primary/10">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Bell className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-secondary mb-2">{t("airports.cdg.whatsIncluded.flightTracking.title")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("airports.cdg.whatsIncluded.flightTracking.description")}
              </p>
            </div>

            {/* Luggage Included */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-primary/10">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Luggage className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-secondary mb-2">{t("airports.cdg.whatsIncluded.luggage.title")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("airports.cdg.whatsIncluded.luggage.description")}
              </p>
            </div>

            {/* All Taxes & Fees */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-primary/10">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <CreditCard className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-secondary mb-2">{t("airports.cdg.whatsIncluded.allTaxes.title")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("airports.cdg.whatsIncluded.allTaxes.description")}
              </p>
            </div>
          </div>

          {/* Additional Benefits */}
          <div className="mt-12 bg-white/80 backdrop-blur-sm p-8 rounded-xl border-2 border-primary/20">
            <h3 className="text-xl font-semibold text-secondary mb-6 text-center">{t("airports.cdg.whatsIncluded.additionalBenefits.title")}</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-secondary">{t("airports.cdg.whatsIncluded.additionalBenefits.freeCancellation.title")}</p>
                  <p className="text-sm text-muted-foreground">{t("airports.cdg.whatsIncluded.additionalBenefits.freeCancellation.description")}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-secondary">{t("airports.cdg.whatsIncluded.additionalBenefits.waitTime.title")}</p>
                  <p className="text-sm text-muted-foreground">{t("airports.cdg.whatsIncluded.additionalBenefits.waitTime.description")}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-secondary">{t("airports.cdg.whatsIncluded.additionalBenefits.support.title")}</p>
                  <p className="text-sm text-muted-foreground">{t("airports.cdg.whatsIncluded.additionalBenefits.support.description")}</p>
                </div>
              </div>
            </div>
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
              <span className="text-sm font-medium text-amber-700">{t("airports.cdg.safety.badge")}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
              {t("airports.cdg.safety.title")}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t("airports.cdg.safety.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border-2 border-red-200 dark:border-red-800">
              <h3 className="text-xl font-semibold text-red-600 mb-4 flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                {t("airports.cdg.safety.redFlags.title")}
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">❌</span>
                  <span>{t("airports.cdg.safety.redFlags.flag1")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">❌</span>
                  <span>{t("airports.cdg.safety.redFlags.flag2")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">❌</span>
                  <span>{t("airports.cdg.safety.redFlags.flag3")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">❌</span>
                  <span>{t("airports.cdg.safety.redFlags.flag4")}</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border-2 border-green-200 dark:border-green-800">
              <h3 className="text-xl font-semibold text-green-600 mb-4 flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {t("airports.cdg.safety.solution.title")}
              </h3>
              <p className="text-muted-foreground">
                {t("airports.cdg.safety.solution.description")}
              </p>
            </div>
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="silk-button text-lg px-10 py-6"
              onClick={() => {
                const bookingSection = document.querySelector('section');
                bookingSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {t("airports.cdg.safety.bookSafe")}
            </Button>
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
              },
              {
                q: "Which CDG terminals do you serve?",
                a: "We serve all CDG terminals: T1, T2A, T2B, T2C, T2D, T2E, T2F, T2G, and T3. Just provide your terminal number when booking."
              },
              {
                q: "Do you offer child seats?",
                a: "Yes! Child seats and booster seats are available free of charge. Please request them during booking and specify your child's age and weight."
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
      <section className="section-padding bg-gradient-to-br from-primary to-primary/90 text-white">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Ready for Your CDG Transfer?
          </h2>
          <p className="text-xl mb-8 text-white/90 leading-relaxed">
            Book now and enjoy a stress-free arrival in Paris
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-white text-lg px-10 py-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => {
                const bookingSection = document.querySelector('section');
                bookingSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Get Your Fixed Price Now
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

