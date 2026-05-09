import ContractCard from "../components/ContractCard";
import JobMatchCard from "../components/JobMatchCard";
import StatsCard from "../components/StatsCard";
import { useLocation } from "react-router-dom";

import "./DashboardPage.css";

const statsData = [
  {
    id: 1,
    title: "AI Profile Score",
    value: "92%",
    subtitle: "Complete your portfolio to reach 100%",
    icon: "fa-solid fa-chart-pie",
    extra: {
      type: "progress",
      value: 92,
    },
  },
  {
    id: 2,
    title: "Active Contracts",
    value: "2",
    subtitle: "On Track",
    icon: "fa-solid fa-file-contract",
  },
  {
    id: 3,
    title: "This Month",
    value: "$4,200",
    subtitle: "From active projects",
    icon: "fa-regular fa-calendar-days",
    trend: {
      direction: "up",
      value: "+18% from last month",
    },
  },
  {
    id: 4,
    title: "Total Earnings",
    value: "$28,450",
    subtitle: "From 24 completed projects",
    icon: "fa-solid fa-wallet",
    trend: {
      direction: "up",
      value: "+12%",
    },
  },
];

const jobsData = [
  {
    id: 1,
    title: "Full Stack Developer for SaaS Platform",
    description:
      "Looking for experienced developer to build scalable web application with modern tech stack.",
    recommended: true,
    score: 94,
    tags: ["React", "Node.js", "PostgreSQL"],
    meta: [
      {
        icon: "fa-solid fa-dollar-sign",
        text: "$5,000 - $8,000",
      },
      {
        icon: "fa-regular fa-clock",
        text: "2 hours ago",
      },
    ],
  },
  {
    id: 2,
    title: "Senior React Developer Needed",
    description:
      "Build complex UI components for enterprise dashboard project with TypeScript.",
    recommended: true,
    score: 86,
    tags: ["React", "TypeScript", "Tailwind"],
    meta: [
      {
        icon: "fa-solid fa-dollar-sign",
        text: "$3,500 - $6,000",
      },
      {
        icon: "fa-regular fa-clock",
        text: "5 hours ago",
      },
    ],
  },
  {
    id: 3,
    title: "E-commerce Platform Development",
    description:
      "Redesign and develop custom e-commerce solution with payment integration.",
    recommended: false,
    score: 90,
    tags: ["React", "Next.js", "Stripe"],
    meta: [
      {
        icon: "fa-solid fa-dollar-sign",
        text: "$4,000 - $7,000",
      },
      {
        icon: "fa-regular fa-clock",
        text: "1 day ago",
      },
    ],
  },
];

const contractsData = [
  {
    id: 1,
    title: "Mobile App UI/UX",
    company: "TechCorp Inc",
    progress: 85,
    earnings: "$2,400",
    contractType: "Hourly",
  },
  {
    id: 2,
    title: "Dashboard Redesign",
    company: "StartupXYZ",
    progress: 45,
    earnings: "$1,800",
    contractType: "Fixed",
  },
];

function DashboardPage() {
  const location = useLocation();
  const userName = location.state?.userName || "Guest";

  return (
    <section className="dashboardPage">
      <div className="dashboardPage__container">
        {/* Page header */}
        <header className="dashboardPage__header">
            <h1>Welcome back, {userName}!</h1>
            <p>Here's what's happening with your freelance journey.</p>
          </header>

        {/* Statistics cards */}
        <div className="dashboardPage__statsGrid">
          {statsData.map((stat) => (
            <StatsCard key={stat.id} {...stat} />
          ))}
        </div>

        <div className="dashboardPage__contentGrid">
          {/* Recommended jobs */}
          <section className="dashboardPage__jobs">
            <div className="dashboardPage__sectionHeader">
              <h2>
                <i
                  className="fa-solid fa-wand-magic-sparkles"
                  aria-hidden="true"
                />
                AI Recommended Jobs
              </h2>

              <a href="#view-all">View All</a>
            </div>

            <div className="dashboardPage__jobsList">
              {jobsData.map((job) => (
                <JobMatchCard key={job.id} {...job} />
              ))}
            </div>
          </section>

          {/* Active contracts */}
          <aside className="dashboardPage__contracts">
            <div className="dashboardPage__sectionHeader">
              <h2>
                <i className="fa-solid fa-briefcase" aria-hidden="true" />
                Active Contracts
              </h2>
            </div>

            <div className="dashboardPage__contractsList">
              {contractsData.map((contract) => (
                <ContractCard key={contract.id} {...contract} />
              ))}
            </div>

            <a href="/contracts" className="dashboardPage__viewAllBtn">
              View All Contracts
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default DashboardPage;
