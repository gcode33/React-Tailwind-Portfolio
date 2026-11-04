import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { SystemDiagram } from "./SystemDiagram";

export const SkillsSection = () => (
  <section id="skills" className="py-20 md:py-24">
    <div className="container">
      <SectionHeading
          note="skills"
        title="The system"
        description="My stack, drawn the way a request moves through it. Select a part to see all its tools."
      />
      <Reveal>
        <SystemDiagram />
      </Reveal>
    </div>
  </section>
);
