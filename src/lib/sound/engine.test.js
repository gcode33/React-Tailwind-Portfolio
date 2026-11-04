import { beforeEach, describe, expect, it, vi } from "vitest";
import { createSoundEngine } from "./engine";

const fakeStorage = (initial = {}) => {
  const values = new Map(Object.entries(initial));
  return { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value), values };
};

let ctx;
let storage;
let effects;
let createContext;

const engine = (overrides = {}) => createSoundEngine({ createContext, storage, effects, ...overrides });

beforeEach(() => {
  ctx = { currentTime: 10, destination: {}, state: "running", resume: vi.fn() };
  storage = fakeStorage();
  effects = { tick: vi.fn(), kick: vi.fn(), netHit: vi.fn(), whistle: vi.fn() };
  createContext = vi.fn(() => ctx);
  Object.defineProperty(document, "hidden", { configurable: true, value: false });
});

describe("before opt-in", () => {
  it("creates no audio, whatever else happens on the page", () => {
    const sound = engine();
    sound.effect("kick");
    sound.openExternalPlayer("song");
    sound.closeExternalPlayer();

    expect(createContext).not.toHaveBeenCalled();
    expect(effects.kick).not.toHaveBeenCalled();
    expect(sound.getSnapshot().status).toBe("off");
  });

  it("offers to resume after a remembered yes, but does not start by itself", () => {
    storage = fakeStorage({ "match-day-sound": "on" });
    const sound = engine();
    sound.effect("kick");

    expect(sound.getSnapshot()).toMatchObject({ status: "off", resumable: true });
    expect(createContext).not.toHaveBeenCalled();
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
    expect(sound.getSnapshot().status).toBe("on");
  });
});

describe("turning sound on", () => {
  it("unlocks audio synchronously inside the click, for iOS Safari", () => {
    engine().toggle();
    expect(ctx.resume).toHaveBeenCalledTimes(1);
  });

  it("remembers the choice", () => {
    engine().toggle();
    expect(storage.values.get("match-day-sound")).toBe("on");
  });

  it("blows the whistle on the first opt-in only, then confirms with a tick", () => {
    const sound = engine();
    sound.toggle();
    expect(effects.whistle).toHaveBeenCalledTimes(1);
    expect(effects.tick).not.toHaveBeenCalled();

    sound.toggle();
    sound.toggle();
    engine().toggle();
    expect(effects.whistle).toHaveBeenCalledTimes(1);
    expect(effects.tick).toHaveBeenCalled();
  });

  it("reuses one audio context", () => {
    const sound = engine();
    sound.toggle();
    sound.toggle();
    sound.toggle();
    expect(createContext).toHaveBeenCalledTimes(1);
  });

  it("reports unavailable when the browser has no Web Audio", () => {
    const sound = engine({ createContext: () => null });
    sound.toggle();
    expect(sound.getSnapshot().status).toBe("unavailable");
  });
});

describe("turning sound off", () => {
  it("silences effects and remembers", () => {
    const sound = engine();
    sound.toggle();
    sound.toggle();
    sound.effect("kick");

    expect(effects.kick).not.toHaveBeenCalled();
    expect(sound.getSnapshot()).toMatchObject({ status: "off", resumable: false });
    expect(storage.values.get("match-day-sound")).toBe("off");
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

  it("stay quiet while Apple's player is open, and come back after", () => {
    const sound = engine();
    sound.toggle();
    sound.openExternalPlayer("breeze");
    sound.effect("kick");
    expect(effects.kick).not.toHaveBeenCalled();

    sound.closeExternalPlayer();
    sound.effect("kick");
    expect(effects.kick).toHaveBeenCalledTimes(1);
  });

  it("stay quiet in a hidden tab", () => {
    const sound = engine();
    sound.toggle();
    Object.defineProperty(document, "hidden", { configurable: true, value: true });
    sound.effect("kick");
    expect(effects.kick).not.toHaveBeenCalled();
  });

  it("wake the audio up if the system suspended it", () => {
    const sound = engine();
    sound.toggle();
    ctx.resume.mockClear();
    ctx.state = "suspended";
    sound.effect("kick");
    expect(ctx.resume).toHaveBeenCalledTimes(1);
  });
});
