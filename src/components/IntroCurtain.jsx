import { useEffect, useRef, useState } from "react";
import { INTRO_MS, markIntroSeen, playsIntro } from "@/lib/intro";

// A short opening: name and a loading count, then the screen lifts. It lasts under a second,
// plays once per visit and never blocks clicks, so nobody has to wait for or dismiss it.
export const IntroCurtain = () => {
  const [show, setShow] = useState(playsIntro);
  const rootRef = useRef(null);
  const countRef = useRef(null);

  useEffect(() => {
    if (!show) return;
    markIntroSeen();
    const root = rootRef.current;
    const start = performance.now();
    let frame;
    const tick = (now) => {
      const progress = Math.min((now - start) / INTRO_MS, 1);
      if (countRef.current) countRef.current.textContent = `${Math.round(progress * 100)} %`;
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
        return;
      }
      const lift = root.animate?.([{ transform: "translateY(0)" }, { transform: "translateY(-100%)" }], {
        duration: 500,
        easing: "cubic-bezier(0.7, 0, 0.2, 1)",
        fill: "forwards",
      });
      if (lift) lift.onfinish = () => setShow(false);
      else setShow(false);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [show]);

  if (!show) return null;

  return (
    <div
      ref={rootRef}
      data-intro-curtain
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] flex flex-col items-center justify-center gap-3 bg-background print:hidden"
    >
      <p className="display text-2xl tracking-[0.3em] md:text-4xl">George Fotabong</p>
      <p ref={countRef} className="font-mono text-xs text-muted">
        0 %
      </p>
    </div>
  );
};
