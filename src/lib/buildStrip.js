const REPO = "https://github.com/gcode33/React-Tailwind-Portfolio";

// Turns real build values into footer items. A value that wasn't available is left out, never faked.
export const buildStripItems = ({ commit, tests, lighthouse } = {}) =>
  [
    commit && { label: `build ${commit.slice(0, 7)}`, href: `${REPO}/commit/${commit}` },
    lighthouse && { label: `Lighthouse ${lighthouse}` },
    tests && { label: `${tests} tests passing` },
  ].filter(Boolean);
