import { m, useReducedMotion } from "motion/react";

const EASE_OUT = [0.22, 1, 0.36, 1];
const LINES = ["George", "Fotabong Jr."];
const FULL_NAME = LINES.join(" ");
const Letter = m.span;

const className = "display text-[clamp(3rem,16vw,11rem)] leading-[0.98] tracking-[0.01em]";

// The name arrives one letter at a time. Each word stays unbreakable, so letters
// can't wrap onto separate lines on narrow screens.
export const HeroName = () => {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <h1 className={className}>
        {LINES[0]}
        <br />
        {LINES[1]}
      </h1>
    );
  }

  let index = 0;
  return (
    <h1 aria-label={FULL_NAME} className={className}>
      {LINES.map((line, l) => (
        <span key={line} aria-hidden="true" className="block">
          {l > 0 && " "}
          {line.split(" ").map((word, w) => (
            <span key={word}>
              {w > 0 && " "}
              <span className="inline-block whitespace-nowrap">
                {[...word].map((char, c) => (
                  <Letter
                    key={`${char}-${c}`}
                    className="inline-block"
                    initial={{ opacity: 0, y: "0.3em" }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.1 + index++ * 0.03 }}
                  >
                    {char}
                  </Letter>
                ))}
              </span>
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
};
