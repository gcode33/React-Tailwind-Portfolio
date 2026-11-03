// Single source of truth for site content. Update this file when the resume changes.

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
    points: [
      "Deliver full-stack features end to end across a multi-service platform (Next.js, Nuxt 3, Vue, NestJS, Laravel, PostgreSQL), such as an inspection checklist that records who made each change and auto-creates follow-up items, and bulk-edit tools.",
      "Maintain two legacy PHP/Laravel applications, fixing REST endpoints that reported success on failure so they return accurate 4xx/5xx errors and roll back database transactions.",
      "Harden data integrity and security with duplicate-record checks, Zod schemas and strict input-format rules, and fix SQL injection (prepared statements), API-key auth that accepted revoked keys, and log/HTML-email injection.",
      "Debug and fix React, Next.js and Vue defects: pages crashing to a white screen (error boundaries, null-safe lookups), deep links that opened the wrong item, stale form state, and mobile layout on iOS and Android.",
      "Write automated tests for new and legacy code: the first PHPUnit unit tests for an untested legacy module (run in Docker), Vitest unit and component tests, Playwright end-to-end tests, and mutation testing to expose weak tests.",
      "Collaborate in an Agile team through Jira and Bitbucket pull requests, address senior code review feedback, and document technical debt to support code quality and future planning.",
      "Apply AI-assisted development (Claude Code, Atlassian Rovo) in a spec-first, test-driven workflow, verifying AI output by running it; built personal Claude Code review agents and hooks, plus a scheduled job that turns PR comments into fix briefs.",
    ],
    tech: ["TypeScript", "React", "Next.js", "Nuxt 3", "Vue 3", "NestJS", "PHP/Laravel", "PostgreSQL", "PHPUnit", "Vitest", "Playwright", "Docker", "Sentry"],
  },
  {
    role: "Software Developer Intern",
    company: "Continuum Commerce Solutions",
    period: "Nov 2024 — Sep 2025",
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
    points: [
      "Built responsive, accessible front-end interfaces in React and TypeScript, improving usability for users with different access needs.",
      "Developed microservices and containerized them with Docker and Kubernetes to streamline deployments.",
      "Expanded automated test suites with NUnit, Jest, and pytest across services and UI components, improving test coverage and helping catch regressions earlier.",
    ],
    tech: ["React", "TypeScript", "Docker", "Kubernetes", "NUnit", "Jest", "pytest"],
  },
];

export const projects = [
  {
    title: "LevelUp",
    year: "2026",
    description:
      "A career-growth app that helps users set goals and track their progress through a personalised skills plan. Per-user data is isolated with PostgreSQL Row Level Security, and API keys stay server-side.",
    tags: ["Next.js", "TypeScript", "Supabase", "PostgreSQL"],
    github: "https://github.com/gcode33/levelup",
    icon: "rocket",
  },
  {
    title: "GitHub Dashboard",
    year: "2026",
    description:
      "Consolidates open pull requests, issues and CI status into one triage view, with GitHub OAuth, httpOnly sessions and a rate-limit-aware cache.",
    tags: ["React", "TypeScript", "Express", "Prisma"],
    github: "https://github.com/gcode33/github-dashboard",
    icon: "git",
  },
  {
    title: "MultiSportTracker",
    year: "2025",
    description:
      "Tracks teams, players and fixtures across sports, with a SignalR hub pushing live score updates to connected clients.",
    tags: ["C#", "Blazor Server", "SignalR"],
    github: "https://github.com/gcode33/MultiSportTracker",
    image: "/projects/multisport-tracker.jpg",
  },
  {
    title: "Toronto Event Finder",
    year: "2025",
    description:
      "Geocodes an address via OpenStreetMap Nominatim and filters live open-data events by distance, category, cost and date.",
    tags: ["FastAPI", "React", "Docker"],
    github: "https://github.com/gcode33/Toronto-Event-finder",
    image: "/projects/toronto-event-finder.jpg",
  },
];

export const skills = [
  { group: "Languages", items: ["TypeScript", "JavaScript", "PHP", "Python", "C#", "Java", "SQL", "Bash", "HTML", "CSS"] },
  { group: "Frontend", items: ["React", "Next.js", "Vue 3", "Nuxt 3", "Tailwind CSS", "Mantine", "Vite", "Responsive and accessible UI"] },
  { group: "Backend", items: ["Node.js", "NestJS", "Express", "Laravel", ".NET", "ASP.NET Core", "Blazor", "FastAPI", "REST APIs", "RabbitMQ", "Microservices", "Software Architecture"] },
  { group: "Data", items: ["PostgreSQL", "SQL Server", "MongoDB", "Prisma", "Supabase", "SQLAlchemy", "Pandas", "NumPy", "Power BI"] },
  { group: "AI & Tooling", items: ["Claude Code (custom agents, skills, hooks)", "Model Context Protocol", "Agentic workflows", "Prompt engineering", "LLM APIs (OpenAI-compatible, Ollama)", "Hugging Face Transformers", "PyTorch"] },
  { group: "Testing & Tools", items: ["PHPUnit", "Vitest", "Jest", "Playwright", "PyTest", "NUnit", "Testing Library", "Mutation testing", "SonarQube", "Git", "Bitbucket", "GitLab CI/CD", "Docker", "Docker Compose", "Linux", "Sentry", "Jira", "Agile/Scrum", "AWS"] },
];

export const education = {
  degree: "BSc Computer Science",
  school: "Wilfrid Laurier University & Munster Technological University",
  period: "2020 — 2025",
};
