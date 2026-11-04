// Single source of truth for site content. Update this file when the resume changes.
import { yearsOfExperience } from "@/lib/experience";

export const profile = {
  name: "George Fotabong Jr",
  role: "Software Developer",
  location: "Toronto, ON",
  email: "fotabonggeorgejr@gmail.com",
  github: "https://github.com/gcode33",
  linkedin: "https://www.linkedin.com/in/george-fotabong-b10b92202/",
  resume: "/GeorgeFotabong_Resume.pdf",
  currently: "Lynked Inc.",
  summary:
    "Software developer with production experience across Node/TypeScript, .NET and Python microservices.",
};

export const experience = [
  {
    role: "Junior Software Developer",
    company: "Lynked Inc.",
    period: "Mar 2026 — Present",
    start: "2026-03-01",
    end: null,
    points: [
      "Deliver full-stack features end to end across a multi-service platform (Next.js, Nuxt 3, Vue, NestJS, Laravel, PostgreSQL), such as an inspection checklist that records who made each change and auto-creates follow-up items, and bulk-edit tools.",
      "Debug and fix React, Next.js and Vue defects: pages crashing to a white screen (error boundaries, null-safe lookups), deep links that opened the wrong item, stale form state, and mobile layout on iOS and Android.",
      "Write automated tests for new and legacy code: the first PHPUnit unit tests for an untested legacy module (run in Docker), Vitest unit and component tests, Playwright end-to-end tests, and mutation testing to expose weak tests.",
      "Collaborate in an Agile team through Jira and Bitbucket pull requests, address senior code review feedback, and document technical debt to support code quality and future planning.",
      "Apply AI-assisted development (Claude Code, Atlassian Rovo) in a spec-first, test-driven workflow, verifying AI output by running it; built personal Claude Code review agents and hooks, plus a scheduled job that turns PR comments into fix briefs.",
    ],
    // Real fixes from maintaining two legacy PHP/Laravel applications, shown as a diff.
    fixes: [
      { before: "endpoints reported success on failure", after: "accurate 4xx/5xx errors, and database transactions roll back" },
      { before: "SQL injection", after: "prepared statements" },
      { before: "API-key auth accepted revoked keys", after: "revoked keys fixed" },
      { before: "log and HTML-email injection", after: "fixed" },
      { before: "weak data integrity", after: "duplicate-record checks, Zod schemas and strict input-format rules" },
    ],
    tech: ["TypeScript", "React", "Next.js", "Nuxt 3", "Vue 3", "NestJS", "PHP/Laravel", "PostgreSQL", "PHPUnit", "Vitest", "Playwright", "Docker", "Sentry"],
  },
  {
    role: "Software Developer Intern",
    company: "Continuum Commerce Solutions",
    period: "Nov 2024 — Sep 2025",
    start: "2024-11-01",
    end: "2025-09-30",
    points: [
      "Designed and deployed a full-stack .NET and SQL Server platform for managing client configuration.",
      "Built API fuzz-testing pipelines that surfaced edge-case failures and security defects before release.",
      "Refactored legacy code and made SonarQube a blocking code quality gate in GitLab CI/CD.",
    ],
    tech: [".NET", "C#", "SQL Server", "Python", "Docker", "AWS", "Terraform", "Ansible", "GitLab CI/CD", "SonarQube", "Power BI"],
  },
  {
    role: "Software Developer Intern",
    company: "Rocket Financial",
    period: "Oct 2022 — Sep 2024",
    start: "2022-10-01",
    end: "2024-09-30",
    points: [
      "Built responsive, accessible front-end interfaces in React and TypeScript, improving usability for users with different access needs.",
      "Developed microservices and containerized them with Docker and Kubernetes to streamline deployments.",
      "Expanded automated test suites with NUnit, Jest, and pytest across services and UI components, improving test coverage and helping catch regressions earlier.",
    ],
    tech: ["React", "TypeScript", "Docker", "Kubernetes", "NUnit", "Jest", "pytest"],
  },
];

// The workflow built up across roles. Not every stage comes from one employer.
export const shipStages = [
  { name: "Spec", detail: "Write down the behaviour first, tracked in Jira." },
  { name: "Failing test", detail: "PHPUnit, Vitest and Playwright, with mutation testing to expose weak tests." },
  { name: "Code", detail: "TypeScript, PHP and C#, with Claude Code. Output gets verified by running it." },
  { name: "Review", detail: "Pull requests, senior feedback and custom Claude Code review agents." },
  { name: "Gate", detail: "SonarQube as a blocking quality gate in GitLab CI/CD." },
  { name: "Monitor", detail: "Production errors tracked in Sentry." },
];

