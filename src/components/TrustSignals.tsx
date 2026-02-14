import {
  BadgeCheck,
  CircleDollarSign,
  CarTaxiFront,
  CreditCard,
  MessageCircle,
} from "lucide-react";
import type { ComponentType } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

type TrustSignalItem = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  body: string;
};

interface TrustSignalsProps {
  className?: string;
}

export default function TrustSignals({ className = "" }: TrustSignalsProps) {
  const { t } = useLanguage();

  const trustItems: TrustSignalItem[] = [
    {
      icon: BadgeCheck,
      title: t.trust.items.licensed.title,
      body: t.trust.items.licensed.body,
    },
    {
      icon: CircleDollarSign,
      title: t.trust.items.pricing.title,
      body: t.trust.items.pricing.body,
    },
    {
      icon: CarTaxiFront,
      title: t.trust.items.flexibility.title,
      body: t.trust.items.flexibility.body,
    },
    {
      icon: CreditCard,
      title: t.trust.items.payment.title,
      body: t.trust.items.payment.body,
    },
    {
      icon: MessageCircle,
      title: t.trust.items.support.title,
      body: t.trust.items.support.body,
    },
  ];

  return (
    <section
      aria-labelledby="trust-signals-title"
      className={`rounded-2xl border border-primary/15 bg-gradient-to-br from-white via-cream/40 to-champagne/40 p-4 md:p-5 shadow-sm ${className}`}
    >
      <div className="mb-4 text-center">
        <h2
          id="trust-signals-title"
          className="text-xl md:text-2xl font-display font-bold text-secondary"
        >
          {t.trust.title}
        </h2>
        <p className="text-sm md:text-base text-muted-foreground mt-1">
          {t.trust.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3">
        {trustItems.map((item) => {
          const Icon = item.icon;
          return (
            <article
              key={item.title}
              className="rounded-xl border border-primary/10 bg-white/85 px-3 py-3 text-left"
            >
              <div className="flex items-start gap-2">
                <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-4 w-4 text-primary" />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-secondary leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-snug">
                    {item.body}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
