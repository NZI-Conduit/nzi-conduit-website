import { useState, useEffect } from "react";

/**
 * Lightweight, zero-dependency hook to detect prefers-reduced-motion
 */
export function useReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e) => setPrefersReduced(e.matches);

    if (mq.addEventListener) {
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    } else if (mq.addListener) {
      mq.addListener(onChange);
      return () => mq.removeListener(onChange);
    }
  }, []);

  return prefersReduced;
}
