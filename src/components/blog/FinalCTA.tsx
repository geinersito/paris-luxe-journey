import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import BookingForm from "@/components/BookingForm";

export default function FinalCTA() {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const benefits = [
    t("blog.professionalService") || "Professional chauffeur service",
    t("blog.freeCancellation") || "Free cancellation up to 24h",
    t("blog.flightMonitoring") || "Flight monitoring included",
    t("blog.premiumVehicles") || "Premium vehicles (Mercedes, BMW)",
  ];

  return (
    <>
      <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-2xl p-8 md:p-12 my-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("blog.readyToBook") || "Ready to Book Your Transfer?"}
            </h2>
            <p className="text-muted-foreground mb-6">
              Experience hassle-free airport transfers with our professional
              chauffeur service. Fixed prices, no hidden fees, and premium
              vehicles.
            </p>

            {/* Benefits List */}
            <ul className="space-y-3 mb-6">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>

            <Button
              size="lg"
              onClick={() => setIsModalOpen(true)}
              className="w-full md:w-auto"
            >
              {t("blog.bookNow") || "Book Now"}
            </Button>
          </div>

          {/* Image */}
          <div className="hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&h=400&fit=crop"
              alt="Luxury vehicle"
              className="rounded-lg shadow-lg w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {isModalOpen && (
        <BookingForm
          tourId="blog-cta"
          tourName="Airport Transfer"
          onSubmit={async () => {}}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
