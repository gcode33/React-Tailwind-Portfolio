import { useRef, useState } from "react";
import { m, useTransform } from "motion/react";
import { SCRUB_MIN_OPACITY, useScrub } from "@/lib/useScrub";
import { skills } from "@/data/profile";

const byId = Object.fromEntries(skills.map((part) => [part.id, part]));

// A short preview on each part means people see the range without having to click.
const preview = (items) => {
  const shown = items.slice(0, 3).join(" · ");
  return items.length > 3 ? `${shown} +${items.length - 3}` : shown;
};

const PartShell = m.div;
const Fill = m.span;
const Chip = m.li;

// The order a request travels through the system, which is the order the parts arrive in.
const STEPS = 6;

const Part = ({ id, selected, onSelect, step, progress }) => {
  const part = byId[id];
  const y = useTransform(progress, [step / STEPS, (step + 1) / STEPS], [24, 0]);
  const opacity = useTransform(progress, [step / STEPS, (step + 1) / STEPS], [SCRUB_MIN_OPACITY, 1]);
  const isSelected = selected === id;
  return (
    <PartShell data-scrub style={{ y, opacity }} className="min-w-0">
    <button
      type="button"
      aria-pressed={isSelected}
      onClick={() => onSelect(id)}
      className={`flex min-h-[4.5rem] w-full min-w-0 cursor-pointer flex-col justify-center gap-0.5 border p-3 text-left transition-colors duration-200 ${
        isSelected ? "border-signal bg-signal text-background" : "border-signal bg-subtle text-foreground hover:bg-border"
      }`}
    >
      <span className="font-mono text-sm font-medium">{part.group}</span>
      <span className={`text-xs ${isSelected ? "text-background" : "text-muted"}`}>{preview(part.items)}</span>
    </button>
    </PartShell>
  );
};

// The connector between two parts fills in as the request reaches it.
const Connector = ({ progress, from, to }) => {
  const scaleX = useTransform(progress, [from, to], [0, 1]);
  return (
    <span aria-hidden="true" className="hidden items-center md:flex">
      <span className="relative h-0.5 w-full bg-border-strong">
        <Fill data-connector className="absolute inset-0 origin-left bg-signal" style={{ scaleX }} />
      </span>
    </span>
  );
};

export const SystemDiagram = () => {
  const [selected, setSelected] = useState("backend");
  const part = byId[selected];
  const diagramRef = useRef(null);
  const progress = useScrub(diagramRef, ["start 90%", "end 70%"]);
  const shared = { selected, onSelect: setSelected, progress };

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
      <div ref={diagramRef} className="flex min-w-0 flex-col gap-2">
        <div className="grid gap-2 md:grid-cols-[minmax(0,1fr)_1.75rem_minmax(0,1fr)_1.75rem_minmax(0,1fr)]">
          <Part id="frontend" step={0} {...shared} />
          <Connector progress={progress} from={1 / STEPS} to={2 / STEPS} />
          <Part id="backend" step={1} {...shared} />
          <Connector progress={progress} from={2 / STEPS} to={3 / STEPS} />
          <Part id="data" step={2} {...shared} />
        </div>
        <div className="grid gap-2 md:grid-cols-2">
          <Part id="testing" step={3} {...shared} />
          <Part id="ai" step={4} {...shared} />
        </div>
        <Part id="languages" step={5} {...shared} />
      </div>

      <div aria-live="polite" className="flex min-w-0 flex-col gap-3">
        <h3 className="display text-[40px] leading-[1.1]">{part.group}</h3>
        <ul className="flex flex-wrap gap-2">
          {part.items.map((item, i) => (
            <Chip
              key={`${selected}-${item}`}
              className="chip"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: i * 0.02 }}
            >
              {item}
            </Chip>
          ))}
        </ul>
      </div>
    </div>
  );
};
