export const NotFound = () => (
  <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
    <p className="font-mono text-sm text-accent">404</p>
    <h1 className="text-3xl font-semibold tracking-tight">This page doesn't exist.</h1>
    <a href="/" className="btn-primary mt-4">
      Back home
    </a>
  </div>
);
