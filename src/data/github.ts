export interface GitHubProject {
  title: string;
  description: string;
  technologies: string[];
  url: string;
}

export const githubProjects: GitHubProject[] = [
  {
    title: "Invoice Generator SaaS",
    description:
      "A production-oriented full-stack SaaS platform for creating, managing, generating, emailing, and publicly sharing invoices.",
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    url: "https://github.com/niksonstha/invoice-generator",
  },
  {
    title: "Expense Tracker",
    description:
      "A full-stack personal finance application for managing accounts, transactions, transfers, balances, and financial activity.",
    technologies: ["React", "TypeScript", "Express.js", "PostgreSQL"],
    url: "https://github.com/niksonstha/expense-tracker",
  },
  {
    title: "Movie Recommendation System",
    description:
      "A full-stack movie recommendation application combining React, Express, MongoDB, authentication, and recommendation-related tooling.",
    technologies: ["React", "JavaScript", "Node.js", "MongoDB"],
    url: "https://github.com/niksonstha/movie-recommendation-system",
  },
];
