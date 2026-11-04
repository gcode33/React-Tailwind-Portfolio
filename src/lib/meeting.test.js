import { describe, expect, it } from "vitest";
import { emailRequestUrl, googleInviteUrl, isBookable, monthGrid, toDateKey, torontoToUtc } from "./meeting";

const today = new Date(2026, 10, 4); // Wed 4 Nov 2026

describe("isBookable", () => {
  it("offers weekdays from tomorrow", () => {
    expect(isBookable("2026-11-04", today)).toBe(false);
    expect(isBookable("2026-11-05", today)).toBe(true);
    expect(isBookable("2026-11-03", today)).toBe(false);
  });

  it("skips weekends", () => {
    expect(isBookable("2026-11-07", today)).toBe(false);
    expect(isBookable("2026-11-08", today)).toBe(false);
  });

  it("stops eight weeks out", () => {
    expect(isBookable("2026-12-30", today)).toBe(true);
    expect(isBookable("2026-12-31", today)).toBe(false);
  });
});

describe("monthGrid", () => {
  it("starts on the right weekday and fills whole weeks", () => {
    const cells = monthGrid(2026, 10); // November 2026 starts on a Sunday
    expect(cells[0]).toBe("2026-11-01");
    expect(cells.length % 7).toBe(0);
    expect(cells.filter(Boolean)).toHaveLength(30);
    expect(monthGrid(2026, 11)[1]).toBeNull(); // December starts on a Tuesday
    expect(monthGrid(2026, 11)[2]).toBe("2026-12-01");
  });
});

describe("toDateKey", () => {
  it("uses the local date", () => {
    expect(toDateKey(today)).toBe("2026-11-04");
  });
});

describe("torontoToUtc", () => {
  it("handles standard time and daylight saving", () => {
    expect(torontoToUtc("2026-12-01", "10:00").toISOString()).toBe("2026-12-01T15:00:00.000Z");
    expect(torontoToUtc("2026-07-01", "10:00").toISOString()).toBe("2026-07-01T14:00:00.000Z");
  });

  it("handles the days the clocks change", () => {
    expect(torontoToUtc("2026-11-02", "10:00").toISOString()).toBe("2026-11-02T15:00:00.000Z");
    expect(torontoToUtc("2026-10-30", "10:00").toISOString()).toBe("2026-10-30T14:00:00.000Z");
  });
});

describe("invites", () => {
  const pick = { date: "2026-11-10", time: "14:00", email: "george@example.com" };

  it("builds a Google Calendar invite for 30 minutes with George as guest", () => {
    const url = new URL(googleInviteUrl(pick));
    expect(url.hostname).toBe("calendar.google.com");
    expect(url.searchParams.get("dates")).toBe("20261110T190000Z/20261110T193000Z");
    expect(url.searchParams.get("add")).toBe("george@example.com");
  });

  it("builds an email naming the time and zone", () => {
    const url = emailRequestUrl(pick);
    expect(url.startsWith("mailto:george@example.com?")).toBe(true);
    expect(decodeURIComponent(url)).toContain("November 10 at 2:00 PM Toronto time");
  });
});
