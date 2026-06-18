"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";

const WEB3FORMS_ACCESS_KEY = "c85cd3ce-4793-4875-877e-bdc1beb083c9";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full rounded-lg border border-ink/15 bg-transparent px-4 py-3 text-ink placeholder:text-muted/60 focus:border-ink focus:outline-none";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const formData = new FormData(event.currentTarget);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setStatus(data.success ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-24">
      <Reveal>
        <p className="mb-8 font-mono text-sm text-amber">~/contact</p>
      </Reveal>

      {status === "success" ? (
        <Reveal>
          <div className="border-t border-ink/15 pt-8">
            <h2 className="font-sans text-2xl font-medium tracking-tight">
              Thanks — message sent.
            </h2>
            <p className="mt-2 text-ink/80">
              I&apos;ll get back to you as soon as I can.
            </p>
          </div>
        </Reveal>
      ) : (
        <Reveal delay={0.1}>
          <div className="border-t border-ink/15 pt-8">
            <h2 className="max-w-2xl font-sans text-2xl font-medium tracking-tight">
              Looking to hire or collaborate? Send me a message.
            </h2>

            <form
              onSubmit={handleSubmit}
              className="mt-8 grid max-w-2xl gap-5"
            >
              {/* Honeypot — hidden from real users, catches bots */}
              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="grid gap-2">
                  <label
                    htmlFor="name"
                    className="font-mono text-sm text-muted"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className={inputClass}
                  />
                </div>
                <div className="grid gap-2">
                  <label
                    htmlFor="email"
                    className="font-mono text-sm text-muted"
                  >
                    Your email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <label
                  htmlFor="subject"
                  className="font-mono text-sm text-muted"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  className={inputClass}
                />
              </div>

              <div className="grid gap-2">
                <label
                  htmlFor="message"
                  className="font-mono text-sm text-muted"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className={`${inputClass} resize-y`}
                />
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="rounded-full bg-amber px-6 py-2.5 font-mono text-sm text-paper transition-colors hover:bg-ink disabled:opacity-60"
                >
                  {status === "submitting" ? "Sending…" : "Send message"}
                </button>

                {status === "error" && (
                  <p className="font-mono text-sm text-muted" role="alert">
                    Something went wrong — email me directly at{" "}
                    <a
                      href="mailto:birbentoprak@gmail.com"
                      className="border-b border-ink/40 text-ink hover:border-ink"
                    >
                      birbentoprak@gmail.com
                    </a>
                    .
                  </p>
                )}
              </div>
            </form>
          </div>
        </Reveal>
      )}
    </section>
  );
}
