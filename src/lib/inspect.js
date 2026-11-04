import { useSyncExternalStore } from "react";
import { flushSync } from "react-dom";

let on = false;
const listeners = new Set();

const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const useInspect = () => useSyncExternalStore(subscribe, () => on);

// Notes appear above and below wherever the visitor is reading. Pin whatever is at the middle
// of the screen so the page doesn't appear to jump. Safari has no scroll anchoring of its own,
// so this does it by hand and switches the browser's version off for the moment it runs.
export const toggleInspect = () => {
  const root = document.documentElement;
  const middle = document.elementFromPoint?.(window.innerWidth / 2, window.innerHeight / 2);
  // A note is about to disappear when turning off, so hold on to what contains it instead.
  const anchor = middle?.closest("[data-inspect-note]")?.parentElement ?? middle;
  const before = anchor?.getBoundingClientRect().top;

  root.style.overflowAnchor = "none";
  flushSync(() => {
    on = !on;
    listeners.forEach((listener) => listener());
  });
  if (anchor?.isConnected) {
    window.scrollBy({ top: anchor.getBoundingClientRect().top - before, behavior: "instant" });
  }
  root.style.overflowAnchor = "";
};
