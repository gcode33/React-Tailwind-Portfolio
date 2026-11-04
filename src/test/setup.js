// jsdom has no IntersectionObserver. Tests that need one to fire provide their own.
class StillObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

globalThis.IntersectionObserver ??= StillObserver;
