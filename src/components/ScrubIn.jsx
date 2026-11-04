import { useRef } from "react";
import { m, useTransform } from "motion/react";
import { SCRUB_MIN_OPACITY, useScrub } from "@/lib/useScrub";

// Moves into place in step with the scroll, in both directions. Only transform and opacity
// change, so the browser never has to redo the page's layout.
export const ScrubIn = ({ as = "div", x = 0, y = 0, offset = ["start 98%", "start 68%"], children, style, ...props }) => {
  const ref = useRef(null);
  const progress = useScrub(ref, offset);
  const translateX = useTransform(progress, [0, 1], [x, 0]);
  const translateY = useTransform(progress, [0, 1], [y, 0]);
  const opacity = useTransform(progress, [0, 1], [SCRUB_MIN_OPACITY, 1]);
  const Tag = m[as];

  return (
    <Tag ref={ref} data-scrub style={{ ...style, x: translateX, y: translateY, opacity }} {...props}>
      {children}
    </Tag>
  );
};
