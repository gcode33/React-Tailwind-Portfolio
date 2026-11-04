import { useRef } from "react";
import { m, useTransform } from "motion/react";
import { useScrub } from "@/lib/useScrub";

const SlatPanel = m.div;
const SLATS = 6;

const Slat = ({ progress, index }) => {
  const start = (index / SLATS) * 0.5;
  const scaleY = useTransform(progress, [start, start + 0.5], [1, 0]);
  return <SlatPanel data-slat className="h-full origin-bottom bg-background" style={{ scaleY }} />;
};

// Vertical slats that open across a section as it scrolls in, one after another.
// Sits over the section and ignores the pointer, so everything underneath stays usable.
export const SliceReveal = ({ children }) => {
  const ref = useRef(null);
  const progress = useScrub(ref, ["start 100%", "start 45%"]);

  return (
    <div ref={ref} className="relative">
      {children}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-10 grid h-[55vh] grid-cols-6 print:hidden">
        {Array.from({ length: SLATS }, (_, i) => (
          <Slat key={i} index={i} progress={progress} />
        ))}
      </div>
    </div>
  );
};
