import { useCallback, useEffect } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { scrollProgress } from "@/lib/sound/mix";
import { sound, useSound } from "@/lib/sound";
import { soundtrack } from "@/data/profile";

const BARS = ["0ms", "-260ms", "-120ms", "-420ms"];

const message = ({ status, resumable }) => {
  if (status === "loading") return "Loading the track";
  if (status === "playing") return "Now playing";
  if (status === "yielded") return "Paused for Apple Music";
  if (status === "unavailable") return "Effects only, track unavailable";
  return resumable ? "You had this on. Press to resume." : "Off until you choose";
};

// The music starts muffled at the top of the page and opens up by Contact.
const useScrollFilter = (active) => {
  const { scrollY } = useScroll();

  const update = useCallback(() => {
    if (!active) return;
    const contact = document.getElementById("contact");
    if (!contact) return;
    sound.setFilterProgress(
      scrollProgress({
        scrollY: window.scrollY,
        viewport: window.innerHeight,
        targetTop: contact.getBoundingClientRect().top + window.scrollY,
      })
    );
  }, [active]);

  useEffect(update, [update]);
  useMotionValueEvent(scrollY, "change", update);
};

export const Dock = () => {
  const state = useSound();
  const { status } = state;
  const on = status === "loading" || status === "playing" || status === "unavailable";
  const credit = status === "loading" || status === "playing" || status === "yielded";

  useScrollFilter(on);

  return (
    <aside
      aria-label="Sound controls"
      className="fixed inset-x-0 bottom-0 z-40 h-15 bg-foreground text-background print:hidden"
    >
      <div className="container flex h-full items-center gap-3">
        <button
          type="button"
          aria-pressed={on}
          onClick={sound.toggle}
          className="flex min-h-11 shrink-0 cursor-pointer items-center gap-2.5 bg-background px-3.5 font-mono text-[13px] text-foreground transition-colors hover:bg-subtle focus-visible:outline-chelsea"
        >
          <span aria-hidden="true" className="flex h-4 items-end gap-[3px]">
            {BARS.map((delay) => (
              <span
                key={delay}
                data-playing={status === "playing"}
                style={{ "--eq-delay": delay }}
                className={`eq-bar h-full w-[3px] ${on ? "bg-accent" : "bg-muted"}`}
              />
            ))}
          </span>
          Sound
        </button>

        <div className="min-w-0 text-xs leading-snug sm:text-sm">
          <p role="status" className="font-mono text-[#3b4e43]">
            {message(state)}
          </p>
          {credit && (
            <a
              href={soundtrack.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative block font-medium underline-offset-2 hover:underline after:absolute after:inset-x-0 after:-inset-y-3.5 focus-visible:outline-chelsea"
            >
              {soundtrack.shortTitle}
              <span className="max-sm:hidden"> Instrumental</span> by {soundtrack.artist} via Pixabay
            </a>
          )}
        </div>
      </div>
    </aside>
  );
};
