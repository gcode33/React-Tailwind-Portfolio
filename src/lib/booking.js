// Turns a public booking link into what goes in the frame. Cal.com's own /embed address stays
// invisible unless its extra script runs on this page, so it gets its normal page, in dark.
export const bookingFrameUrl = (href) => {
  const url = new URL(href);
  if (url.hostname.endsWith("cal.com")) url.searchParams.set("theme", "dark");
  if (url.hostname === "calendar.google.com") url.searchParams.set("gv", "true");
  return url.href;
};
