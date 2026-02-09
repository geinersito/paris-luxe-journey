import React from "react";
import { ArrowRight } from "lucide-react";

interface MobileStickyCTAProps {
  label: string;
  onClick: () => void;
  isVisible: boolean;
}

export default function MobileStickyCTA({
  label,
  onClick,
  isVisible,
}: MobileStickyCTAProps) {
  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden border-t border-primary/20 bg-white/95 backdrop-blur-sm"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="px-4 py-3">
        <button
          onClick={onClick}
          className="silk-button w-full flex items-center justify-center gap-2 min-h-[48px] text-sm"
        >
          {label}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
