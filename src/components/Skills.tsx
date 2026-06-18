import Reveal from "@/components/Reveal";

const groups = [
  { label: "Languages", items: ["PHP", "Python", "Java", "C++"] },
  {
    label: "Backend",
    items: ["Laravel", "FastAPI", "REST APIs", "Celery", "Redis"],
  },
  { label: "Frontend", items: ["React", "Inertia.js", "Next.js", "Vite.js"] },
  {
    label: "Databases",
    items: ["MySQL", "PostgreSQL", "SQLite", "SQLAlchemy"],
  },
  {
    label: "Tools / DevOps",
    items: ["Docker", "Git", "GitHub Actions", "CI/CD", "Alembic"],
  },
  {
    label: "Concepts",
    items: [
      "System Design",
      "Distributed Systems",
      "Scalability",
      "Data Structures & Algorithms",
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-5xl px-6 py-24">
      <Reveal>
        <p className="mb-8 font-mono text-sm text-amber">~/skills</p>
      </Reveal>
      <Reveal delay={0.1}>
        <dl className="border-t border-ink/15">
          {groups.map((group) => (
            <div
              key={group.label}
              className="grid grid-cols-1 gap-3 border-b border-ink/10 py-5 sm:grid-cols-[160px_1fr]"
            >
              <dt className="font-mono text-sm text-muted">{group.label}</dt>
              <dd className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-ink/15 px-3 py-1 font-mono text-xs text-ink/80"
                  >
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
