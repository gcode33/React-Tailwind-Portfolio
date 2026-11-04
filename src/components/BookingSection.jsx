import { useState } from "react";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { bookingFrameUrl } from "@/lib/booking";
import { profile } from "@/data/profile";

// Visitors book through a scheduling service linked to George's calendar, which is what keeps
// the times shown real. Nothing is requested from it until someone asks to see the times, and
// the plain link keeps working if the frame is blocked. No link set means no section.
export const BookingSection = ({ href = profile.bookingUrl }) => {
  const [open, setOpen] = useState(false);
  if (!href) return null;

  return (
    <section id="book" className="border-t border-border py-20 md:py-24">
      <div className="container">
        <SectionHeading
          title="Let's get in touch"
          description="Pick a time that works for you. You'll see when I'm free, and the meeting goes straight on my calendar."
          note="booking"
        />
        <Reveal className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <button
              type="button"
              aria-expanded={open}
              aria-controls="booking-calendar"
              onClick={() => setOpen((current) => !current)}
              className="btn-primary cursor-pointer"
            >
              <CalendarDays aria-hidden="true" className="h-4 w-4" />
              {open ? "Hide calendar" : "See available times"}
            </button>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-1.5 text-accent underline-offset-4 hover:underline"
            >
              Open in a new tab
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>
          <div id="booking-calendar">
            {open && (
              <iframe
                title="Calendar to book a meeting with George"
                src={bookingFrameUrl(href)}
                className="block h-[760px] w-full border border-border bg-subtle"
              />
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
};
