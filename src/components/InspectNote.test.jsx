import { afterEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Dock } from "./Dock";
import { Footer } from "./Footer";
import { InspectNote } from "./InspectNote";

const Page = () => (
  <>
    <InspectNote id="skills" />
    <Footer />
    <Dock />
  </>
);

const inspectButton = () => screen.getByRole("button", { name: "Inspect" });

// The mode is shared across the page, so leave it off for the next test.
afterEach(() => {
  if (inspectButton().getAttribute("aria-pressed") === "true") fireEvent.click(inspectButton());
  cleanup();
});

window.scrollBy = vi.fn();

describe("Inspect mode", () => {
  it("shows no notes until asked", () => {
    render(<Page />);
    expect(inspectButton().getAttribute("aria-pressed")).toBe("false");
    expect(screen.queryByText(/inspect:/)).toBeNull();
  });

  it("reveals the notes as real page text", () => {
    render(<Page />);
    fireEvent.click(inspectButton());

    expect(inspectButton().getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByText(/inspect: no skill percentages/)).toBeTruthy();
  });

  it("tells screen readers what changed", () => {
    render(<Page />);
    fireEvent.click(inspectButton());
    expect(screen.getAllByRole("status").some((status) => /Inspect is on/.test(status.textContent))).toBe(true);
  });

  it("hides them again", () => {
    render(<Page />);
    act(() => inspectButton().click());
    act(() => inspectButton().click());
    expect(screen.queryByText(/inspect:/)).toBeNull();
  });
});
