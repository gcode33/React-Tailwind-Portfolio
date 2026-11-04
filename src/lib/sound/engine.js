import { effects as defaultEffects } from "./effects";

const TICK_GAP_S = 0.06;
const PREFERENCE_KEY = "match-day-sound";
const WHISTLED_KEY = "match-day-whistled";

const defaultContext = () => {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  return AudioContextClass ? new AudioContextClass() : null;
};

// Storage can throw in private windows or with site data blocked. Sound must still work.
const readStorage = (storage, key) => {
  try {
    return storage?.getItem(key) ?? null;
  } catch {
    return null;
  }
};
const writeStorage = (storage, key, value) => {
  try {
    storage?.setItem(key, value);
  } catch {
    // The choice just won't be remembered.
  }
};
const browserStorage = () => {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
};

/*
 * Plays the site's sound effects and owns the rules around them:
 *   - Nothing is created until the visitor opts in.
 *   - A remembered "on" only offers to resume. It never starts by itself.
 *   - Effects stay quiet while Apple's player is open, or while the tab is hidden.
 *
 * Status is one of: off, on, unavailable (this browser has no Web Audio).
 *
 * toggle() must be called directly from a click: iOS Safari only unlocks audio inside the
 * user's gesture, so nothing before ctx.resume() may be asynchronous.
 */
export const createSoundEngine = ({
  createContext = defaultContext,
  storage = browserStorage(),
  doc = document,
  effects = defaultEffects,
} = {}) => {
  const listeners = new Set();
  let snapshot = {
    status: "off",
    resumable: readStorage(storage, PREFERENCE_KEY) === "on",
    externalPlayer: null,
  };
  let ctx = null;
  let lastTickAt = -Infinity;

  const set = (changes) => {
    snapshot = { ...snapshot, ...changes };
    listeners.forEach((listener) => listener());
  };

  const effect = (name) => {
    if (snapshot.status !== "on" || snapshot.externalPlayer || doc.hidden) return;
    // Phones can suspend audio while the page is in the background.
    if (ctx.state === "suspended") ctx.resume?.();
    const now = ctx.currentTime;
    if (name === "tick") {
      if (now - lastTickAt < TICK_GAP_S) return;
      lastTickAt = now;
    }
    effects[name]?.(ctx, ctx.destination, now);
  };

  return {
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    getSnapshot: () => snapshot,

    toggle: () => {
      if (snapshot.status === "on") {
        writeStorage(storage, PREFERENCE_KEY, "off");
        set({ status: "off", resumable: false });
        return;
      }
      ctx ??= createContext();
      if (!ctx) {
        set({ status: "unavailable", resumable: false });
        return;
      }
      ctx.resume?.();
      writeStorage(storage, PREFERENCE_KEY, "on");
      set({ status: "on", resumable: false });
      // Effects are otherwise silent until something happens, so confirm that it worked.
      const firstTime = readStorage(storage, WHISTLED_KEY) === null;
      if (firstTime) writeStorage(storage, WHISTLED_KEY, "yes");
      effect(firstTime ? "whistle" : "tick");
    },

    effect,

    openExternalPlayer: (key) => set({ externalPlayer: key }),
    closeExternalPlayer: () => set({ externalPlayer: null }),
  };
};
