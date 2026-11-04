import { ArrowUp } from "lucide-react";
import { profile } from "@/data/profile";

export const Footer = () => (
  <footer className="border-t border-border py-8">
    <div className="container flex flex-col items-center justify-between gap-4 text-sm text-muted sm:flex-row">
      <p>
        © {new Date().getFullYear()} {profile.name}. Built with React, Tailwind CSS and Motion.
      </p>
      <a href="#hero" className="inline-flex min-h-11 items-center gap-1.5 transition-colors hover:text-foreground">
        Back to top
        <ArrowUp aria-hidden className="h-4 w-4" />
      </a>
    </div>
  </footer>
);
