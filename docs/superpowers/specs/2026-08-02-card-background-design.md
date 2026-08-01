# Card Surface & Background Design Specification

**Date:** 2026-08-02  
**Status:** Approved  
**Topic:** 10/10 Enterprise Card Surface System & Micro-Interactions  

---

## 1. Overview
This specification outlines the redesign and standardization of card surface backgrounds, borders, shadows, and interactive states across the application. The goal is to replace fragmented hardcoded card styles (`bg-white`) with a centralized token architecture, crisp custom easings, tactile press feedback (`scale(0.98)`), and high-contrast surface hierarchy.

---

## 2. Architecture & Theme System (`src/styles/theme.css`)
* **Tokens**:
  * `--card`: `#FFFFFF`
  * `--card-foreground`: `#0F172A`
  * `--color-card`: `var(--card)`
  * `--color-card-foreground`: `var(--card-foreground)`
  * `--ease-out-card`: `cubic-bezier(0.23, 1, 0.32, 1)`
* **Elevation & Borders**:
  * Border: `1px solid rgba(203, 213, 225, 0.5)` (`border-outline-variant/20`)
  * Elevation shadow: `0 1px 3px rgba(15, 23, 42, 0.04)`

---

## 3. Core Card Component (`src/components/ui/Card.jsx`)
* **Transitions**: Hardware-accelerated CSS transitions on target properties (`transform`, `border-color`, `box-shadow`) over `200ms ease-[var(--ease-out-card)]`.
* **Micro-Interactions**:
  * Active state: `active:scale-[0.98]` tactile press effect.
  * Hover state: `hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg` gated with `@media (hover: hover)`.
* **Glass Prop**: `backdrop-blur-xl bg-white/85 border-white/60 shadow-[0_8px_32px_rgba(15,23,42,0.06)]`.

---

## 4. Components & Pages Scope
The following files will be updated to consume the unified card component and theme tokens:
1. `src/components/ui/Card.jsx`
2. `src/styles/theme.css`
3. `src/components/service/FeatureGrid.jsx`
4. `src/components/service/TechStackSection.jsx`
5. `src/components/service/ProcessTimeline.jsx`
6. `src/components/service/ServiceFaq.jsx`
7. `src/pages/HomePage.jsx`
8. `src/pages/AboutPage.jsx`

---

## 5. Verification Plan
* Automated check: `npm run build` or `npx vite build` to ensure no syntax/JSX/CSS errors.
* Visual check: Ensure all cards render clean borders, smooth hover animations, and scale down slightly on click/press.
