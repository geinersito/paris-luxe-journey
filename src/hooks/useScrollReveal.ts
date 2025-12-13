import { useEffect, useRef, useState } from 'react';

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Custom hook for scroll-triggered animations
 * Uses IntersectionObserver for performance
 * 
 * @example
 * const { ref, isVisible } = useScrollReveal({ threshold: 0.1, triggerOnce: true });
 * 
 * <div ref={ref} className={isVisible ? 'animate-fadeInUp' : 'opacity-0'}>
 *   Content
 * </div>
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {}
) {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
  } = options;

  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
}

/**
 * Hook for staggered animations (multiple elements)
 * 
 * @example
 * const items = useStaggeredReveal(4, { delay: 100 });
 * 
 * {items.map((item, index) => (
 *   <div key={index} ref={item.ref} className={item.isVisible ? 'animate-fadeInUp' : 'opacity-0'}>
 *     Item {index}
 *   </div>
 * ))}
 */
export function useStaggeredReveal(
  count: number,
  options: UseScrollRevealOptions & { delay?: number } = {}
) {
  const { delay = 100, ...revealOptions } = options;
  const items = Array.from({ length: count }, () => useScrollReveal(revealOptions));

  return items.map((item, index) => ({
    ...item,
    style: {
      animationDelay: `${index * delay}ms`,
      animationFillMode: 'both' as const,
    },
  }));
}

