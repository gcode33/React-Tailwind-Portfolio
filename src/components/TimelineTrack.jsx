import { useEffect } from "react";
import { m, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";

const Head = m.div;
const Trail = m.div;
const HEAD_SIZE = 14;
const headClass = "absolute top-0 -left-2 h-3.5 w-3.5 rounded-full border-2 border-mint bg-background";

// A commit graph down the career timeline. The head follows your scroll and fills the branch
// behind it. Uses transforms only, so it never triggers layout.
export const TimelineTrack = ({ targetRef }) => {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start 60%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  const height = useMotionValue(0);

  useEffect(() => {
    const node = targetRef.current;
    if (!node) return;
    const observer = new ResizeObserver(() => height.set(node.getBoundingClientRect().height));
    observer.observe(node);
    return () => observer.disconnect();
  }, [targetRef, height]);

  const y = useTransform([progress, height], ([p, h]) => p * Math.max(0, h - HEAD_SIZE));
  const lineClass = "absolute top-0 bottom-0 -left-0.5 w-0.5";

  if (reduced) {
    return (
      <div aria-hidden="true">
        <div className={`${lineClass} bg-mint`} />
        <div className={headClass} />
      </div>
    );
  }

  return (
    <div aria-hidden="true">
      <div className={`${lineClass} bg-border-strong`} />
      <Trail data-timeline-trail className={`${lineClass} origin-top bg-mint`} style={{ scaleY: progress }} />
      <Head data-timeline-head className={headClass} style={{ y }} />
    </div>
  );
};
