import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { Dock } from "./Dock";

afterEach(cleanup);

describe("Dock", () => {
  it("starts off, with a real toggle and a status readers can follow", () => {
    render(<Dock />);
    expect(screen.getByRole("button", { name: "Sound" }).getAttribute("aria-pressed")).toBe("false");
    expect(screen.getAllByRole("status").map((status) => status.textContent)).toContain("Sound off until you choose");
  });
});
