import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function HashScroll() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    const id = location.hash.slice(1);
    let attempts = 0;

    const scrollToElement = () => {
      const element = document.getElementById(id);
      if (!element) {
        // Element not in DOM yet (lazy load or HMR re-mount) — retry up to 1s
        if (++attempts < 10) setTimeout(scrollToElement, 100);
        return;
      }

      const navbar = document.querySelector("nav");
      const headerOffset = navbar?.getBoundingClientRect().height ?? 80;
      const offsetPosition =
        element.getBoundingClientRect().top + window.scrollY - headerOffset - 8;

      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    };

    requestAnimationFrame(scrollToElement);
  }, [location.hash, location.pathname]);

  return null;
}
