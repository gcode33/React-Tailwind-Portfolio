import { useState } from "react";
import { CalendarPlus, ChevronLeft, ChevronRight, Mail } from "lucide-react";
import { SLOTS, emailRequestUrl, formatDay, formatSlot, googleInviteUrl, isBookable, monthGrid, toDateKey } from "@/lib/meeting";
import { profile } from "@/data/profile";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Pick a day and a time, then send it as a calendar invite or an email.
export const MeetingPicker = ({ today = new Date() }) => {
  const [view, setView] = useState({ year: today.getFullYear(), month: today.getMonth() });
  const [day, setDay] = useState(null);
  const [time, setTime] = useState(null);

  const cells = monthGrid(view.year, view.month);
  const title = new Date(view.year, view.month, 1).toLocaleDateString("en-CA", { month: "long", year: "numeric" });
  const move = (by) => {
    const next = new Date(view.year, view.month + by, 1);
    setView({ year: next.getFullYear(), month: next.getMonth() });
  };
  const firstOfThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const canGoBack = new Date(view.year, view.month, 1) > firstOfThisMonth;
  const canGoForward = monthGrid(...(() => {
    const next = new Date(view.year, view.month + 1, 1);
    return [next.getFullYear(), next.getMonth()];
  })()).some((key) => key && isBookable(key, today));
  const pick = day && time ? { date: day, time, email: profile.email } : null;

  return (
    <div data-meeting-picker className="grid gap-8 border border-border bg-subtle p-4 md:p-6 lg:grid-cols-[1.25fr_1fr]">
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 aria-live="polite" className="font-mono text-sm tracking-[0.08em] uppercase">{title}</h3>
          <div className="flex gap-1">
            <button type="button" aria-label="Previous month" disabled={!canGoBack} onClick={() => move(-1)} className="flex h-11 w-11 cursor-pointer items-center justify-center border border-border-strong transition-colors hover:bg-border disabled:cursor-default disabled:opacity-40 disabled:hover:bg-transparent">
              <ChevronLeft aria-hidden="true" className="h-4 w-4" />
            </button>
            <button type="button" aria-label="Next month" disabled={!canGoForward} onClick={() => move(1)} className="flex h-11 w-11 cursor-pointer items-center justify-center border border-border-strong transition-colors hover:bg-border disabled:cursor-default disabled:opacity-40 disabled:hover:bg-transparent">
              <ChevronRight aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center">
          {WEEKDAYS.map((name) => (
            <div key={name} aria-hidden="true" className="py-1 font-mono text-[11px] text-muted uppercase">{name}</div>
          ))}
          {cells.map((key, i) => {
            if (!key) return <div key={`blank-${i}`} aria-hidden="true" />;
            const open = isBookable(key, today);
            const selected = key === day;
            return (
              <button
                key={key}
                type="button"
                disabled={!open}
                aria-pressed={selected}
                aria-label={formatDay(key)}
                data-today={key === toDateKey(today) || undefined}
                onClick={() => {
                  setDay(key);
                  setTime(null);
                }}
                className={`min-h-11 font-mono text-sm transition-colors ${
                  selected
                    ? "cursor-pointer bg-foreground text-background"
                    : open
                      ? "cursor-pointer border border-border-strong hover:bg-border"
                      : "text-muted/50"
                }`}
              >
                {Number(key.slice(8))}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p aria-live="polite" className="font-mono text-sm tracking-[0.08em] uppercase">
          {day ? formatDay(day) : "Pick a day"}
        </p>
        <p className="text-sm text-muted">30 minutes, Monday to Friday. Times are Toronto time (ET).</p>

        {day && (
          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
            {SLOTS.map((slot) => (
              <button
                key={slot}
                type="button"
                aria-pressed={slot === time}
                onClick={() => setTime(slot)}
                className={`min-h-11 cursor-pointer font-mono text-sm transition-colors ${
                  slot === time ? "bg-foreground text-background" : "border border-border-strong hover:bg-border"
                }`}
              >
                {formatSlot(slot)}
              </button>
            ))}
          </div>
        )}

        {pick && (
          <div data-meeting-actions className="mt-2 flex flex-col gap-2 border-t border-border pt-4">
            <a href={googleInviteUrl(pick)} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <CalendarPlus aria-hidden="true" className="h-4 w-4" />
              Send a Google Calendar invite
            </a>
            <a href={emailRequestUrl(pick)} className="btn-ghost">
              <Mail aria-hidden="true" className="h-4 w-4" />
              Request by email
            </a>
            <p className="text-sm text-muted">I'll confirm by email, or suggest another time if that one's taken.</p>
          </div>
        )}
      </div>
    </div>
  );
};
