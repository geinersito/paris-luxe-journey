import React from "react";
import { cn } from "@/lib/utils";

interface TrustBadgeProps {
  icon: React.ReactNode;
  text: string;
  className?: string;
}

/**
 * TrustBadge - Componente reutilizable para badges de confianza
 * Usado en HeroSection para mostrar garantías (Fixed price, No fees, Free cancel)
 * Versión mejorada con efectos premium y animaciones
 */
export function TrustBadge({ icon, text, className }: TrustBadgeProps) {
  return (
    <span
      className={cn(
        "group flex items-center gap-2 px-4 py-2 rounded-full",
        "bg-white/10 backdrop-blur-md border border-white/20",
        "text-sm font-semibold text-white",
        "transition-all duration-300 ease-luxury",
        "hover:bg-white/20 hover:border-white/30 hover:scale-105",
        "hover:shadow-gold-glow",
        "focus-visible-luxury",
        className,
      )}
    >
      <span className="transition-transform duration-300 group-hover:scale-110">
        {icon}
      </span>
      <span className="tracking-wide">{text}</span>
    </span>
  );
}
