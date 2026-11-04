import { beforeEach, describe, expect, it, vi } from "vitest";
import { FADE_IN_S, FADE_OUT_S, MUSIC_LEVEL, createSoundEngine } from "./engine";

const param = (value = 0) => ({
  value,
  cancelScheduledValues: vi.fn(),
  setValueAtTime: vi.fn(),
  linearRampToValueAtTime: vi.fn(),
  setTargetAtTime: vi.fn(),
});

const fakeContext = () => {
  const node = () => ({ connect: vi.fn() });
  return {
    currentTime: 10,
    destination: {},
    resume: vi.fn(),
    createGain: vi.fn(() => ({ ...node(), gain: param(1) })),
    createBiquadFilter: vi.fn(() => ({ ...node(), type: "", frequency: param(350) })),
    createMediaElementSource: vi.fn(node),
  };
};

const fakeAudio = () => {
  const target = new EventTarget();
  return Object.assign(target, {
    error: null,
    paused: true,
    play: vi.fn(() => Promise.resolve()),
    pause: vi.fn(),
    load: vi.fn(),
    fire: (type) => target.dispatchEvent(new Event(type)),
  });
};

const fakeStorage = (initial = {}) => {
  const values = new Map(Object.entries(initial));
  return { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value), values };
};

let ctx;
let audio;
let storage;
let effects;
let timers;
let createContext;
let createAudio;

const engine = (overrides = {}) =>
  createSoundEngine({
    src: "/audio/track.mp3",
    createContext,
    createAudio,
    storage,
    effects,
    setTimer: (callback) => {
      timers.push(callback);
      return timers.length;
    },
    clearTimer: vi.fn(),
    ...overrides,
  });

const musicGainNode = () => ctx.createGain.mock.results[0].value;

beforeEach(() => {
  ctx = fakeContext();
  audio = fakeAudio();
  storage = fakeStorage();
  effects = { tick: vi.fn(), kick: vi.fn(), netHit: vi.fn(), whistle: vi.fn() };
  timers = [];
  createContext = vi.fn(() => ctx);
  createAudio = vi.fn(() => audio);
  Object.defineProperty(document, "hidden", { configurable: true, value: false });
});

describe("before opt-in", () => {
  it("creates no audio and downloads nothing, whatever else happens on the page", () => {
    const sound = engine();
    sound.effect("kick");
    sound.setFilterProgress(0.5);
    sound.openExternalPlayer("song");
    sound.closeExternalPlayer();

    expect(createContext).not.toHaveBeenCalled();
    expect(createAudio).not.toHaveBeenCalled();
    expect(sound.getSnapshot().status).toBe("off");
  });

  it("offers to resume after a remembered yes, but does not start by itself", () => {
    storage = fakeStorage({ "match-day-sound": "on" });
    const sound = engine();

    expect(sound.getSnapshot()).toMatchObject({ status: "off", resumable: true });
    expect(createAudio).not.toHaveBeenCalled();
  });

  it("still works when storage throws", () => {
    const blocked = {
      getItem: () => {
        throw new Error("blocked");
      },
      setItem: () => {
        throw new Error("blocked");
      },
    };
    const sound = engine({ storage: blocked });
    sound.toggle();
    expect(audio.play).toHaveBeenCalled();
  });
});

describe("turning sound on", () => {
  it("unlocks audio synchronously inside the click, for iOS Safari", () => {
    const sound = engine();
    sound.toggle();

    expect(ctx.resume).toHaveBeenCalledTimes(1);
    expect(audio.play).toHaveBeenCalledTimes(1);
    expect(sound.getSnapshot().status).toBe("loading");
  });

  it("fades the music in only once audio actually starts", () => {
    const sound = engine();
    sound.toggle();
    const { gain } = musicGainNode();
    expect(gain.linearRampToValueAtTime).not.toHaveBeenCalled();

    audio.fire("playing");

    expect(gain.linearRampToValueAtTime).toHaveBeenCalledWith(MUSIC_LEVEL, 10 + FADE_IN_S);
    expect(sound.getSnapshot().status).toBe("playing");
  });

  it("remembers the choice", () => {
    engine().toggle();
    expect(storage.values.get("match-day-sound")).toBe("on");
  });

  it("blows the whistle on the first opt-in only", () => {
    const sound = engine();
    sound.toggle();
    expect(effects.whistle).toHaveBeenCalledTimes(1);

    sound.toggle();
    sound.toggle();
    expect(effects.whistle).toHaveBeenCalledTimes(1);

    engine().toggle();
    expect(effects.whistle).toHaveBeenCalledTimes(1);
  });

  it("starts the filter at the current scroll position", () => {
    const sound = engine();
    sound.setFilterProgress(1);
    sound.toggle();
    const lowpass = ctx.createBiquadFilter.mock.results[0].value;
    expect(lowpass.frequency.value).toBeCloseTo(20000);
  });
});

describe("turning sound off", () => {
  it("fades out first, then pauses, and remembers", () => {
    const sound = engine();
    sound.toggle();
    audio.fire("playing");
    sound.toggle();

    expect(musicGainNode().gain.linearRampToValueAtTime).toHaveBeenLastCalledWith(0, 10 + FADE_OUT_S);
    expect(audio.pause).not.toHaveBeenCalled();
    timers.at(-1)();
    expect(audio.pause).toHaveBeenCalled();
    expect(sound.getSnapshot()).toMatchObject({ status: "off", resumable: false });
    expect(storage.values.get("match-day-sound")).toBe("off");
  });

  it("recovers when turned back on during the fade-out, when the track never stopped", () => {
    const sound = engine();
    sound.toggle();
    audio.fire("playing");
    sound.toggle();
    audio.paused = false;
    sound.toggle();

    expect(musicGainNode().gain.linearRampToValueAtTime).toHaveBeenLastCalledWith(MUSIC_LEVEL, 10 + FADE_IN_S);
    expect(sound.getSnapshot().status).toBe("playing");
  });

  it("silences effects", () => {
    const sound = engine();
    sound.toggle();
    sound.toggle();
    sound.effect("kick");
    expect(effects.kick).not.toHaveBeenCalled();
  });
});

