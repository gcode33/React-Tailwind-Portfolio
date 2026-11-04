import { describe, expect, it } from "vitest";
import { FILTER_MAX_HZ, FILTER_MIN_HZ, filterFrequency, scrollProgress } from "./mix";

describe("filterFrequency", () => {
  it("runs from muffled to fully open", () => {
    expect(filterFrequency(0)).toBeCloseTo(FILTER_MIN_HZ);
    expect(filterFrequency(1)).toBeCloseTo(FILTER_MAX_HZ);
  });

  it("moves in equal musical steps rather than equal hertz", () => {
    const middle = filterFrequency(0.5);
    expect(middle).toBeCloseTo(Math.sqrt(FILTER_MIN_HZ * FILTER_MAX_HZ));
    expect(middle).toBeLessThan((FILTER_MIN_HZ + FILTER_MAX_HZ) / 2);
  });

  it("stays in range when overscrolling reports a value outside 0 to 1", () => {
    expect(filterFrequency(-0.2)).toBeCloseTo(FILTER_MIN_HZ);
    expect(filterFrequency(1.3)).toBeCloseTo(FILTER_MAX_HZ);
  });
});

describe("scrollProgress", () => {
  const page = { viewport: 800, targetTop: 4400 };

  it("is 0 at the top and 1 once the target reaches mid-screen", () => {
    expect(scrollProgress({ ...page, scrollY: 0 })).toBe(0);
    expect(scrollProgress({ ...page, scrollY: 2000 })).toBe(0.5);
    expect(scrollProgress({ ...page, scrollY: 4000 })).toBe(1);
    expect(scrollProgress({ ...page, scrollY: 5000 })).toBe(1);
  });

  it("is fully open when the target is already on screen at the top", () => {
    expect(scrollProgress({ viewport: 800, targetTop: 100, scrollY: 0 })).toBe(1);
  });
});
