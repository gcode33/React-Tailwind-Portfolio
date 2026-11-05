import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { NotFound } from "./NotFound";

afterEach(cleanup);

describe("NotFound", () => {
  it("says plainly that the page doesn't exist and links home", () => {
    render(<NotFound />);
    expect(screen.getByRole("heading", { level: 1, name: "Page not found." })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Back home" }).getAttribute("href")).toBe("/");
  });
});
