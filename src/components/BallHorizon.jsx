import { useEffect, useRef } from "react";
import { useReducedMotion, useScroll } from "motion/react";
import { buildBall, rotate, seam } from "@/lib/ballGeometry";

const { vertices, edges, pentagons } = buildBall();
const INTRO_MS = 1800;
const ease = (t) => 1 - (1 - t) ** 3;

// A huge ball rising over the page like a planet's horizon, turning as you scroll. Drawn in 2D
// and only when something changes, so an idle page costs nothing and no 3D library is needed.
export const BallHorizon = () => {
  const reduced = useReducedMotion();
  const canvasRef = useRef(null);
  const { scrollY } = useScroll();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let introStart = null;

    const draw = (now) => {
      frame = 0;
      const scroll = reduced ? 0 : scrollY.get();
      if (scroll > height * 1.25) return;

      let intro = 1;
      if (!reduced) {
        introStart ??= now;
        intro = ease(Math.min((now - introStart) / INTRO_MS, 1));
      }

      const phone = width < 768;
      const radius = phone ? height * 0.5 : Math.max(width * 0.5, height * 0.82);
      const cx = width * (phone ? 0.62 : 0.68);
      const cy = (phone ? height * 1.02 : height + radius * 0.3) + scroll * 0.3 + (1 - intro) * height * 0.3;
      const spin = 0.55 + scroll * 0.0016 + (1 - intro) * 1.1;
      const tilt = -0.42 + scroll * 0.0005;

      ctx.clearRect(0, 0, width, height);

      // Atmosphere, kept dim enough for the text sitting on top of it.
      const glow = ctx.createRadialGradient(cx, cy, radius * 0.93, cx, cy, radius * 1.09);
      glow.addColorStop(0, "rgba(90,150,255,0)");
      glow.addColorStop(0.42, "rgba(90,150,255,0.34)");
      glow.addColorStop(1, "rgba(90,150,255,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.09, 0, Math.PI * 2);
      ctx.fill();

      const body = ctx.createRadialGradient(cx - radius * 0.35, cy - radius * 0.75, radius * 0.1, cx, cy, radius);
      body.addColorStop(0, "#16202c");
      body.addColorStop(0.7, "#090d13");
      body.addColorStop(1, "#05070a");
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.clip();

      const place = (point) => {
        const [x, y, z] = rotate(point, tilt, spin);
        return [cx + x * radius, cy + y * radius, z];
      };

      ctx.fillStyle = "rgba(170,200,255,0.1)";
      for (const pentagon of pentagons) {
        const points = pentagon.map((i) => place(vertices[i]));
        if (points.some(([, , z]) => z < 0)) continue;
        ctx.beginPath();
        points.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
        ctx.closePath();
        ctx.fill();
      }

      ctx.beginPath();
      for (const [a, b] of edges) {
        const points = seam(vertices[a], vertices[b]).map(place);
        if (points[0][2] < 0 && points[points.length - 1][2] < 0) continue;
        points.forEach(([x, y, z], i) => (i && z >= 0 ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
      }
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(190,215,255,0.2)";
      ctx.stroke();
      ctx.restore();

      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "rgba(170,205,255,0.55)";
      ctx.stroke();

      if (intro < 1) frame = requestAnimationFrame(draw);
    };

    const request = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };

    const resize = () => {
      const box = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = box.width;
      height = box.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      request();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    const stop = reduced ? () => {} : scrollY.on("change", request);

    return () => {
      observer.disconnect();
      stop();
      cancelAnimationFrame(frame);
    };
  }, [reduced, scrollY]);

  return (
    <canvas
      ref={canvasRef}
      data-ball-horizon
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full print:hidden"
    />
  );
};
