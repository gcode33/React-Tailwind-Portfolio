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
