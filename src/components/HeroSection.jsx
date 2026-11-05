import { useRef } from "react";
import { m, useTransform } from "motion/react";
import { Download, Github, Linkedin, Mail } from "lucide-react";
import { useScrub } from "@/lib/useScrub";
import { introDelayS } from "@/lib/intro";
import { profile } from "@/data/profile";
import { Bracketed } from "./Graphics";
import { BallHorizon } from "./BallHorizon";
import { HeroName } from "./HeroName";
import { InspectNote } from "./InspectNote";
import { Reveal } from "./Reveal";

const socials = [
  { label: "GitHub", href: profile.github, icon: Github },
  { label: "LinkedIn", href: profile.linkedin, icon: Linkedin },
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
];

const HeroContent = m.div;
const wait = introDelayS * 1000;

export const HeroSection = () => {
  const sectionRef = useRef(null);
  // The content eases down and fades as you scroll away, so the next section takes over.
  const progress = useScrub(sectionRef, ["start start", "end start"], { rest: 0 });
  const y = useTransform(progress, [0, 1], [0, 140]);
  const opacity = useTransform(progress, [0, 0.8], [1, 0]);
  const scale = useTransform(progress, [0, 1], [1, 0.94]);

  return (
    <section ref={sectionRef} id="hero" className="relative min-h-svh overflow-hidden">
      <BallHorizon />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

      <HeroContent
        data-hero-content
        style={{ y, opacity, scale }}
        className="container relative flex min-h-svh flex-col items-center justify-center gap-6 pt-24 pb-24 text-center"
      >
        <Reveal as="p" delay={wait} className="mono-label tracking-[0.2em] text-signal">
          CURRENTLY AT {profile.currently.toUpperCase()} · {profile.location.toUpperCase()}
        </Reveal>

        <HeroName />
        <InspectNote id="hero" />

        <Reveal as="p" delay={wait + 300} className="max-w-[46rem] text-sm leading-relaxed tracking-[0.12em] text-soft uppercase md:text-base">
          {profile.role}. I build reliable backend services and clean, accessible front ends, with production
          experience across Node/TypeScript, .NET and Python microservices.
        </Reveal>

        <Reveal delay={wait + 400} className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
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

        <Reveal delay={wait + 500} className="flex items-center justify-center gap-3 text-soft">
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
        </Reveal>
      </HeroContent>
    </section>
  );
};
