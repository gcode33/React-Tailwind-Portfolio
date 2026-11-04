import { useRef } from "react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { TimelineTrack } from "./TimelineTrack";
import { experience } from "@/data/profile";

// Real fixes read like a code diff. The +/- and hidden labels carry the meaning, not just colour.
const FixesDiff = ({ fixes }) => (
  <ul aria-label="Fixes I shipped" className="overflow-x-auto border border-border bg-background px-4 py-3.5 font-mono text-[13px] leading-[1.7]">
    {fixes.map((fix) => (
      <li key={fix.before}>
        <p className="text-removed">
          <span className="sr-only">Before: </span>
          <span aria-hidden="true">- </span>
          {fix.before}
        </p>
        <p className="text-mint">
          <span className="sr-only">After: </span>
          <span aria-hidden="true">+ </span>
          {fix.after}
        </p>
      </li>
    ))}
  </ul>
);

const marker = (i) => {
  if (i === 0) return " · LIVE";
  if (i === experience.length - 1) return " · KICK-OFF";
  return "";
};

export const ExperienceSection = () => {
  const timelineRef = useRef(null);

  return (
  <section id="experience" className="border-y border-border bg-subtle py-20 md:py-24">
    <div className="container">
      <SectionHeading
          note="experience"
        title="The season so far"
        description="Backend services, front ends and the pipelines that keep them honest."
      />

      <ol ref={timelineRef} className="relative ml-0.5 flex flex-col gap-9 pl-7 md:pl-10">
        <TimelineTrack targetRef={timelineRef} />
        {experience.map((job, i) => (
          <Reveal as="li" key={`${job.company}-${job.period}`} delay={i * 60} className="relative flex flex-col gap-3">
            <div>
              <p className={`mono-label ${i === 0 ? "text-accent" : "text-muted"}`}>
                {job.period.toUpperCase()}
                {marker(i)}
              </p>
              <h3 className="mt-0.5 text-2xl font-semibold">
                {job.role}, {job.company}
              </h3>
            </div>

            <ul className="flex flex-col gap-2 text-soft">
              {job.points.map((point) => (
                <li key={point} className="flex gap-3">
                  <span aria-hidden className="mt-[0.7em] h-1 w-1 shrink-0 bg-accent" />
                  {point}
                </li>
              ))}
            </ul>

            {job.fixes && <FixesDiff fixes={job.fixes} />}

            <ul aria-label={`Technology used at ${job.company}`} className="flex flex-wrap gap-1.5">
              {job.tech.map((tech) => (
                <li key={tech} className="chip font-mono text-xs text-muted">
                  {tech}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ol>
    </div>
  </section>
  );
};
