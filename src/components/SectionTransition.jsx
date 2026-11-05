import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { getJumpTarget } from "@/lib/sectionJump";
import { sound } from "@/lib/sound";
import { Ball } from "./Graphics";

const WIPE_MS = 300;
const STAGGER_MS = 26;
const SLATS = 6;
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

// On a section link click, slats sweep up across the screen with a ball crossing them, the page
// jumps while it's fully covered, and the slats carry on upward to reveal the new section.
// Uses the browser's built-in Web Animations API, so it adds nothing to the download.
export const SectionTransition = () => {
  const reduced = useReducedMotion();
  const rootRef = useRef(null);
  const slatsRef = useRef([]);
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
      const slats = slatsRef.current.filter(Boolean);
      const ball = ballRef.current;
      if (!root || !slats[0]?.animate || !ball?.animate) {
        landOn(id);
        return;
      }

      state.active = true;
      state.covered = false;
      sound.effect("jump");
      root.hidden = false;
      try {
        const sweep = (from, to, easing) =>
          slats.map((slat, i) =>
            slat.animate([{ transform: from }, { transform: to }], {
              duration: WIPE_MS,
              delay: i * STAGGER_MS,
              easing,
              fill: "forwards",
            })
          );
        const total = (WIPE_MS + (slats.length - 1) * STAGGER_MS) * 2;
        const flight = ball.animate(
          [
            { transform: "translateX(0) rotate(0deg)" },
            { transform: "translateX(calc(100vw + 6rem)) rotate(1080deg)" },
          ],
          { duration: total, easing: "cubic-bezier(0.5, 0, 0.5, 1)", fill: "forwards" }
        );

        const cover = sweep("translateY(100%)", "translateY(0)", EXPO_IN);
        state.animations = [flight, ...cover];
        await Promise.all(cover.map((animation) => animation.finished));

        state.covered = true;
        landOn(state.target);

        const uncover = sweep("translateY(0)", "translateY(-100%)", EXPO_OUT);
        state.animations.push(...uncover);
        await Promise.all([flight.finished, ...uncover.map((animation) => animation.finished)]);
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
      <div className="absolute inset-0 grid grid-cols-6">
        {/* Start out of sight with an inline transform. Tailwind's translate classes set the separate
            CSS `translate` property, which would stay in place however `transform` animates. */}
        {Array.from({ length: SLATS }, (_, i) => (
          <div
            key={i}
            ref={(node) => {
              slatsRef.current[i] = node;
            }}
            data-wipe-slat
            className="h-full bg-brand"
            style={{ transform: "translateY(100%)" }}
          />
        ))}
      </div>
      <div ref={ballRef} data-wipe-ball className="absolute top-1/2 -left-12 -mt-5 h-10 w-10">
        <Ball className="h-full w-full" fill="#fff" mark="var(--color-brand)" />
      </div>
    </div>
  );
};
