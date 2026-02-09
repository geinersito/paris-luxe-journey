import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function HashScroll() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    const id = location.hash.slice(1);

    // Use requestAnimationFrame for SPA-safe scroll after DOM paint
    requestAnimationFrame(() => {
      const element = document.getElementById(id);
      if (!element) return;

      // Get navbar height for proper offset
      const navbar = document.querySelector("nav");
      const headerOffset = navbar?.getBoundingClientRect().height ?? 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.scrollY - headerOffset - 8;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    });
  }, [location.hash, location.pathname]);

  return null;
}
