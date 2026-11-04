import { afterEach, describe, expect, it } from "vitest";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { SongList } from "./SongList";
import { sound } from "@/lib/sound";

const songs = [
  { title: "Breeze", artist: "Jiro Inagaki", href: "https://music.apple.com/ca/album/breeze/1?i=2" },
  { title: "Sylvia", artist: "Arthur Verocai", href: "https://music.apple.com/ca/album/sylvia/3?i=4" },
];

afterEach(() => {
  cleanup();
  act(() => sound.closeExternalPlayer());
});

const play = (title) => screen.getByRole("button", { name: new RegExp(`^Play ${title}`) });

describe("SongList", () => {
  it("requests nothing from Apple until a song is chosen", () => {
    const { container } = render(<SongList songs={songs} />);
    expect(container.querySelector("iframe")).toBeNull();
  });

  it("keeps a plain link to every song", () => {
    render(<SongList songs={songs} />);
    expect(screen.getByRole("link", { name: "Open Breeze, Jiro Inagaki in Apple Music" })).toHaveProperty(
      "href",
      songs[0].href
    );
  });

  it("loads Apple's player for the chosen song", () => {
    render(<SongList songs={songs} />);
    fireEvent.click(play("Breeze"));

    const player = screen.getByTitle("Apple Music player: Breeze, Jiro Inagaki");
    expect(player.getAttribute("src")).toBe("https://embed.music.apple.com/ca/album/breeze/1?i=2");
    expect(screen.getByRole("button", { name: /^Close player, Breeze/ }).getAttribute("aria-expanded")).toBe("true");
  });

  it("shows one player at a time", () => {
    const { container } = render(<SongList songs={songs} />);
    fireEvent.click(play("Breeze"));
    fireEvent.click(play("Sylvia"));

    const players = container.querySelectorAll("iframe");
    expect(players).toHaveLength(1);
    expect(players[0].title).toContain("Sylvia");
  });

  it("closes again on a second press", () => {
    const { container } = render(<SongList songs={songs} />);
    fireEvent.click(play("Breeze"));
    fireEvent.click(screen.getByRole("button", { name: /^Close player, Breeze/ }));
    expect(container.querySelector("iframe")).toBeNull();
  });
});
