import invoiceDashboard from "../assets/projects/invoice-generator-dashboard.png";
import invoiceInvoice from "../assets/projects/invoice-generator-invoice.png";
import invoiceClients from "../assets/projects/invoice-generator-clients.png";

import expenseDashboard from "../assets/projects/expense-tracker-dashboard.png";
import expenseTransactions from "../assets/projects/expense-tracker-transactions.png";
import expenseAccounts from "../assets/projects/expense-tracker-accounts.png";

export interface Project {
  slug: string;
  title: string;
  description: string;
  technologies: string[];
  featured: boolean;

  category: string;
  role: string;
  year: string;

  problem: string;
  solution: string;

  features?: string[];
  architecture?: string;
  security?: string;

  images?: string[];

  liveUrl?: string;
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    slug: "invoice-generator",
    title: "Invoice Generator SaaS",
    description:
      "Production-oriented full-stack SaaS platform for businesses to create, manage, generate, email, and publicly share invoices.",

    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "React Router",
      "Axios",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Drizzle ORM",
      "Zod",
      "JWT",
      "Stripe",
      "Resend",
      "Puppeteer",
    ],

    featured: true,

    category: "Full-Stack SaaS",
    role: "Full Stack Developer",
    year: "2025",

    problem:
      "Small businesses and freelancers often rely on spreadsheets or manual workflows to create, send, and track invoices. This makes it harder to maintain a consistent invoicing process as the number of clients and invoices grows.",

    solution:
      "I built a multi-tenant SaaS platform that provides a structured invoice workflow from creation and client management through PDF generation, email delivery, public sharing, and payment-status tracking. The application also includes secure authentication, business-scoped data protection, subscription architecture, and production deployment.",

    features: [
      "Invoice and client management",
      "Invoice status workflows with automatic overdue handling",
      "Multiple invoice templates",
      "Server-side PDF generation",
      "Invoice email delivery",
      "Public invoice links",
      "Free and Pro subscription plans",
      "Stripe subscription billing architecture",
      "Password reset and secure authentication flows",
    ],

    architecture:
      "The application is structured as a layered full-stack system. A React frontend communicates with a versioned Express REST API, while the backend separates routes, middleware, controllers, services, repositories, and database access. PostgreSQL stores users, businesses, clients, invoices, invoice items, plans, subscriptions, and authentication sessions through Drizzle ORM.",

    security:
      "Authentication uses short-lived access tokens with HTTP-only refresh-token cookies, refresh-token rotation, and server-side session revocation. Zod validates requests and environment configuration, while rate limiting, ownership checks, centralized error handling, and business-scoped data access help protect application resources.",

    images: [invoiceDashboard, invoiceInvoice, invoiceClients],

    liveUrl: "https://invoice-generator-three-rust.vercel.app",

    githubUrl: "https://github.com/niksonstha/invoice-generator",
  },

  {
    slug: "expense-tracker",
    title: "Expense Tracker",
    description:
      "A full-stack personal finance application for managing accounts, tracking income and expenses, recording transfers, and monitoring financial activity.",

    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "JWT",
      "bcrypt",
      "REST API",
    ],

    featured: true,

    category: "Full-Stack Application",
    role: "Full Stack Developer",
    year: "2025",

    problem:
      "Managing personal finances across multiple accounts can make it difficult to keep track of transactions, balances, and overall spending activity in one place.",

    solution:
      "I built a full-stack finance application that centralizes account management, income and expense tracking, transfers, balance monitoring, and financial summaries through a responsive React interface backed by a RESTful API.",

    features: [
      "User registration and login",
      "JWT-based authentication",
      "Protected application routes",
      "Account management",
      "Income and expense tracking",
      "Transfers between accounts",
      "Balance tracking",
      "Financial summaries",
      "Responsive frontend interface",
    ],

    architecture:
      "The application uses a RESTful Node.js and Express.js backend with PostgreSQL for persistent financial data. The React and TypeScript frontend communicates with the backend API to manage accounts, transactions, transfers, balances, and financial summaries.",

    security:
      "Authentication is implemented with JWT, while bcrypt is used for password hashing. Protected routes restrict authenticated functionality and help keep financial data associated with the appropriate user account.",

    images: [expenseDashboard, expenseTransactions, expenseAccounts],

    liveUrl: "https://expense-tracker-eight-nu-50.vercel.app/",

    githubUrl: "https://github.com/niksonstha/expense-tracker",
  },

  {
    slug: "movie-recommendation-system",
    title: "Movie Recommendation System",
    description:
      "A full-stack movie recommendation application combining a React frontend with an Express and MongoDB backend.",

    technologies: [
      "React",
      "JavaScript",
      "Vite",
      "Chakra UI",
      "React Router",
      "Axios",
      "React Hook Form",
      "Framer Motion",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "JWT",
      "bcrypt",
      "Natural",
      "TF-IDF",
      "ML Matrix",
    ],

    featured: true,

    category: "Full-Stack Application",
    role: "Full Stack Developer",
    year: "2024",

    problem:
      "Movie discovery can become difficult when users have to navigate large collections without recommendations tailored to the content they are interested in.",

    solution:
      "I built a full-stack movie recommendation application with a React-based interface and a Node.js/Express backend. The backend includes text-processing and recommendation-related tooling, while MongoDB provides persistent application data.",

    features: [
      "Movie recommendation functionality",
      "React-based movie browsing interface",
      "Client-side routing",
      "REST API communication",
      "User authentication",
      "Form validation",
      "Responsive UI components",
      "Animated interface interactions",
    ],

    architecture:
      "The application is split into separate frontend and backend projects. The frontend uses React with Vite, React Router, Axios, Chakra UI, and Framer Motion. The backend uses Node.js and Express.js with MongoDB through Mongoose, JWT and bcrypt for authentication, and text-processing and mathematical libraries for recommendation-related functionality.",

    security:
      "The backend includes JWT-based authentication and bcrypt-based password hashing.",

    githubUrl: "https://github.com/niksonstha/movie-recommendation-system",
  },
];
