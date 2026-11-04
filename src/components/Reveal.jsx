import { m, useReducedMotion } from "motion/react";

const EASE_OUT = [0.22, 1, 0.36, 1];

// Fades and lifts its children into view the first time they scroll on screen.
// With reduced motion on, the content is simply there.
export const Reveal = ({ as = "div", delay = 0, children, ...props }) => {
  const reduced = useReducedMotion();

  if (reduced) {
    const Tag = as;
    return <Tag {...props}>{children}</Tag>;
  }

  const Tag = m[as];
  return (
    <Tag
      data-reveal
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.7, ease: EASE_OUT, delay: delay / 1000 }}
      {...props}
    >
      {children}
    </Tag>
  );
};
