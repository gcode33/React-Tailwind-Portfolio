import { useRef } from "react";
import { m, useTransform } from "motion/react";
import { Download, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { useScrub } from "@/lib/useScrub";
import { experience, profile, projects } from "@/data/profile";
import { Bracketed } from "./Graphics";
import { SchematicLines } from "./SchematicLines";
import { HeroName } from "./HeroName";
import { InspectNote } from "./InspectNote";
import { Reveal } from "./Reveal";

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

const HeroContent = m.div;

export const HeroSection = () => {
  const sectionRef = useRef(null);
  // The content eases down and fades as you scroll away, so the next section takes over.
  const progress = useScrub(sectionRef, ["start start", "end start"], { rest: 0 });
  const y = useTransform(progress, [0, 1], [0, 120]);
  const opacity = useTransform(progress, [0, 0.85], [1, 0.1]);

  return (
  <section ref={sectionRef} id="hero" className="relative overflow-hidden border-b border-border">
    <SchematicLines />

    <HeroContent data-hero-content style={{ y, opacity }} className="container relative flex flex-col gap-6 pt-32 pb-16 md:pt-40 md:pb-20">
      <Reveal as="p" className="mono-label text-accent">
        CURRENTLY AT {profile.currently.toUpperCase()} · {profile.location.toUpperCase()}
      </Reveal>

      <HeroName />
      <InspectNote id="hero" />

      <Reveal as="p" delay={350} className="max-w-[39rem] text-xl leading-normal text-soft">
        {profile.role}. I build reliable backend services and clean, accessible front ends, with
        production experience across Node/TypeScript, .NET and Python microservices.
      </Reveal>

      <Reveal delay={450} className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <Bracketed>
          <a href="#projects" className="btn-primary mono-label">
            VIEW MY WORK
          </a>
        </Bracketed>
        <a href={profile.resume} download className="btn-ghost">
          <Download aria-hidden className="h-4 w-4" />
          Download résumé
        </a>
      </Reveal>

      <Reveal delay={550} className="flex flex-wrap items-center gap-5 text-muted">
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
      </Reveal>

      <Reveal as="dl" delay={650} className="mt-6 grid grid-cols-3 border-y border-border">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`flex flex-col-reverse justify-end ${i === 0 ? "py-3.5 pr-4" : "border-l border-border px-4 py-3.5"}`}
          >
            <dt className="text-[13px] text-muted">{stat.label}</dt>
            <dd className="display text-4xl leading-tight">{stat.value}</dd>
          </div>
        ))}
      </Reveal>
    </HeroContent>
  </section>
  );
};
