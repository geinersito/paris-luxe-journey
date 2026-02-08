import { useNavigate } from "react-router-dom";
import { Clock, MapPin, Shield, Star, CheckCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const HOURLY_IMAGE =
  "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80";

export default function HourlyService() {
  const navigate = useNavigate();

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(
      "Hello, I'm interested in hourly chauffeur service (mise à disposition) in Paris. Could you provide a quote?",
    );
    window.open(`https://wa.me/33123456789?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center py-24 overflow-hidden">
        <img
          src={HOURLY_IMAGE}
          alt="Hourly Chauffeur Service in Paris"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-black/70 to-primary-dark/90" />

        <div className="container relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
              <Clock className="w-5 h-5 text-primary-200" />
              <span className="text-sm font-medium">Mise à Disposition</span>
            </div>

            <p className="font-accent italic text-xl md:text-2xl text-primary-200 mb-4">
              Premium Hourly Service
            </p>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
              Chauffeur by the Hour
              <span className="block text-primary-200 mt-2 text-2xl md:text-3xl">
                Flexible Service • As-Directed • VIP Schedules
              </span>
            </h1>

            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
              Professional chauffeur service by the hour for meetings, shopping,
              tours, and flexible itineraries in Paris and surroundings.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                onClick={() => navigate("/hourly/quote?intent=hourly")}
                className="bg-secondary hover:bg-secondary/90 text-white px-8 py-6 text-lg font-semibold shadow-xl"
              >
                Request an Hourly Quote
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleWhatsAppContact}
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white/30 px-8 py-6 text-lg font-semibold"
              >
                WhatsApp Us
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="flex flex-col items-center gap-2 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                <Clock className="w-6 h-6 text-primary-200" />
                <span className="text-sm font-medium">Flexible Hours</span>
              </div>
              <div className="flex flex-col items-center gap-2 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                <Shield className="w-6 h-6 text-primary-200" />
                <span className="text-sm font-medium">Professional</span>
              </div>
              <div className="flex flex-col items-center gap-2 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                <MapPin className="w-6 h-6 text-primary-200" />
                <span className="text-sm font-medium">As-Directed</span>
              </div>
              <div className="flex flex-col items-center gap-2 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                <CheckCircle className="w-6 h-6 text-primary-200" />
                <span className="text-sm font-medium">24/7 Available</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Description */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-white">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg border border-primary/10">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-primary mb-6">
              Hourly Chauffeur Service (Mise à Disposition)
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="mb-4 leading-relaxed">
                <strong className="text-secondary">
                  Chauffeur by the hour
                </strong>{" "}
                (mise à disposition or MAD) is the ultimate flexible solution
                for VIP schedules, business meetings, shopping tours, or any
                itinerary requiring multiple stops and waiting time throughout
                Paris and Île-de-France.
              </p>
              <p className="mb-4 leading-relaxed">
                Unlike point-to-point transfers, hourly service means your
                professional chauffeur remains at your disposal for the duration
                you book, adapting to your schedule changes in real-time. No
                rush, no stress—your chauffeur waits while you attend meetings,
                visit shops, or explore sights.
              </p>
              <p className="leading-relaxed">
                Ideal for corporate executives, luxury shoppers, city tours, or
                multi-venue events. Pricing is based on hours booked and vehicle
                category. Contact us for a personalized quote based on your
                needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Hourly Service */}
      <section className="py-20 bg-background">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
              Why Choose Hourly Chauffeur Service?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The most flexible and stress-free way to navigate Paris
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <MapPin className="w-8 h-8" />,
                title: "As-Directed Itinerary",
                description:
                  "Change your route or add stops on the fly. Your chauffeur adapts to your schedule",
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: "Waiting Time Included",
                description:
                  "Your chauffeur waits while you shop, attend meetings, or visit attractions",
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Professional Chauffeur",
                description:
                  "Experienced, discreet, and knowledgeable about Paris and surroundings",
              },
              {
                icon: <Star className="w-8 h-8" />,
                title: "Premium Vehicles",
                description:
                  "Mercedes E-Class, S-Class, or luxury vans depending on your needs",
              },
              {
                icon: <CheckCircle className="w-8 h-8" />,
                title: "Flexible Stops",
                description:
                  "Multiple pickups/drop-offs included. No per-stop surcharges",
              },
              {
                icon: <Phone className="w-8 h-8" />,
                title: "24/7 Coordination",
                description:
                  "Direct contact with your chauffeur and our operations team",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-6 shadow-sm border border-primary/10 hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-primary">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Final CTA */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 md:p-12 border border-primary/20">
              <h3 className="text-2xl md:text-3xl font-display font-bold text-primary mb-4">
                Ready to Book Your Chauffeur?
              </h3>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                Contact us for a personalized quote based on your schedule,
                vehicle preference, and itinerary.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => navigate("/hourly/quote?intent=hourly")}
                  className="bg-secondary hover:bg-secondary/90 text-white px-8 py-4 text-lg font-semibold"
                >
                  Get a Quote
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleWhatsAppContact}
                  className="border-primary/30 text-primary hover:bg-primary/10 px-8 py-4 text-lg font-semibold"
                >
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
