import Reveal from "@/components/Reveal";

const bullets = [
  "Designed and built a recommendation service in Laravel that analyzes user travel patterns against projected usage to suggest the right plan for each user — projected to save users €2.1M/year and now a core part of the platform's Pro tier.",
  "Redesigned the platform's communication system, consolidating scattered logic into a single reliable service with rate-limiting, deduplication, and scheduled sending — eliminating duplicate messages and reducing messaging-related support complaints.",
  "Built an end-to-end customer-support integration with AI-driven routing that automatically categorizes queries, lifting automated resolution from 31% to 65% and cutting manual support work.",
  "Contributed to the integration of rail data from major operators across nine European countries, building normalization and entity-matching logic that unified real-time and timetable feeds through UIC-based and geospatial station mapping.",
];

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-5xl px-6 py-24">
      <Reveal>
        <p className="mb-8 font-mono text-sm text-amber">~/experience</p>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="border-t border-ink/15 pt-8">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h2 className="font-sans text-2xl font-medium tracking-tight">
              Software Engineer Intern
            </h2>
            <span className="font-mono text-sm text-muted">
              Dec 2025 – June 2026
            </span>
          </div>
          <p className="mt-1 font-mono text-sm text-muted">
            Trein-vertraging · Amsterdam
          </p>
          <ul className="mt-6 max-w-3xl space-y-4">
            {bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex gap-3 leading-relaxed text-ink/80"
              >
                <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-amber" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
