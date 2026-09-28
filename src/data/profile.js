// Single source of truth for site content. Update this file when the resume changes.

export const profile = {
  name: "George Fotabong Jr",
  role: "Software Developer",
  location: "London, ON",
  email: "fotabonggeorgejr@gmail.com",
  phone: "+1 (289) 937-0842",
  phoneHref: "tel:+12899370842",
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
      "Eliminated duplicate-record creation across three backend services with multi-field validation, and fixed update paths that persisted empty strings instead of NULL.",
      "Corrected REST endpoints that returned HTTP 200 for missing resources, adding 404/400 responses with regression tests.",
      "Improved search relevance by replacing exact-match lookup with fuzzy matching for partial and misspelled queries.",
      "Built cross-service features: bulk record updates, multi-criteria search with automatic status transitions, and new fields made editable across three front ends.",
      "Diagnosed and fixed production defects, including a page-crashing render bug, truncated stored notes, stale form state, and broken pagination on iOS and Android.",
      "Maintain two legacy PHP/Laravel applications with minimal, defensive changes.",
    ],
    tech: ["NestJS", "Next.js", "Nuxt 3", "Node.js", "PHP/Laravel", "Go", "PostgreSQL", "Redis", "Docker Compose", "Caddy", "Jira"],
  },
  {
    role: "Software Developer Intern",
    company: "Continuum Commerce Solutions",
    period: "Nov 2024 — Sept 2025",
    points: [
      "Designed and deployed a full-stack .NET and SQL Server platform for managing client configuration.",
      "Built automated API fuzz-testing pipelines that surfaced edge-case failures and security defects before release.",
      "Integrated SonarQube into GitLab CI/CD, turning code-quality regressions into a blocking gate.",
    ],
    tech: [".NET", "C#", "SQL Server", "Python", "Docker", "AWS", "Terraform", "Ansible", "GitLab CI/CD", "SonarQube", "Power BI"],
  },
  {
    role: "Software Developer Intern",
    company: "Rocket Financial",
    period: "Oct 2022 — Sept 2024",
    points: [
      "Built responsive, accessible React and TypeScript interfaces, and containerized microservices with Docker and Kubernetes.",
      "Expanded automated test coverage with NUnit, Jest and PyTest across services and UI components.",
    ],
    tech: ["React", "TypeScript", "Docker", "Kubernetes", "NUnit", "Jest", "PyTest"],
  },
];

export const projects = [
  {
    title: "LevelUp",
    year: "2026",
    description:
      "Turns an uploaded resume into an LLM-generated career roadmap. Per-user data is isolated with PostgreSQL Row Level Security, and model keys stay server-side.",
    tags: ["Next.js", "TypeScript", "Supabase", "LLM APIs"],
    github: "https://github.com/gcode33/levelup",
    icon: "rocket",
  },
  {
    title: "Market Sentiment Analyzer",
    year: "2026",
    description:
      "Ingests market data and news from three APIs, scores sentiment with transformer models, and aggregates results into sector-level trend dashboards.",
    tags: ["Python", "PyTorch", "Transformers", "Pandas"],
    github: "https://github.com/gcode33/market-intel",
    icon: "chart",
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
  { group: "Languages", items: ["TypeScript", "JavaScript", "Python", "C#", "Java", "PHP", "SQL", "Bash"] },
  { group: "Backend", items: [".NET", "ASP.NET Core", "Blazor", "SignalR", "NestJS", "Node.js", "FastAPI", "Laravel", "REST APIs", "Microservices"] },
  { group: "Frontend", items: ["React", "Next.js", "Nuxt 3", "Vite", "Tailwind CSS", "Accessible UI"] },
  { group: "Data & ML", items: ["PostgreSQL", "SQL Server", "MongoDB", "Redis", "Prisma", "Supabase", "ETL", "Pandas", "NumPy", "Scikit-learn", "XGBoost", "PyTorch", "Transformers", "LLM APIs", "Power BI"] },
  { group: "Testing", items: ["Vitest", "Jest", "PyTest", "NUnit", "Playwright", "SonarQube", "Code review"] },
  { group: "Tools", items: ["Git", "Docker", "Docker Compose", "Bitbucket Pipelines", "GitLab CI/CD", "Jira", "Agile/Scrum"] },
];

export const education = {
  degree: "BSc Computer Science",
  school: "Wilfrid Laurier University & Munster Technological University",
  period: "2020 — 2025",
};
