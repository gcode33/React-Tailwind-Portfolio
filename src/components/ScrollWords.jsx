import { useRef } from "react";
import { m, useTransform } from "motion/react";
import { SCRUB_MIN_OPACITY, useScrub } from "@/lib/useScrub";

const WordSpan = m.span;

const Word = ({ progress, start, end, children }) => {
  const opacity = useTransform(progress, [start, end], [SCRUB_MIN_OPACITY, 1]);
  return <WordSpan style={{ opacity }}>{children}</WordSpan>;
};

// Text that lights up one word at a time as it moves up the screen. The words stay in normal
// page order with real spaces, so screen readers and search read them as plain text.
export const ScrollWords = ({ text, offset = ["start 90%", "start 45%"] }) => {
  const ref = useRef(null);
  const progress = useScrub(ref, offset);
  const words = text.split(" ");

  return (
    <span ref={ref} data-scrub>
      {words.map((word, i) => (
        <span key={`${word}-${i}`}>
          <Word progress={progress} start={i / words.length} end={(i + 1) / words.length}>
            {word}
          </Word>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
};
