import { describe, expect, it } from "vitest";
import { bookingFrameUrl } from "./booking";

describe("bookingFrameUrl", () => {
  it("asks Cal.com for its dark theme, on the normal page rather than /embed", () => {
    expect(bookingFrameUrl("https://cal.com/george/30min")).toBe("https://cal.com/george/30min?theme=dark");
  });

  it("uses Google's framed view for its booking pages", () => {
    expect(bookingFrameUrl("https://calendar.google.com/calendar/appointments/schedules/abc")).toBe(
      "https://calendar.google.com/calendar/appointments/schedules/abc?gv=true"
    );
  });

  it("leaves any other service's link as it is", () => {
    expect(bookingFrameUrl("https://calendly.com/george/30min")).toBe("https://calendly.com/george/30min");
  });
});
