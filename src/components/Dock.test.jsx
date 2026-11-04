import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { Dock } from "./Dock";

afterEach(cleanup);

describe("Dock", () => {
  it("starts off, with a real toggle and a status readers can follow", () => {
    render(<Dock />);
    expect(screen.getByRole("button", { name: "Sound" }).getAttribute("aria-pressed")).toBe("false");
    expect(screen.getByRole("status").textContent).toBe("Off until you choose");
  });

  it("doesn't credit a track nobody is hearing", () => {
    render(<Dock />);
    expect(screen.queryByRole("link", { name: /ArtManzh/ })).toBeNull();
  });
});
