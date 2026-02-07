import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Plane,
  Clock,
  Shield,
  MapPin,
  CheckCircle,
  Star,
  Luggage,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const BEAUVAIS_IMAGE =
  "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80";

export default function BeauvaisAirport() {
  const navigate = useNavigate();

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
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
              <Plane className="w-5 h-5 text-primary-200" />
              <span className="text-sm font-medium">
                Paris Beauvais Airport
              </span>
            </div>

            <p className="font-accent italic text-xl md:text-2xl text-primary-200 mb-4">
              Premium Airport Transfer
            </p>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
              Beauvais Airport Transfers
              <span className="block text-primary-200 mt-2 text-2xl md:text-3xl">
                Fixed Price • Professional Drivers • 24/7
              </span>
            </h1>

            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
              Professional chauffeur service from Paris Beauvais Airport to
              anywhere in Paris. Direct transfer, flight monitoring included, no
              hidden fees.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                onClick={() => navigate("/booking")}
                className="bg-secondary hover:bg-secondary/90 text-white px-8 py-6 text-lg font-semibold shadow-xl"
              >
                Get a Fixed Price
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="flex flex-col items-center gap-2 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                <Clock className="w-6 h-6 text-primary-200" />
                <span className="text-sm font-medium">Flight Tracking</span>
              </div>
              <div className="flex flex-col items-center gap-2 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                <Shield className="w-6 h-6 text-primary-200" />
                <span className="text-sm font-medium">Meet & Greet</span>
              </div>
              <div className="flex flex-col items-center gap-2 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                <MapPin className="w-6 h-6 text-primary-200" />
                <span className="text-sm font-medium">Door-to-Door</span>
              </div>
              <div className="flex flex-col items-center gap-2 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                <CheckCircle className="w-6 h-6 text-primary-200" />
                <span className="text-sm font-medium">24/7 Available</span>
              </div>
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
                <strong className="text-secondary">
                  Paris Beauvais-Tillé Airport (BVA)
                </strong>{" "}
                is located 85 kilometers north of Paris, primarily serving
                low-cost carriers like Ryanair and Wizzair. Despite its distance
                from the city, Beauvais is a popular choice for budget-conscious
                travelers flying to and from destinations across Europe and
                North Africa.
              </p>
              <p className="mb-4 leading-relaxed">
                While officially named "Paris-Beauvais," the airport is actually
                closer to the town of Beauvais than to Paris itself. The
                official shuttle bus service takes{" "}
                <strong className="text-secondary">90+ minutes</strong> with
                multiple stops. Many travelers find this inconvenient,
                especially with luggage or after a long flight.
              </p>
              <p className="leading-relaxed">
                Our private transfer service offers a{" "}
                <strong className="text-secondary">
                  direct, door-to-door solution
                </strong>{" "}
                in just 60-75 minutes, taking you straight to your Paris hotel
                or any destination in the region. With fixed pricing, flight
                monitoring, and professional chauffeurs, it's the most
                comfortable and time-efficient way to reach Paris from Beauvais.
              </p>
            </div>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-primary/10">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">85 km</div>
                <div className="text-sm text-muted-foreground">
                  From Paris Center
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">4M+</div>
                <div className="text-sm text-muted-foreground">
                  Passengers/Year
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">1</div>
                <div className="text-sm text-muted-foreground">
                  Main Terminal
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">60-75min</div>
                <div className="text-sm text-muted-foreground">
                  Direct Transfer
                </div>
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
              Skip the shuttle bus and travel in comfort with our direct
              transfer service
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Clock className="w-8 h-8" />,
                title: "Faster Than Shuttle",
                description:
                  "Direct transfer in 60-75 minutes vs 90+ minutes by shuttle bus",
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Door-to-Door Service",
                description:
                  "No waiting for buses or metro connections. We take you directly to your destination",
              },
              {
                icon: <Luggage className="w-8 h-8" />,
                title: "Luggage Included",
                description:
                  "One large suitcase per passenger included. Extra luggage assistance available",
              },
              {
                icon: <MapPin className="w-8 h-8" />,
                title: "All Paris Destinations",
                description:
                  "Any address in Paris, Île-de-France, Disneyland, or other airports",
              },
              {
                icon: <Star className="w-8 h-8" />,
                title: "Premium Vehicles",
                description:
                  "Mercedes E-Class, S-Class, and luxury vans for groups",
              },
              {
                icon: <CheckCircle className="w-8 h-8" />,
                title: "Fixed Pricing",
                description:
                  "Price confirmed at booking. No surprises, no meter running",
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow"
              >
                <div className="text-secondary mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* CTA Bottom */}
          <div className="mt-12 text-center">
            <Button
              size="lg"
              onClick={() => navigate("/booking")}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg font-semibold shadow-xl"
            >
              Book Your Transfer Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
