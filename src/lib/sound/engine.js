import { effects as defaultEffects } from "./effects";
import { filterFrequency } from "./mix";

export const MUSIC_LEVEL = 0.55;
export const FADE_IN_S = 2;
export const FADE_OUT_S = 0.6;
const FILTER_SMOOTHING_S = 0.15;
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
 * Plays the background track and effects, and owns the rules around them:
 *   - Nothing is created or downloaded until the visitor opts in.
 *   - A remembered "on" only offers to resume. It never starts by itself.
 *   - Apple's player and the track never overlap.
 *   - Music pauses while the tab is hidden.
 *
 * Status is one of:
 *   off          nothing playing
 *   loading      opted in, waiting for audio
 *   playing      music audible
 *   yielded      opted in, but Apple's player has the floor
 *   unavailable  the track failed to load, so only effects play
 *
 * toggle() must be called directly from a click: iOS Safari only unlocks audio inside the
 * user's gesture, so nothing before audio.play() may be asynchronous.
 */
export const createSoundEngine = ({
  src,
  createContext = defaultContext,
  createAudio = () => new Audio(),
  storage = browserStorage(),
  doc = document,
  effects = defaultEffects,
  setTimer = (callback, ms) => setTimeout(callback, ms),
  clearTimer = (id) => clearTimeout(id),
} = {}) => {
  const listeners = new Set();
  let snapshot = {
    status: "off",
    resumable: readStorage(storage, PREFERENCE_KEY) === "on",
    externalPlayer: null,
  };

  let ctx = null;
  let audio = null;
  let musicGain = null;
  let lowpass = null;
  let effectsBus = null;
  let wanted = false;
  let pausedByUs = false;
  let pauseTimer = null;
  let progress = 0;
  let lastTickAt = -Infinity;

  const set = (changes) => {
    snapshot = { ...snapshot, ...changes };
    listeners.forEach((listener) => listener());
  };

  const fadeTo = (level, seconds) => {
    const now = ctx.currentTime;
    const { gain } = musicGain;
    gain.cancelScheduledValues(now);
    gain.setValueAtTime(gain.value, now);
    gain.linearRampToValueAtTime(level, now + seconds);
  };

  const trackFailed = () => {
    if (wanted && snapshot.status !== "yielded") set({ status: "unavailable" });
  };

  const onVisibility = () => {
    if (!wanted || snapshot.status === "yielded") return;
    if (doc.hidden) {
      pausedByUs = true;
      audio.pause();
    } else if (snapshot.status !== "unavailable") {
      ctx.resume?.();
      playTrack();
    }
  };

  const buildGraph = () => {
    if (ctx) return true;
    ctx = createContext();
    if (!ctx) return false;

    audio = createAudio();
    audio.src = src;
    audio.loop = true;
    // Stream as it plays rather than fetching the whole file, for visitors on phone data.
    audio.preload = "none";

    lowpass = ctx.createBiquadFilter();
    lowpass.type = "lowpass";
    lowpass.frequency.value = filterFrequency(progress);
    musicGain = ctx.createGain();
    musicGain.gain.value = 0;
    effectsBus = ctx.createGain();

    ctx.createMediaElementSource(audio).connect(lowpass);
    lowpass.connect(musicGain);
    musicGain.connect(ctx.destination);
    // Effects skip the filter, so they stay crisp while the music is muffled.
    effectsBus.connect(ctx.destination);

    audio.addEventListener("playing", () => {
      if (!wanted || snapshot.status === "yielded") return;
      fadeTo(MUSIC_LEVEL, FADE_IN_S);
      set({ status: "playing" });
    });
    audio.addEventListener("waiting", () => {
      if (snapshot.status === "playing") set({ status: "loading" });
    });
    audio.addEventListener("error", trackFailed);
    // Paused by something else: media keys, a phone call, the system taking the audio.
    audio.addEventListener("pause", () => {
      if (pausedByUs || !wanted || doc.hidden) return;
      wanted = false;
      set({ status: "off", resumable: true });
    });
    doc.addEventListener("visibilitychange", onVisibility);
    return true;
  };

  const playTrack = () => {
    pausedByUs = false;
    if (audio.error) audio.load();
    audio.play()?.catch((error) => {
      if (error?.name === "AbortError") return;
      if (error?.name === "NotAllowedError") {
        wanted = false;
        set({ status: "off", resumable: true });
      } else {
        trackFailed();
      }
    });
  };

  const start = () => {
    wanted = true;
    if (!buildGraph()) {
      set({ status: "unavailable", resumable: false });
      return;
    }
    clearTimer(pauseTimer);
    ctx.resume?.();
    // Lets iPhones on silent still play, since the visitor explicitly asked for sound.
    if (navigator.audioSession) navigator.audioSession.type = "playback";
    // Turned back on mid fade-out: the track never stopped, so no "playing" event will come.
    if (audio.paused === false) {
      pausedByUs = false;
      fadeTo(MUSIC_LEVEL, FADE_IN_S);
      set({ status: "playing", resumable: false });
      return;
    }
    set({ status: "loading", resumable: false });
    playTrack();
  };

  const fadeOutAndPause = () => {
    pausedByUs = true;
    fadeTo(0, FADE_OUT_S);
    clearTimer(pauseTimer);
    pauseTimer = setTimer(() => audio.pause(), FADE_OUT_S * 1000);
  };

  const effect = (name) => {
    if (!wanted || !ctx || snapshot.status === "yielded" || doc.hidden) return;
    const now = ctx.currentTime;
    if (name === "tick") {
      if (now - lastTickAt < TICK_GAP_S) return;
      lastTickAt = now;
    }
    effects[name]?.(ctx, effectsBus, now);
  };

  return {
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    getSnapshot: () => snapshot,

    toggle: () => {
      if (wanted && snapshot.status !== "yielded") {
        wanted = false;
        writeStorage(storage, PREFERENCE_KEY, "off");
        if (ctx) fadeOutAndPause();
        set({ status: "off", resumable: false });
        return;
      }
      // Choosing the track while Apple's player is open closes the player.
      if (snapshot.externalPlayer) set({ externalPlayer: null });
      writeStorage(storage, PREFERENCE_KEY, "on");
      start();
      if (ctx && readStorage(storage, WHISTLED_KEY) === null) {
        writeStorage(storage, WHISTLED_KEY, "yes");
        effect("whistle");
      }
    },

    effect,

    setFilterProgress: (value) => {
      progress = value;
      if (lowpass) lowpass.frequency.setTargetAtTime(filterFrequency(value), ctx.currentTime, FILTER_SMOOTHING_S);
    },

    openExternalPlayer: (key) => {
      if (wanted && snapshot.status !== "yielded") {
        if (ctx) fadeOutAndPause();
        set({ status: "yielded", externalPlayer: key });
      } else {
        set({ externalPlayer: key });
      }
    },

    closeExternalPlayer: () => {
      const returnToTrack = snapshot.status === "yielded";
      set({ externalPlayer: null });
      if (returnToTrack) start();
    },
  };
};
