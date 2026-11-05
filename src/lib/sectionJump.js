// Sections that must stay an instant jump. The skip link exists for keyboard users.
const INSTANT = new Set(["main"]);

// The section a URL hash points to. Anyone can write a broken link, so a malformed one is ignored.
export const idFromHash = (hash) => {
  try {
    return decodeURIComponent(hash.slice(1)) || null;
  } catch {
    return null;
  }
};

// Returns the section id a click should animate to, or null to leave the click to the browser.
export const getJumpTarget = (event, anchor, { reduced }) => {
  if (reduced || !anchor || event.defaultPrevented) return null;
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return null;
  if (anchor.target === "_blank" || anchor.hasAttribute("download")) return null;

  const href = anchor.getAttribute("href") ?? "";
  if (!href.startsWith("#") || href.length < 2) return null;

  const id = idFromHash(href);
  if (!id || INSTANT.has(id) || !document.getElementById(id)) return null;
  return id;
};
