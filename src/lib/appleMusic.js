// Apple's embed player lives at the same path as the public page, on a different host.
export const embedUrl = (href) => {
  const url = new URL(href);
  url.hostname = "embed.music.apple.com";
  return url.href;
};
