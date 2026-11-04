import { useLayoutEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { decodeFrame } from "@/lib/decode";

const DURATION_MS = 800;
const FRAME_MS = 50;

// A heading that resolves from noise the first time it's seen. The real text stays in the
// page throughout (just transparent while animating), so layout never shifts and screen
// readers and text search always get the actual words. The noise layer is decoration.
export const DecodeText = ({ text }) => {
  const rootRef = useRef(null);
  const noiseRef = useRef(null);
  const inView = useInView(rootRef, { once: true });
  const reduced = useReducedMotion();
  const [done, setDone] = useState(false);
  const running = inView && !reduced && !done;

  useLayoutEffect(() => {
    if (!running) return;
    const noise = noiseRef.current;
    noise.textContent = decodeFrame(text, 0);

    let start;
    let last = -Infinity;
    let frame;
    const tick = (now) => {
      start ??= now;
      const progress = Math.min((now - start) / DURATION_MS, 1);
      if (now - last >= FRAME_MS) {
        noise.textContent = decodeFrame(text, progress);
        last = now;
      }
      if (progress < 1) frame = requestAnimationFrame(tick);
      else setDone(true);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [running, text]);

  return (
    <span ref={rootRef} className="relative block">
      <span className={running ? "text-transparent" : undefined}>{text}</span>
      {running && <span ref={noiseRef} aria-hidden="true" className="absolute inset-0" />}
    </span>
  );
};
