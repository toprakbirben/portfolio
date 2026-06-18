const links = [
  { label: "GitHub", href: "https://github.com/toprakbirben" },
  { label: "LinkedIn", href: "https://linkedin.com/in/toprakbirben" },
  { label: "Email", href: "mailto:birbentoprak@gmail.com" },
];

export default function Footer() {
  return (
    <footer className="border-t border-ink/15">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-8 font-mono text-sm text-muted">
        <span>© {new Date().getFullYear()} Sarp Toprak Birben</span>
        <div className="flex flex-wrap items-center gap-5">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
