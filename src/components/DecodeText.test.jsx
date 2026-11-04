import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { DecodeText } from "./DecodeText";

class InstantObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe(target) {
    this.callback([{ isIntersecting: true, target }], this);
  }
  unobserve() {}
  disconnect() {}
}

beforeEach(() => vi.stubGlobal("IntersectionObserver", InstantObserver));
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("DecodeText", () => {
  it("always gives screen readers the real heading, even mid-animation", () => {
    render(<h2><DecodeText text="How I ship" /></h2>);
    expect(screen.getByRole("heading", { name: "How I ship" })).toBeTruthy();
  });

  it("keeps the noise layer away from assistive technology", () => {
    const { container } = render(<h2><DecodeText text="How I ship" /></h2>);
    const overlay = container.querySelector('[aria-hidden="true"]');
    expect(overlay).toBeTruthy();
    expect(screen.getByRole("heading").getAttribute("aria-hidden")).toBeNull();
  });

  it("finishes as plain visible text with the noise layer gone", async () => {
    const { container } = render(<h2><DecodeText text="Projects" /></h2>);
    await waitFor(() => expect(container.querySelector('[aria-hidden="true"]')).toBeNull(), { timeout: 2000 });
    expect(container.querySelector(".text-transparent")).toBeNull();
    expect(container.textContent).toBe("Projects");
  });
});
