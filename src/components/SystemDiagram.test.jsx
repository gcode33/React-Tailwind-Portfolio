import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { SystemDiagram } from "./SystemDiagram";

const button = (name) => screen.getByRole("button", { name: new RegExp(`^${name}`) });

afterEach(cleanup);

describe("SystemDiagram", () => {
  it("offers every part of the stack as a real button", () => {
    render(<SystemDiagram />);
    for (const name of ["Frontend", "Backend", "Data", "Testing & Tools", "AI & Tooling", "Languages"]) {
      expect(button(name).tagName).toBe("BUTTON");
    }
  });

  it("starts on Backend and marks it as selected", () => {
    render(<SystemDiagram />);
    expect(button("Backend").getAttribute("aria-pressed")).toBe("true");
    expect(button("Frontend").getAttribute("aria-pressed")).toBe("false");
    expect(screen.getByRole("heading", { name: "Backend" })).toBeTruthy();
  });

  it("shows the selected part's full tool list when another part is chosen", () => {
    render(<SystemDiagram />);
    fireEvent.click(button("AI & Tooling"));
    expect(button("AI & Tooling").getAttribute("aria-pressed")).toBe("true");
    expect(button("Backend").getAttribute("aria-pressed")).toBe("false");
    const items = screen.getAllByRole("listitem").map((li) => li.textContent);
    expect(items).toContain("Claude Code (custom agents, skills, hooks)");
    expect(items).not.toContain("RabbitMQ");
  });
});
