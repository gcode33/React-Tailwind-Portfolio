import { describe, expect, it } from "vitest";
import { buildBall, rotate, seam } from "./ballGeometry";

describe("buildBall", () => {
  const { vertices, edges, pentagons } = buildBall();

  it("has the shape of a real football: 60 corners, 90 seams, 12 pentagons", () => {
    expect(vertices).toHaveLength(60);
    expect(edges).toHaveLength(90);
    expect(pentagons).toHaveLength(12);
    expect(pentagons.every((pentagon) => pentagon.length === 5 && !pentagon.includes(undefined))).toBe(true);
  });

  it("meets three seams at every corner", () => {
    const counts = vertices.map((_, i) => edges.filter((edge) => edge.includes(i)).length);
    expect(counts.every((count) => count === 3)).toBe(true);
  });

  it("puts every corner on the sphere", () => {
    vertices.forEach((v) => expect(Math.hypot(...v)).toBeCloseTo(1));
  });
});

describe("rotate", () => {
  it("keeps points on the sphere", () => {
    expect(Math.hypot(...rotate([0.6, 0, 0.8], 0.7, 1.9))).toBeCloseTo(1);
  });
});

describe("seam", () => {
  it("runs from one corner to the other along the surface", () => {
    const points = seam([1, 0, 0], [0, 1, 0]);
    expect(points[0]).toEqual([1, 0, 0]);
    expect(points.at(-1)).toEqual([0, 1, 0]);
    points.forEach((p) => expect(Math.hypot(...p)).toBeCloseTo(1));
  });
});
