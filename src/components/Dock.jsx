import { Code2, Volume2, VolumeX } from "lucide-react";
import { toggleInspect, useInspect } from "@/lib/inspect";
import { sound, useSound } from "@/lib/sound";

const message = ({ status, resumable }) => {
  if (status === "on") return "Sound effects on";
  if (status === "unavailable") return "Sound isn't available in this browser";
  return resumable ? "You had this on. Press to resume." : "Off until you choose";
};

export const Dock = () => {
  const state = useSound();
  const inspecting = useInspect();
  const on = state.status === "on";
  const Icon = on ? Volume2 : VolumeX;

  return (
    <aside
      aria-label="Site controls"
      className="fixed inset-x-0 bottom-0 z-40 h-15 bg-foreground text-background print:hidden"
    >
      <div className="container flex h-full items-center gap-3">
        <button
          type="button"
          aria-pressed={on}
          onClick={sound.toggle}
          className="flex min-h-11 shrink-0 cursor-pointer items-center gap-2 bg-background px-3.5 font-mono text-[13px] text-foreground transition-colors hover:bg-subtle focus-visible:outline-chelsea"
        >
          <Icon aria-hidden="true" className={`h-4 w-4 ${on ? "text-accent" : "text-muted"}`} />
          Sound
        </button>

        <button
          type="button"
          aria-pressed={inspecting}
          onClick={toggleInspect}
          className={`flex min-h-11 shrink-0 cursor-pointer items-center gap-2 border border-background px-3.5 font-mono text-[13px] transition-colors focus-visible:outline-chelsea ${
            inspecting ? "bg-background text-foreground" : "hover:bg-background/10"
          }`}
        >
          <Code2 aria-hidden="true" className={`h-4 w-4 ${inspecting ? "text-mint" : ""}`} />
          Inspect
        </button>

        <p role="status" className="min-w-0 font-mono text-xs leading-snug text-[#3b4e43] max-sm:sr-only">
          {message(state)}
        </p>
        <p role="status" className="sr-only">
          {inspecting ? "Inspect is on. Build notes are showing in each section." : ""}
        </p>
      </div>
    </aside>
  );
};
