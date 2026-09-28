import { GraduationCap } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { education } from "@/data/profile";

const stats = [
  { value: "2022", label: "Professional experience since" },
  { value: "3", label: "Software development roles" },
  { value: "5", label: "Featured projects" },
];

export const AboutSection = () => (
  <section id="about" className="py-24 md:py-32">
    <div className="container">
      <SectionHeading index="01" eyebrow="About" title="Building reliable software, end to end." />

      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <Reveal className="space-y-5 text-lg leading-relaxed text-muted">
          <p>
            I'm a software developer based in London, Ontario, with a BSc in Computer Science. I
            currently work at <span className="text-foreground">Lynked Inc.</span>, where I build
            cross-service features and resolve production issues across NestJS, Next.js, Nuxt and
            Laravel applications.
          </p>
          <p>
            Previously, at Continuum Commerce Solutions, I designed and deployed a .NET and SQL
            Server platform for managing client configuration, and integrated automated API fuzz
            testing and SonarQube quality gates into the CI/CD pipeline. Before that, I spent two
            years at Rocket Financial developing accessible React and TypeScript interfaces and
            containerized microservices.
          </p>
          <p>
            I focus on the fundamentals that make software reliable: correct API behaviour, clean
            data, meaningful test coverage, and small, reviewable changes.
          </p>
          <p>
            I'm also very interested in artificial intelligence and how it is changing the way
            software is built. I use AI tools every day to understand large codebases, prototype
            and validate ideas, strengthen test coverage, and analyze production issues, while
            carefully reviewing everything that ships. It has made me a faster, more thorough
            engineer, and I'm continually exploring new ways to apply it.
          </p>
        </Reveal>

        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 80} className="card p-4">
                <p className="text-2xl font-semibold tracking-tight">{stat.value}</p>
                <p className="mt-1 text-xs leading-snug text-muted">{stat.label}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={240} className="card card-hover flex gap-4 p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium">{education.degree}</p>
              <p className="mt-1 text-sm text-muted">{education.school}</p>
              <p className="mt-2 font-mono text-xs text-muted">{education.period}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);
