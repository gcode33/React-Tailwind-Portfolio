import { useState } from "react";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { MeetingPicker } from "./MeetingPicker";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { bookingFrameUrl } from "@/lib/booking";
import { profile } from "@/data/profile";

// With a scheduling service linked, visitors see George's real availability. Nothing is requested
// from it until someone asks to see the times.
const ServiceCalendar = ({ href }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-4">
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
    </div>
  );
};

export const BookingSection = ({ href = profile.bookingUrl }) => (
  <section id="book" className="relative py-20 md:py-24">
    <div className="container">
      <SectionHeading
        title="Let's get in touch"
        description="Pick a day and time that suits you and send me the request."
        note="booking"
      />
      <Reveal>{href ? <ServiceCalendar href={href} /> : <MeetingPicker />}</Reveal>
    </div>
  </section>
);
