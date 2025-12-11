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
 */
export function TrustBadge({ icon, text, className }: TrustBadgeProps) {
  return (
    <span
      className={cn(
        "flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-border/20 text-sm font-medium text-gray-200",
        className,
      )}
    >
      {icon}
      {text}
    </span>
  );
}
