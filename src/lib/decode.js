const NOISE = "ABCDEFGHJKLMNPRSTUVXYZ0123456789/#+=_-";

const randomNoise = () => NOISE[Math.floor(Math.random() * NOISE.length)];

// One frame of a heading resolving from noise, left to right. Spaces stay as spaces,
// so the noise wraps onto the same lines as the final text.
export const decodeFrame = (text, progress, pick = randomNoise) => {
  const resolved = Math.floor(Math.min(Math.max(progress, 0), 1) * text.length);
  return [...text].map((char, i) => (i < resolved || char === " " ? char : pick())).join("");
};
