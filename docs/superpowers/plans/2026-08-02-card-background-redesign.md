# Card Background & Micro-Interactions Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign and standardize card surface backgrounds, borders, shadows, and micro-interactions across the codebase using central theme tokens and high-taste design engineering polish.

**Architecture:** Update `theme.css` with card surface tokens and custom easing curves, update `Card.jsx` with targeted hardware-accelerated transitions and tactile press feedback (`scale(0.98)`), and refactor hardcoded `bg-white` card instances across pages/components to consume unified card tokens.

**Tech Stack:** React, Tailwind CSS v4, CSS Custom Properties, Framer Motion (Motion).

## Global Constraints
- Target files: `src/styles/theme.css`, `src/components/ui/Card.jsx`, `src/components/service/FeatureGrid.jsx`, `src/components/service/TechStackSection.jsx`, `src/components/service/ProcessTimeline.jsx`, `src/components/service/ServiceFaq.jsx`, `src/pages/HomePage.jsx`, `src/pages/AboutPage.jsx`.
- Preserve existing card props (`hover`, `glass`, `onClick`, `className`).
- Do not introduce breaking layout changes or invalid Tailwind classes.

---

### Task 1: Update Theme CSS Card Tokens & Easing Variables

**Files:**
- Modify: [src/styles/theme.css](file:///Users/pratyakshkalsi/Downloads/FREELANCINGPROJECTS/NZICounduit/src/styles/theme.css#L5-L10)

**Interfaces:**
- Consumes: CSS Root Tokens
- Produces: `--card`, `--card-foreground`, `--color-card`, `--color-card-foreground`, `--ease-out-card`

- [ ] **Step 1: Inspect and update theme tokens in CSS**

Ensure `:root` and `@theme inline` have clean `--card` variables and custom easing curve:
```css
:root {
  --card: #FFFFFF;
  --card-foreground: #0B1220;
  --card-border: rgba(203, 213, 225, 0.4);
  --ease-out-card: cubic-bezier(0.23, 1, 0.32, 1);
}
```

- [ ] **Step 2: Run build to verify CSS compilation**

Run: `npm run build`
Expected: Build succeeds with 0 errors.

---

### Task 2: Refactor Card.jsx Component with Tactile Polish

**Files:**
- Modify: [src/components/ui/Card.jsx](file:///Users/pratyakshkalsi/Downloads/FREELANCINGPROJECTS/NZICounduit/src/components/ui/Card.jsx#L1-L34)

**Interfaces:**
- Consumes: Card props (`children`, `className`, `hover`, `glass`, `onClick`)
- Produces: High-taste interactive `Card` component

- [ ] **Step 1: Update Card.jsx base, glass, hover, and active styles**

```jsx
import { motion } from "motion/react";

export function Card({
  children,
  className = "",
  hover = true,
  glass = false,
  onClick,
  ...props
}) {
  const baseStyles =
    "rounded-3xl p-6 sm:p-8 border border-outline-variant/20 transition-[transform,box-shadow,border-color] duration-200 ease-out relative overflow-hidden active:scale-[0.98]";
  
  const glassStyles = glass
    ? "bg-white/85 backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.06)] border-white/60 text-foreground"
    : "bg-card text-card-foreground shadow-xs";

  const hoverStyles = hover
    ? "hover:border-primary/30 hover:shadow-[0_16px_36px_rgba(15,23,42,0.08)] cursor-pointer"
    : "";

  return (
    <motion.div
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
      className={`${baseStyles} ${glassStyles} ${hoverStyles} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Run build to verify Card component compiles clean**

Run: `npm run build`
Expected: Build succeeds.

---

### Task 3: Refactor Service & Home Section Cards to Use Theme Card Surface

**Files:**
- Modify: [src/components/service/FeatureGrid.jsx](file:///Users/pratyakshkalsi/Downloads/FREELANCINGPROJECTS/NZICounduit/src/components/service/FeatureGrid.jsx)
- Modify: [src/components/service/TechStackSection.jsx](file:///Users/pratyakshkalsi/Downloads/FREELANCINGPROJECTS/NZICounduit/src/components/service/TechStackSection.jsx)
- Modify: [src/components/service/ProcessTimeline.jsx](file:///Users/pratyakshkalsi/Downloads/FREELANCINGPROJECTS/NZICounduit/src/components/service/ProcessTimeline.jsx)
- Modify: [src/components/service/ServiceFaq.jsx](file:///Users/pratyakshkalsi/Downloads/FREELANCINGPROJECTS/NZICounduit/src/components/service/ServiceFaq.jsx)
- Modify: [src/pages/HomePage.jsx](file:///Users/pratyakshkalsi/Downloads/FREELANCINGPROJECTS/NZICounduit/src/pages/HomePage.jsx)
- Modify: [src/pages/AboutPage.jsx](file:///Users/pratyakshkalsi/Downloads/FREELANCINGPROJECTS/NZICounduit/src/pages/AboutPage.jsx)

- [ ] **Step 1: Replace hardcoded bg-white on card elements with bg-card or standard Card component**

Ensure cards use `bg-card text-card-foreground border border-outline-variant/20 shadow-xs hover:border-primary/30 transition-all duration-200 active:scale-[0.98]`.

- [ ] **Step 2: Run production build verification**

Run: `npm run build`
Expected: Production bundle builds cleanly without errors.
