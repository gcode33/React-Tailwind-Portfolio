import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Navbar } from "./Navbar";

beforeEach(() => {
  window.matchMedia = vi.fn(() => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() }));
});
afterEach(() => {
  cleanup();
  delete window.matchMedia;
});

const renderWithPage = () =>
  render(
    <>
      <Navbar />
      <main data-testid="page" />
      <footer data-testid="footer" />
    </>
  );

describe("Navbar menu", () => {
  it("takes the page behind out of the tab order while open, and restores it when closed", () => {
    renderWithPage();
    expect(screen.getByTestId("page").inert).toBeFalsy();

    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.getByTestId("page").inert).toBe(true);
    expect(screen.getByTestId("footer").inert).toBe(true);

    fireEvent.click(screen.getByRole("button", { name: "Close menu" }));
    expect(screen.getByTestId("page").inert).toBeFalsy();
    expect(screen.getByTestId("footer").inert).toBeFalsy();
  });
});
