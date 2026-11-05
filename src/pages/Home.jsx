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
import { ScrollProgress } from "@/components/ScrollProgress";
import { PassBand } from "@/components/PassBand";
import { SliceReveal } from "@/components/SliceReveal";
import { IntroCurtain } from "@/components/IntroCurtain";
import { CursorRing } from "@/components/CursorRing";
import { idFromHash } from "@/lib/sectionJump";

export const Home = () => {
  // The browser tries to jump to a URL hash (e.g. /#projects) before React has rendered
  // the sections, so redo the jump once they exist.
  useEffect(() => {
    const id = idFromHash(window.location.hash);
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
      <IntroCurtain />
      <CursorRing />
      <ScrollProgress />
      <SectionTransition />
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <HeroSection />
        <PassBand direction="right" />
        <SliceReveal><AboutSection /></SliceReveal>
        <PassBand direction="left" />
        <SliceReveal><ExperienceSection /></SliceReveal>
        <PassBand direction="right" />
        <SliceReveal><ShipSection /></SliceReveal>
        <PassBand direction="left" />
        <SliceReveal><ProjectSection /></SliceReveal>
        <PassBand direction="right" />
        <SliceReveal><SkillsSection /></SliceReveal>
        <PassBand direction="left" />
        <SliceReveal><ContactSection /></SliceReveal>
        <SliceReveal><BookingSection /></SliceReveal>
      </main>
      <Footer />
      <Dock />
    </div>
  );
};
