import { useMotionValue, useReducedMotion, useScroll, useTransform } from "motion/react";

// The part of opacity a scroll-linked fade never goes below. Text stays readable (4.5:1) at
// every scroll position, so the animation never gets in the way of reading it.
export const SCRUB_MIN_OPACITY = 0.75;

// Progress (0 to 1) of an element through a scroll range. With reduced motion on it just holds
// the resting value, so every animation built on it shows its finished state and never moves.
export const useScrub = (ref, offset, { rest = 1 } = {}) => {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset });
  const resting = useMotionValue(rest);
  // Passing it through a function stops Motion handing it to the browser's native scroll
  // timeline. That timeline can't represent a range starting before the page does, which left
  // the hero at 92% opacity at the top of the page.
  const progress = useTransform(scrollYProgress, (value) => value);
  return reduced ? resting : progress;
};