describe("effects", () => {
  it("play once sound is on", () => {
    const sound = engine();
    sound.toggle();
    sound.effect("kick");
    expect(effects.kick).toHaveBeenCalledTimes(1);
  });

  it("collapse a burst of ticks into one", () => {
    const sound = engine();
    sound.toggle();
    sound.effect("tick");
    sound.effect("tick");
    expect(effects.tick).toHaveBeenCalledTimes(1);

    ctx.currentTime += 0.1;
    sound.effect("tick");
    expect(effects.tick).toHaveBeenCalledTimes(2);
  });
});

describe("the filter", () => {
  it("glides to the new frequency rather than jumping, which would click", () => {
    const sound = engine();
    sound.toggle();
    sound.setFilterProgress(1);
    const lowpass = ctx.createBiquadFilter.mock.results[0].value;
    expect(lowpass.frequency.setTargetAtTime.mock.calls[0][0]).toBeCloseTo(20000);
  });
});

describe("Apple's player", () => {
  it("takes over from the track, and effects stay quiet", () => {
    const sound = engine();
    sound.toggle();
    audio.fire("playing");
    sound.openExternalPlayer("breeze");
    timers.at(-1)();

    expect(audio.pause).toHaveBeenCalled();
    expect(sound.getSnapshot()).toMatchObject({ status: "yielded", externalPlayer: "breeze" });
    sound.effect("kick");
    expect(effects.kick).not.toHaveBeenCalled();
  });

  it("does not bring the music back on a late playing event", () => {
    const sound = engine();
    sound.toggle();
    sound.openExternalPlayer("breeze");
    audio.fire("playing");
    expect(sound.getSnapshot().status).toBe("yielded");
  });

  it("hands back to the track when closed", () => {
    const sound = engine();
    sound.toggle();
    audio.fire("playing");
    sound.openExternalPlayer("breeze");
    audio.play.mockClear();
    sound.closeExternalPlayer();

    expect(audio.play).toHaveBeenCalledTimes(1);
    expect(sound.getSnapshot()).toMatchObject({ status: "loading", externalPlayer: null });
  });

  it("closes when the visitor chooses the track, so the two never overlap", () => {
    const sound = engine();
    sound.openExternalPlayer("breeze");
    sound.toggle();
    expect(sound.getSnapshot()).toMatchObject({ status: "loading", externalPlayer: null });

    sound.openExternalPlayer("sylvia");
    sound.toggle();
    expect(sound.getSnapshot()).toMatchObject({ status: "loading", externalPlayer: null });
  });

  it("leaves sound off when it was off before the player opened", () => {
    const sound = engine();
    sound.openExternalPlayer("breeze");
    sound.closeExternalPlayer();
    expect(sound.getSnapshot()).toMatchObject({ status: "off", externalPlayer: null });
    expect(createAudio).not.toHaveBeenCalled();
  });
});

describe("the hidden tab", () => {
  const setHidden = (hidden) => {
    Object.defineProperty(document, "hidden", { configurable: true, value: hidden });
    document.dispatchEvent(new Event("visibilitychange"));
  };

  it("pauses the music and picks it up on return", () => {
    const sound = engine();
    sound.toggle();
    audio.fire("playing");

    setHidden(true);
    audio.fire("pause");
    expect(audio.pause).toHaveBeenCalledTimes(1);
    expect(sound.getSnapshot().status).toBe("playing");

    audio.play.mockClear();
    setHidden(false);
    expect(audio.play).toHaveBeenCalledTimes(1);
  });

  it("does not resume when sound was turned off", () => {
    const sound = engine();
    sound.toggle();
    sound.toggle();
    audio.play.mockClear();
    setHidden(true);
    setHidden(false);
    expect(audio.play).not.toHaveBeenCalled();
  });
});

describe("when things go wrong", () => {
  it("keeps effects working if the track fails to load", () => {
    const sound = engine();
    sound.toggle();
    audio.fire("error");

    expect(sound.getSnapshot().status).toBe("unavailable");
    sound.effect("kick");
    expect(effects.kick).toHaveBeenCalled();
  });

  it("retries the track next time sound is turned on", () => {
    const sound = engine();
    sound.toggle();
    audio.error = { code: 4 };
    audio.fire("error");
    sound.toggle();
    sound.toggle();
    expect(audio.load).toHaveBeenCalledTimes(1);
  });

  it("goes back to resumable if the browser refuses to play", async () => {
    audio.play = vi.fn(() => Promise.reject(Object.assign(new Error("no"), { name: "NotAllowedError" })));
    const sound = engine();
    sound.toggle();
    await Promise.resolve();
    await Promise.resolve();
    expect(sound.getSnapshot()).toMatchObject({ status: "off", resumable: true });
  });

  it("follows along when the system pauses the track, such as media keys or a call", () => {
    const sound = engine();
    sound.toggle();
    audio.fire("playing");
    audio.fire("pause");
    expect(sound.getSnapshot()).toMatchObject({ status: "off", resumable: true });
  });

  it("reports unavailable when the browser has no Web Audio", () => {
    const sound = engine({ createContext: () => null });
    sound.toggle();
    expect(sound.getSnapshot().status).toBe("unavailable");
    expect(createAudio).not.toHaveBeenCalled();
  });
});
