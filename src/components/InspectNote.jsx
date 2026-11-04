import { useInspect } from "@/lib/inspect";
import { inspectNotes } from "@/data/profile";

// A short note on how a section is built, shown while Inspect is on. Real page text, so it can
// be read, searched and reached by a screen reader like everything else.
export const InspectNote = ({ id, className = "" }) => {
  const inspecting = useInspect();
  if (!inspecting) return null;
  return (
    <p data-inspect-note className={`font-mono text-[13px] leading-relaxed text-mint ${className}`}>
      // inspect: {inspectNotes[id]}
    </p>
  );
};
