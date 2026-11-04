import { GraduationCap } from "lucide-react";
import { DecodeText } from "./DecodeText";
import { Reveal } from "./Reveal";
import { Shirt } from "./Graphics";
import { education, personal } from "@/data/profile";

export const AboutSection = () => (
  <section id="about" className="py-20 md:py-24">
    <div className="container grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
      <Reveal className="flex flex-col gap-4 text-soft">
        <h2 className="display text-5xl leading-[1.05] text-foreground md:text-[56px]">
          <DecodeText text="Building reliable software, end to end." />
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
        <p>
          I focus on the fundamentals that make software reliable: correct API behaviour, clean
          data, meaningful test coverage, and small, reviewable changes.
        </p>
        <p>
          I'm also very interested in how AI is changing the way software is built. I use Claude
          Code every day to understand large codebases, prototype ideas, strengthen test coverage
          and analyze production issues, while carefully reviewing everything that ships.
        </p>
        <div className="mt-2 flex gap-4 border border-border p-4">
          <GraduationCap aria-hidden className="h-5 w-5 shrink-0 text-accent" />
          <div>
            <p className="font-medium text-foreground">{education.degree}</p>
            <p className="text-sm text-muted">{education.school}</p>
            <p className="mt-1 font-mono text-xs text-muted">{education.period}</p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={100} className="flex flex-col gap-3">
        <h3 className="mono-label text-accent">OFF THE CLOCK</h3>

        <div className="flex items-center gap-4 border border-border p-4">
          <Shirt number={personal.number} className="h-[60px] w-16 shrink-0" />
          <div>
            <p className="font-semibold">On the pitch</p>
            <p className="text-[15px] text-muted">
              {personal.club} fan · {personal.position.toLowerCase()} · No. {personal.number}, one for each
              year of experience
            </p>
          </div>
        </div>

        <div className="border border-border p-4">
          <p className="font-semibold">On rotation</p>
          <ul className="mt-1 flex flex-col text-[15px]">
            {personal.songs.map((song) => (
              <li key={song.href}>
                <a
                  href={song.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center text-accent underline-offset-4 hover:underline"
                >
                  {song.title}, {song.artist}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="border border-border p-4">
          <p className="font-semibold">Rewatching</p>
          <p className="text-[15px] text-muted">{personal.rewatching}</p>
        </div>
      </Reveal>
    </div>
  </section>
);
