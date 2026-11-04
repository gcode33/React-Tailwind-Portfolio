// Original drawings only: no club crests, kits or show artwork.

export const Ball = ({ className, fill = "var(--color-foreground)", mark = "var(--color-background)" }) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className={className}>
    <circle cx="12" cy="12" r="11" fill={fill} />
    <path d="M12 6l5 3.6-1.9 5.9H8.9L7 9.6z" fill={mark} />
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

const TICK = "absolute h-[7px] w-[7px] border-foreground transition-transform duration-200 ease-out";

// Corner ticks that frame the main button on the page, and open out on hover or keyboard focus.
export const Bracketed = ({ children }) => (
  <span className="group relative inline-block p-1.5">
    <span aria-hidden="true" className={`${TICK} top-0 left-0 border-t-2 border-l-2 group-hover:-translate-x-1 group-hover:-translate-y-1 group-focus-within:-translate-x-1 group-focus-within:-translate-y-1`} />
    <span aria-hidden="true" className={`${TICK} top-0 right-0 border-t-2 border-r-2 group-hover:translate-x-1 group-hover:-translate-y-1 group-focus-within:translate-x-1 group-focus-within:-translate-y-1`} />
    <span aria-hidden="true" className={`${TICK} bottom-0 left-0 border-b-2 border-l-2 group-hover:-translate-x-1 group-hover:translate-y-1 group-focus-within:-translate-x-1 group-focus-within:translate-y-1`} />
    <span aria-hidden="true" className={`${TICK} right-0 bottom-0 border-r-2 border-b-2 group-hover:translate-x-1 group-hover:translate-y-1 group-focus-within:translate-x-1 group-focus-within:translate-y-1`} />
    {children}
  </span>
);
