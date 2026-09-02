"use client";

import * as React from "react";
import { motion, useAnimationFrame, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

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
  /** @default "#000000" */
  background?: string;
  showVignette?: boolean;
  /** Custom vignette overlay color — @default "rgba(113, 42, 226, 0.15)" */
  vignetteColor?: string;
  className?: string;
}

/** two sine waves per bar for organic movement */
function barHeight(
  index: number,
  total: number,
  time: number,
  minH: number,
  maxH: number,
): number {
  // Arch envelope: tallest in the centre, shorter on edges
  // arch envelope: tallest in centre, shorter on edges
  const norm = index / (total - 1);
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
  className,
}: AuroraBarsProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const barRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const timeRef = React.useRef(0);
  const [isInView, setIsInView] = React.useState(true);
  const prefersReducedMotion = useReducedMotion();

  // Performance: Pause animation loop when scrolled out of viewport
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

  // Directly update DOM element styles in animation frame without triggering React state re-renders
  useAnimationFrame((_, delta) => {
    if (!isInView || prefersReducedMotion) return;
    timeRef.current += (delta / 1000) * speed;
    const t = timeRef.current;
    for (let i = 0; i < barCount; i++) {
      const el = barRefs.current[i];
      if (el) {
        const h = barHeight(i, barCount, t, minHeightRatio, maxHeightRatio);
        el.style.height = `${h * 100}%`;
      }
    }
  });

  const gradientStop = colors
    .map((c, i) => `${c} ${Math.round((i / (colors.length - 1)) * 100)}%`)
    .join(", ");
  const gradient = `linear-gradient(to top, ${gradientStop})`;

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full h-full overflow-hidden", className)}
      style={{ background }}
    >
      <div className="absolute inset-0 flex items-end">
        {Array.from({ length: barCount }).map((_, i) => {
          const initialH = barHeight(i, barCount, 0, minHeightRatio, maxHeightRatio);
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
                  willChange: isInView && !prefersReducedMotion ? "height" : "auto",
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