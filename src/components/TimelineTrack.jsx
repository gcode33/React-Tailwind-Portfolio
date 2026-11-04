import { useEffect } from "react";
import { m, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { Ball } from "./Graphics";

const RollingBall = m.div;
const Trail = m.div;
const BALL_SIZE = 24;

// The touchline down the career timeline. As you scroll, the ball rolls along it and
// leaves a chalk trail behind it. Uses transforms only, so it never triggers layout.
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

  const y = useTransform([progress, height], ([p, h]) => p * Math.max(0, h - BALL_SIZE));
  // A full turn per circumference (about 75px) would blur, so it rolls at a quarter of that.
  const rotate = useTransform([progress, height], ([p, h]) => (p * h) / 4);

  const lineClass = "absolute top-0 bottom-0 -left-0.5 w-0.5";

  if (reduced) {
    return (
      <div aria-hidden="true">
        <div className={`${lineClass} bg-foreground`} />
        <Ball className="absolute top-0 -left-[13px] h-6 w-6" />
      </div>
    );
  }

  return (
    <div aria-hidden="true">
      <div className={`${lineClass} bg-border-strong`} />
      <Trail className={`${lineClass} origin-top bg-foreground`} style={{ scaleY: progress }} />
      <RollingBall className="absolute top-0 -left-[13px] h-6 w-6" style={{ y, rotate }}>
        <Ball className="h-full w-full" />
      </RollingBall>
    </div>
  );
};
