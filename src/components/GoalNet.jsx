import { useEffect, useImperativeHandle, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { FLIGHT_S, SHOT_S, ballAt, netDisplacement } from "@/lib/net";
import { sound } from "@/lib/sound";

const LINE = "245, 247, 250";
const BALL_MARK = "#034694";
const REST_ALPHA = 0.1;
const FRAME_ALPHA = 0.3;
const BALL_RADIUS = 18;

// A goal drawn behind the contact section. It only draws while a shot is in the air,
// so an idle net costs nothing. Canvas rather than SVG because a few hundred points move
// on every frame. Purely decorative: all real content sits above it as normal page text.
export const GoalNet = ({ ref }) => {
  const reduced = useReducedMotion();
  const canvasRef = useRef(null);
  const shot = useRef(null);
  const frame = useRef(0);
  const size = useRef({ width: 0, height: 0 });
  const shootFrom = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    const goal = () => {
      const { width, height } = size.current;
      const margin = width < 768 ? 12 : 32;
      return { left: margin, right: width - margin, top: 24, bottom: height, spacing: width < 768 ? 26 : 34 };
    };

    const draw = (now) => {
      const { width, height } = size.current;
      const { left, right, top, bottom, spacing } = goal();
      ctx.clearRect(0, 0, width, height);

      const current = shot.current;
      const t = current ? (now - current.startedAt) / 1000 : 0;
      const sinceImpact = t - FLIGHT_S;
      const moving = Boolean(current) && sinceImpact >= 0;
      const energy = moving ? Math.max(0, 1 - sinceImpact / (SHOT_S - FLIGHT_S)) : 0;

      const point = (x, y) => {
        if (!moving) return [x, y];
        const dx = current.to.x - x;
        const dy = current.to.y - y;
        const distance = Math.hypot(dx, dy) || 1;
        const pull = netDisplacement(distance, sinceImpact);
        return [x + (dx / distance) * pull, y + (dy / distance) * pull];
      };

      // The mesh stays inside the posts however far it's pulled.
      ctx.save();
      ctx.beginPath();
      ctx.rect(left, top, right - left, bottom - top);
      ctx.clip();

      // Net: one path per frame is far cheaper than one stroke per line.
      ctx.beginPath();
      for (let x = left; x <= right; x += spacing) {
        for (let y = top; y <= bottom + spacing; y += spacing) {
          const [px, py] = point(x, y);
          if (y === top) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
      }
      for (let y = top; y <= bottom; y += spacing) {
        for (let x = left; x <= right + spacing; x += spacing) {
          const [px, py] = point(Math.min(x, right), y);
          if (x === left) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
      }
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(${LINE}, ${REST_ALPHA + energy * 0.2})`;
      ctx.stroke();
      ctx.restore();

      // Posts and crossbar stay rigid.
      ctx.beginPath();
      ctx.moveTo(left, bottom);
      ctx.lineTo(left, top);
      ctx.lineTo(right, top);
      ctx.lineTo(right, bottom);
      ctx.lineWidth = 3;
      ctx.strokeStyle = `rgba(${LINE}, ${FRAME_ALPHA})`;
      ctx.stroke();

      const ball = current && ballAt(current.from, current.to, height - BALL_RADIUS, t);
      if (ball) {
        ctx.globalAlpha = ball.opacity;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, BALL_RADIUS * ball.scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${LINE})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, BALL_RADIUS * ball.scale * 0.42, 0, Math.PI * 2);
        ctx.fillStyle = BALL_MARK;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      if (current && t >= SHOT_S) shot.current = null;
      if (shot.current) frame.current = requestAnimationFrame(draw);
      else frame.current = 0;
    };

    const resize = () => {
      const box = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      size.current = { width: box.width, height: box.height };
      canvas.width = Math.round(box.width * ratio);
      canvas.height = Math.round(box.height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      if (!frame.current) draw(performance.now());
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    shootFrom.current = (origin) => {
      const { left, right, top, bottom } = goal();
      const box = canvas.getBoundingClientRect();
      const from = origin
        ? { x: origin.left + origin.width / 2 - box.left, y: origin.top + origin.height / 2 - box.top }
        : { x: left + (right - left) * 0.2, y: bottom };
      // Top corner on the far side: the classic finish, and clear of the content below it.
      const to = { x: left + (right - left) * 0.72, y: top + 34 };
      shot.current = { from, to, startedAt: performance.now() };
      if (!frame.current) frame.current = requestAnimationFrame(draw);
    };

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame.current);
      frame.current = 0;
      shot.current = null;
      shootFrom.current = null;
    };
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      shoot: (fromElement) => {
        if (reduced) return;
        shootFrom.current?.(fromElement?.getBoundingClientRect());
        sound.effect("netHit");
      },
    }),
    [reduced]
  );

  return (
    <canvas
      ref={canvasRef}
      data-goal-net
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full print:hidden"
    />
  );
};
