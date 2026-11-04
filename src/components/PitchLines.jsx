import { m, useReducedMotion, useScroll, useTransform } from "motion/react";

const EASE = [0.65, 0, 0.35, 1];
const Svg = m.svg;

const shapes = [
  { tag: "line", props: { x1: 720, y1: 0, x2: 720, y2: 760 }, delay: 0 },
  { tag: "circle", props: { cx: 720, cy: 380, r: 210 }, delay: 0.2 },
  { tag: "rect", props: { x: -40, y: 130, width: 250, height: 500 }, delay: 0.35 },
  { tag: "rect", props: { x: 1230, y: 130, width: 250, height: 500 }, delay: 0.35 },
];

const layout = {
  "aria-hidden": "true",
  viewBox: "0 0 1440 760",
  preserveAspectRatio: "xMidYMid slice",
  className: "pointer-events-none absolute inset-0 h-full w-full",
};

const stroke = {
  fill: "none",
  stroke: "var(--color-foreground)",
  strokeOpacity: 0.16,
  strokeWidth: 2,
};

// Chalk lines that draw themselves on load, then drift slowly as the page scrolls.
export const PitchLines = () => {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 160]);

  if (reduced) {
    return (
      <svg {...layout}>
        <g {...stroke}>
          {shapes.map((shape) => {
            const Shape = shape.tag;
            return <Shape key={JSON.stringify(shape.props)} {...shape.props} />;
          })}
        </g>
      </svg>
    );
  }

  return (
    <Svg {...layout} style={{ y }}>
      <g {...stroke}>
        {shapes.map((shape) => {
          const Shape = m[shape.tag];
          return (
            <Shape
              key={JSON.stringify(shape.props)}
              {...shape.props}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: EASE, delay: shape.delay }}
            />
          );
        })}
      </g>
    </Svg>
  );
};
