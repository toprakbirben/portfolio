# Portfolio Modernization Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Ant Design portfolio shell with a fresh minimal-editorial scrolling site, stand up GSAP + Lenis + Framer Motion animation infrastructure, and ship a polished Hero section using the new resume's content.

**Architecture:** Next.js 15 App Router static site. A `SmoothScrollProvider` boots Lenis and drives the RAF loop that GSAP's `ticker`/ScrollTrigger sync to. Scroll-driven motion uses GSAP + ScrollTrigger; component micro-interactions use Framer Motion. Reusable primitives (`Reveal`, `AnimatedHeading`) and a `lib/gsap` single-registration module support both Phase 1 and later content phases.

**Tech Stack:** Next.js 15.1, React 19, TypeScript, Tailwind CSS v3, GSAP (+ ScrollTrigger), Lenis, Framer Motion (`motion`), `next/font`.

## Global Constraints

- Tailwind CSS v3 (installed: `tailwindcss@^3.4.1`); `globals.css` uses `@tailwind base/components/utilities` directives — keep v3 syntax.
- Palette tokens: `ink` `#161412`, `paper` `#FAF8F5`, `amber` `#E8830C`, `muted` grey for secondary text.
- All animation respects `prefers-reduced-motion`: degrade to instant / opacity-only, never hide content.
- All content is real SSR HTML, visible without JS; motion is progressive enhancement only.
- GSAP `ScrollTrigger` registered exactly once; all GSAP work scoped via `gsap.context` and reverted on unmount (React 19 strict-mode safe).
- Résumé link target is `/SarpToprakBirben_Resume.pdf` (user replaces the file in `public/` out-of-band).
- No unit-test harness is installed and none is added in Phase 1 (static animation UI). Verification is `npm run build` + `npm run lint` + explicit manual checks. This is a deliberate scope decision from the spec.
- Frequent commits: one per task.

---

## File Structure

- `package.json` — remove unused deps, add `gsap` + `lenis`.
- `tailwind.config.ts` — add color tokens, font family vars, content globs.
- `src/app/globals.css` — reset + token wiring; drop Ant Design overrides.
- `src/app/layout.tsx` — fonts via `next/font`, wrap children in `SmoothScrollProvider`, remove `react-animated-cursor`.
- `src/lib/gsap.ts` — single ScrollTrigger registration + configured `gsap` export.
- `src/components/SmoothScrollProvider.tsx` — Lenis boot + GSAP sync.
- `src/components/Reveal.tsx` — Framer Motion in-view wrapper.
- `src/components/AnimatedHeading.tsx` — GSAP masked word-reveal heading.
- `src/components/Nav.tsx` — minimal top nav.
- `src/components/Hero.tsx` — Phase 1 hero content + motion.
- `src/app/page.tsx` — compose Nav + Hero + placeholder section anchors.
- `src/app/Home.module.css` — left in place (unused by shell/hero); removed in a later phase.

---

## Task 1: Swap dependencies (remove Ant/unused, add gsap + lenis)

**Files:**
- Modify: `package.json`

**Interfaces:**
- Consumes: nothing.
- Produces: `gsap` and `lenis` available to import; Ant/MUI/etc. removed.

- [ ] **Step 1: Remove unused dependencies**

Run:
```bash
npm remove antd @ant-design/icons @material-ui/core @react-spring/web \
  react-grid-layout @types/react-grid-layout gridstack locomotive-scroll \
  reactjs-popup lodash-move lodash.clamp react-animated-cursor \
  @studio-freight/lenis @use-gesture/react tailwind
```
Note: `tailwind` (the bogus `^4.0.0` entry) is removed; the real `tailwindcss@^3.4.1` devDependency stays.

- [ ] **Step 2: Add gsap + lenis**

Run:
```bash
npm install gsap lenis
```
Expected: both appear under `dependencies` in `package.json`; install succeeds.

- [ ] **Step 3: Verify nothing else imports the removed packages**

