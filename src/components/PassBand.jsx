import { useRef } from "react";
import { m, useTransform } from "motion/react";
import { Ball } from "./Graphics";
import { useScrub } from "@/lib/useScrub";

const Runner = m.div;
const Trail = m.div;
const Circle = m.circle;

// The space between two sections: faint field markings, and a ball passed across as you scroll,
// in both directions. Decoration only, so it's hidden from screen readers.
export const PassBand = ({ direction = "right" }) => {
  const ref = useRef(null);
  const progress = useScrub(ref, ["start end", "end start"], { rest: 0.5 });
  const toRight = direction === "right";

  const x = useTransform(progress, [0, 1], toRight ? ["-8vw", "108vw"] : ["108vw", "-8vw"]);
  const y = useTransform(progress, (p) => -Math.sin(p * Math.PI) * 34);
  const rotate = useTransform(progress, [0, 1], toRight ? [0, 900] : [900, 0]);
  const scaleX = useTransform(progress, [0, 1], [0, 1]);
  const pathLength = useTransform(progress, [0.15, 0.6], [0, 1]);

  return (
    <div ref={ref} aria-hidden="true" data-pass-band className="relative h-32 overflow-hidden md:h-44 print:hidden">
      <svg viewBox="0 0 176 176" className="absolute top-1/2 left-1/2 h-full -translate-x-1/2 -translate-y-1/2 text-border-strong">
        <Circle cx="88" cy="88" r="70" fill="none" stroke="currentColor" strokeWidth="1" style={{ pathLength }} />
      </svg>
      <div className="absolute inset-x-0 top-1/2 h-px bg-border" />
      <Trail
        className={`absolute inset-x-0 top-1/2 h-px bg-signal/70 ${toRight ? "origin-left" : "origin-right"}`}
        style={{ scaleX }}
      />
      <Runner data-pass-ball className="absolute top-1/2 left-0 -mt-3.5 h-7 w-7" style={{ x, y, rotate }}>
        <Ball className="h-full w-full" />
      </Runner>
    </div>
  );
};
