import { useRef } from "react";
import { m, useTransform } from "motion/react";
import { DecodeText } from "./DecodeText";
import { InspectNote } from "./InspectNote";
import { ScrubIn } from "./ScrubIn";
import { useScrub } from "@/lib/useScrub";

const Rule = m.div;

export const SectionHeading = ({ title, description, note }) => {
  const ref = useRef(null);
  const progress = useScrub(ref, ["start 92%", "start 50%"]);
  const scaleX = useTransform(progress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="mb-10 max-w-3xl md:mb-14">
      <ScrubIn y={40}>
        <h2 className="display text-[clamp(2.5rem,13vw,3rem)] leading-[1.05] md:text-[56px]">
          <DecodeText text={title} />
        </h2>
        {description && <p className="mt-4 text-soft">{description}</p>}
        {note && <InspectNote id={note} className="mt-3" />}
      </ScrubIn>
      <Rule aria-hidden="true" data-heading-rule className="mt-5 h-px origin-left bg-signal" style={{ scaleX }} />
    </div>
  );
};
