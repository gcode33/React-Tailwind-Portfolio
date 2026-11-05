// Original drawings only.

export const Ball = ({ className, fill = "var(--color-foreground)", mark = "var(--color-background)" }) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className={className}>
    <circle cx="12" cy="12" r="11" fill={fill} />
    <path d="M12 6l5 3.6-1.9 5.9H8.9L7 9.6z" fill={mark} />
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
