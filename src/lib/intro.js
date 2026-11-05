const KEY = "portfolio-intro-seen";

const seen = () => {
  try {
    return window.sessionStorage.getItem(KEY) !== null;
  } catch {
    return true;
  }
};

const reducedMotion = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

// The opening plays once per visit, never on a jump straight to a section, and never with
// reduced motion. Decided once, so every component agrees.
export const INTRO_MS = 750;
export const playsIntro = !seen() && !reducedMotion() && !window.location.hash;

export const markIntroSeen = () => {
  try {
    window.sessionStorage.setItem(KEY, "1");
  } catch {
    // It'll just play again next time.
  }
};

// How long hero content should wait for the opening to clear.
export const introDelayS = playsIntro ? INTRO_MS / 1000 : 0;
