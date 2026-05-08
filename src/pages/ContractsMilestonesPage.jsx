import "./ContractsMilestonesPage.css";

const contracts = [
  {
    id: 1,
    title: "Mobile App UI/UX Design",
    client: "TechCorp Inc",
    started: "Started May 1, 2026",
    earned: "$1,680",
    total: "$2,800",
    progress: 85,
    milestones: [
      {
        id: 1,
        title: "Initial Frames",
        date: "May 3",
        amount: "$700",
        status: "done",
      },
      {
        id: 2,
        title: "High-Fidelity Mockups",
        date: "May 10",
        amount: "$980",
        status: "done",
      },
      {
        id: 3,
        title: "Interactive Prototype",
        date: "Expected May 18",
        amount: "",
        status: "active",
        action: "Submit Deliverable",
      },
      {
        id: 4,
        title: "Final delivery & Revision",
        date: "Expected May 25",
        amount: "$560",
        status: "pending",
      },
    ],
  },
  {
    id: 2,
    title: "Dashboard Redesign",
    client: "StartupXYZ",
    started: "Started Apr 25, 2026",
    earned: "$1,800",
    total: "$4,500",
    progress: 40,
    milestones: [
      {
        id: 1,
        title: "Discovery & Research",
        date: "May 3",
        amount: "$700",
        status: "done",
      },
      {
        id: 2,
        title: "Design System Setup",
        date: "May 10",
        amount: "$980",
        status: "done",
      },
      {
        id: 3,
        title: "Component Development",
        date: "Expected May 18",
        amount: "",
        status: "active",
        action: "Submit Deliverable",
      },
      {
        id: 4,
        title: "Final delivery & Revision",
        date: "Expected May 25",
        amount: "$560",
        status: "pending",
      },
    ],
  },
];

function MilestoneItem({ milestone }) {
  const iconClass =
    milestone.status === "done"
      ? "fa-regular fa-circle-check"
      : milestone.status === "active"
        ? "fa-regular fa-circle-dot"
        : "fa-regular fa-circle";

  return (
    <li className={`milestoneItem milestoneItem--${milestone.status}`}>
      <div className="milestoneItem__content">
        <i className={iconClass} aria-hidden="true" />

        <div>
          <h4>{milestone.title}</h4>
          <p>{milestone.date}</p>

          {milestone.action && (
            <button type="button" className="milestoneItem__action">
              {milestone.action}
            </button>
          )}
        </div>
      </div>

      {milestone.amount && <strong>{milestone.amount}</strong>}
    </li>
  );
}

function ContractMilestoneCard({ contract }) {
  const safeProgress = Math.min(
    Math.max(Number(contract.progress) || 0, 0),
    100,
  );

  return (
    <article className="contractMilestoneCard">
      <header className="contractMilestoneCard__header">
        <div>
          <h2>{contract.title}</h2>
          <p>Client: {contract.client}</p>
          <span>{contract.started}</span>
        </div>

        <div className="contractMilestoneCard__money">
          <strong>{contract.earned}</strong>
          <span>of {contract.total}</span>
        </div>
      </header>

      <div className="contractMilestoneCard__progress">
        <div className="contractMilestoneCard__progressTop">
          <span>Overall progress</span>
          <strong>{safeProgress}%</strong>
        </div>

        <div className="contractMilestoneCard__progressTrack">
          <span
            className="contractMilestoneCard__progressFill"
            style={{ width: `${safeProgress}%` }}
          />
        </div>
      </div>

      <section className="contractMilestoneCard__milestones">
        <h3>Milestones</h3>

        <ul>
          {contract.milestones.map((milestone) => (
            <MilestoneItem key={milestone.id} milestone={milestone} />
          ))}
        </ul>
      </section>
    </article>
  );
}

function ContractsMilestonesPage() {
  return (
    <section className="contractsPage">
      <div className="contractsPage__container">
        {/* Page header */}
        <header className="contractsPage__header">
          <h1>Contracts & Milestones</h1>
          <p>Track your active projects and deliverables.</p>
        </header>

        <div className="contractsPage__list">
          {contracts.map((contract) => (
            <ContractMilestoneCard key={contract.id} contract={contract} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ContractsMilestonesPage;
