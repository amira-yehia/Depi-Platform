import { useMemo } from "react";
import { useParams } from "react-router-dom";
import "./ProjectDetailsPage.css";
import ProjectDetailsView from "../components/ProjectDetails/ProjectDetailsView";

const MOCK_PROJECTS = [
  {
    id: "p1",
    category: "Full-Stack Development",
    postedAgo: "Posted 2 days ago",
    applicants: 14,

    title: "Build a Modern E-Commerce Platform",
    location: "Remote",
    duration: "2–3 months",
    budgetText: "$8,000 – $12,000 USD",

    match: {
      score: 92,
      stars: 4,
      bars: [
        { label: "Technical Skills", value: 96 },
        { label: "Experience Level", value: 90 },
        { label: "Availability", value: 88 },
      ],
    },

    description:
      "We’re looking for an experienced full-stack developer to build a comprehensive e-commerce platform with a React frontend and Node.js backend. The platform should include user authentication, product catalog, shopping cart, payment integration with Stripe, and an admin dashboard. Design should be modern, responsive, and optimised for performance.",

    responsibilities: [
      "Architect and develop a scalable React + Node.js application",
      "Integrate Stripe or similar payment gateway securely",
      "Build a responsive, mobile-first UI/UX",
      "Set up PostgreSQL database schema and REST APIs",
      "Deliver clean, documented, and tested code",
    ],

    skills: [
      "React",
      "Node.js",
      "TypeScript",
      "PostgreSQL",
      "Stripe API",
      "REST API",
      "Responsive Design",
      "Docker",
    ],

    glance: {
      budgetShort: "$8k–$12k",
      duration: "2–3 months",
      location: "Remote",
      applicantsText: "14 so far",
    },

    client: {
      initials: "TV",
      name: "TechVentures Inc.",
      memberSince: "Member since 2019",
      rating: 4.8,
      reviews: 31,
      projectsPosted: 47,
      hireRate: "89%",
    },
  },
];

export default function ProjectDetailsPage() {
  const { projectId } = useParams();

  const project = useMemo(() => {
    return MOCK_PROJECTS.find((p) => p.id === projectId) || MOCK_PROJECTS[0];
  }, [projectId]);

  return (
    <div className="projectDetailsPage">
      <ProjectDetailsView
        project={project}
        onApply={() => console.log("Apply:", project.id)}
        onSave={() => console.log("Save:", project.id)}
      />
    </div>
  );
}