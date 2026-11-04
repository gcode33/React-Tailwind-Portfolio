// The physics behind the goal net. Pure functions, so they can be tested without a canvas.

export const FLIGHT_S = 0.3; // Ball travelling to the net
const RIPPLE_S = 1.6; // Net wobbling after the hit
const DROP_S = 0.55; // Ball falling down the net
export const SHOT_S = FLIGHT_S + RIPPLE_S;

export const NET_AMPLITUDE = 28; // px

const DECAY = 3.2; // How fast the wobble dies away
const SPEED = 14; // How fast it oscillates
const WAVE = 0.03; // How tightly the wave rings out across the net
const REACH = 220; // px over which the push fades with distance

// How far a point on the net is pulled toward the impact, given its distance from the
// impact in px and the seconds since the ball hit. Exactly 0 once settled.
export const netDisplacement = (distance, sinceImpact) => {
  if (sinceImpact < 0 || sinceImpact >= RIPPLE_S) return 0;
  return (
    NET_AMPLITUDE *
    Math.exp(-DECAY * sinceImpact) *
    Math.exp(-distance / REACH) *
    Math.cos(SPEED * sinceImpact - WAVE * distance)
  );
};

const easeOut = (t) => 1 - (1 - t) ** 3;

// Where the ball is t seconds after the shot: flies from `from` to `to` and shrinks with
// distance, then drops to `ground` and fades. Returns null once it has gone.
export const ballAt = (from, to, ground, t) => {
  if (t >= SHOT_S || t < 0) return null;

  if (t <= FLIGHT_S) {
    const p = easeOut(t / FLIGHT_S);
    return {
      x: from.x + (to.x - from.x) * p,
      y: from.y + (to.y - from.y) * p,
      scale: 1 - 0.45 * p,
      opacity: 1,
    };
  }

  const drop = Math.min((t - FLIGHT_S) / DROP_S, 1);
  const hold = Math.max(0, (t - FLIGHT_S - DROP_S) / (RIPPLE_S - DROP_S));
  return {
    x: to.x,
    y: to.y + (ground - to.y) * drop * drop,
    scale: 0.55,
    opacity: 1 - hold,
  };
};
