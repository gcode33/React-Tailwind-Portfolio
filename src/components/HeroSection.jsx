import { ArrowRight, Download, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { profile } from "@/data/profile";

const socials = [
  { label: "GitHub", href: profile.github, icon: Github },
  { label: "LinkedIn", href: profile.linkedin, icon: Linkedin },
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
];

// Staggered entrance: each block gets a slightly later animation-delay.
const enter = (step) => ({
  className: "animate-fade-up",
  style: { animationDelay: `${step * 90}ms` },
});

export const HeroSection = () => (
  <section id="hero" className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-16">
    {/* Background: dot grid + soft accent glow */}
    <div aria-hidden className="bg-dots pointer-events-none absolute inset-0" />
    <div
      aria-hidden
      className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full blur-3xl"
      style={{ background: "radial-gradient(closest-side, var(--glow), transparent)" }}
    />

    <div className="container relative grid items-center gap-14 lg:grid-cols-[1.25fr_1fr]">
      <div>
        <div {...enter(0)}>
          <span className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card/70 px-3 py-1.5 text-xs text-muted backdrop-blur">
            <span className="h-2 w-2 animate-pulse-dot rounded-full bg-emerald-400" />
            Currently building at <span className="font-medium text-foreground">{profile.currently}</span>
          </span>
        </div>

        <h1
          className={`${enter(1).className} mt-6 text-5xl font-semibold tracking-tight sm:text-6xl xl:text-7xl`}
          style={enter(1).style}
        >
          George{" "}
          <span className="whitespace-nowrap">
            Fotabong <span className="text-muted">Jr.</span>
          </span>
        </h1>

        <p
          className={`${enter(2).className} mt-4 text-2xl font-medium tracking-tight sm:text-3xl text-gradient`}
          style={enter(2).style}
        >
          {profile.role}
        </p>

        <p className={`${enter(3).className} mt-6 max-w-xl text-lg leading-relaxed text-muted`} style={enter(3).style}>
          I build reliable backend services and clean, accessible front ends — with production
          experience across Node/TypeScript, .NET and Python microservices.
        </p>

        <div className={`${enter(4).className} mt-8 flex flex-wrap items-center gap-3`} style={enter(4).style}>
          <a href="#projects" className="btn-primary group">
            View my work
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
          <a href={profile.resume} download className="btn-ghost">
            <Download className="h-4 w-4" />
            Download résumé
          </a>
        </div>

        <div className={`${enter(5).className} mt-10 flex items-center gap-5 text-muted`} style={enter(5).style}>
          {socials.map(({ label, href, icon }) => {
              const Icon = icon;
              return (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              className="transition-all duration-200 hover:-translate-y-0.5 hover:text-foreground"
            >
              <Icon className="h-5 w-5" />
            </a>
            );
          })}
          <span className="h-4 w-px bg-border" />
          <span className="inline-flex items-center gap-1.5 text-sm">
            <MapPin className="h-4 w-4" />
            {profile.location}
          </span>
        </div>
      </div>

      {/* Code card */}
      <div className={`${enter(4).className} hidden lg:block`} style={enter(4).style}>
        <div className="card overflow-hidden shadow-[0_30px_80px_-30px_var(--glow)]">
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-zinc-500/30" />
            <span className="h-3 w-3 rounded-full bg-zinc-500/30" />
            <span className="h-3 w-3 rounded-full bg-zinc-500/30" />
            <span className="ml-3 font-mono text-xs text-muted">george.ts</span>
          </div>
          <pre className="overflow-x-auto p-6 font-mono text-[13px] leading-7">
            <code>
              <span className="text-accent">const</span> <span>george</span> = {"{"}
              {"\n"}  role: <span className="text-emerald-500">"Software Developer"</span>,
              {"\n"}  location: <span className="text-emerald-500">"London, ON"</span>,
              {"\n"}  currently: <span className="text-emerald-500">"Lynked Inc."</span>,
              {"\n"}  stack: [
              {"\n"}    <span className="text-emerald-500">"TypeScript"</span>, <span className="text-emerald-500">".NET"</span>, <span className="text-emerald-500">"Python"</span>,
              {"\n"}  ],
              {"\n"}  openTo: <span className="text-emerald-500">"interesting problems"</span>,
              {"\n"}{"}"};<span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-accent" />
            </code>
          </pre>
        </div>
      </div>
    </div>
  </section>
);
