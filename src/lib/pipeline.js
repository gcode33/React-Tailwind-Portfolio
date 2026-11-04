// How many pipeline stages have passed at a given scroll progress (0 to 1).
export const litStages = (progress, count) => {
  const clamped = Math.min(Math.max(progress, 0), 1);
  return Math.floor(clamped * count + 1e-9);
};
