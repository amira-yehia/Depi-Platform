import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MarketplacePage.css";
import MarketplaceView from "../components/Marketplace/MarketplaceView";

/**
 * MarketplacePage = Data layer
 * - today: mock data
 * - later: replace with API call
 */

const MOCK_PROJECTS = [
  {
    id: "p1",
    title: "Full Stack Developer for SaaS Platform",
    description:
      "Looking for an experienced full stack developer to build a modern SaaS platform with React and Node.js. The project includes user authentication, dashboard, and payment integration.",
    tags: ["React", "Node.js", "PostgreSQL"],
    budgetMin: 5000,
    budgetMax: 8000,
    postedAgo: "2 hours ago",
    proposalsCount: 12,
    matchScore: 94,
  },
  {
    id: "p2",
    title: "Senior React Developer Needed",
    description:
      "We need a React expert to refactor our existing codebase and implement new features using modern best practices.",
    tags: ["React", "TypeScript", "Testing"],
    budgetMin: 4000,
    budgetMax: 7000,
    postedAgo: "5 hours ago",
    proposalsCount: 10,
    matchScore: 86,
  },
  {
    id: "p3",
    title: "E-commerce Platform Development",
    description:
      "Build a complete e-commerce solution with product catalog, shopping cart, and Stripe integration.",
    tags: ["React", "Node.js", "Stripe"],
    budgetMin: 8000,
    budgetMax: 12000,
    postedAgo: "2 days ago",
    proposalsCount: 14,
    matchScore: 92,
  },
  {
    id: "p4",
    title: "Mobile App UI/UX Design",
    description:
      "Design a modern, user-friendly mobile app interface for our fitness tracking application.",
    tags: ["Figma", "UI/UX", "Mobile Design"],
    budgetMin: 3000,
    budgetMax: 6000,
    postedAgo: "1 day ago",
    proposalsCount: 9,
    matchScore: 96,
  },
  {
    id: "p5",
    title: "AI Chatbot Integration",
    description:
      "Integrate an AI-powered chatbot into our customer service platform using OpenAI API.",
    tags: ["Python", "OpenAI", "FastAPI"],
    budgetMin: 5000,
    budgetMax: 9000,
    postedAgo: "6 hours ago",
    proposalsCount: 10,
    matchScore: 94,
  },
];

export default function MarketplacePage() {
  const navigate = useNavigate();

  // TODO: Replace with API
  const [projects] = useState(MOCK_PROJECTS);
  const [search, setSearch] = useState("");

  const filteredProjects = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return projects;

    return projects.filter((p) => {
      return (
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [projects, search]);

  const openDetails = (id) => navigate(`/projects/${id}`);

  return (
    <div className="marketplacePage">
      <MarketplaceView
        header={{
          title: "Marketplace",
          subtitle: "Discover projects that match your skills",
          searchValue: search,
          onSearchChange: setSearch,
          onFilterClick: () => console.log("Filter icon (future)"),
        }}
        projects={filteredProjects}
        onOpenProject={openDetails}
        onApply={openDetails}
      />
    </div>
  );
}