import { useState } from "react";
import { skills } from "@/data/profile";

const byId = Object.fromEntries(skills.map((part) => [part.id, part]));

// A short preview on each part means people see the range without having to click.
const preview = (items) => {
  const shown = items.slice(0, 3).join(" · ");
  return items.length > 3 ? `${shown} +${items.length - 3}` : shown;
};

const Part = ({ id, selected, onSelect }) => {
  const part = byId[id];
  const isSelected = selected === id;
  return (
    <button
      type="button"
      aria-pressed={isSelected}
      onClick={() => onSelect(id)}
      className={`flex min-h-[4.5rem] w-full min-w-0 cursor-pointer flex-col justify-center gap-0.5 border p-3 text-left transition-colors duration-200 ${
        isSelected ? "border-mint bg-mint text-background" : "border-mint bg-subtle text-foreground hover:bg-border"
      }`}
    >
      <span className="font-mono text-sm font-medium">{part.group}</span>
      <span className={`text-xs ${isSelected ? "text-background" : "text-muted"}`}>{preview(part.items)}</span>
    </button>
  );
};

const Arrow = () => (
  <span aria-hidden="true" className="hidden items-center justify-center font-mono text-mint md:flex">
    →
  </span>
);

export const SystemDiagram = () => {
  const [selected, setSelected] = useState("backend");
  const part = byId[selected];

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
      <div className="flex min-w-0 flex-col gap-2">
        <div className="grid gap-2 md:grid-cols-[minmax(0,1fr)_1.75rem_minmax(0,1fr)_1.75rem_minmax(0,1fr)]">
          <Part id="frontend" selected={selected} onSelect={setSelected} />
          <Arrow />
          <Part id="backend" selected={selected} onSelect={setSelected} />
          <Arrow />
          <Part id="data" selected={selected} onSelect={setSelected} />
        </div>
        <div className="grid gap-2 md:grid-cols-2">
          <Part id="testing" selected={selected} onSelect={setSelected} />
          <Part id="ai" selected={selected} onSelect={setSelected} />
        </div>
        <Part id="languages" selected={selected} onSelect={setSelected} />
      </div>

      <div aria-live="polite" className="flex min-w-0 flex-col gap-3">
        <h3 className="display text-[40px] leading-[1.1]">{part.group}</h3>
        <ul className="flex flex-wrap gap-2">
          {part.items.map((item) => (
            <li key={item} className="chip">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
