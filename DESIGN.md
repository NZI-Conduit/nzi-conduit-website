---
name: NZI Conduit
description: High-performance IT & Tech Solutions Platform
colors:
  primary: "#2563eb"
  primary-hover: "#1d4ed8"
  primary-dark: "#1e40af"
  primary-light: "#dbeafe"
  background: "#fafbfd"
  surface: "#ffffff"
  surface-secondary: "#f1f5f9"
  surface-accent: "#eff6ff"
  surface-dark: "#0f172a"
  surface-dark-card: "#1e293b"
  text-heading: "#0f172a"
  text-body: "#475569"
  border-subtle: "#e2e8f0"
typography:
  display:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3.75rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.35
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.05em"
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  card: "24px"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  xxl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.full}"
    padding: "10px 24px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  card-standard:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-heading}"
    rounded: "{rounded.card}"
    padding: "24px 32px"
---

# Design System: NZI Conduit

## 1. Overview

**Creative North Star: "The Precision Engineering Benchmark"**

NZI Conduit's design system communicates senior engineering craftsmanship, transparency, and sub-second performance. It replaces generic flat-white SaaS layouts with a structured, layered surface rhythm and high-contrast typography hierarchy inspired by Linear, Stripe, Vercel, and Apple.

The system explicitly rejects template bloat, overly rounded pill-shapes above 24px on cards, glassmorphism overlays used decoratively without purpose, and side-stripe card borders.

### Key Characteristics:
- Layered neutral surfaces (`#FAFBFD` canvas, `#FFFFFF` cards, `#F1F5F9` light slate, `#EFF6FF` soft blue accent)
- Deep blue accent system (`#2563EB` primary, `#1D4ED8` hover, `#1E40AF` dark)
- Single dominant focal point per section with 60fps micro-animations
- High contrast, balanced typography with max line-length caps (`65-75ch`)

## 2. Colors

The palette uses a restrained, high-contrast color strategy where blue accents carry key interactive affordances and darker slate surfaces anchor structured boundaries.

### Primary
- **Blue 600 (`#2563EB`)**: Primary CTA buttons, active navigation states, and focal icons.
- **Blue 700 (`#1D4ED8`)**: Interactive hover state for buttons and links.
- **Blue 800 (`#1E40AF`)**: Dark container borders and conversion CTA background gradient anchor.

### Neutral
- **Canvas Background (`#FAFBFD`)**: Soft off-white canvas replacing pure white.
- **Surface (`#FFFFFF`)**: Pure white card containers and elevated widgets.
- **Secondary Surface (`#F1F5F9`)**: Light slate background for alternating section rhythm.
- **Accent Surface (`#EFF6FF`)**: Soft blue-tinted container for feature grids and showcase cards.
- **Dark Surface (`#0F172A`)**: Dark slate canvas for the footer and primary inverse containers.
- **Heading Text (`#0F172A`)**: High-contrast dark slate typography.
- **Body Text (`#475569`)**: Muted slate body copy with guaranteed 5.8:1 WCAG AA contrast.

### Named Rules
**The Single Focus Rule.** Primary blue accent `#2563EB` is reserved for interactive controls and primary focal icons. Its rarity preserves visual hierarchy.

## 3. Typography

**Display Font:** Inter, system-ui, sans-serif  
**Body Font:** Inter, system-ui, sans-serif  
**Label/Mono Font:** Inter, system-ui, sans-serif  

**Character:** Clean, technical, highly legible grotesque sans-serif with tight negative display tracking (`-0.025em`) and balanced text wrapping.

### Hierarchy
- **Display** (ExtraBold 800, `clamp(2.25rem, 5vw, 3.75rem)`, line-height 1.1): Hero title with `[text-wrap:balance]`.
- **Headline** (Bold 700, `clamp(1.5rem, 3vw, 2.25rem)`, line-height 1.2): Section titles.
- **Title** (Bold 700, `1.25rem`, line-height 1.35): Card titles and feature headings.
- **Body** (Regular 400, `0.9375rem`, line-height 1.6): Body paragraphs capped at max width `680px` (`text-wrap:pretty`).
- **Label** (SemiBold 600, `0.75rem`, letter-spacing `0.05em`, uppercase): Badges and kicker tags.

## 4. Elevation

The system relies on tonal surface layering rather than ambient drop-shadow clutter. Cards sit flat at rest with subtle outline borders (`#E2E8F0`), elevating smoothly on hover.

### Shadow Vocabulary
- **Card Hover Elevation** (`box-shadow: 0 16px 40px rgba(37, 99, 235, 0.08)`): Applied on card hover with 4px negative translation.
- **Button Glow Elevation** (`box-shadow: 0 4px 16px rgba(37, 99, 235, 0.25)`): Primary CTA resting shadow.

### Named Rules
**The Tonal Layering Rule.** Surfaces communicate depth through background color transitions (`#FAFBFD` → `#FFFFFF` → `#F1F5F9`) rather than heavy drop shadows.

## 5. Components

### Buttons
- **Shape:** Full pill (`rounded-full`)
- **Primary:** `bg-[#2563EB] text-white px-6 py-2.5 h-11` (md) / `px-8 py-3.5 h-13` (lg)
- **Hover / Press:** `hover:bg-[#1D4ED8] hover:scale-[1.02] active:scale-[0.98]`
- **Outline:** `border border-blue-600/30 text-blue-600 hover:bg-blue-50/50`

### Cards / Containers
- **Corner Style:** `rounded-3xl` (24px)
- **Background:** Pure white (`#FFFFFF`) at rest
- **Border:** 1px border `rgba(226, 232, 240, 0.8)`
- **Internal Padding:** `p-6 sm:p-8`

### Inputs / Fields
- **Style:** `h-11 px-4 rounded-full bg-[#0F172A] border border-slate-700 text-white` inside dark footer; `bg-white border border-slate-300 text-slate-900` in light modals.
- **Focus:** `focus-visible:ring-2 focus-visible:ring-blue-600`

### Navigation
- **Header Nav:** Fixed backdrop blur (`bg-white/95 backdrop-blur-md border-b border-slate-200/60 py-2.5`).
- **Top Route Progress Bar:** `fixed top-0 left-0 right-0 h-1 z-50 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-500`.

## 6. Do's and Don'ts

### Do:
- **Do** use `text-wrap: balance` on H1–H3 headings and `text-wrap: pretty` on body prose to eliminate awkward line breaks.
- **Do** alternate section backgrounds (`#FAFBFD` → `#FFFFFF` → `#F5F9FF` → `#EEF4FF`) to create clear visual rhythm.
- **Do** ensure all card transitions use smooth cubic-bezier easing (`ease-out-quart`).

### Don't:
- **Don't** use colored side-stripe borders (`border-left: 4px solid blue`) on cards or callouts.
- **Don't** use gradient text (`background-clip: text`) on body or title copy.
- **Don't** use card corner radius over 24px (`rounded-3xl` is the maximum limit).
- **Don't** add decorative glassmorphism or blur filters on standard text cards.
- **Don't** place tiny uppercase kicker eyebrows above every single section.
