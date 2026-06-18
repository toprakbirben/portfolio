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
