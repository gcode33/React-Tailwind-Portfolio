import { useState } from "react";

// Skills data
const skills = [
  { name: "Python", level: 90, category: "backend" },
  { name: "Java", level: 85, category: "backend" },
  { name: "C#", level: 95, category: "backend" },
  { name: "JavaScript", level: 80, category: "frontend" },
  { name: "PHP", level: 70, category: "backend" },
  { name: "C", level: 70, category: "backend" },
  { name: "HTML/CSS", level: 85, category: "frontend" },
  { name: "Node.js", level: 90, category: "backend" },
  { name: "React.js", level: 75, category: "frontend" },
  { name: "Angular", level: 70, category: "frontend" },
  { name: "Vue.js", level: 65, category: "frontend" },
  { name: ".NET ", level: 85, category: "backend" },
  { name: "Docker", level: 75, category: "tools" },
  { name: "AWS", level: 70, category: "cloud" },
  { name: "GitLab", level: 90, category: "tools" },
  { name: "GitHub", level: 90, category: "tools" },
  { name: "Tailwind", level: 80, category: "frontend" },
  { name: "R", level: 75, category: "data" },
  { name: "Pandas", level: 85, category: "data" },
  { name: "NumPy", level: 85, category: "data" },
  { name: "Matplotlib", level: 80, category: "data" },
  { name: "Scikit-learn", level: 80, category: "machine-learning" },
  { name: "PyTorch", level: 70, category: "machine-learning" },
  { name: "TensorFlow", level: 70, category: "machine-learning" },
  { name: "SQL", level: 85, category: "database" },
  { name: "PostgreSQL", level: 80, category: "database" },
  { name: "MongoDB", level: 75, category: "database" },
  { name: "Postgres", level: 80, category: "database" },
];

// Map categories to colors
const categoryColors = {
  backend: "bg-blue-500",
  frontend: "bg-green-500",
  database: "bg-yellow-500",
  "machine-learning": "bg-pink-500",
  data: "bg-indigo-500",
  cloud: "bg-red-500",
  systems: "bg-gray-500",
  fullstack: "bg-teal-500",
};

export const SkillsSection = () => {
  const categories = ["all", ...new Set(skills.map((skill) => skill.category))];
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredSkills =
    selectedCategory === "all"
      ? skills
      : skills.filter((skill) => skill.category === selectedCategory);

  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          My <span className="text-primary">Skills</span>
        </h2>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat, idx) => {
            const color = categoryColors[cat] || "bg-primary";
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={idx}
                className={`px-4 py-2 rounded-full font-medium transition-colors duration-300 ${
                  isSelected
                    ? `${color} text-white`
                    : "bg-muted/30 text-foreground hover:bg-primary/50"
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat === "all" ? "All" : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, key) => {
            const barColor = categoryColors[skill.category] || "bg-primary";
            return (
              <div
                key={key}
                className="bg-card p-6 rounded-lg shadow-xs card-hover flex flex-col items-center justify-center"
              >
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {skill.name}
                </h3>

                {/* Category label */}
                <p className="text-sm text-muted-foreground mb-1 capitalize">
                  {skill.category}
                </p>

                {/* Progress bar */}
                <div className="w-full bg-muted/30 rounded-full h-4 relative">
                  <div
                    className={`${barColor} h-4 rounded-full transition-all duration-500`}
                    style={{ width: `${skill.level}%` }}
                  ></div>
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm font-medium text-foreground">
                    {skill.level}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
