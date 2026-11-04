// How muffled the music sounds at the top of the page and how open it gets by Contact.
// Tune these by ear.
export const FILTER_MIN_HZ = 600;
export const FILTER_MAX_HZ = 20000;

const clamp01 = (value) => Math.min(Math.max(value, 0), 1);

// Hearing is logarithmic, so equal scroll distances should multiply the frequency rather
// than add to it. A straight line would sound fully open a quarter of the way down.
export const filterFrequency = (progress) => FILTER_MIN_HZ * (FILTER_MAX_HZ / FILTER_MIN_HZ) ** clamp01(progress);

// 0 at the top of the page, 1 once the target's top edge reaches the middle of the screen.
export const scrollProgress = ({ scrollY, viewport, targetTop }) => {
  const distance = targetTop - viewport / 2;
  return distance > 0 ? clamp01(scrollY / distance) : 1;
};
