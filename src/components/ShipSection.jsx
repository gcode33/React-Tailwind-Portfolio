import { useEffect, useRef, useState } from "react";
import { m, useMotionValue, useMotionValueEvent, useReducedMotion, useTransform } from "motion/react";
import { Check } from "lucide-react";
import { Ball } from "./Graphics";
import { SectionHeading } from "./SectionHeading";
import { litStages } from "@/lib/pipeline";
import { sound } from "@/lib/sound";
import { useScrub } from "@/lib/useScrub";
import { shipStages } from "@/data/profile";

const Rail = m.div;
const StageItem = m.li;
const RailBall = m.div;

const Stage = ({ stage, index, passed, progress }) => {
  const count = shipStages.length;
  const y = useTransform(progress, [index / count, (index + 1) / count], [28, 0]);

  return (
    <StageItem
      data-passed={passed}
      style={{ y }}
      className={`flex min-w-0 flex-col gap-1.5 border-t-[3px] bg-subtle p-3.5 transition-colors duration-300 ${
        passed ? "border-signal" : "border-border-strong"
      }`}
    >
      <span
        className={`flex items-center justify-between font-mono text-xs transition-colors duration-300 ${
          passed ? "text-signal" : "text-muted"
        }`}
      >
        {String(index + 1).padStart(2, "0")}
        <Check
          aria-hidden="true"
          className={`h-3.5 w-3.5 transition-opacity duration-300 ${passed ? "opacity-100" : "opacity-0"}`}
        />
      </span>
      <h3 className="display text-[26px] leading-[1.15]">{stage.name}</h3>
      <p className="text-sm leading-snug text-soft">{stage.detail}</p>
    </StageItem>
  );
};

// The stages light up in turn as you scroll, like a CI run passing, with a progress rail above
// them. A passed stage stays passed. The text is readable from the start.
export const ShipSection = () => {
  const listRef = useRef(null);
  const reduced = useReducedMotion();
  const [reached, setReached] = useState(0);
  const reachedRef = useRef(0);
  const progress = useScrub(listRef, ["start 90%", "end 70%"]);

  useMotionValueEvent(progress, "change", (value) => {
    const stages = litStages(value, shipStages.length);
    if (stages <= reachedRef.current) return;
    reachedRef.current = stages;
    setReached(stages);
    sound.effect("tick");
  });

  const lit = reduced ? shipStages.length : reached;

  const railRef = useRef(null);
  const railWidth = useMotionValue(0);
  useEffect(() => {
    const node = railRef.current;
    if (!node) return;
    const observer = new ResizeObserver(() => railWidth.set(node.getBoundingClientRect().width));
    observer.observe(node);
    return () => observer.disconnect();
  }, [railWidth]);
  const ballX = useTransform([progress, railWidth], ([p, w]) => p * Math.max(0, w - 20));
  const ballSpin = useTransform([progress, railWidth], ([p, w]) => (p * w) / 3);

  return (
    <section id="process" className="py-20 md:py-24">
      <div className="container">
        <SectionHeading
          note="process"
          title="How I ship"
          description="The workflow I've built up across roles: spec first, test first, with Claude Code throughout and its output verified by running it."
        />

        <div ref={railRef} aria-hidden="true" className="relative mb-4 h-0.5 bg-border-strong">
          <Rail data-pipeline-rail className="h-full origin-left bg-signal" style={{ scaleX: progress }} />
          <RailBall data-rail-ball className="absolute -top-[9px] left-0 h-5 w-5" style={{ x: ballX, rotate: ballSpin }}>
            <Ball className="h-full w-full" />
          </RailBall>
        </div>

        <ol ref={listRef} className="grid grid-cols-2 gap-2 lg:grid-cols-6">
          {shipStages.map((stage, i) => (
            <Stage key={stage.name} stage={stage} index={i} passed={i < lit} progress={progress} />
          ))}
        </ol>
      </div>
    </section>
  );
};
