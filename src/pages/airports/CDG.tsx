import { useNavigate } from "react-router-dom";
import {
  Plane,
  Clock,
  Shield,
  MapPin,
  CheckCircle,
  Star,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CDG_IMAGE =
  "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80";

export default function CDGAirport() {
  const navigate = useNavigate();

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
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
              <Plane className="w-5 h-5 text-primary-200" />
              <span className="text-sm font-medium">
                Paris Charles de Gaulle Airport
              </span>
            </div>

            <p className="font-accent italic text-xl md:text-2xl text-primary-200 mb-4">
              Premium Airport Transfer
            </p>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
              CDG Airport Transfers
              <span className="block text-primary-200 mt-2 text-2xl md:text-3xl">
                Fixed Price • Professional Drivers • 24/7
              </span>
            </h1>

            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
              Professional chauffeur service from Paris Charles de Gaulle
              Airport to anywhere in Paris. Flight monitoring included, no
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
                <span className="text-sm font-medium">All Terminals</span>
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
              About Paris Charles de Gaulle Airport (CDG)
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="mb-4 leading-relaxed">
                <strong className="text-secondary">
                  Paris Charles de Gaulle Airport (CDG)
                </strong>{" "}
                is the largest international airport in France and the
                second-busiest in Europe. Located 25 kilometers northeast of
                Paris, CDG is the primary hub for Air France and serves as a
                major gateway for international travelers visiting Paris and
                connecting throughout Europe.
              </p>
              <p className="mb-4 leading-relaxed">
                The airport operates from{" "}
                <strong className="text-secondary">three main terminals</strong>{" "}
                (Terminal 1, 2, and 3), with Terminal 2 being the largest and
                divided into multiple sub-terminals (2A through 2G). CDG handles
                over 76 million passengers annually, offering connections to
                virtually every continent.
              </p>
              <p className="leading-relaxed">
                As France's premier international airport, CDG provides access
                to central Paris, La Défense business district, Disneyland
                Paris, and the entire Île-de-France region. Our private transfer
                service offers a comfortable, direct journey with fixed pricing,
                real-time flight monitoring, and professional chauffeurs
                familiar with all terminals and the most efficient routes to
                your destination.
              </p>
            </div>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-primary/10">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">25 km</div>
                <div className="text-sm text-muted-foreground">
                  From Paris Center
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">76M+</div>
                <div className="text-sm text-muted-foreground">
                  Passengers/Year
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">3</div>
                <div className="text-sm text-muted-foreground">
                  Main Terminals
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">45-60min</div>
                <div className="text-sm text-muted-foreground">
                  To Paris Center
                </div>
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
              Why Choose Paris Elite for CDG Transfers?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Specialized airport transfer service with extensive experience at
              Paris CDG
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Plane className="w-8 h-8" />,
                title: "All Terminals & Gates",
                description:
                  "We serve all CDG terminals (1, 2A-2G, 3) with expertise in the complex layout",
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: "Real-Time Flight Tracking",
                description:
                  "We monitor your flight status and adjust pickup time automatically. No extra charge for delays",
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Personalized Meet & Greet",
                description:
                  "Your chauffeur meets you at arrivals with a name sign, ready to assist",
              },
              {
                icon: <MapPin className="w-8 h-8" />,
                title: "Optimized Routes",
                description:
                  "Fastest routes to central Paris, business districts, or any destination in the region",
              },
              {
                icon: <Star className="w-8 h-8" />,
                title: "Premium Fleet",
                description:
                  "Mercedes E-Class, S-Class, and luxury minivans for groups and families",
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: "Multilingual Drivers",
                description:
                  "Professional chauffeurs speaking English, French, and other languages",
              },
            ].map((benefit, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 shadow-sm border border-primary/5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-primary mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button
              size="lg"
              onClick={() => navigate("/booking")}
              className="bg-secondary hover:bg-secondary/90 text-white px-8 py-4 text-lg font-semibold shadow-lg"
            >
              Book Your CDG Transfer Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
