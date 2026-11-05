import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { getJumpTarget, idFromHash } from "./sectionJump";

const setup = (attrs = {}) => {
  const a = document.createElement("a");
  a.setAttribute("href", "#projects");
  Object.entries(attrs).forEach(([k, v]) => a.setAttribute(k, v));
  document.body.append(a);
  return a;
};

const click = (extra = {}) => ({ button: 0, defaultPrevented: false, ...extra });

describe("getJumpTarget", () => {
  beforeEach(() => {
    document.body.innerHTML = '<section id="projects"></section><main id="main"></main>';
  });
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("takes over a plain click on a link to a section", () => {
    expect(getJumpTarget(click(), setup(), { reduced: false })).toBe("projects");
  });

  it("leaves the browser's plain jump in place for reduced motion", () => {
    expect(getJumpTarget(click(), setup(), { reduced: true })).toBeNull();
  });

  it("leaves modified clicks alone, so open-in-new-tab keeps working", () => {
    for (const key of ["metaKey", "ctrlKey", "shiftKey", "altKey"]) {
      expect(getJumpTarget(click({ [key]: true }), setup(), { reduced: false })).toBeNull();
    }
    expect(getJumpTarget(click({ button: 1 }), setup(), { reduced: false })).toBeNull();
  });

  it("leaves the skip link instant for keyboard users", () => {
    expect(getJumpTarget(click(), setup({ href: "#main" }), { reduced: false })).toBeNull();
  });

  it("ignores external, download and new-tab links, and missing sections", () => {
    expect(getJumpTarget(click(), setup({ href: "https://github.com/gcode33" }), { reduced: false })).toBeNull();
    expect(getJumpTarget(click(), setup({ href: "#nowhere" }), { reduced: false })).toBeNull();
    expect(getJumpTarget(click(), setup({ target: "_blank" }), { reduced: false })).toBeNull();
    expect(getJumpTarget(click(), setup({ download: "" }), { reduced: false })).toBeNull();
    expect(getJumpTarget(click(), null, { reduced: false })).toBeNull();
  });

  it("respects a click another handler already handled", () => {
    expect(getJumpTarget(click({ defaultPrevented: true }), setup(), { reduced: false })).toBeNull();
  });
});

describe("idFromHash", () => {
  it("reads the section out of a URL hash", () => {
    expect(idFromHash("#projects")).toBe("projects");
    expect(idFromHash("#a%20b")).toBe("a b");
  });

  it("returns null when there's no hash", () => {
    expect(idFromHash("")).toBeNull();
    expect(idFromHash("#")).toBeNull();
  });

  it("returns null instead of throwing on a malformed hash, which used to blank the whole site", () => {
    expect(idFromHash("#%E0%A4%A")).toBeNull();
  });
});
