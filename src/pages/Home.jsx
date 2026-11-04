import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ShipSection } from "@/components/ShipSection";
import { ProjectSection } from "@/components/ProjectSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ContactSection } from "@/components/ContactSection";
import { BookingSection } from "@/components/BookingSection";
import { Footer } from "@/components/Footer";
import { SectionTransition } from "@/components/SectionTransition";
import { Dock } from "@/components/Dock";

export const Home = () => {
  // The browser tries to jump to a URL hash (e.g. /#projects) before React has rendered
  // the sections, so redo the jump once they exist.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: "instant" });
  }, []);

  return (
    <div className="min-h-screen overflow-x-clip pb-15 print:pb-0">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-subtle focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <SectionTransition />
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ShipSection />
        <ProjectSection />
        <SkillsSection />
        <ContactSection />
        <BookingSection />
      </main>
      <Footer />
      <Dock />
    </div>
  );
};
