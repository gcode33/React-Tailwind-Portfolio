import { describe, expect, it } from "vitest";
import { litStages } from "./pipeline";

describe("litStages", () => {
  it("lights nothing before the section starts", () => {
    expect(litStages(0, 6)).toBe(0);
    expect(litStages(-0.2, 6)).toBe(0);
  });

  it("lights stages in order as you scroll", () => {
    expect(litStages(0.17, 6)).toBe(1);
    expect(litStages(0.5, 6)).toBe(3);
    expect(litStages(0.84, 6)).toBe(5);
  });

  it("lights every stage at the end, and no more than that", () => {
    expect(litStages(1, 6)).toBe(6);
    expect(litStages(1.4, 6)).toBe(6);
  });
});
