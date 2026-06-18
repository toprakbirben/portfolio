"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { gsap } from "@/lib/gsap";
import AnimatedHeading from "@/components/AnimatedHeading";
import Reveal from "@/components/Reveal";

const metrics = [
  { label: "automated support resolution", value: "31% → 65%" },
  { label: "recommendation engine", value: "~€500k projected savings" },
  { label: "EU rail carrier identifiers", value: "normalized → unified" },
];

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
        yPercent: 14,
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
      className="flex min-h-screen items-center px-6 pt-24"
    >
      <div ref={innerRef} className="mx-auto w-full max-w-5xl">
        <p className="mb-6 font-mono text-sm text-muted">
          Amsterdam, NL · backend systems
        </p>
        <AnimatedHeading
          text="Sarp Toprak Birben"
          className="font-sans text-[clamp(2.5rem,8vw,6rem)] font-medium leading-[0.95] tracking-tight"
        />
        <Reveal delay={0.3} className="mt-8 max-w-2xl">
          <p className="text-[clamp(1.1rem,2.5vw,1.6rem)] leading-snug text-ink/80">
            Backend-focused software engineer — building scalable systems end to
            end, from design to production.
          </p>
        </Reveal>

        {/* Signature: system status readout of real impact */}
        <Reveal delay={0.45} className="mt-10 max-w-2xl">
          <div className="rounded-lg border border-ink/15 font-mono text-sm">
            <div className="flex items-center gap-2 border-b border-ink/10 px-4 py-2.5 text-muted">
              <motion.span
                aria-hidden="true"
                className="inline-block h-2 w-2 rounded-full bg-amber"
                animate={{ opacity: [1, 0.25, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              currently · Software Engineer Intern @ Trein-vertraging
            </div>
            <ul>
              {metrics.map((m, i) => (
                <li
                  key={m.label}
                  className={`flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-4 py-2.5 ${
                    i < metrics.length - 1 ? "border-b border-ink/10" : ""
                  }`}
                >
                  <span className="text-muted">{m.label}</span>
                  <span className="text-ink">{m.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.6} className="mt-10">
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
