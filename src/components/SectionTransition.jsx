import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { getJumpTarget } from "@/lib/sectionJump";
import { Ball } from "./Graphics";

const WIPE_MS = 350;
const EXPO_IN = "cubic-bezier(0.7, 0, 0.84, 0)";
const EXPO_OUT = "cubic-bezier(0.16, 1, 0.3, 1)";

// Do what the browser's own anchor jump would: scroll there, update the URL so back and
// share still work, and move keyboard focus so Tab continues from the new section.
const landOn = (id) => {
  const section = document.getElementById(id);
  if (!section) return;
  section.scrollIntoView({ behavior: "instant", block: "start" });
  if (window.location.hash !== `#${id}`) window.history.pushState(null, "", `#${id}`);
  if (!section.hasAttribute("tabindex")) section.setAttribute("tabindex", "-1");
  section.focus({ preventScroll: true });
};

// The through ball: on a section link click, the ball crosses the screen while a chalk panel
// wipes over, the page jumps while it's fully covered, and the panel wipes away.
// Uses the browser's built-in Web Animations API, so it adds nothing to the download.
export const SectionTransition = () => {
  const reduced = useReducedMotion();
  const rootRef = useRef(null);
  const panelRef = useRef(null);
  const ballRef = useRef(null);
  const run = useRef({ active: false, covered: false, target: null, animations: [] });

  useEffect(() => {
    const state = run.current;

    const play = async (id) => {
      state.target = id;
      if (state.active) {
        // A second click mid-transition: take it at the midpoint, or now if that has passed.
        if (state.covered) landOn(id);
        return;
      }

      const root = rootRef.current;
      const panel = panelRef.current;
      const ball = ballRef.current;
      if (!root || !panel?.animate) {
        landOn(id);
        return;
      }

      state.active = true;
      state.covered = false;
      root.hidden = false;
      try {
        const flight = ball.animate(
          [
            { transform: "translateX(0) rotate(0deg)" },
            { transform: "translateX(calc(100vw + 6rem)) rotate(900deg)" },
          ],
          { duration: WIPE_MS * 2, easing: "cubic-bezier(0.6, 0, 0.3, 1)", fill: "forwards" }
        );
        panel.style.transformOrigin = "left";
        const cover = panel.animate([{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], {
          duration: WIPE_MS,
          easing: EXPO_IN,
          fill: "forwards",
        });
        state.animations = [flight, cover];
        await cover.finished;

        state.covered = true;
        landOn(state.target);

        panel.style.transformOrigin = "right";
        const uncover = panel.animate([{ transform: "scaleX(1)" }, { transform: "scaleX(0)" }], {
          duration: WIPE_MS,
          easing: EXPO_OUT,
          fill: "forwards",
        });
        state.animations.push(uncover);
        await Promise.all([uncover.finished, flight.finished]);
      } catch {
        // Cancelled on unmount. Nothing to clean up beyond the reset below.
      } finally {
        state.animations.forEach((animation) => animation.cancel());
        state.animations = [];
        state.active = false;
        if (rootRef.current) rootRef.current.hidden = true;
      }
    };

    const handleClick = (event) => {
      const anchor = event.target.closest?.("a");
      const id = getJumpTarget(event, anchor, { reduced });
      if (!id) return;
      event.preventDefault();
      play(id);
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
      state.animations.forEach((animation) => animation.cancel());
    };
  }, [reduced]);

  return (
    <div
      ref={rootRef}
      data-section-transition
      aria-hidden="true"
      hidden
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden print:hidden"
    >
      {/* Starts collapsed with an inline transform. Tailwind's scale-x-0 sets the separate CSS
          `scale` property, which would stay at zero and hide the panel however `transform` animates. */}
      <div ref={panelRef} className="absolute inset-0 bg-foreground" style={{ transform: "scaleX(0)" }} />
      <div ref={ballRef} className="absolute top-1/2 -left-12 h-10 w-10 -translate-y-1/2">
        <Ball className="h-full w-full" fill="var(--color-chelsea)" mark="#fff" />
      </div>
    </div>
  );
};
