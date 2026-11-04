import { describe, expect, it } from "vitest";
import { buildStripItems } from "./buildStrip";

describe("buildStripItems", () => {
  it("shows real values, with the hash linked to its commit", () => {
    const items = buildStripItems({ commit: "0792f095d03f", tests: 72, lighthouse: 96 });
    expect(items.map((item) => item.label)).toEqual(["build 0792f09", "Lighthouse 96", "72 tests passing"]);
    expect(items[0].href).toMatch(/\/commit\/0792f095d03f$/);
  });

  it("leaves out anything unavailable instead of faking it", () => {
    expect(buildStripItems({ commit: "0792f095", tests: null, lighthouse: null }).map((item) => item.label)).toEqual([
      "build 0792f09",
    ]);
    expect(buildStripItems({ commit: null, tests: null, lighthouse: null })).toEqual([]);
    expect(buildStripItems()).toEqual([]);
  });
});
