import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { experience } from "@/data/profile";

export const ExperienceSection = () => (
  <section id="experience" className="border-y border-border bg-subtle/40 py-24 md:py-32">
    <div className="container">
      <SectionHeading
        index="02"
        eyebrow="Experience"
        title="Where I've worked."
        description="Backend services, front ends and the pipelines that keep them honest."
      />

      <ol className="relative space-y-6 before:absolute before:top-2 before:bottom-2 before:left-[7px] before:w-px before:bg-border md:before:left-[calc(11rem-0.5px)]">
        {experience.map((job, i) => (
          <Reveal as="li" key={`${job.company}-${job.period}`} delay={i * 60} className="relative md:grid md:grid-cols-[11rem_1fr]">
            <p className="mb-2 pl-8 pt-5 font-mono text-xs text-muted md:mb-0 md:pr-8 md:pl-0 md:text-right">
              {job.period}
            </p>

            {/* Timeline dot */}
            <span
              aria-hidden
              className={`absolute top-6 left-0 h-[15px] w-[15px] rounded-full border-2 border-background md:left-[calc(11rem-7px)] ${
                i === 0 ? "bg-emerald-400 animate-pulse-dot" : "bg-border"
              }`}
            />

            <div className="card card-hover ml-8 p-6">
              <h3 className="text-lg font-semibold tracking-tight">
                {job.role} <span className="text-muted">·</span>{" "}
                <span className="text-accent">{job.company}</span>
              </h3>

              <ul className="mt-4 space-y-2.5">
                {job.points.map((point) => (
                  <li key={point} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                    <span aria-hidden className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {point}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {job.tech.map((tech) => (
                  <span key={tech} className="chip">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  </section>
);
