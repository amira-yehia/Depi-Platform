import { useMemo, useState } from "react";
import "./ProposalsPage.css";
import ProposalsView from "../components/Proposals/ProposalsView";

const MOCK_STATS = {
  total: 24,
  pending: 2,
  accepted: 1,
  successRate: 69,
};

const MOCK_PROPOSALS = [
  {
    id: "pr1",
    status: "Pending",
    title: "Full Stack Developer for SaaS Platform",
    budget: "$8,000",
    submittedAgo: "Submitted 2 days Ago",
    noteType: "warn",
    noteText: "Under review",
    matchScore: 94,
    canWithdraw: true,
  },
  {
    id: "pr2",
    status: "Pending",
    title: "Full Stack Developer for SaaS Platform",
    budget: "$8,000",
    submittedAgo: "Submitted 2 days Ago",
    noteType: "info",
    noteText: "viewed by client",
    matchScore: 94,
    canWithdraw: true,
  },
  {
    id: "pr3",
    status: "Accepted",
    title: "React Developer for FinTech Dashboard",
    budget: "$6,500",
    submittedAgo: "Submitted 1 week Ago",
    noteType: "success",
    noteText: "Accepted",
    matchScore: 91,
    canWithdraw: false,
  },
  {
    id: "pr4",
    status: "Rejected",
    title: "UI/UX Designer for E-commerce",
    budget: "$3,200",
    submittedAgo: "Submitted 3 days Ago",
    noteType: "danger",
    noteText: "Rejected",
    matchScore: 84,
    canWithdraw: false,
  },
  {
    id: "pr5",
    status: "Withdrawn",
    title: "DevOps Engineer for CI/CD Setup",
    budget: "$4,800",
    submittedAgo: "Submitted 2 weeks Ago",
    noteType: "muted",
    noteText: "Withdrawn",
    matchScore: 78,
    canWithdraw: false,
  },
];

const TABS = ["Pending", "Accepted", "Rejected", "Withdrawn"];

export default function ProposalsPage() {
  // TODO: replace mocks with API
  const [stats] = useState(MOCK_STATS);
  const [proposals, setProposals] = useState(MOCK_PROPOSALS);

  const [activeTab, setActiveTab] = useState("Pending");

  const filtered = useMemo(() => {
    return proposals.filter((p) => p.status === activeTab);
  }, [proposals, activeTab]);

  const viewProps = {
    header: {
      title: "My Proposals",
      subtitle: "Track and manage your job applications",
    },
    stats: [
      { label: "Total Proposals", value: stats.total },
      { label: "Pendings", value: stats.pending },
      { label: "Accepted", value: stats.accepted },
      { label: "Success rate", value: `${stats.successRate}%` },
    ],
    tabs: {
      items: TABS,
      active: activeTab,
      onChange: setActiveTab,
    },
    proposals: filtered,
    onViewDetails: (proposalId) => {
      console.log("View details:", proposalId);
      // later: navigate to proposal details page
    },
    onWithdraw: (proposalId) => {
      // mock withdraw: move to Withdrawn
      setProposals((prev) =>
        prev.map((p) =>
          p.id === proposalId ? { ...p, status: "Withdrawn", canWithdraw: false, noteType: "muted", noteText: "Withdrawn" } : p
        )
      );
    },
  };

  return (
    <div className="proposalsPage">
      <ProposalsView {...viewProps} />
    </div>
  );
}