import { m, useReducedMotion, useScroll, useSpring } from "motion/react";

const Bar = m.div;

// A thin bar across the top showing how far down the page you are.
export const ScrollProgress = () => {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, mass: 0.3 });
  if (reduced) return null;

  return (
    <Bar
      aria-hidden="true"
      data-scroll-progress
      className="pointer-events-none fixed inset-x-0 top-0 z-[45] h-0.5 origin-left bg-mint print:hidden"
      style={{ scaleX }}
    />
  );
};
