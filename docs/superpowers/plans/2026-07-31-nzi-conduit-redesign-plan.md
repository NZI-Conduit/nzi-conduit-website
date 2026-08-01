# NZI Conduit Enterprise Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the NZI Conduit website into a modern, enterprise-grade technology consulting platform with Stripe/Vercel/Linear level visual quality.

**Architecture:** Component-driven React app with modern CSS utilities, Lucide React vector icons, floating 3D glass cards, Bento grid layout, interactive tech stack matrix, and seamless navigation.

**Tech Stack:** React 18, Vite 6, Tailwind CSS / Custom CSS, Lucide React icons, Motion (Framer Motion).

## Global Constraints
- Primary color: `#0F172A` (Deep Slate)
- Accent color: `#2563EB` (Royal Blue)
- Background: `#FFFFFF` / `#F8FAFC`
- Text color: `#111827`
- Border Radius: `16px` (`rounded-2xl`)
- No stock photos. Use code/UI visuals and abstract vector SVG illustrations.

---

### Task 1: Custom Styling Tokens & Helper Utilities

**Files:**
- Modify: `src/styles/index.css`

- [ ] **Step 1: Update index.css with enterprise design tokens and utilities**
- [ ] **Step 2: Verify `npm run build` succeeds**

---

### Task 2: Sticky Blur Navigation Header

**Files:**
- Modify: `src/components/Navbar.jsx`

- [ ] **Step 1: Build enterprise Navbar with glassmorphism backdrop blur and logo mark**
- [ ] **Step 2: Verify `npm run build` succeeds**

---

### Task 3: Enterprise Hero & Trusted Marquee

**Files:**
- Create/Modify: `src/components/Hero.jsx`
- Create: `src/components/TrustedMarquee.jsx`

- [ ] **Step 1: Build Hero with dual CTAs, floating UI cards (AI, Cloud, Security, Data), gradient movement, and Trusted Company marquee**
- [ ] **Step 2: Verify `npm run build` succeeds**

---

### Task 4: Services Bento Grid & Industries Showcase

**Files:**
- Create: `src/components/ServicesBento.jsx`
- Create: `src/components/Industries.jsx`

- [ ] **Step 1: Build 8-service Bento Grid and Industries grid**
- [ ] **Step 2: Verify `npm run build` succeeds**

---

### Task 5: Why Choose Us (Metrics) & Development Process Timeline

**Files:**
- Create: `src/components/WhyChooseUs.jsx`
- Create: `src/components/ProcessTimeline.jsx`

- [ ] **Step 1: Build animated metric counters and 6-step horizontal process timeline**
- [ ] **Step 2: Verify `npm run build` succeeds**

---

### Task 6: Case Studies Showcase & Tech Stack Matrix

**Files:**
- Create: `src/components/CaseStudies.jsx`
- Create: `src/components/TechStackMatrix.jsx`

- [ ] **Step 1: Build Case Studies showcase cards and filterable Tech Stack matrix**
- [ ] **Step 2: Verify `npm run build` succeeds**

---

### Task 7: Testimonials, FAQ Accordion & Glassmorphism Contact Form

**Files:**
- Create: `src/components/TestimonialsCarousel.jsx`
- Create: `src/components/FAQAccordion.jsx`
- Create: `src/components/ContactForm.jsx`

- [ ] **Step 1: Build Testimonials carousel, FAQ accordion, and split Contact form**
- [ ] **Step 2: Verify `npm run build` succeeds**

---

### Task 8: Footer, Page Integration & Final Build Verification

**Files:**
- Modify: `src/components/Footer.jsx`
- Modify: `src/pages/HomePage.jsx`
- Modify: `src/app/App.jsx`

- [ ] **Step 1: Assemble all components into HomePage.jsx and App.jsx**
- [ ] **Step 2: Run `npm run build` and verify 0 errors**
