import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HourlyQuote() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const intent = searchParams.get("intent");

  useEffect(() => {
    if (intent !== "hourly") {
      navigate("/hourly", { replace: true });
    }
  }, [intent, navigate]);

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(
      "Hello, I'm interested in hourly chauffeur service (mise à disposition) in Paris. Could you provide a quote?",
    );
    window.open(`https://wa.me/33123456789?text=${message}`, "_blank");
  };

  const handleEmailContact = () => {
    window.location.href =
      "mailto:contact@parisluxejourney.com?subject=Hourly Service Quote Request";
  };

  if (intent !== "hourly") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-white py-12">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg border border-primary/10 p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">
                Hourly Service
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
              Request an Hourly Quote
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our team will provide a personalized quote based on your schedule,
              vehicle preference, and itinerary.
            </p>
          </div>

          <div className="space-y-6 mb-8">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 border border-primary/20">
              <h2 className="text-xl font-semibold text-primary mb-3">
                What to Include in Your Request
              </h2>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Desired date and time of service</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Expected duration (minimum 3 hours)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    Starting location and general itinerary (if known)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Number of passengers and luggage requirements</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    Preferred vehicle type (sedan, luxury sedan, or van)
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              size="lg"
              onClick={handleWhatsAppContact}
              className="bg-secondary hover:bg-secondary/90 text-white px-8 py-6 text-lg font-semibold"
            >
              <Phone className="w-5 h-5 mr-2" />
              WhatsApp Us
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleEmailContact}
              className="border-primary/30 text-primary hover:bg-primary/10 px-8 py-6 text-lg font-semibold"
            >
              <Mail className="w-5 h-5 mr-2" />
              Email Us
            </Button>
          </div>

          <div className="text-center">
            <Button
              variant="ghost"
              onClick={() => navigate("/hourly")}
              className="text-muted-foreground hover:text-primary"
            >
              ← Back to Hourly Service Info
            </Button>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            For immediate point-to-point transfers, please use our{" "}
            <button
              onClick={() => navigate("/booking")}
              className="text-primary hover:underline font-medium"
            >
              standard booking form
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
