export interface SkillGroup {
  title: string;
  description: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    description:
      "Building responsive interfaces and interactive web experiences with modern React tooling.",
    skills: [
      "React",
      "JavaScript",
      "TypeScript",
      "Next.js",
      "Redux",
      "TanStack Query",
      "React Router",
      "Tailwind CSS",
      "HTML5",
      "CSS3",
      "SCSS",
    ],
  },
  {
    title: "Backend",
    description:
      "Building APIs, authentication flows, business logic, and full-stack application features.",
    skills: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "JWT",
      "Zod",
      "Drizzle ORM",
      "Mongoose",
    ],
  },
  {
    title: "Database",
    description:
      "Working with relational and document databases, data modelling, and database-backed application workflows.",
    skills: ["PostgreSQL", "MongoDB", "Data Modelling", "Transactions"],
  },
  {
    title: "Tools & Practices",
    description:
      "Development tools and engineering practices used to build, test, secure, and maintain applications.",
    skills: [
      "Git",
      "GitHub",
      "Vitest",
      "npm",
      "Vite",
      "API Integration",
      "Authentication",
      "Authorization",
      "Error Handling",
      "Input Validation",
      "CI Workflows",
      "Code Review",
    ],
  },
];
