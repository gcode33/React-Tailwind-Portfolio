// The site's own meeting picker. It suggests a time rather than checking George's calendar, so
// he confirms by email. Change these to change what's offered.
export const SLOTS = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];
export const MEETING_MINUTES = 30;
const DAYS_AHEAD = 56;
const ZONE = "America/Toronto";

const pad = (n) => String(n).padStart(2, "0");
export const toDateKey = (date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
const parseKey = (key) => {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day);
};

// Weekdays from tomorrow, up to eight weeks out.
export const isBookable = (key, today) => {
  const date = parseKey(key);
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const days = Math.round((date - start) / 86400000);
  return days >= 1 && days <= DAYS_AHEAD && date.getDay() !== 0 && date.getDay() !== 6;
};

// Weeks of a month, Sunday first, with null for the days outside it.
export const monthGrid = (year, month) => {
  const cells = Array(new Date(year, month, 1).getDay()).fill(null);
  const days = new Date(year, month + 1, 0).getDate();
  for (let day = 1; day <= days; day += 1) cells.push(`${year}-${pad(month + 1)}-${pad(day)}`);
  while (cells.length % 7) cells.push(null);
  return cells;
};

const zoneOffsetMs = (utc) => {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: ZONE, hourCycle: "h23", year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric",
    }).formatToParts(utc).map((part) => [part.type, part.value])
  );
  return Date.UTC(+parts.year, +parts.month - 1, +parts.day, +parts.hour, +parts.minute, +parts.second) - utc.getTime();
};

// A Toronto wall-clock time as an exact moment, correct on both sides of daylight saving.
export const torontoToUtc = (key, time) => {
  const [year, month, day] = key.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  const guess = Date.UTC(year, month - 1, day, hour, minute);
  return new Date(guess - zoneOffsetMs(new Date(guess - zoneOffsetMs(new Date(guess)))));
};

export const formatDay = (key) => parseKey(key).toLocaleDateString("en-CA", { weekday: "long", month: "long", day: "numeric" });

export const formatSlot = (time) => {
  const [hour, minute] = time.split(":").map(Number);
  return `${hour % 12 || 12}:${pad(minute)} ${hour < 12 ? "AM" : "PM"}`;
};

const stamp = (date) => date.toISOString().replace(/[-:]|\.\d{3}/g, "");
const TITLE = "Intro call with George Fotabong Jr";

export const googleInviteUrl = ({ date, time, email }) => {
  const start = torontoToUtc(date, time);
  const end = new Date(start.getTime() + MEETING_MINUTES * 60000);
  const params = new URLSearchParams({ action: "TEMPLATE", text: TITLE, dates: `${stamp(start)}/${stamp(end)}`, add: email });
  return `https://calendar.google.com/calendar/render?${params}`;
};

export const emailRequestUrl = ({ date, time, email }) => {
  const when = `${formatDay(date)} at ${formatSlot(time)} Toronto time`;
  const subject = encodeURIComponent(`Meeting request: ${when}`);
  const body = encodeURIComponent(`Hi George,\n\nWould ${when} work for a ${MEETING_MINUTES}-minute call?\n\n`);
  return `mailto:${email}?subject=${subject}&body=${body}`;
};
