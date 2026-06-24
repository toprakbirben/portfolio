import Reveal from "@/components/Reveal";

const projects = [
  {
    name: "fuuutball",
    href: "https://fuuutball.com/",
    tagline: "Online Multiplayer Football Manager",
    stack: ["Python", "FastAPI", "React"],
    bullets: [
      "Real-time multiplayer backend where users join league sessions, manage squads, and trade players on a live transfer market against other players and AI bots — FastAPI + async SQLAlchemy 2.0 (PostgreSQL), with Celery / Redis workers driving match simulation, season progression, and bots.",
      "Engineered a deterministic match-simulation engine and a transactional-outbox event pipeline for reliable updates; validated with unit, property, and load tests (k6, Locust).",
      "Set up CI/CD with GitHub Actions — automated testing on every change and Dockerized deployments to dev and production.",
    ],
  },
  {
    name: "morethantasks",
    href: "https://github.com/toprakbirben/morethantasks",
    tagline: "Full-Stack Productivity App",
    stack: ["Swift"],
    bullets: [
      "Designed and built a full-stack app with online/offline data synchronization.",
      "Built a dual-database system (PostgreSQL + SQLite) for reliability and scalable local-first storage.",
    ],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-24">
      <Reveal>
        <p className="mb-8 font-mono text-sm text-amber">~/projects</p>
      </Reveal>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.name} delay={0.1 + i * 0.1}>
            <div className="flex h-full flex-col rounded-lg border border-ink/15 p-6">
              <h3 className="font-sans text-xl font-medium tracking-tight">
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 border-b border-transparent hover:border-ink"
                >
                  {project.name}
                  <span
                    aria-hidden="true"
                    className="text-amber transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  >
                    ↗
                  </span>
                </a>
              </h3>
              <p className="mt-1 text-sm text-muted">{project.tagline}</p>
              <p className="mt-2 font-mono text-xs text-amber">
                {project.stack.join(" · ")}
              </p>
              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-ink/80">
                {project.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-amber" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
