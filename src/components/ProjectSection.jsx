import { ArrowUpRight, Github } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { profile, projects } from "@/data/profile";

export const ProjectSection = () => (
  <section id="projects" className="border-y border-border bg-subtle py-20 md:py-24">
    <div className="container">
      <SectionHeading title="Tracklist" description="Side projects where I explore new stacks, from developer tooling to real-time apps." />

      <ol className="border-t border-border">
        {projects.map((project, i) => (
          <Reveal as="li" key={project.title} delay={i * 50} className="border-b border-border">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title}: view source on GitHub`}
              className="group grid grid-cols-[2.75rem_minmax(0,1fr)] items-baseline gap-x-4 gap-y-2 py-5 md:grid-cols-[3.5rem_minmax(0,1.1fr)_minmax(0,1.6fr)_4rem] md:gap-x-6"
            >
              <span className="font-mono text-sm text-accent">{project.side}</span>
              <h3 className="display text-[32px] leading-[1.15] transition-colors duration-200 group-hover:text-accent">
                {project.title}
              </h3>
              <div className="col-start-2 md:col-start-auto">
                <p className="text-[15px] text-soft">{project.description}</p>
                <p className="mt-1 font-mono text-xs text-muted">{project.tags.join(" · ")}</p>
              </div>
              <span className="col-start-2 font-mono text-sm text-muted md:col-start-auto">{project.year}</span>
            </a>
          </Reveal>
        ))}
      </ol>

      <Reveal className="mt-10">
        <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">
          <Github aria-hidden className="h-4 w-4" />
          More on GitHub
          <ArrowUpRight aria-hidden className="h-4 w-4" />
        </a>
      </Reveal>
    </div>
  </section>
);
