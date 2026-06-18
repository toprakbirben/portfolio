# Portfolio Modernization — Phase 1 (Foundation + Hero)

**Date:** 2026-06-18
**Owner:** Toprak Birben
**Status:** Approved design — ready for implementation plan

## Context

The current portfolio (`src/app/page.tsx`) is a single-page Next.js 15 / React 19
scrolling site built on Ant Design, with `motion`/framer-motion and a stack of
mostly-unused libraries (react-grid-layout, gridstack, locomotive-scroll,
react-spring, etc.). A previous saved note described a "ToprakOS macOS desktop
simulation," but the live code is a conventional scroller — we trust the code.

This project starts an **ongoing modernization**: a fresh, minimal-editorial
scrolling site driven by GSAP (scroll) + Framer Motion (micro-interactions),
with content reflecting the new resume. Work is phased; this spec covers
**Phase 1 only**: design system, layout shell, animation infrastructure, and the
Hero section. Experience / Projects / Skills sections land in later phases.

## Goals

- Replace the Ant Design shell with a fresh minimal-editorial design system.
- Stand up the animation infrastructure: GSAP + ScrollTrigger synced to Lenis
  smooth scroll, plus Framer Motion for component interactions.
- Ship a polished Hero section with the new resume's positioning.
- Leave clean, reusable primitives so later phases just add content sections.

## Non-Goals (Phase 1)

- Building Experience, Projects, or Skills content (later phases; placeholder
  anchors only so nav links resolve).
- Backend, CMS, or data fetching — site stays static.
- Light/dark theme toggle.

## Direction & Aesthetic

- **Style:** minimal editorial. Generous whitespace, big confident typography,
  near-monochrome with a single warm accent.
- **Motion:** purposeful, not flashy. Signals a senior backend engineer.

## Design System

- **Color tokens** (Tailwind config + CSS vars):
  - `ink` — near-black warm `#161412`
  - `paper` — warm off-white `#FAF8F5`
  - `amber` — warm accent ~`#E8830C`
  - `muted` — grey for secondary text
- **Typography** via `next/font`:
  - Display/body grotesk (Geist Sans or equivalent).
  - Mono (Geist Mono / JetBrains Mono) for labels, tags, small "engineer" details.
  - Fluid type scale using `clamp()`.
- **Layout primitives:** max-width container, consistent section vertical rhythm,
  spacing tokens.
- One `globals.css` with reset + token wiring. `Home.module.css` is no longer
  used by the shell/hero (left in place until later phases migrate remaining
  sections, then removed).

## Animation Architecture (key decision)

Two systems, each doing what it is best at:

- **GSAP + ScrollTrigger** — scroll-driven work: section reveals tied to scroll
  progress, pinning, parallax, hero scroll-out. Synced to Lenis so smooth-scroll
  and triggers share one clock/RAF loop.
- **Framer Motion** — component-level micro-interactions: hover/tap states, link
  underlines, small-element entrances, layout transitions.

*Alternatives considered:* GSAP-only (one system, but weaker component ergonomics)
and Framer-only (simpler, weaker scroll control). The split is chosen because the
user explicitly wants both and each library covers a distinct concern.

## Dependencies

- **Keep:** `next`, `react`, `react-dom`, `tailwindcss`, `framer-motion`/`motion`.
- **Add:** `gsap` (incl. ScrollTrigger), `lenis` (replaces deprecated
  `@studio-freight/lenis`).
- **Remove:** `antd`, `@ant-design/icons`, `@material-ui/core`,
  `@react-spring/web`, `react-grid-layout`, `@types/react-grid-layout`,
  `gridstack`, `locomotive-scroll`, `reactjs-popup`, `lodash-move`,
  `lodash.clamp`, `react-animated-cursor`, `@studio-freight/lenis`,
  `@use-gesture/react` (verify no remaining import before removing each).

## Component Architecture (units — one job each)

- **`SmoothScrollProvider`** — boots Lenis, drives the RAF loop, syncs Lenis ↔
  GSAP ScrollTrigger; tears down on unmount. Wraps app in `layout.tsx`.
  - Depends on: `lenis`, `lib/gsap`.
- **`lib/gsap.ts`** — registers ScrollTrigger exactly once; exports configured
  `gsap`. Single source of truth so React 19 strict mode / SSR don't
  double-register.
- **`Reveal`** — Framer Motion in-view wrapper (fade/translate entrance);
  respects `prefers-reduced-motion`.
- **`AnimatedHeading`** — line/word-mask reveal for large headings (GSAP timeline,
  scoped + reverted via `gsap.context`).
- **`Nav`** — minimal fixed top nav: name mark + section links + resume link;
  subtle Framer hover states.
- **`Hero`** — Phase 1 content section (below).

Each unit is independently understandable, communicates via props, and cleans up
its own animation side effects.

## Hero Section (Phase 1 content)

- **Name:** Sarp Toprak Birben.
- **Positioning line:** "Backend-focused software engineer — building scalable
  systems end to end." (drawn from resume summary).
- **Meta:** Amsterdam, Netherlands.
- **Links:** GitHub (`github.com/toprakbirben`), LinkedIn
  (`linkedin.com/in/toprakbirben`), email (`birbentoprak@gmail.com`), and a
  **résumé download** button → `/SarpToprakBirben_Resume.pdf`.
- **Motion:** heading does a masked word-reveal on load (GSAP); supporting text +
  links stagger in (Framer); on scroll the hero gently parallaxes/fades out via
  ScrollTrigger as the next section approaches.
- **Placeholder anchors** for `#experience`, `#projects`, `#skills` so nav links
  resolve before later phases add content.

## External Dependency (user action)

The Hero résumé button links to `/SarpToprakBirben_Resume.pdf`. The current file
in `public/` is the **old** resume. The user will export the new resume `.docx`
to PDF and save it as `public/SarpToprakBirben_Resume.pdf` (overwriting the old).
No code change needed when the file is replaced.

## Accessibility & Error Handling

- **Reduced motion:** every animation checks `prefers-reduced-motion` and degrades
  to instant / opacity-only.
- **No-JS / SSR:** all content is real, visible HTML without JS; motion is
  progressive enhancement (no content hidden until JS runs).
- **Strict-mode safety:** GSAP contexts and Lenis instances are torn down on
  unmount to survive React 19 double-invocation; ScrollTrigger registered once.

## Testing & Verification

- `npm run build` and `npm run lint` pass.
- Manual: page renders server-side (view without JS shows content), scroll is
  smooth, hero load + scroll animations fire, nav links jump to anchors.
- Manual: with OS "reduce motion" on, animations are disabled and content is
  fully visible/usable.

## Success Criteria

- Old Ant Design shell removed; new minimal-editorial design system in place.
- Lenis + GSAP ScrollTrigger + Framer Motion infrastructure working and reusable.
- Hero section complete with new-resume content and signature motion.
- Build + lint green; reduced-motion and no-JS paths verified.
- Reusable primitives (`Reveal`, `AnimatedHeading`, `SmoothScrollProvider`,
  `lib/gsap`) ready for later content phases.

## Later Phases (out of scope, for context)

- Phase 2: Experience (Trein-vertraging impact bullets).
- Phase 3: Projects (fuutball, morethantasks) with stack tags + links.
- Phase 4: Skills grid + About; optional volunteering (FIRST Robotics, Java
  instructor).
