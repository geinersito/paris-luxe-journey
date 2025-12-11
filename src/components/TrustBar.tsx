import React from "react";
import { ShieldCheck, Award, Clock, Shield } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * TrustBar - Barra de señales de confianza
 * Muestra 4 badges que aumentan la percepción de seguridad y reducen abandono en checkout
 * Basado en benchmarks VTC que muestran +15% conversión
 */
export default function TrustBar() {
  const { t } = useLanguage();

  const trustItems = [
    {
      icon: ShieldCheck,
      label: t.trustBar?.securePayment || "Secure Payment",
      description: t.trustBar?.securePaymentDesc || "SSL encrypted",
    },
    {
      icon: Award,
      label: t.trustBar?.licensed || "Licensed & Insured",
      description: t.trustBar?.licensedDesc || "Official VTC license",
    },
    {
      icon: Clock,
      label: t.trustBar?.available || "24/7 Available",
      description: t.trustBar?.availableDesc || "Always at your service",
    },
    {
      icon: Shield,
      label: t.trustBar?.insurance || "Full Insurance",
      description: t.trustBar?.insuranceDesc || "Complete coverage",
    },
  ];

  return (
    <div className="w-full bg-accent/50 border-t border-b border-border py-6 px-4">
      <div className="container max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center gap-2 p-3 rounded-lg hover:bg-white/50 dark:hover:bg-black/20 transition-colors duration-200"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                  <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-secondary dark:text-primary-foreground">
                    {item.label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
