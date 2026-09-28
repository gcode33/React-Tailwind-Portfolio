import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { profile } from "@/data/profile";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [active, setActive] = useState("");
  const menuButtonRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Highlight the nav link for whichever section is in the middle of the viewport.
  // The hero is observed too so the highlight clears when scrolling back to the top.
  useEffect(() => {
    const sections = ["#hero", ...navItems.map((item) => item.href)]
      .map((href) => document.querySelector(href))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id === "hero" ? "" : `#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // While the mobile menu is open: lock page scroll, close on Escape, and close if the
  // viewport grows to desktop width (where the menu and its close button are hidden).
  useEffect(() => {
    if (!isMenuOpen) return;

    const desktop = window.matchMedia("(min-width: 768px)");
    const close = () => setIsMenuOpen(false);
    const handleKey = (event) => {
      if (event.key === "Escape") {
        close();
        menuButtonRef.current?.focus();
      }
    };
    const handleResize = (event) => event.matches && close();

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKey);
    desktop.addEventListener("change", handleResize);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKey);
      desktop.removeEventListener("change", handleResize);
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-all duration-300",
          isScrolled
            ? "border-b border-border/70 bg-background/75 py-3 backdrop-blur-lg"
            : "border-b border-transparent py-5"
        )}
      >
        <nav aria-label="Main" className="container flex items-center justify-between">
          <a href="#hero" className="font-mono text-sm font-medium tracking-tight">
            <span className="text-accent">~/</span>
            {profile.name.split(" ").slice(0, 2).join("-").toLowerCase()}
          </a>

          <div className="flex items-center gap-2">
            <ul className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={active === item.href ? "location" : undefined}
                    className={cn(
                      "relative rounded-md px-3 py-2 text-sm transition-colors duration-200 hover:text-foreground",
                      active === item.href ? "text-foreground" : "text-muted"
                    )}
                  >
                    {item.name}
                    <span
                      className={cn(
                        "absolute inset-x-3 -bottom-0.5 h-px origin-left bg-accent transition-transform duration-300",
                        active === item.href ? "scale-x-100" : "scale-x-0"
                      )}
                    />
                  </a>
                </li>
              ))}
            </ul>

            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost ml-2 hidden px-4 py-2 md:inline-flex"
            >
              Résumé
            </a>

            <ThemeToggle />

            <button
              ref={menuButtonRef}
              className="rounded-md p-2 text-foreground md:hidden"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu (outside the header so the header's backdrop-filter doesn't clip it).
          `inert` keeps the hidden menu out of the tab order and away from screen readers. */}
      <div
        id="mobile-menu"
        inert={!isMenuOpen}
        className={cn(
          "fixed inset-0 z-30 bg-background/95 pt-20 backdrop-blur-lg transition-opacity duration-300 md:hidden",
          isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <nav aria-label="Mobile">
          <ul className="container flex flex-col gap-1 pt-6">
            {navItems.map((item, i) => (
              <li
                key={item.href}
                className={cn(
                  "transition-all duration-300",
                  isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
                )}
                style={{ transitionDelay: isMenuOpen ? `${i * 40}ms` : "0ms" }}
              >
                <a
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block border-b border-border py-4 text-2xl font-medium tracking-tight"
                >
                  {item.name}
                </a>
              </li>
            ))}
            <li className="pt-6">
              <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="btn-primary w-full">
                View résumé
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};
