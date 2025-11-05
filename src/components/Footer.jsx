import { Copyright, ArrowUp } from "lucide-react";

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full py-6 bg-background text-center border-t border-border mt-12">
      <div className="mb-2 flex items-center justify-center">
        <a href="#hero" className="flex items-center gap-1 text-primary hover:underline text-sm">
          <ArrowUp className="w-4 h-4" />
          <span>Back to top</span>
        </a>
      </div>
      <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
        <Copyright className="w-4 h-4" />
        <span>
          {year} George Fotabong &mdash; All rights reserved
        </span>
      </div>
    </footer>
  );
};
