import { useEffect } from "react";

export const NotFound = () => {
  useEffect(() => {
    const previous = document.title;
    document.title = "Page not found — George Fotabong Jr";
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="display text-5xl">Page not found.</h1>
      <p className="text-soft">This page doesn't exist.</p>
      <a href="/" className="btn-primary mt-4">
        Back home
      </a>
    </main>
  );
};
