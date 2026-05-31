import { useTranslation } from "react-i18next";
import { buildBlogWhatsAppUrl } from "@/lib/eventsPrefill";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import type { CtaVariant } from "@/types/blog";

interface FinalCTAProps {
  variant?: CtaVariant;
}

export default function FinalCTA({ variant = "generic" }: FinalCTAProps) {
  const { t, i18n } = useTranslation();

  const benefits = [
    t("blog.professionalService") || "Professional chauffeur service",
    t("blog.freeCancellation") || "Free cancellation up to 24h",
    t("blog.flightMonitoring") || "Flight monitoring included",
    t("blog.premiumVehicles") || "Premium vehicles (Mercedes, BMW)",
  ];

  const ctaHeading = t(`blog.cta.${variant}.heading`) || t("blog.readyToBook");
  const ctaBody = t(`blog.cta.${variant}.body`) || t("blog.ctaBody");
  const ctaButton = t(`blog.cta.${variant}.button`) || t("blog.bookNow");

  return (
    <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-2xl p-8 md:p-12 my-12">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Text Content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {ctaHeading}
          </h2>
          <p className="text-muted-foreground mb-6">{ctaBody}</p>

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
            onClick={() =>
              window.open(buildBlogWhatsAppUrl(i18n.language), "_blank")
            }
            className="w-full md:w-auto"
          >
            {ctaButton}
          </Button>
        </div>

        {/* Image */}
        <div className="hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&h=400&fit=crop"
            alt="Mercedes premium chauffeur vehicle"
            className="rounded-lg shadow-lg w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>
  );
}