// Side A is 2026, Side B is 2025.
export const projects = [
  {
    side: "A1",
    title: "LevelUp",
    year: "2026",
    description:
      "A career-growth app that helps users set goals and track their progress through a personalised skills plan. Per-user data is isolated with PostgreSQL Row Level Security, and API keys stay server-side.",
    tags: ["Next.js", "TypeScript", "Supabase", "PostgreSQL"],
    github: "https://github.com/gcode33/levelup",
  },
  {
    side: "A2",
    title: "GitHub Dashboard",
    year: "2026",
    description:
      "Consolidates open pull requests, issues and CI status into one triage view, with GitHub OAuth, httpOnly sessions and a rate-limit-aware cache.",
    tags: ["React", "TypeScript", "Express", "Prisma"],
    github: "https://github.com/gcode33/github-dashboard",
  },
  {
    side: "B1",
    title: "MultiSportTracker",
    year: "2025",
    description:
      "Tracks teams, players and fixtures across sports, with a SignalR hub pushing live score updates to connected clients.",
    tags: ["C#", "Blazor Server", "SignalR"],
    github: "https://github.com/gcode33/MultiSportTracker",
  },
  {
    side: "B2",
    title: "Toronto Event Finder",
    year: "2025",
    description:
      "Geocodes an address via OpenStreetMap Nominatim and filters live open-data events by distance, category, cost and date.",
    tags: ["FastAPI", "React", "Docker"],
    github: "https://github.com/gcode33/Toronto-Event-finder",
  },
];

export const skills = [
  { id: "frontend", group: "Frontend", items: ["React", "Next.js", "Vue 3", "Nuxt 3", "Tailwind CSS", "Mantine", "Vite", "Responsive and accessible UI"] },
  { id: "backend", group: "Backend", items: ["Node.js", "NestJS", "Express", "Laravel", ".NET", "ASP.NET Core", "Blazor", "FastAPI", "REST APIs", "RabbitMQ", "Microservices", "Software Architecture"] },
  { id: "data", group: "Data", items: ["PostgreSQL", "SQL Server", "MongoDB", "Prisma", "Supabase", "SQLAlchemy", "Pandas", "NumPy", "Power BI"] },
  { id: "testing", group: "Testing & Tools", items: ["PHPUnit", "Vitest", "Jest", "Playwright", "PyTest", "NUnit", "Testing Library", "Mutation testing", "SonarQube", "Git", "Bitbucket", "GitLab CI/CD", "Docker", "Docker Compose", "Linux", "Sentry", "Jira", "Agile/Scrum", "AWS"] },
  { id: "ai", group: "AI & Tooling", items: ["Claude Code (custom agents, skills, hooks)", "Model Context Protocol", "Agentic workflows", "Prompt engineering", "LLM APIs (OpenAI-compatible, Ollama)", "Hugging Face Transformers", "PyTorch"] },
  { id: "languages", group: "Languages", items: ["TypeScript", "JavaScript", "PHP", "Python", "C#", "Java", "SQL", "Bash", "HTML", "CSS"] },
];

export const education = {
  degree: "BSc Computer Science",
  school: "Wilfrid Laurier University & Munster Technological University",
  period: "2020 — 2025",
};

export const personal = {
  club: "Chelsea",
  position: "Striker",
  // One for each year of experience, worked out from the job dates above.
  number: yearsOfExperience(experience),
  songs: [
    { title: "Breeze", artist: "Jiro Inagaki and His Soul Media", href: "https://music.apple.com/ca/album/breeze/1508946500?i=1508946503" },
    { title: "L'amore dice Ciao", artist: "Armando Trovajoli", href: "https://music.apple.com/ca/album/lamore-dice-ciao-main-titles-2022-remastered/882321839?i=882321840" },
    { title: "Sylvia", artist: "Arthur Verocai", href: "https://music.apple.com/ca/album/sylvia/495578530?i=495578535" },
    { title: "I Choose You", artist: "Chicago Gangsters", href: "https://music.apple.com/ca/album/i-choose-you/1376664672?i=1376665099" },
    { title: "Earth, Wind & Fire", artist: "Earth, Wind & Fire", href: "https://music.apple.com/ca/album/earth-wind-fire/523227111?i=523227120" },
  ],
  rewatching: "Hunter x Hunter. Feitan first, then Gon, Killua, Kurapika and Leorio.",
};

// Inspect mode: how each section is built. Keep these true when the code changes.
export const inspectNotes = {
  hero: "this headline is real text, split into letters with Motion. No canvas, so screen readers and résumé bots can read it.",
  about: "Apple's player only loads once you pick a song, so nothing is requested from Apple until then.",
  experience: "the ball rolls along this line as you scroll, driven by Motion's useScroll. Newest role stays first, the way recruiters read a résumé.",
  process: "each stage lights up in turn as you scroll, like a CI run passing. With reduced motion on, all six are simply lit.",
  projects: "each row is one real link, so keyboard focus gets the same shift and underline as a mouse.",
  skills: 'no skill percentages here on purpose. A bar reading "React 90%" claims something I can\'t measure.',
  contact: "the net is a canvas that only draws while a shot is in the air, so an idle net costs nothing.",
};

// The one Hunter x Hunter wink, shown last while Inspect is on.
export const gyoNote = "focus your aura and the hidden writing shows. Feitan would have found this faster.";
