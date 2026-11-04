import { DecodeText } from "./DecodeText";
import { Reveal } from "./Reveal";

export const SectionHeading = ({ title, description }) => (
  <Reveal className="mb-10 max-w-3xl md:mb-14">
    <h2 className="display text-5xl leading-[1.05] md:text-[56px]">
      <DecodeText text={title} />
    </h2>
    {description && <p className="mt-4 text-soft">{description}</p>}
  </Reveal>
);
