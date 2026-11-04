import { useRef, useState } from "react";
import { useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { Check } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { litStages } from "@/lib/pipeline";
import { shipStages } from "@/data/profile";

// The stages light up in turn as you scroll, like a CI run passing. A passed stage stays
// passed. Only the bar and number change, so the text is readable from the start.
export const ShipSection = () => {
  const listRef = useRef(null);
  const reduced = useReducedMotion();
  const [reached, setReached] = useState(0);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 90%", "end 70%"] });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    setReached((previous) => Math.max(previous, litStages(progress, shipStages.length)));
  });

  const lit = reduced ? shipStages.length : reached;

  return (
    <section id="process" className="py-20 md:py-24">
      <div className="container">
        <SectionHeading
          title="How I ship"
          description="The workflow I've built up across roles: spec first, test first, with Claude Code throughout and its output verified by running it."
        />

        <ol ref={listRef} className="grid grid-cols-2 gap-2 lg:grid-cols-6">
          {shipStages.map((stage, i) => {
            const passed = i < lit;
            return (
              <li
                key={stage.name}
                data-passed={passed}
                className={`flex min-w-0 flex-col gap-1.5 border-t-[3px] bg-subtle p-3.5 transition-colors duration-300 ${
                  passed ? "border-mint" : "border-border-strong"
                }`}
              >
                <span
                  className={`flex items-center justify-between font-mono text-xs transition-colors duration-300 ${
                    passed ? "text-mint" : "text-muted"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                  <Check
                    aria-hidden="true"
                    className={`h-3.5 w-3.5 transition-opacity duration-300 ${passed ? "opacity-100" : "opacity-0"}`}
                  />
                </span>
                <h3 className="display text-[26px] leading-[1.15]">{stage.name}</h3>
                <p className="text-sm leading-snug text-soft">{stage.detail}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};
