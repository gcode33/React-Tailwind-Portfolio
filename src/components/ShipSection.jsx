import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { shipStages } from "@/data/profile";

export const ShipSection = () => (
  <section id="process" className="py-20 md:py-24">
    <div className="container">
      <SectionHeading
        title="How I ship"
        description="The workflow I've built up across roles: spec first, test first, with Claude Code throughout and its output verified by running it."
      />

      <ol className="grid grid-cols-2 gap-2 lg:grid-cols-6">
        {shipStages.map((stage, i) => (
          <Reveal
            as="li"
            key={stage.name}
            delay={i * 50}
            className="flex min-w-0 flex-col gap-1.5 border-t-[3px] border-mint bg-subtle p-3.5"
          >
            <span className="font-mono text-xs text-mint">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="display text-[26px] leading-[1.15]">{stage.name}</h3>
            <p className="text-sm leading-snug text-soft">{stage.detail}</p>
          </Reveal>
        ))}
      </ol>
    </div>
  </section>
);
