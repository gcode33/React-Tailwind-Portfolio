// The panels of a football, worked out from an icosahedron: cut off each of its 12 corners and
// you get the classic 12 pentagons and 20 hexagons. Pure maths, so it can be tested without a canvas.
const PHI = (1 + Math.sqrt(5)) / 2;

const unit = ([x, y, z]) => {
  const length = Math.hypot(x, y, z);
  return [x / length, y / length, z / length];
};

const distance = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);

const CORNERS = [
  [0, 1, PHI], [0, 1, -PHI], [0, -1, PHI], [0, -1, -PHI],
  [1, PHI, 0], [1, -PHI, 0], [-1, PHI, 0], [-1, -PHI, 0],
  [PHI, 0, 1], [PHI, 0, -1], [-PHI, 0, 1], [-PHI, 0, -1],
];

export const buildBall = () => {
  const raw = [];
  const owner = [];
  CORNERS.forEach((a, i) => {
    CORNERS.forEach((b) => {
      if (Math.abs(distance(a, b) - 2) > 1e-6) return;
      raw.push([a[0] + (b[0] - a[0]) / 3, a[1] + (b[1] - a[1]) / 3, a[2] + (b[2] - a[2]) / 3]);
      owner.push(i);
    });
  });
  const vertices = raw.map(unit);

  let shortest = Infinity;
  for (let i = 0; i < vertices.length; i += 1) {
    for (let j = i + 1; j < vertices.length; j += 1) shortest = Math.min(shortest, distance(vertices[i], vertices[j]));
  }
  const edges = [];
  for (let i = 0; i < vertices.length; i += 1) {
    for (let j = i + 1; j < vertices.length; j += 1) {
      if (distance(vertices[i], vertices[j]) < shortest * 1.02) edges.push([i, j]);
    }
  }

  // Each corner that was cut off leaves one pentagon. Walk around it so it draws as a clean shape.
  const pentagons = CORNERS.map((_, corner) => {
    const members = vertices.map((_, i) => i).filter((i) => owner[i] === corner);
    const ordered = [members[0]];
    while (ordered.length < members.length) {
      const last = ordered[ordered.length - 1];
      const next = members.find((m) => !ordered.includes(m) && edges.some(([a, b]) => (a === last && b === m) || (a === m && b === last)));
      ordered.push(next);
    }
    return ordered;
  });

  return { vertices, edges, pentagons };
};

export const rotate = ([x, y, z], tilt, spin) => {
  const x1 = x * Math.cos(spin) + z * Math.sin(spin);
  const z1 = -x * Math.sin(spin) + z * Math.cos(spin);
  return [x1, y * Math.cos(tilt) - z1 * Math.sin(tilt), y * Math.sin(tilt) + z1 * Math.cos(tilt)];
};

// Points along the surface between two vertices, so seams curve with the ball.
export const seam = (a, b, steps = 4) => {
  const points = [];
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    points.push(unit([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]));
  }
  return points;
};