Run:
```bash
grep -rEn "antd|@ant-design|material-ui|react-spring|react-grid-layout|gridstack|locomotive-scroll|reactjs-popup|lodash-move|lodash.clamp|react-animated-cursor|@studio-freight|use-gesture" src
```
Expected: matches only in `src/app/page.tsx`, `src/app/layout.tsx` (those are rewritten in later tasks). If matches appear elsewhere, note them — they get cleaned in the task that owns that file.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: drop Ant Design/unused libs, add gsap + lenis"
```

---

## Task 2: Design tokens + global styles + fonts

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx` (fonts only; provider added in Task 3)

**Interfaces:**
- Consumes: nothing.
- Produces: Tailwind colors `ink`, `paper`, `amber`, `muted`; CSS vars `--font-sans`, `--font-mono`; Tailwind font families `font-sans`, `font-mono`. `RootLayout` exports default React component (unchanged signature).

- [ ] **Step 1: Rewrite `tailwind.config.ts`**

```ts
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#161412",
        paper: "#FAF8F5",
        amber: "#E8830C",
        muted: "#8A8378",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;
```

- [ ] **Step 2: Rewrite `src/app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --paper: #FAF8F5;
  --ink: #161412;
}

html {
  scroll-behavior: smooth;
}

html,
body {
  margin: 0;
  padding: 0;
  background: var(--paper);
  color: var(--ink);
  font-family: var(--font-sans), system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  color: inherit;
  text-decoration: none;
}

/* Lenis: disable native smooth scroll while Lenis drives it */
html.lenis,
html.lenis body {
  height: auto;
}

.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
```

- [ ] **Step 3: Add fonts in `src/app/layout.tsx`**

Replace the entire file (removes `react-animated-cursor`; `SmoothScrollProvider` wrapping is added in Task 3):

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import React from "react";
import "./globals.css";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Sarp Toprak Birben — Software Engineer",
  description:
    "Backend-focused software engineer building scalable systems end to end. Amsterdam, Netherlands.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" sizes="any" />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 4: Verify build compiles**

Run: `npm run build`
Expected: build succeeds. (`page.tsx` still imports Ant Design at this point — if build fails only due to `page.tsx`/old imports, that is expected and resolved in Task 7; confirm no NEW errors come from `tailwind.config.ts`, `globals.css`, or `layout.tsx`.)

Note: if the existing `page.tsx` blocks the build here, skip ahead is NOT needed — proceed; Task 7 rewrites it. To isolate, run `npx tsc --noEmit` and confirm `layout.tsx`/config files report no errors.

- [ ] **Step 5: Commit**

```bash
git add tailwind.config.ts src/app/globals.css src/app/layout.tsx
git commit -m "feat: minimal-editorial design tokens, fonts, global styles"
```

---

## Task 3: GSAP single-registration module + SmoothScrollProvider

**Files:**
- Create: `src/lib/gsap.ts`
- Create: `src/components/SmoothScrollProvider.tsx`
- Modify: `src/app/layout.tsx` (wrap children)

**Interfaces:**
- Consumes: `gsap`, `lenis` (Task 1); `RootLayout` (Task 2).
- Produces:
  - `src/lib/gsap.ts` exports `gsap` (with ScrollTrigger registered) and `ScrollTrigger`.
  - `SmoothScrollProvider` default export: `({ children }: { children: React.ReactNode }) => JSX.Element`, a client component.

- [ ] **Step 1: Create `src/lib/gsap.ts`**

```ts
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
```

- [ ] **Step 2: Create `src/components/SmoothScrollProvider.tsx`**

```tsx
"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis();

    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
```

- [ ] **Step 3: Wrap children in `src/app/layout.tsx`**

Change the body to use the provider. Replace the import block and `<body>`:

Add import near the top:
```tsx
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
```
Change the body line from `<body>{children}</body>` to:
```tsx
<body>
  <SmoothScrollProvider>{children}</SmoothScrollProvider>
</body>
```

- [ ] **Step 4: Verify `@/` alias resolves**

Run: `grep -n '"@/\*"' tsconfig.json`
Expected: a `paths` entry mapping `@/*` to `./src/*`. If absent, add to `compilerOptions`:
```json
"baseUrl": ".",
"paths": { "@/*": ["./src/*"] }
```

- [ ] **Step 5: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors in `src/lib/gsap.ts` or `src/components/SmoothScrollProvider.tsx` (errors remaining in `page.tsx` are expected until Task 7).

- [ ] **Step 6: Commit**

