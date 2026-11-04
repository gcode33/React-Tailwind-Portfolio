import { GraduationCap } from "lucide-react";
import { InspectNote } from "./InspectNote";
import { Reveal } from "./Reveal";
import { ScrollWords } from "./ScrollWords";
import { education, experience, projects } from "@/data/profile";

const firstYear = Math.min(...experience.map((job) => new Date(job.start).getUTCFullYear()));

const stats = [
  { value: firstYear, label: "Professional experience since" },
  { value: experience.length, label: "Software development roles" },
  { value: projects.length, label: "Featured projects" },
];

export const AboutSection = () => (
  <section id="about" className="py-20 md:py-24">
    <div className="container grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
      <Reveal className="flex flex-col gap-4 text-soft">
        <h2 className="display text-5xl leading-[1.05] text-foreground md:text-[56px]">
          <ScrollWords text="Building reliable software, end to end." />
        </h2>
        <p>
          I'm a software developer based in Toronto, Ontario, with a BSc in Computer Science. I
          currently work at <span className="text-foreground">Lynked Inc.</span>, where I build
          cross-service features and resolve production issues across NestJS, Next.js, Nuxt and
          Laravel applications.
        </p>
        <p>
          Previously, at Continuum Commerce Solutions, I designed and deployed a .NET and SQL Server
          platform for managing client configuration, built automated API fuzz-testing pipelines,
          and made SonarQube a blocking quality gate in GitLab CI/CD. Before that, I spent two years
          at Rocket Financial developing accessible React and TypeScript interfaces and
          containerized microservices.
        </p>
        <p data-about-statement className="my-2 text-xl leading-relaxed text-foreground">
          <ScrollWords
            offset={["start 85%", "start 50%"]}
            text="I focus on the fundamentals that make software reliable: correct API behaviour, clean data, meaningful test coverage, and small, reviewable changes."
          />
        </p>
        <p>
          I'm also very interested in how AI is changing the way software is built. I use Claude
          Code every day to understand large codebases, prototype ideas, strengthen test coverage
          and analyze production issues, while carefully reviewing everything that ships.
        </p>
      </Reveal>

      <Reveal delay={100} className="flex flex-col gap-3">
        <h3 className="mono-label text-accent">EDUCATION</h3>
        <div className="flex gap-4 border border-border p-4">
          <GraduationCap aria-hidden className="h-5 w-5 shrink-0 text-accent" />
          <div>
            <p className="font-medium text-foreground">{education.degree}</p>
            <p className="text-sm text-muted">{education.school}</p>
            <p className="mt-1 font-mono text-xs text-muted">{education.period}</p>
          </div>
        </div>

        <h3 className="mono-label mt-4 text-accent">AT A GLANCE</h3>
        <dl className="border border-border">
          {stats.map((stat, i) => (
            <div key={stat.label} className={`flex items-baseline gap-4 p-4 ${i ? "border-t border-border" : ""}`}>
              <dt className="order-2 text-sm text-muted">{stat.label}</dt>
              <dd className="display order-1 min-w-20 text-4xl">{stat.value}</dd>
            </div>
          ))}
        </dl>
        <InspectNote id="about" className="mt-2" />
      </Reveal>
    </div>
  </section>
);
