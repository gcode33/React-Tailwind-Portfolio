import { useEffect, useRef, useState } from "react";
import { Check, Copy, Github, Linkedin, Mail, Phone } from "lucide-react";
import { Reveal } from "./Reveal";
import { profile } from "@/data/profile";

const links = [
  { label: "LinkedIn", href: profile.linkedin, icon: Linkedin },
  { label: "GitHub", href: profile.github, icon: Github },
  { label: profile.phone, href: profile.phoneHref, icon: Phone },
];

export const ContactSection = () => {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef(null);

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="container">
        <Reveal className="card relative overflow-hidden px-6 py-16 text-center md:px-16 md:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[600px] -translate-x-1/2 rounded-full blur-3xl"
            style={{ background: "radial-gradient(closest-side, var(--glow), transparent)" }}
          />

          <p className="relative mb-3 font-mono text-sm text-accent">05. Contact</p>
          <h2 className="relative text-3xl font-semibold tracking-tight md:text-5xl">Let's work together.</h2>
          <p className="relative mx-auto mt-4 max-w-lg text-muted">
            I'm open to software engineering roles and interesting collaborations. The best way to
            reach me is by email.
          </p>

          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href={`mailto:${profile.email}`} className="btn-primary">
              <Mail className="h-4 w-4" />
              {profile.email}
            </a>
            <button onClick={copyEmail} className="btn-ghost">
              {copied ? (
                <Check aria-hidden className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
              ) : (
                <Copy aria-hidden className="h-4 w-4" />
              )}
              <span aria-live="polite">{copied ? "Email copied" : "Copy email"}</span>
            </button>
          </div>

          <div className="relative mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted">
            {links.map(({ label, href, icon }) => {
              const Icon = icon;
              return (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors duration-200 hover:text-foreground"
              >
                <Icon className="h-4 w-4" />
                {label}
              </a>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
};
