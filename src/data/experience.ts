export interface Experience {
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  highlights: string[];
}

export const experience: Experience[] = [
  {
    company: "IT Himalaya",
    role: "Web Developer",
    location: "Kathmandu, Nepal",
    startDate: "Apr 2023",
    endDate: "May 2025",
    description:
      "Worked across frontend and backend development, building and maintaining web application features with React.js, JavaScript, Node.js, and Express.js.",
    highlights: [
      "Built reusable React.js components and full-stack application features from requirements and designs.",
      "Developed frontend functionality using React.js, JavaScript, and Redux.",
      "Designed and integrated APIs handling data fetching, validation, error handling, and frontend-backend communication.",
      "Developed backend routes and controllers using Node.js and Express.js.",
      "Worked with database-backed applications and backend data handling using MongoDB.",
      "Improved application responsiveness through data fetching strategies with TanStack Query and server-side rendering.",
      "Collaborated with engineers and backend teams in an Agile/Scrum environment and participated in code reviews.",
      "Took ownership of features from backend API development and data handling through frontend implementation and delivery.",
    ],
  },
  {
    company: "IT Himalaya",
    role: "Web Developer Intern",
    location: "Kathmandu, Nepal",
    startDate: "Feb 2023",
    endDate: "Apr 2023",
    description:
      "Started my professional development journey working on frontend and backend features while collaborating with developers and designers.",
    highlights: [
      "Built frontend features using React.js and JavaScript.",
      "Integrated and debugged REST APIs for dynamic data rendering.",
      "Assisted with backend development using Node.js and Express.js.",
      "Worked with database-backed application features and backend data handling.",
      "Collaborated with designers and developers and participated in early code review discussions.",
    ],
  },
];
