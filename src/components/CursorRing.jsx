import { useEffect, useState } from "react";
import { m, useMotionValue, useReducedMotion, useSpring } from "motion/react";

const Ring = m.div;
const SPRING = { stiffness: 420, damping: 34, mass: 0.5 };

// A ring that trails the mouse and opens up over anything clickable. Only on devices with a real
// mouse, and the normal cursor stays visible, so nothing about using the page changes.
export const CursorRing = () => {
  const reduced = useReducedMotion();
  const [enabled] = useState(() => window.matchMedia?.("(hover: hover) and (pointer: fine)").matches ?? false);
  const [active, setActive] = useState(false);
  const [moved, setMoved] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const x = useSpring(mouseX, SPRING);
  const y = useSpring(mouseY, SPRING);
  const on = enabled && !reduced;

  useEffect(() => {
    if (!on) return;
    const move = (event) => {
      mouseX.set(event.clientX - 16);
      mouseY.set(event.clientY - 16);
      setMoved(true);
      setActive(Boolean(event.target.closest?.("a, button")));
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [on, mouseX, mouseY]);

  if (!on || !moved) return null;

  return (
    <Ring
      aria-hidden="true"
      data-cursor-ring
      className="pointer-events-none fixed top-0 left-0 z-[55] h-8 w-8 print:hidden"
      style={{ x, y }}
    >
      <span
        className={`block h-full w-full rounded-full border border-foreground/60 transition-transform duration-200 ${
          active ? "scale-150" : "scale-100"
        }`}
      />
    </Ring>
  );
};
