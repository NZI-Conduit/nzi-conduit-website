import { useReducedMotion } from "motion/react";

export function TechMarquee() {
  const prefersReducedMotion = useReducedMotion();

  const technologies = [
    { name: "React", icon: "code", color: "#61DAFB" },
    { name: "Next.js", icon: "terminal", color: "#000000" },
    { name: "TypeScript", icon: "code_blocks", color: "#3178C6" },
    { name: "Tailwind CSS", icon: "style", color: "#06B6D4" },
    { name: "Node.js", icon: "dns", color: "#339933" },
    { name: "Docker", icon: "view_in_ar", color: "#2496ED" },
    { name: "PostgreSQL", icon: "database", color: "#4169E1" },
    { name: "AWS", icon: "cloud", color: "#FF9900" },
    { name: "Cloudflare", icon: "cloud_done", color: "#F38020" },
    { name: "Vercel", icon: "change_history", color: "#000000" },
    { name: "GitHub", icon: "hub", color: "#24292e" },
    { name: "Figma", icon: "draw", color: "#F24E1E" },
  ];

  // Duplicate for seamless infinite loop
  const list = [...technologies, ...technologies];

  return (
    <div
      className="relative w-full overflow-hidden select-none py-1"
      style={{
        maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <div
        className={`flex items-center gap-8 w-max ${
          prefersReducedMotion
            ? "justify-center mx-auto"
            : "animate-[marquee_50s_linear_infinite] hover:[animation-play-state:paused]"
        }`}
      >
        {list.map((tech, index) => (
          <div
            key={`${tech.name}-${index}`}
            className="group flex items-center gap-2.5 px-4 py-2 rounded-xl bg-surface border border-outline-variant/15 transition-all duration-300 hover:scale-105 hover:shadow-md cursor-pointer shrink-0"
          >
            <span
              className="material-symbols-outlined text-[20px] text-on-surface-variant/50 transition-colors duration-300 group-hover:text-[var(--hover-color)]"
              style={{ "--hover-color": tech.color }}
            >
              {tech.icon}
            </span>
            <span className="font-label text-xs font-semibold text-on-surface-variant/75 transition-colors duration-300 group-hover:text-on-surface group-hover:font-bold">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
