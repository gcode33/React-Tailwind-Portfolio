import { ArrowUpRight, BarChart3, GitPullRequest, Github, Rocket } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { profile, projects } from "@/data/profile";

const icons = { rocket: Rocket, chart: BarChart3, git: GitPullRequest };

// Projects without a screenshot get a designed header instead of an empty box.
const ProjectCover = ({ project }) => {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={`Screenshot of ${project.title}`}
        loading="lazy"
        className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
      />
    );
  }

  const Icon = icons[project.icon] ?? Rocket;
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <div aria-hidden className="bg-dots absolute inset-0 [mask-image:none]" />
      <div
        aria-hidden
        className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-70"
        style={{ background: "radial-gradient(circle at 30% 20%, var(--glow), transparent 70%)" }}
      />
      <div className="relative flex flex-col items-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-card text-accent shadow-sm transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-4deg]">
          <Icon className="h-7 w-7" />
        </div>
        <p className="font-mono text-xs text-muted">{project.tags.slice(0, 3).join(" · ")}</p>
      </div>
    </div>
  );
};

export const ProjectSection = () => (
  <section id="projects" className="py-24 md:py-32">
    <div className="container">
      <SectionHeading
        index="03"
        eyebrow="Projects"
        title="Things I've built."
        description="Side projects where I explore new stacks — from LLM tooling to real-time apps."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal
            key={project.title}
            delay={(i % 2) * 100}
            className={i === 0 ? "md:col-span-2" : undefined}
          >
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`card card-hover group flex h-full flex-col overflow-hidden ${
                i === 0 ? "md:flex-row" : ""
              }`}
            >
              <div
                className={`aspect-[16/9] overflow-hidden border-b border-border bg-subtle ${
                  i === 0 ? "md:aspect-auto md:w-1/2 md:border-r md:border-b-0" : ""
                }`}
              >
                <ProjectCover project={project} />
              </div>

              <div className={`flex flex-1 flex-col p-6 ${i === 0 ? "md:justify-center md:p-10" : ""}`}>
                <div className="flex items-start justify-between gap-4">
                  <h3 className={`font-semibold tracking-tight ${i === 0 ? "text-2xl" : "text-xl"}`}>
                    {project.title}
                  </h3>
                  <span className="font-mono text-xs text-muted">{project.year}</span>
                </div>

                <p className="mt-3 leading-relaxed text-muted">{project.description}</p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="chip">
                      {tag}
                    </span>
                  ))}
                </div>

                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground md:mt-auto md:pt-6">
                  <Github className="h-4 w-4" />
                  View source
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12 text-center">
        <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn-ghost group">
          <Github className="h-4 w-4" />
          More on GitHub
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </Reveal>
    </div>
  </section>
);
