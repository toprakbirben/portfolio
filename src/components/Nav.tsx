"use client";

import { motion } from "motion/react";

const links = [
  { label: "experience", href: "#experience" },
  { label: "projects", href: "#projects" },
  { label: "skills", href: "#skills" },
];

export default function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-paper/80 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5 font-mono text-sm">
        <a href="#top" className="font-medium tracking-tight">
          stb<span className="text-amber">.</span>
        </a>
        <div className="flex items-center gap-6">
          <ul className="hidden items-center gap-6 sm:flex">
            {links.map((link) => (
              <li key={link.href}>
                <motion.a
                  href={link.href}
                  className="text-muted hover:text-ink"
                  whileHover={{ y: -1 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-muted/60">~/</span>
                  {link.label}
                </motion.a>
              </li>
            ))}
          </ul>
          <a
            href="/SarpToprakBirben_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-ink px-4 py-1.5 hover:bg-ink hover:text-paper transition-colors"
          >
            résumé
          </a>
        </div>
      </nav>
    </header>
  );
}
