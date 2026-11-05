import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { CalendarDays, Check, Copy, Download, Github, Linkedin, Mail } from "lucide-react";
import { DecodeText } from "./DecodeText";
import { GoalNet } from "./GoalNet";
import { InspectNote } from "./InspectNote";
import { ScrubIn } from "./ScrubIn";
import { experience, profile } from "@/data/profile";

const firstYear = Math.min(...experience.map((job) => new Date(job.start).getUTCFullYear()));

const linkClass = "inline-flex min-h-11 items-center gap-2 text-accent [overflow-wrap:anywhere] underline-offset-4 hover:underline";

export const ContactSection = () => {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef(null);
  const sectionRef = useRef(null);
  const netRef = useRef(null);
  const seen = useInView(sectionRef, { once: true, amount: 0.5 });

  // The pass from the last section finishes here, the first time it comes into view.
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
    <section ref={sectionRef} id="contact" className="relative overflow-hidden py-20 md:py-24">
      <GoalNet ref={netRef} />
      <div className="container relative grid items-center gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
        <ScrubIn y={48} className="flex min-w-0 flex-col gap-4">
          <h2 className="display text-[clamp(2.75rem,14.5vw,3.5rem)] leading-none md:text-[clamp(3.5rem,8vw,6.5rem)]">
            <DecodeText text="Let's work together." />
          </h2>
          <p className="text-soft">Hiring, or want to talk about software? Send me a note.</p>
          <InspectNote id="contact" />
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
            <a href="#book" className="btn-ghost">
              <CalendarDays aria-hidden className="h-4 w-4" />
              Book a time
            </a>
          </div>
        </ScrubIn>

        <ScrubIn y={88} className="flex min-w-0 flex-col gap-3 border border-foreground bg-subtle p-6">
          <div className="flex justify-between gap-3 font-mono text-xs text-muted">
            <span>CONTACT</span>
            <span>BUILDING SINCE {firstYear}</span>
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
        </ScrubIn>
      </div>
    </section>
  );
};
