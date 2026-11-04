import { Download, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { experience, personal, profile, projects } from "@/data/profile";
import { Bracketed, PitchLines } from "./Graphics";

const socials = [
  { label: "GitHub", href: profile.github, icon: Github },
  { label: "LinkedIn", href: profile.linkedin, icon: Linkedin },
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
];

const firstYear = Math.min(...experience.map((job) => new Date(job.start).getUTCFullYear()));

const stats = [
  { value: firstYear, label: "Professional experience since" },
  { value: experience.length, label: "Software development roles" },
  { value: projects.length, label: "Featured projects" },
];

export const HeroSection = () => (
  <section id="hero" className="relative overflow-hidden border-b border-border">
    <PitchLines />

    <div className="container relative flex flex-col gap-6 pt-32 pb-16 md:pt-40 md:pb-20">
      <p className="mono-label text-accent">
        NO. {personal.number} · LIVE AT {profile.currently.toUpperCase()} · {profile.location.toUpperCase()}
      </p>

      <h1 className="display text-[clamp(4rem,12vw,11rem)] leading-[0.98] tracking-[0.01em]">
        George
        <br />
        Fotabong Jr.
      </h1>

      <p className="max-w-[39rem] text-xl leading-normal text-soft">
        {profile.role}. I build reliable backend services and clean, accessible front ends, with
        production experience across Node/TypeScript, .NET and Python microservices.
      </p>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <Bracketed>
          <a href="#projects" className="btn-primary mono-label">
            KICK OFF · VIEW MY WORK
          </a>
        </Bracketed>
        <a href={profile.resume} download className="btn-ghost">
          <Download aria-hidden className="h-4 w-4" />
          Download résumé
        </a>
      </div>

      <div className="flex flex-wrap items-center gap-5 text-muted">
        {socials.map((social) => {
          const { label, href, icon: Icon } = social;
          return (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            aria-label={label}
            className="flex h-11 w-11 items-center justify-center transition-colors duration-200 hover:text-foreground"
          >
            <Icon aria-hidden className="h-5 w-5" />
          </a>
          );
        })}
        <span className="inline-flex items-center gap-1.5 text-sm">
          <MapPin aria-hidden className="h-4 w-4" />
          {profile.location}
        </span>
      </div>

      <dl className="mt-6 grid grid-cols-3 border-y border-border">
        {stats.map((stat, i) => (
          <div key={stat.label} className={i === 0 ? "py-3.5 pr-4" : "border-l border-border px-4 py-3.5"}>
            <dd className="display text-4xl leading-tight">{stat.value}</dd>
            <dt className="text-[13px] text-muted">{stat.label}</dt>
          </div>
        ))}
      </dl>
    </div>
  </section>
);
