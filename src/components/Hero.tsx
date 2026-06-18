"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { gsap } from "@/lib/gsap";
import AnimatedHeading from "@/components/AnimatedHeading";
import Reveal from "@/components/Reveal";
import { prefersReducedMotion } from "@/lib/prefersReducedMotion";

const keywords = [
  "Laravel",
  "Distributed Systems",
  "FastAPI",
  "Event-driven",
  "PostgreSQL",
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const inner = innerRef.current;
    if (!section || !inner) return;
    if (prefersReducedMotion()) return;

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
      <div
        ref={innerRef}
        className="mx-auto grid w-full max-w-5xl items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto]"
      >
        <Reveal
          delay={0.2}
          className="order-first justify-self-center lg:order-last lg:justify-self-end"
        >
          <Image
            src="/torpak.png"
            alt="Sarp Toprak Birben"
            width={907}
            height={1384}
            priority
            className="w-40 rounded-2xl border border-ink/15 object-cover sm:w-52 lg:w-64"
          />
        </Reveal>

        <div>
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
              {reduce ? (
                <span
                  aria-hidden="true"
                  className="inline-block h-2 w-2 rounded-full bg-emerald-500"
                />
              ) : (
                <motion.span
                  aria-hidden="true"
                  className="inline-block h-2 w-2 rounded-full bg-emerald-500"
                  animate={{ opacity: [1, 0.25, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
              open to work · backend &amp; systems roles
            </div>
            <p className="border-b border-ink/10 px-4 py-3 leading-snug text-ink">
              Built a recommendation engine projected to save users{" "}
              <span className="text-amber">€2.1M/year</span>.
            </p>
            <div className="flex flex-wrap gap-2 px-4 py-3">
              {keywords.map((kw) => (
                <span
                  key={kw}
                  className="rounded-full border border-ink/15 px-3 py-1 text-xs text-ink/80"
                >
                  {kw}
                </span>
              ))}
            </div>
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
              href="#contact"
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
      </div>
    </section>
  );
}
