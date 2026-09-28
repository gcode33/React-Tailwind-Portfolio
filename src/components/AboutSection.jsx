import { GraduationCap } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { education } from "@/data/profile";

const stats = [
  { value: "2022", label: "Shipping production code since" },
  { value: "3", label: "Companies I've built software for" },
  { value: "5", label: "Recent projects on GitHub" },
];

export const AboutSection = () => (
  <section id="about" className="py-24 md:py-32">
    <div className="container">
      <SectionHeading index="01" eyebrow="About" title="Pragmatic engineer, careful with the details." />

      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <Reveal className="space-y-5 text-lg leading-relaxed text-muted">
          <p>
            I'm a software developer based in London, Ontario. Today I work at{" "}
            <span className="text-foreground">Lynked Inc.</span>, shipping cross-service features
            and tracking down production defects across NestJS, Next.js, Nuxt and Laravel codebases.
          </p>
          <p>
            Before that I built a .NET and SQL Server configuration platform at Continuum Commerce
            Solutions, wired automated API fuzz testing and SonarQube quality gates into CI/CD, and
            spent two years building React and TypeScript interfaces at Rocket Financial.
          </p>
          <p>
            I care about the unglamorous things that make software trustworthy: correct status codes,
            clean data, real test coverage, and changes that are small enough to review. Outside of
            work I build side projects to explore new stacks — from real-time sports tracking and
            developer tooling to market data analysis.
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
