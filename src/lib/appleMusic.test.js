import { describe, expect, it } from "vitest";
import { embedUrl } from "./appleMusic";

describe("embedUrl", () => {
  it("points at Apple's player and keeps the album path and track", () => {
    expect(embedUrl("https://music.apple.com/ca/album/sylvia/495578530?i=495578535")).toBe(
      "https://embed.music.apple.com/ca/album/sylvia/495578530?i=495578535"
    );
  });
});
