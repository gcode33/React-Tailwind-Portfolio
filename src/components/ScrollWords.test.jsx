import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { LazyMotion, domAnimation } from "motion/react";
import { ScrollWords } from "./ScrollWords";

afterEach(cleanup);

describe("ScrollWords", () => {
  it("keeps the sentence as plain readable text, with its spaces", () => {
    render(
      <LazyMotion features={domAnimation}>
        <h2>
          <ScrollWords text="Building reliable software, end to end." />
        </h2>
      </LazyMotion>
    );
    expect(screen.getByRole("heading").textContent).toBe("Building reliable software, end to end.");
  });
});
