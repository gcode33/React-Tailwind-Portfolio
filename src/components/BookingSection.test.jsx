import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { BookingSection } from "./BookingSection";

const href = "https://cal.com/george/30min";

afterEach(cleanup);

describe("BookingSection", () => {
  it("always has a calendar: the site's own picker when no service is linked", () => {
    const { container } = render(<BookingSection href={null} />);
    expect(screen.getByRole("heading", { level: 2 }).textContent).toContain("Let's get in touch");
    expect(container.querySelector("[data-meeting-picker]")).not.toBeNull();
    expect(container.querySelector("iframe")).toBeNull();
  });

  it("with a service linked, requests nothing from it until the visitor asks", () => {
    const { container } = render(<BookingSection href={href} />);
    expect(container.querySelector("[data-meeting-picker]")).toBeNull();
    expect(container.querySelector("iframe")).toBeNull();
  });

  it("keeps a plain link that works without the frame", () => {
    render(<BookingSection href={href} />);
    expect(screen.getByRole("link", { name: /Open in a new tab/ }).getAttribute("href")).toBe(href);
  });

  it("opens and closes the service's calendar", () => {
    render(<BookingSection href={href} />);
    const button = screen.getByRole("button", { name: "See available times" });
    fireEvent.click(button);
    expect(button.getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByTitle(/Calendar to book/).getAttribute("src")).toBe(`${href}?theme=dark`);

    fireEvent.click(button);
    expect(screen.queryByTitle(/Calendar to book/)).toBeNull();
  });
});
