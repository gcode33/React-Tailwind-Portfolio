/* global __BUILD_INFO__ */
import { ArrowUp } from "lucide-react";
import { buildStripItems } from "@/lib/buildStrip";
import { profile } from "@/data/profile";

// Values added at build time. See scripts/build-info.mjs.
const buildItems = buildStripItems(typeof __BUILD_INFO__ === "undefined" ? undefined : __BUILD_INFO__);

export const Footer = () => (
    <footer className="border-t border-border py-8">
      <div className="container flex flex-col gap-4">

        <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} {profile.name}. Built with React, Tailwind CSS and Motion.
          </p>
          <a href="#hero" className="inline-flex min-h-11 items-center gap-1.5 transition-colors hover:text-foreground">
            Back to top
            <ArrowUp aria-hidden className="h-4 w-4" />
          </a>
        </div>

        {buildItems.length > 0 && (
          <ul className="flex flex-wrap items-center gap-x-3 font-mono text-xs text-muted">
            {buildItems.map((item) => (
              <li key={item.label}>
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center underline underline-offset-4 transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </a>
                ) : (
                  item.label
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </footer>
);