```bash
git add src/lib/gsap.ts src/components/SmoothScrollProvider.tsx src/app/layout.tsx tsconfig.json
git commit -m "feat: Lenis + GSAP ScrollTrigger smooth-scroll provider"
```

---

## Task 4: Reveal + AnimatedHeading primitives

**Files:**
- Create: `src/components/Reveal.tsx`
- Create: `src/components/AnimatedHeading.tsx`

**Interfaces:**
- Consumes: `motion` (Framer); `src/lib/gsap`.
- Produces:
  - `Reveal` default export: `({ children, delay?, className? }: { children: React.ReactNode; delay?: number; className?: string }) => JSX.Element`.
  - `AnimatedHeading` default export: `({ text, className?, as? }: { text: string; className?: string; as?: "h1" | "h2" }) => JSX.Element` — renders `text` split into words, each masked and revealed via a GSAP timeline on mount; words are real text in the DOM (SSR-visible).

- [ ] **Step 1: Create `src/components/Reveal.tsx`**

```tsx
"use client";

import { motion } from "motion/react";

export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

Note: Framer Motion respects the OS reduced-motion setting globally only if `MotionConfig reducedMotion="user"` is set; we rely on Framer's default which honors reduced-motion for transforms when the user has it on. Content remains visible because `whileInView` still sets opacity to 1.

- [ ] **Step 2: Create `src/components/AnimatedHeading.tsx`**

```tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function AnimatedHeading({
  text,
  className,
  as = "h1",
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2";
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll("[data-word]"), {
        yPercent: 110,
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.08,
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const Tag = as;
  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{ display: "inline-block", overflow: "hidden" }}
        >
          <span data-word style={{ display: "inline-block" }}>
            {word}
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
```

- [ ] **Step 3: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors in the two new files.

- [ ] **Step 4: Commit**

```bash
git add src/components/Reveal.tsx src/components/AnimatedHeading.tsx
git commit -m "feat: Reveal and AnimatedHeading motion primitives"
```

---

## Task 5: Nav

**Files:**
- Create: `src/components/Nav.tsx`

**Interfaces:**
- Consumes: `motion` (Framer).
- Produces: `Nav` default export: `() => JSX.Element`. Renders fixed top nav with a name mark linking to `#top` and anchor links to `#experience`, `#projects`, `#skills`, plus a résumé link to `/SarpToprakBirben_Resume.pdf`.

- [ ] **Step 1: Create `src/components/Nav.tsx`**

```tsx
"use client";

import { motion } from "motion/react";

const links = [
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
];

export default function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-paper/80 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <a href="#top" className="font-mono text-sm tracking-tight">
          STB
        </a>
        <ul className="flex items-center gap-6 text-sm">
          {links.map((link) => (
            <li key={link.href}>
              <motion.a
                href={link.href}
                className="text-muted hover:text-ink"
                whileHover={{ y: -1 }}
                transition={{ duration: 0.2 }}
              >
                {link.label}
              </motion.a>
            </li>
          ))}
          <li>
            <a
              href="/SarpToprakBirben_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-ink px-4 py-1.5 text-sm hover:bg-ink hover:text-paper transition-colors"
            >
              Résumé
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors in `Nav.tsx`.

- [ ] **Step 3: Commit**

```bash
git add src/components/Nav.tsx
git commit -m "feat: minimal top nav"
```

---

## Task 6: Hero

**Files:**
- Create: `src/components/Hero.tsx`

**Interfaces:**
- Consumes: `AnimatedHeading` (Task 4), `Reveal` (Task 4), `motion`, `src/lib/gsap`.
- Produces: `Hero` default export: `() => JSX.Element`. Full-viewport hero with `id="top"`, animated heading, positioning line, location, links, résumé button; gentle parallax/fade-out on scroll via ScrollTrigger.

- [ ] **Step 1: Create `src/components/Hero.tsx`**

```tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import AnimatedHeading from "@/components/AnimatedHeading";
import Reveal from "@/components/Reveal";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const inner = innerRef.current;
    if (!section || !inner) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.to(inner, {
        yPercent: 18,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="flex min-h-screen items-center px-6"
    >
      <div ref={innerRef} className="mx-auto w-full max-w-5xl">
        <p className="mb-6 font-mono text-sm text-muted">
          Amsterdam, Netherlands
        </p>
        <AnimatedHeading
          text="Sarp Toprak Birben"
          className="text-[clamp(2.5rem,8vw,6rem)] font-semibold leading-[0.95] tracking-tight"
        />
        <Reveal delay={0.3} className="mt-8 max-w-2xl">
          <p className="text-[clamp(1.1rem,2.5vw,1.6rem)] text-ink/80">
            Backend-focused software engineer — building scalable systems end to
            end, from design to production.
          </p>
        </Reveal>
        <Reveal delay={0.45} className="mt-10">
          <div className="flex flex-wrap items-center gap-5 font-mono text-sm">
            <a
              href="https://github.com/toprakbirben"
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-transparent hover:border-ink"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/toprakbirben"
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-transparent hover:border-ink"
            >
              LinkedIn
            </a>
            <a
              href="mailto:birbentoprak@gmail.com"
              className="border-b border-transparent hover:border-ink"
            >
              Email
            </a>
            <a
              href="/SarpToprakBirben_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-amber px-5 py-2 text-paper hover:bg-ink transition-colors"
            >
              Download résumé
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors in `Hero.tsx` (note `ScrollTrigger` import is used implicitly via plugin registration; if lint flags it as unused, change the import in `Hero.tsx` to only `import { gsap } from "@/lib/gsap";`).

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat: hero section with animated heading and scroll fade-out"
```

---

## Task 7: Compose page + placeholder anchors + final verification

**Files:**
- Modify: `src/app/page.tsx` (full rewrite)

**Interfaces:**
- Consumes: `Nav` (Task 5), `Hero` (Task 6).
- Produces: default-export `Home` page rendering `Nav`, `Hero`, and placeholder `#experience` / `#projects` / `#skills` sections so nav anchors resolve.

- [ ] **Step 1: Rewrite `src/app/page.tsx`**

```tsx
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";

function PlaceholderSection({ id, label }: { id: string; label: string }) {
  return (
    <section
      id={id}
      className="mx-auto flex min-h-[60vh] max-w-5xl items-center px-6"
    >
      <p className="font-mono text-sm text-muted">{label} — coming soon</p>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <PlaceholderSection id="experience" label="Experience" />
      <PlaceholderSection id="projects" label="Projects" />
      <PlaceholderSection id="skills" label="Skills" />
    </main>
  );
}
```

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: passes with no errors. Fix any unused-import or a11y warnings surfaced.

- [ ] **Step 3: Production build**

Run: `npm run build`
Expected: build succeeds with no type or compile errors. No references to removed packages remain.

- [ ] **Step 4: Manual verification (dev server)**

Run: `npm run dev` and open the local URL.
Confirm each:
- Hero name reveals on load (words rise into view); subtitle + links stagger in.
- Scrolling is smooth (Lenis) and the hero gently fades/parallaxes out.
- Nav links jump to Experience/Projects/Skills placeholders; résumé link opens `/SarpToprakBirben_Resume.pdf` (old file until user replaces it).
- Palette is paper background / ink text / amber résumé button.

- [ ] **Step 5: Manual verification (reduced motion + no-JS)**

- Enable macOS System Settings → Accessibility → Display → Reduce motion, reload: animations are disabled, all text fully visible, page still scrollable.
- View page source (or disable JS): hero heading text, subtitle, and links are present in the HTML.

- [ ] **Step 6: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: compose new landing page with hero and section anchors"
```

---

## Self-Review Notes

- **Spec coverage:** dependency swap (T1), design system/tokens/fonts (T2), `lib/gsap` + `SmoothScrollProvider` (T3), `Reveal` + `AnimatedHeading` (T4), `Nav` (T5), `Hero` (T6), page compose + placeholder anchors + verification incl. reduced-motion/no-JS (T7). Résumé external dependency documented in Global Constraints. All spec sections mapped.
- **Type consistency:** `gsap`/`ScrollTrigger` exported from `@/lib/gsap` and consumed consistently; component prop shapes match between definition and consumption (`AnimatedHeading text/className/as`, `Reveal children/delay/className`).
- **No unit tests by design:** documented in Global Constraints; verification is build + lint + manual checks.
