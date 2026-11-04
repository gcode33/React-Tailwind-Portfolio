import { describe, expect, it } from "vitest";
import { FLIGHT_S, NET_AMPLITUDE, SHOT_S, ballAt, netDisplacement } from "./net";

describe("netDisplacement", () => {
  it("does nothing before the ball hits", () => {
    expect(netDisplacement(0, -0.1)).toBe(0);
  });

  it("pushes hardest right where the ball hits", () => {
    expect(netDisplacement(0, 0)).toBeCloseTo(NET_AMPLITUDE);
  });

  it("gets weaker further from the impact", () => {
    expect(Math.abs(netDisplacement(500, 0))).toBeLessThan(Math.abs(netDisplacement(0, 0)));
  });

  it("dies away over time", () => {
    const envelope = (t) => Math.max(...Array.from({ length: 40 }, (_, i) => Math.abs(netDisplacement(0, t + i * 0.01))));
    expect(envelope(1)).toBeLessThan(envelope(0) / 5);
  });

  it("is completely still once settled, so drawing can stop", () => {
    expect(netDisplacement(0, SHOT_S)).toBe(0);
    expect(netDisplacement(120, SHOT_S + 5)).toBe(0);
  });
});

describe("ballAt", () => {
  const from = { x: 100, y: 500 };
  const to = { x: 600, y: 200 };
  const ground = 560;

  it("starts where it was struck", () => {
    const ball = ballAt(from, to, ground, 0);
    expect(ball.x).toBeCloseTo(100);
    expect(ball.y).toBeCloseTo(500);
    expect(ball.scale).toBeCloseTo(1);
  });

  it("reaches the impact point, smaller because it's further away", () => {
    const ball = ballAt(from, to, ground, FLIGHT_S);
    expect(ball.x).toBeCloseTo(600);
    expect(ball.y).toBeCloseTo(200);
    expect(ball.scale).toBeLessThan(1);
  });

  it("then drops toward the ground and never falls through it", () => {
    const after = ballAt(from, to, ground, FLIGHT_S + 0.2);
    expect(after.y).toBeGreaterThan(200);
    expect(after.y).toBeLessThanOrEqual(ground);
    expect(after.x).toBeCloseTo(600);
  });

  it("is gone by the end of the shot", () => {
    expect(ballAt(from, to, ground, SHOT_S)).toBeNull();
  });
});
