import { useEffect, useState } from "react";
import { Code2, Volume2, VolumeX } from "lucide-react";
import { toggleInspect, useInspect } from "@/lib/inspect";
import { sound, useSound } from "@/lib/sound";

const message = ({ status, resumable }) => {
  if (status === "on") return "Sound effects on";
  if (status === "unavailable") return "Sound isn't available in this browser";
  return resumable ? "Sound was on. Press to resume." : "Sound off until you choose";
};

const SECTIONS = [
  ["hero", "Intro"],
  ["about", "About"],
  ["experience", "Experience"],
  ["process", "How I ship"],
  ["projects", "Projects"],
  ["skills", "Skills"],
  ["contact", "Contact"],
  ["book", "Book a call"],
];

// Shows which section you're in, like a heads-up display. The nav already says this to screen readers.
const useCurrentSection = () => {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setCurrent(SECTIONS.findIndex(([id]) => id === entry.target.id));
        }
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    for (const [id] of SECTIONS) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, []);
  return current;
};

export const Dock = () => {
  const current = useCurrentSection();
  const state = useSound();
  const inspecting = useInspect();
  const on = state.status === "on";
  const Icon = on ? Volume2 : VolumeX;

  return (
    <aside
      aria-label="Site controls"
      className="fixed inset-x-0 bottom-0 z-40 h-15 border-t border-border bg-background/90 text-foreground backdrop-blur-sm print:hidden"
    >
      <div className="container flex h-full items-center gap-3">
        <button
          type="button"
          aria-pressed={on}
          onClick={sound.toggle}
          className="flex min-h-11 shrink-0 cursor-pointer items-center gap-2 border border-border-strong px-3.5 font-mono text-[13px] tracking-[0.08em] uppercase transition-colors hover:bg-subtle"
        >
          <Icon aria-hidden="true" className={`h-4 w-4 ${on ? "text-accent" : "text-muted"}`} />
          Sound
        </button>

        <button
          type="button"
          aria-pressed={inspecting}
          onClick={toggleInspect}
          className={`flex min-h-11 shrink-0 cursor-pointer items-center gap-2 border border-border-strong px-3.5 font-mono text-[13px] tracking-[0.08em] uppercase transition-colors ${
            inspecting ? "bg-foreground text-background" : "hover:bg-subtle"
          }`}
        >
          <Code2 aria-hidden="true" className="h-4 w-4" />
          Inspect
        </button>

        <p role="status" className="min-w-0 font-mono text-xs leading-snug text-muted max-sm:sr-only">
          {message(state)}
        </p>
        <p role="status" className="sr-only">
          {inspecting ? "Inspect is on. Build notes are showing in each section." : ""}
        </p>
        <p aria-hidden="true" data-hud className="ml-auto hidden font-mono text-xs tracking-[0.1em] text-muted uppercase md:block">
          {String(current + 1).padStart(2, "0")} / {String(SECTIONS.length).padStart(2, "0")} · {SECTIONS[current][1]}
        </p>
      </div>
    </aside>
  );
};
