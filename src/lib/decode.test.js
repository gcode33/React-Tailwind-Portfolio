import { describe, expect, it } from "vitest";
import { decodeFrame } from "./decode";

const hash = () => "#";

describe("decodeFrame", () => {
  it("starts as all noise but keeps word breaks, so lines wrap the same way", () => {
    expect(decodeFrame("The season", 0, hash)).toBe("### ######");
  });

  it("resolves the text from left to right", () => {
    expect(decodeFrame("ABCD", 0.5, hash)).toBe("AB##");
  });

  it("ends on the exact text", () => {
    expect(decodeFrame("How I ship", 1, hash)).toBe("How I ship");
  });

  it("copes with progress outside 0 to 1", () => {
    expect(decodeFrame("AB", -1, hash)).toBe("##");
    expect(decodeFrame("AB", 2, hash)).toBe("AB");
  });

  it("uses varied noise by default and never changes the length", () => {
    const frame = decodeFrame("Tools of the trade", 0);
    expect(frame).toHaveLength(18);
    expect(frame).not.toContain("Tools");
  });
});
