import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import FindProjectsView from "../components/FindProjects/FindProjectsView";

const MOCK_PROJECTS = [
  {
    id: "p1",
    title: "AI-Powered Mobile App Development",
    description:
      "Looking for an experienced React Native developer to build a fitness tracking app with AI-powered workout recommendations.",
    tags: ["React Native", "TypeScript", "AI/ML"],
    budgetMin: 5000,
    budgetMax: 8000,
    location: "Remote",
    postedAgo: "2 hours ago",
    proposalsCount: 12,
    matchScore: 95,
    category: "Mobile Development",
  },
  {
    id: "p2",
    title: "Backend API Development",
    description:
      "Build a scalable REST API using Node.js and PostgreSQL for a real-time analytics platform.",
    tags: ["Node.js", "PostgreSQL", "REST API"],
    budgetMin: 6000,
    budgetMax: 10000,
    location: "Remote",
    postedAgo: "3 hours ago",
    proposalsCount: 6,
    matchScore: 91,
    category: "Backend Development",
  },
  {
    id: "p3",
    title: "E-commerce Website Redesign",
    description:
      "Need a UI/UX designer to modernize our e-commerce platform. Must have experience with conversion optimization.",
    tags: ["Figma", "UI Design", "E-commerce"],
    budgetMin: 3000,
    budgetMax: 5000,
    location: "Remote",
    postedAgo: "5 hours ago",
    proposalsCount: 8,
    matchScore: 88,
    category: "UI/UX Design",
  },
  {
    id: "p4",
    title: "DevOps Engineer for CI/CD Setup",
    description:
      "Configure automated deployment pipeline with GitHub Actions, Docker, and AWS infrastructure.",
    tags: ["AWS", "Docker", "CI/CD"],
    budgetMin: 4000,
    budgetMax: 6000,
    location: "Remote",
    postedAgo: "4 hours ago",
    proposalsCount: 10,
    matchScore: 78,
    category: "DevOps",
  },
  {
    id: "p5",
    title: "Content Marketing Strategy",
    description:
      "Seeking a content strategist to develop a 6-month content plan for our SaaS product.",
    tags: ["Content Strategy", "SEO", "SaaS"],
    budgetMin: 2000,
    budgetMax: 3500,
    location: "Remote",
    postedAgo: "1 day ago",
    proposalsCount: 15,
    matchScore: 72,
    category: "Content Writing",
  },
  {
    id: "p6",
    title: "Video Editing for YouTube Channel",
    description:
      "Looking for a video editor to create engaging content for a tech review channel. 4-6 videos per month.",
    tags: ["Premiere Pro", "After Effects", "YouTube"],
    budgetMin: 1500,
    budgetMax: 2500,
    location: "Remote",
    postedAgo: "6 hours ago",
    proposalsCount: 22,
    matchScore: 65,
    category: "Video Production",
  },
];

const CATEGORY_OPTIONS = [
  "All Categories",
  "Mobile Development",
  "UI/UX Design",
  "Content Writing",
  "Backend Development",
  "Video Production",
  "DevOps",
];

const BUDGET_OPTIONS = [
  { label: "All Budgets", value: "all" },
  { label: "$0 - $2,500", value: "0-2500" },
  { label: "$2,500 - $5,000", value: "2500-5000" },
  { label: "$5,000 - $10,000", value: "5000-10000" },
  { label: "$10,000+", value: "10000+" },
];

function parseBudgetValue(value) {
  if (value === "all") return { min: null, max: null };
  if (value === "10000+") return { min: 10000, max: null };
  const [minStr, maxStr] = value.split("-");
  return { min: Number(minStr), max: Number(maxStr) };
}

export default function FindProjectsPage() {
  const navigate = useNavigate();

  function handleReturn() {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate("/dashboard");
  }

  // TODO: later replace MOCK_PROJECTS with API call
  const [projects] = useState(MOCK_PROJECTS);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [budget, setBudget] = useState("all");
  const [minMatch, setMinMatch] = useState(0);

  const filteredProjects = useMemo(() => {
    const q = search.trim().toLowerCase();
    const { min, max } = parseBudgetValue(budget);

    return projects.filter((p) => {
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));

      const matchesCategory =
        category === "All Categories" ? true : p.category === category;

      const matchesBudget =
        min === null && max === null
          ? true
          : max === null
          ? p.budgetMin >= min
          : p.budgetMin >= min && p.budgetMax <= max;

      const matchesMinMatch = p.matchScore >= minMatch;

      return matchesSearch && matchesCategory && matchesBudget && matchesMinMatch;
    });
  }, [projects, search, category, budget, minMatch]);

  const openDetails = (projectId) => navigate(`/projects/${projectId}`);

  return (
    <FindProjectsView
      header={{
        title: "Find Projects",
        subtitle: "AI-matched opportunities for you",
        onReturn: handleReturn,
        searchValue: search,
        onSearchChange: setSearch,
      }}
      filters={{
        category,
        categories: CATEGORY_OPTIONS,
        onCategoryChange: setCategory,
        budget,
        budgets: BUDGET_OPTIONS,
        onBudgetChange: setBudget,
        minMatch,
        onMinMatchChange: setMinMatch,
        onReset: () => {
          setSearch("");
          setCategory("All Categories");
          setBudget("all");
          setMinMatch(0);
        },
      }}
      projects={[...filteredProjects].sort((a, b) => b.matchScore - a.matchScore)}
      onOpen={openDetails}
      onApply={openDetails}
    />
  );
}