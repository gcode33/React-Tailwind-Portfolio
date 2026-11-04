import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { SectionTransition } from "./SectionTransition";

const Page = () => (
  <>
    <SectionTransition />
    <a href="#projects">Projects</a>
    <section id="projects" aria-label="Projects section" />
  </>
);

beforeEach(() => {
  Element.prototype.scrollIntoView = vi.fn();
  window.history.replaceState(null, "", "/");
});
afterEach(cleanup);

describe("SectionTransition", () => {
  it("is hidden from assistive technology and doesn't block clicks", () => {
    const { container } = render(<Page />);
    const overlay = container.querySelector("[data-section-transition]");
    expect(overlay.getAttribute("aria-hidden")).toBe("true");
    expect(overlay.className).toContain("pointer-events-none");
  });

  it("collapses the panel with transform only, so animating transform can reveal it", () => {
    const { container } = render(<Page />);
    const panel = container.querySelector("[data-section-transition] > div");
    expect(panel.style.transform).toBe("scaleX(0)");
    expect(panel.className).not.toContain("scale-x-0");
  });

  it("lands on the section: scrolls, updates the URL and moves keyboard focus", async () => {
    render(<Page />);
    fireEvent.click(screen.getByRole("link", { name: "Projects" }));
    await vi.waitFor(() => expect(window.location.hash).toBe("#projects"));
    const target = document.getElementById("projects");
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
    expect(document.activeElement).toBe(target);
  });
});
