import { ArrowUp } from "lucide-react";
import { profile } from "@/data/profile";

export const Footer = () => (
  <footer className="border-t border-border py-8">
    <div className="container flex flex-col items-center justify-between gap-4 text-sm text-muted sm:flex-row">
      <p>
        © {new Date().getFullYear()} {profile.name}. Built with React &amp; Tailwind CSS.
      </p>
      <a href="#hero" className="group inline-flex items-center gap-1.5 transition-colors hover:text-foreground">
        Back to top
        <ArrowUp className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
      </a>
    </div>
  </footer>
);
