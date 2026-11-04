import { m, useReducedMotion, useScroll, useTransform } from "motion/react";

const EASE = [0.65, 0, 0.35, 1];
const Svg = m.svg;
const Trace = m.path;
const Node = m.rect;

// Faint lines between services, like an architecture diagram. Original drawing, purely decoration.
const onLoad = [
  { d: "M1440 120 H1180 V260 H980", delay: 0 },
  { d: "M1440 420 H1240 V320 H1060 V200", delay: 0.15 },
  { d: "M1440 640 H1120 V520 H900", delay: 0.3 },
  { d: "M860 760 V620 H1010", delay: 0.45 },
];
const onScroll = ["M980 260 H760 V120", "M900 520 H640 V660", "M1060 200 H1320 V60", "M1010 620 H1300 V760"];
const nodes = [
  [972, 252],
  [1052, 192],
  [892, 512],
  [1002, 612],
];

const layout = {
  "aria-hidden": "true",
  viewBox: "0 0 1440 760",
  preserveAspectRatio: "xMidYMid slice",
  className: "pointer-events-none absolute inset-0 h-full w-full",
};
const stroke = { fill: "none", stroke: "var(--color-mint)", strokeOpacity: 0.22, strokeWidth: 1.5 };

// Draws in on load. A second set of connections extends as you scroll, and the whole diagram
// drifts more slowly than the page.
export const SchematicLines = () => {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 160]);
  const pathLength = useTransform(scrollY, [0, 500], [0, 1]);

  if (reduced) {
    return (
      <svg {...layout}>
        <g {...stroke}>
          {[...onLoad.map((trace) => trace.d), ...onScroll].map((d) => (
            <path key={d} d={d} />
          ))}
          {nodes.map(([nodeX, nodeY]) => (
            <rect key={nodeX} x={nodeX} y={nodeY} width="16" height="16" />
          ))}
        </g>
      </svg>
    );
  }

  return (
    <Svg {...layout} data-schematic style={{ y }}>
      <g {...stroke}>
        {onLoad.map((trace) => (
          <Trace
            key={trace.d}
            d={trace.d}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: EASE, delay: trace.delay }}
          />
        ))}
        {onScroll.map((d) => (
          <Trace key={d} d={d} style={{ pathLength }} />
        ))}
        {nodes.map(([nodeX, nodeY], i) => (
          <Node
            key={nodeX}
            x={nodeX}
            y={nodeY}
            width="16"
            height="16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.9 + i * 0.1 }}
          />
        ))}
      </g>
    </Svg>
  );
};
