import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { Check, Copy, Download, Github, Linkedin, Mail } from "lucide-react";
import { DecodeText } from "./DecodeText";
import { GoalNet } from "./GoalNet";
import { Reveal } from "./Reveal";
import { experience, profile } from "@/data/profile";

const firstYear = Math.min(...experience.map((job) => new Date(job.start).getUTCFullYear()));

const linkClass = "inline-flex min-h-11 items-center gap-2 break-all text-accent underline-offset-4 hover:underline";

export const ContactSection = () => {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef(null);
  const sectionRef = useRef(null);
  const netRef = useRef(null);
  const seen = useInView(sectionRef, { once: true, amount: 0.5 });

  // One shot the first time the section comes into view, so everyone sees the net move.
  useEffect(() => {
    if (seen) netRef.current?.shoot();
  }, [seen]);

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
    <section ref={sectionRef} id="contact" className="relative overflow-hidden border-t border-border py-20 md:py-24">
      <GoalNet ref={netRef} />
      <div className="container relative grid items-center gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
        <Reveal className="flex flex-col gap-4">
          <h2 className="display text-[clamp(3.5rem,8vw,6.5rem)] leading-none">
            <DecodeText text="Put it in the net." />
          </h2>
          <p className="text-soft">Hiring, or want to talk code, Chelsea or 70s jazz funk? Send me a note.</p>
          <div className="flex flex-wrap gap-3">
            <a
              href={`mailto:${profile.email}`}
              onClick={(event) => netRef.current?.shoot(event.currentTarget)}
              className="btn-primary"
            >
              <Mail aria-hidden className="h-4 w-4" />
              Email me
            </a>
            <button type="button" onClick={copyEmail} className="btn-ghost cursor-pointer">
              {copied ? <Check aria-hidden className="h-4 w-4" /> : <Copy aria-hidden className="h-4 w-4" />}
              <span aria-live="polite">{copied ? "Email copied" : "Copy email"}</span>
            </button>
          </div>
        </Reveal>

        <Reveal delay={100} className="flex flex-col gap-3 border border-foreground bg-subtle p-6">
          <div className="flex justify-between gap-3 font-mono text-xs text-muted">
            <span>DEVELOPER LICENCE</span>
            <span>EST. {firstYear}</span>
          </div>
          <p className="display text-4xl leading-[1.1]">{profile.name}.</p>
          <p className="text-[15px] text-soft">
            {profile.role} · {profile.location}
          </p>
          <div className="flex flex-col text-[15px]">
            <a href={`mailto:${profile.email}`} className={linkClass}>
              <Mail aria-hidden className="h-4 w-4 shrink-0" />
              {profile.email}
            </a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
              <Github aria-hidden className="h-4 w-4 shrink-0" />
              github.com/gcode33
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
              <Linkedin aria-hidden className="h-4 w-4 shrink-0" />
              linkedin.com/in/george-fotabong-b10b92202
            </a>
            <a href={profile.resume} download className={linkClass}>
              <Download aria-hidden className="h-4 w-4 shrink-0" />
              Download résumé
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
