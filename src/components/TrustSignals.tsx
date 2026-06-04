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
      className={`border border-ref-ink/8 bg-white p-4 md:p-5 ${className}`}
    >
      <div className="mb-4 text-center">
        <h2
          id="trust-signals-title"
          className="text-xl md:text-2xl font-editorial font-light text-ref-ink"
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
              className="border border-ref-ink/8 bg-white px-3 py-3 text-left"
            >
              <div className="flex items-start gap-2">
                <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center bg-ref-navy/8">
                  <Icon className="h-4 w-4 text-ref-navy" />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-ref-ink leading-tight">
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
