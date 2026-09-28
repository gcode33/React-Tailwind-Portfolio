import { Reveal } from "./Reveal";

export const SectionHeading = ({ index, eyebrow, title, description }) => (
  <Reveal className="mb-12 max-w-2xl">
    <p className="mb-3 font-mono text-sm text-accent">
      {index}. {eyebrow}
    </p>
    <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
    {description && <p className="mt-4 text-muted">{description}</p>}
  </Reveal>
);
