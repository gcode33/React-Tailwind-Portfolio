import { useEffect } from "react";
import { m, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { Ball } from "./Graphics";

const Rolling = m.div;
const Trail = m.div;
const SIZE = 24;
const placed = "absolute top-0 -left-[13px] h-6 w-6";

// A marker that rolls down the career timeline as you scroll, leaving a line behind it.
// Uses transforms only, so it never triggers layout.
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

  const y = useTransform([progress, height], ([p, h]) => p * Math.max(0, h - SIZE));
  // A true roll would spin too fast to read, so it turns at a quarter of that.
  const rotate = useTransform([progress, height], ([p, h]) => (p * h) / 4);
  const lineClass = "absolute top-0 bottom-0 -left-0.5 w-0.5";

  if (reduced) {
    return (
      <div aria-hidden="true">
        <div className={`${lineClass} bg-signal`} />
        <Ball className={placed} />
      </div>
    );
  }

  return (
    <div aria-hidden="true">
      <div className={`${lineClass} bg-border-strong`} />
      <Trail data-timeline-trail className={`${lineClass} origin-top bg-signal`} style={{ scaleY: progress }} />
      <Rolling data-timeline-head className={placed} style={{ y, rotate }}>
        <Ball className="h-full w-full" />
      </Rolling>
    </div>
  );
};
