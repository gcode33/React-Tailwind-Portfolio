import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MeetingPicker } from "./MeetingPicker";

const today = new Date(2026, 10, 4);

afterEach(cleanup);

describe("MeetingPicker", () => {
  it("brings the times, then the send buttons, on screen as each one appears", () => {
    const scrollIntoView = vi.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoView;
    render(<MeetingPicker today={today} />);
    expect(scrollIntoView).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", { name: /Thursday, November 5/ }));
    expect(scrollIntoView).toHaveBeenCalledTimes(1);
    expect(scrollIntoView.mock.contexts[0].contains(screen.getByRole("button", { name: "2:00 PM" }))).toBe(true);

    fireEvent.click(screen.getByRole("button", { name: "2:00 PM" }));
    expect(scrollIntoView).toHaveBeenCalledTimes(2);
    expect(scrollIntoView.mock.contexts[1].contains(screen.getByRole("link", { name: /Google Calendar/ }))).toBe(true);
    delete window.HTMLElement.prototype.scrollIntoView;
  });

  it("shows the calendar straight away, with past days and weekends unavailable", () => {
    render(<MeetingPicker today={today} />);
    expect(screen.getByRole("heading", { name: "November 2026" })).toBeTruthy();
    expect(screen.getByRole("button", { name: /Tuesday, November 3$/ }).disabled).toBe(true);
    expect(screen.getByRole("button", { name: /Saturday, November 7/ }).disabled).toBe(true);
    expect(screen.getByRole("button", { name: /Thursday, November 5/ }).disabled).toBe(false);
  });

  it("only offers ways to send once a day and time are chosen", () => {
    render(<MeetingPicker today={today} />);
    expect(screen.queryByRole("link", { name: /Google Calendar/ })).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: /Thursday, November 5/ }));
    expect(screen.queryByRole("link", { name: /Google Calendar/ })).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "2:00 PM" }));
    const invite = new URL(screen.getByRole("link", { name: /Google Calendar/ }).href);
    expect(invite.searchParams.get("dates")).toBe("20261105T190000Z/20261105T193000Z");
    expect(screen.getByRole("link", { name: /by email/ }).href).toContain("mailto:");
  });

  it("clears the time when the day changes", () => {
    render(<MeetingPicker today={today} />);
    fireEvent.click(screen.getByRole("button", { name: /Thursday, November 5/ }));
    fireEvent.click(screen.getByRole("button", { name: "2:00 PM" }));
    fireEvent.click(screen.getByRole("button", { name: /Friday, November 6/ }));
    expect(screen.queryByRole("link", { name: /Google Calendar/ })).toBeNull();
  });

  it("can't go back before this month or past the booking window", () => {
    render(<MeetingPicker today={today} />);
    expect(screen.getByRole("button", { name: "Previous month" }).disabled).toBe(true);
    fireEvent.click(screen.getByRole("button", { name: "Next month" }));
    expect(screen.getByRole("heading", { name: "December 2026" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Next month" }).disabled).toBe(true);
  });
});
