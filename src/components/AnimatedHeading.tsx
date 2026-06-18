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
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
