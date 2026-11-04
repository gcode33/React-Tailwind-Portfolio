import { describe, expect, it } from "vitest";
import { yearsOfExperience } from "./experience";

const jobs = [
  { start: "2026-03-01", end: null },
  { start: "2024-11-01", end: "2025-09-30" },
  { start: "2022-10-01", end: "2024-09-30" },
];

describe("yearsOfExperience", () => {
  it("counts whole years worked, excluding gaps between jobs", () => {
    expect(yearsOfExperience(jobs, new Date("2026-11-04"))).toBe(3);
  });

  it("does not count the gaps as experience", () => {
    // 4 calendar years after the first job started, but only about 3.1 years worked.
    expect(yearsOfExperience(jobs, new Date("2026-10-01"))).toBe(3);
    expect(yearsOfExperience(jobs, new Date("2027-03-01"))).toBe(3);
  });

  it("ticks over on its own while the current job continues", () => {
    expect(yearsOfExperience(jobs, new Date("2027-05-01"))).toBe(4);
  });

  it("returns 0 with no jobs", () => {
    expect(yearsOfExperience([], new Date("2026-11-04"))).toBe(0);
  });
});
