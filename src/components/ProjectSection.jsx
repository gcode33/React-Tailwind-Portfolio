import { ArrowUpRight, Github, Play } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { sound } from "@/lib/sound";
import { profile, projects } from "@/data/profile";

const tick = () => sound.effect("tick");

export const ProjectSection = () => (
  <section id="projects" className="border-y border-border bg-subtle py-20 md:py-24">
    <div className="container">
      <SectionHeading note="projects" title="Tracklist" description="Side projects where I explore new stacks, from developer tooling to real-time apps." />

      <ol className="border-t border-border">
        {projects.map((project, i) => (
          <Reveal as="li" key={project.title} delay={i * 50} className="border-b border-border">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={tick}
              onFocus={tick}
              className="group relative grid grid-cols-[2.75rem_minmax(0,1fr)] items-baseline gap-x-4 gap-y-2 py-5 after:absolute after:inset-x-0 after:-bottom-px after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-500 after:ease-out hover:after:scale-x-100 focus-visible:after:scale-x-100 md:grid-cols-[3.5rem_minmax(0,1.1fr)_minmax(0,1.6fr)_4rem] md:gap-x-6"
            >
              <span className="relative font-mono text-sm text-accent">
                <span className="transition-opacity duration-200 group-hover:opacity-0 group-focus-visible:opacity-0">{project.side}</span>
                <Play
                  aria-hidden="true"
                  className="absolute top-0.5 left-0 h-3.5 w-3.5 fill-current opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                />
              </span>
              <h3 className="display text-[32px] leading-[1.15] transition-[color,translate] duration-300 ease-out group-hover:translate-x-2 group-hover:text-accent group-focus-visible:translate-x-2 group-focus-visible:text-accent">
                {project.title}
              </h3>
              <div className="col-start-2 md:col-start-auto">
                <p className="text-[15px] text-soft">{project.description}</p>
                <p className="mt-1 font-mono text-xs text-muted">{project.tags.join(" · ")}</p>
              </div>
              <span className="col-start-2 font-mono text-sm text-muted md:col-start-auto">{project.year}</span>
              <span className="sr-only">View source on GitHub</span>
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
