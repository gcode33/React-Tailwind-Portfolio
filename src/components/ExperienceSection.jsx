import { useRef } from "react";
import { m } from "motion/react";
import { ScrubIn } from "./ScrubIn";
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

const Chips = m.ul;
const Chip = m.li;
const chipsIn = { hidden: {}, shown: { transition: { staggerChildren: 0.035 } } };
const chipIn = { hidden: { opacity: 0, y: 8 }, shown: { opacity: 1, y: 0 } };

// The tools appear one after another the first time they scroll into view.
const TechList = ({ company, tech }) => (
  <Chips
    aria-label={`Technology used at ${company}`}
    data-reveal
    className="flex flex-wrap gap-1.5"
    variants={chipsIn}
    initial="hidden"
    whileInView="shown"
    viewport={{ once: true, margin: "0px 0px -40px 0px" }}
  >
    {tech.map((item) => (
      <Chip key={item} data-reveal variants={chipIn} className="chip font-mono text-xs text-muted">
        {item}
      </Chip>
    ))}
  </Chips>
);

const marker = (i) => {
  return i === 0 ? " · CURRENT" : "";
};

export const ExperienceSection = () => {
  const timelineRef = useRef(null);

  return (
  <section id="experience" className="border-y border-border bg-subtle py-20 md:py-24">
    <div className="container">
      <SectionHeading
          note="experience"
        title="Experience"
        description="Backend services, front ends and the pipelines that keep them honest."
      />

      <ol ref={timelineRef} className="relative ml-0.5 flex flex-col gap-9 pl-7 md:pl-10">
        <TimelineTrack targetRef={timelineRef} />
        {experience.map((job, i) => (
          <ScrubIn as="li" key={`${job.company}-${job.period}`} y={56} data-role className="relative flex flex-col gap-3">
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

            <TechList company={job.company} tech={job.tech} />
          </ScrubIn>
        ))}
      </ol>
    </div>
  </section>
  );
};
