// Original drawings only: no club crests, kits or show artwork.

export const Ball = ({ className }) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className={className}>
    <circle cx="12" cy="12" r="11" fill="var(--color-foreground)" />
    <path d="M12 6l5 3.6-1.9 5.9H8.9L7 9.6z" fill="var(--color-background)" />
  </svg>
);

export const Shirt = ({ number, className }) => (
  <svg role="img" aria-label={`Blue football shirt with the number ${number}`} viewBox="0 0 64 60" className={className}>
    <path
      d="M20 4l-16 10 6 12 7-3v33h30V23l7 3 6-12L44 4c-3 5-21 5-24 0z"
      fill="var(--color-chelsea)"
      stroke="var(--color-foreground)"
      strokeWidth="1.5"
    />
    <text x="32" y="44" textAnchor="middle" fontFamily="var(--font-display)" fontSize="24" fill="#fff">
      {number}
    </text>
  </svg>
);

export const PitchLines = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 1440 760"
    preserveAspectRatio="xMidYMid slice"
    className="pointer-events-none absolute inset-0 h-full w-full"
  >
    <g fill="none" stroke="var(--color-foreground)" strokeOpacity="0.16" strokeWidth="2">
      <line x1="720" y1="0" x2="720" y2="760" />
      <circle cx="720" cy="380" r="210" />
      <rect x="-40" y="130" width="250" height="500" />
      <rect x="1230" y="130" width="250" height="500" />
    </g>
  </svg>
);

// Corner ticks that frame the main button on the page.
export const Bracketed = ({ children }) => (
  <span className="relative inline-block p-1.5">
    <span aria-hidden="true" className="absolute top-0 left-0 h-[7px] w-[7px] border-t-2 border-l-2 border-foreground" />
    <span aria-hidden="true" className="absolute top-0 right-0 h-[7px] w-[7px] border-t-2 border-r-2 border-foreground" />
    <span aria-hidden="true" className="absolute bottom-0 left-0 h-[7px] w-[7px] border-b-2 border-l-2 border-foreground" />
    <span aria-hidden="true" className="absolute right-0 bottom-0 h-[7px] w-[7px] border-r-2 border-b-2 border-foreground" />
    {children}
  </span>
);
