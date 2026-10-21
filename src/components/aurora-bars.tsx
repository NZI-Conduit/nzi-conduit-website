"use client";

import * as React from "react";
import { useReducedMotion } from "../lib/useReducedMotion";

export interface AuroraBarsProps {
  /** @default 24 */
  barCount?: number;
  /** gradient color stops, bottom to top — @default ["#ff2d78", "#c04aff", "#4a6fff", "#0a1aff", "#00000000"] */
  colors?: string[];
  /** max bar height as fraction of container height — @default 0.92 */
  maxHeightRatio?: number;
  /** min bar height as fraction of container height — @default 0.18 */
  minHeightRatio?: number;
  /** undulation speed — @default 0.5 */
  speed?: number;
  /** @default 3 */
  gap?: number;
  /** px blur per bar, creates soft glow — @default 0 */
  blur?: number;
  /** @default "#FFFFFF" */
  background?: string;
  showVignette?: boolean;
  /** Custom vignette overlay color — @default "rgba(113, 42, 226, 0.15)" */
  vignetteColor?: string;
  className?: string;
}

/** Two sine waves per bar for organic movement */
function barHeight(
  index: number,
  total: number,
  time: number,
  minH: number,
  maxH: number
): number {
  const norm = index / (total - 1 || 1);
  const arch = Math.sin(norm * Math.PI);

  const phase1 = (index / total) * Math.PI * 2;
  const phase2 = (index / total) * Math.PI * 5.3;

  const wave =
    0.5 +
    0.25 * Math.sin(time * 1.1 + phase1) +
    0.25 * Math.sin(time * 0.7 + phase2);

  const blended = arch * 0.65 + wave * 0.35;
  return minH + blended * (maxH - minH);
}

export function AuroraBars({
  barCount = 30,
  colors = ["#ffd6eb", "#ff9acb", "#ff5aa6", "#ff2d78", "#00000000"],
  maxHeightRatio = 0.92,
  minHeightRatio = 0.18,
  speed = 0.5,
  gap = 3,
  blur = 0,
  background = "#FFFFFF",
  showVignette = false,
  vignetteColor = "rgba(113, 42, 226, 0.15)",
  className = "",
}: AuroraBarsProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const barRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const timeRef = React.useRef(0);
  const [isInView, setIsInView] = React.useState(true);
  const [isTabVisible, setIsTabVisible] = React.useState(true);
  const [isReadyToAnimate, setIsReadyToAnimate] = React.useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Responsive bar count (cut in half on mobile to preserve main-thread performance)
  const [activeBarCount, setActiveBarCount] = React.useState(barCount);
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setActiveBarCount(window.innerWidth < 768 ? Math.min(barCount, 18) : barCount);
    }
  }, [barCount]);

  // Performance: Pause when tab is inactive
  React.useEffect(() => {
    if (typeof document === "undefined") return;
    const handleVisibility = () => {
      setIsTabVisible(document.visibilityState !== "hidden");
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  // Performance: Pause when scrolled out of view
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Defer animation loop until AFTER window load & first paint/LCP
  React.useEffect(() => {
    if (prefersReducedMotion) return;

    let cancelTimer: (() => void) | null = null;
    const scheduleStart = () => {
      if ("requestIdleCallback" in window) {
        const handle = (window as any).requestIdleCallback(() => setIsReadyToAnimate(true), { timeout: 1500 });
        cancelTimer = () => (window as any).cancelIdleCallback(handle);
      } else {
        const timer = setTimeout(() => setIsReadyToAnimate(true), 800);
        cancelTimer = () => clearTimeout(timer);
      }
    };

    if (document.readyState === "complete") {
      scheduleStart();
    } else {
      window.addEventListener("load", scheduleStart, { once: true });
    }

    return () => {
      cancelTimer?.();
    };
  }, [prefersReducedMotion]);

  // Main animation loop: Pure requestAnimationFrame (Zero motion runtime dependency)
  React.useEffect(() => {
    if (!isReadyToAnimate || !isInView || !isTabVisible || prefersReducedMotion) return;

    let rafId: number;
    let lastTime = performance.now();

    const renderLoop = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;
      timeRef.current += delta * speed;
      const t = timeRef.current;

      for (let i = 0; i < activeBarCount; i++) {
        const el = barRefs.current[i];
        if (el) {
          const h = barHeight(i, activeBarCount, t, minHeightRatio, maxHeightRatio);
          el.style.height = `${h * 100}%`;
        }
      }

      rafId = requestAnimationFrame(renderLoop);
    };

    rafId = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(rafId);
  }, [isReadyToAnimate, isInView, isTabVisible, prefersReducedMotion, activeBarCount, speed, minHeightRatio, maxHeightRatio]);

  const gradientStop = colors
    .map((c, i) => `${c} ${Math.round((i / (colors.length - 1 || 1)) * 100)}%`)
    .join(", ");
  const gradient = `linear-gradient(to top, ${gradientStop})`;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`relative w-full h-full overflow-hidden pointer-events-none select-none ${className}`}
      style={{
        background,
        backgroundImage: "radial-gradient(ellipse at 50% 100%, rgba(37,99,235,0.08) 0%, transparent 70%)",
      }}
    >
      <div className="absolute inset-0 flex items-end" suppressHydrationWarning>
        {Array.from({ length: activeBarCount }).map((_, i) => {
          const initialH = barHeight(i, activeBarCount, 0, minHeightRatio, maxHeightRatio);
          return (
            <div
              key={i}
              className="flex-1"
              style={{
                height: "100%",
                display: "flex",
                alignItems: "flex-end",
                padding: `0 ${gap / 2}px`,
              }}
            >
              <div
                ref={(el) => {
                  barRefs.current[i] = el;
                }}
                style={{
                  width: "100%",
                  height: `${initialH * 100}%`,
                  background: gradient,
                  borderRadius: "9999px 9999px 0 0",
                  filter: blur > 0 ? `blur(${blur}px)` : undefined,
                  opacity: 0.85,
                  willChange: isReadyToAnimate && isInView && !prefersReducedMotion ? "height" : "auto",
                }}
              />
            </div>
          );
        })}
      </div>

      {showVignette && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 90% 75% at 50% 100%, transparent 35%, ${vignetteColor} 100%)`,
          }}
        />
      )}
    </div>
  );
}