import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { BookingSection } from "./BookingSection";

const href = "https://cal.com/george/30min";

class StillObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

beforeEach(() => vi.stubGlobal("IntersectionObserver", StillObserver));
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("BookingSection", () => {
  it("shows nothing until a booking link is set, rather than a dead button", () => {
    const { container } = render(<BookingSection href={null} />);
    expect(container.firstChild).toBeNull();
  });

  it("requests nothing from the service until the visitor asks", () => {
    const { container } = render(<BookingSection href={href} />);
    expect(screen.getByRole("heading", { level: 2 }).textContent).toContain("Let's get in touch");
    expect(container.querySelector("iframe")).toBeNull();
  });

  it("keeps a plain link that works without the frame", () => {
    render(<BookingSection href={href} />);
    expect(screen.getByRole("link", { name: /Open in a new tab/ }).getAttribute("href")).toBe(href);
  });

  it("opens and closes the calendar", () => {
    render(<BookingSection href={href} />);
    const button = screen.getByRole("button", { name: "See available times" });
    fireEvent.click(button);

    expect(button.getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByTitle(/Calendar to book/).getAttribute("src")).toBe(`${href}?theme=dark`);

    fireEvent.click(button);
    expect(screen.queryByTitle(/Calendar to book/)).toBeNull();
  });
});
