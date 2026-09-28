import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { skills } from "@/data/profile";

export const SkillsSection = () => (
  <section id="skills" className="border-y border-border bg-subtle/40 py-24 md:py-32">
    <div className="container">
      <SectionHeading
        index="04"
        eyebrow="Skills"
        title="Tools of the trade."
        description="The languages, frameworks and tooling I reach for day to day."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => (
          <Reveal key={group.group} delay={(i % 3) * 80} className="card card-hover p-6">
            <h3 className="mb-4 font-mono text-sm text-accent">{group.group}</h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-md border border-border bg-background px-2.5 py-1 text-sm transition-colors duration-200 hover:border-accent/50 hover:text-accent"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
