import { describe, expect, it } from "vitest";
import { commitHash, passingTests } from "./build-info.mjs";

describe("passingTests", () => {
  it("reports the count from a clean run", () => {
    expect(passingTests({ success: true, numPassedTests: 72 })).toBe(72);
  });

  it("reports nothing from a failing, empty or missing run", () => {
    expect(passingTests({ success: false, numPassedTests: 71 })).toBeNull();
    expect(passingTests({ success: true, numPassedTests: 0 })).toBeNull();
    expect(passingTests(null)).toBeNull();
  });
});

describe("commitHash", () => {
  it("prefers the commit Vercel is deploying", () => {
    expect(commitHash({ VERCEL_GIT_COMMIT_SHA: "abc123" })).toBe("abc123");
  });
});
